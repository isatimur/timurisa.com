#!/bin/bash
# Weekly news digest. Fetches public feeds, lets an agent write short notes, assembles
# content/news/<date>.json, runs the gate, and opens a PR for one-tap merge.
# Usage: scripts/factory/news-run.sh [--dry]   (--dry stops before push, PR, and Telegram)
# Trust model: the agent may read the working directory and write only
# factory/news/commentary.json. It has no web tools. Links and titles never pass through it.
set -euo pipefail

export PATH="$HOME/.local/bin:/opt/homebrew/bin:$HOME/.nvm/versions/node/v24.22.2/bin:/usr/bin:/bin"
DRY=0; [ "${1:-}" = "--dry" ] && DRY=1

HOME_REPO="$HOME/Dev/timurisa.com"
WORK="$HOME/.factory-work/news"
LOG_DIR="$HOME/.factory/logs"; mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/news-$(date +%Y%m%d-%H%M%S).log"
exec > >(tee -a "$LOG") 2>&1

MAX_USD=2
MAX_TURNS=30
TG_DIR="$HOME/.claude/channels/telegram"
BASE_REF="${FACTORY_BASE:-origin/main}"
TODAY=$(date +%Y-%m-%d)
WEEK=$(date +%G-W%V)

notify() {
  local text="$1"
  [ "$DRY" = 1 ] && { echo "[dry] would notify: $text"; return 0; }
  [ -f "$TG_DIR/.env" ] || { echo "no telegram config; message: $text"; return 0; }
  local token chat
  token=$(grep '^TELEGRAM_BOT_TOKEN=' "$TG_DIR/.env" | cut -d= -f2-)
  chat=$(python3 -c "import json;print(json.load(open('$TG_DIR/access.json'))['allowFrom'][0])")
  printf 'url = "https://api.telegram.org/bot%s/sendMessage"\n' "$token" |
    curl -s -K - --data-urlencode "chat_id=$chat" --data-urlencode "text=$text" -o /dev/null || echo "telegram send failed"
}
escalate() { echo "ESCALATE: $1"; notify "timurisa news digest needs you: $1 (log: $LOG)"; exit 1; }

if [ "$DRY" = 0 ] && [ -f "$HOME/.factory/last-news" ] && [ "$(cat "$HOME/.factory/last-news")" = "$WEEK" ]; then
  echo "already ran this week"; exit 0
fi

cd "$HOME_REPO"
git fetch -q origin main
if [ ! -d "$WORK" ]; then git worktree add -q --detach "$WORK" origin/main; fi
cd "$WORK"
git reset -q --hard; git clean -fdq -e node_modules -e .env.local
BRANCH="factory/news-$TODAY"
git checkout -q -B "$BRANCH" "$BASE_REF"
if [ ! -d node_modules ]; then cp -Rc "$HOME_REPO/node_modules" node_modules; fi
rm -f .env.local

[ ! -f "content/news/$TODAY.json" ] || escalate "content/news/$TODAY.json already exists"

echo "== fetch"
node scripts/factory/news-fetch.mjs || escalate "feed fetch returned too few items"

echo "== writer"
DENY="Read(//${HOME#/}/.claude/**),Read(//${HOME#/}/.ssh/**),Read(//${HOME#/}/.config/**),Read(//${HOME#/}/.factory/**),Read(**/.env*)"
claude -p "$(git show "$BASE_REF:factory/prompts/news.md")"$'\n\n'"Today is $TODAY." \
  --permission-mode dontAsk \
  --allowedTools "Read(./**),Glob,Grep,Edit(factory/news/commentary.json)" \
  --disallowedTools "$DENY" \
  --max-turns "$MAX_TURNS" --max-budget-usd "$MAX_USD" | tail -2

# Only ignored intermediates may exist. Any tracked or untracked change means the agent left its lane.
[ -z "$(git status --porcelain --untracked-files=all)" ] || escalate "agent changed files: $(git status --porcelain | head -3 | tr '\n' ' ')"

# Restore every trusted file from the base ref before running any assemble or build code.
git checkout "$BASE_REF" -- scripts .github package.json package-lock.json next.config.js \
  factory/news-sources.json factory/banned-terms.txt factory/prompts app components lib
[ -z "$(git status --porcelain --untracked-files=all)" ] || escalate "trusted files drifted"

echo "== assemble"
node scripts/factory/news-assemble.mjs "$TODAY" || escalate "commentary failed the assembler checks"

echo "== build"
[ -f "$HOME_REPO/.env.local" ] && cp "$HOME_REPO/.env.local" .env.local || true
GATE_OK=0
node scripts/factory/verify.mjs --build && GATE_OK=1 || {
  echo "gate failed once, retrying"
  node scripts/factory/verify.mjs --build && GATE_OK=1 || true
}
rm -f .env.local
[ "$GATE_OK" = 1 ] || escalate "gate failed twice for the $TODAY digest"

git add "content/news/$TODAY.json"
[ "$(git status --porcelain | wc -l | tr -d ' ')" = 1 ] || escalate "unexpected changes before commit"
git -c user.name="timurisa factory" -c user.email="factory@users.noreply.github.com" \
  commit -q -m "News digest $TODAY"

if [ "$DRY" = 1 ]; then
  echo "DRY RUN OK: branch $BRANCH committed in $WORK, nothing pushed."
  git log --oneline -1
  exit 0
fi

git push -q origin "$BRANCH"
gh label create factory --color ff7b42 --description "Opened by the content factory" 2>/dev/null || true
PR_URL=$(gh pr create --base main --head "$BRANCH" --title "News digest $TODAY" --label factory \
  --body "Gate: PASS (verify --build). Links, titles and point counts come from the feeds. Notes are by an agent with no web access. Merge to publish." 2>/dev/null || gh pr view --json url -q .url)
echo "$WEEK" > "$HOME/.factory/last-news"
notify "News digest ready: $(python3 -c "import json;print(json.load(open('content/news/$TODAY.json'))['headline'])")
Merge with one tap: $PR_URL"
echo "PR: $PR_URL"
