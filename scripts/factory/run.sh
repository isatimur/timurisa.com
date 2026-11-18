#!/bin/bash
# Factory runner. One post per run, one run per day. Never pushes to main.
# Usage: scripts/factory/run.sh [--dry]   (--dry stops before push, PR, and Telegram)
set -euo pipefail

export PATH="$HOME/.local/bin:/opt/homebrew/bin:$HOME/.nvm/versions/node/v24.22.2/bin:/usr/bin:/bin"
DRY=0; [ "${1:-}" = "--dry" ] && DRY=1

HOME_REPO="$HOME/Dev/timurisa.com"
WORK="$HOME/.factory/timurisa.com-work"
LOG_DIR="$HOME/.factory/logs"; mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/run-$(date +%Y%m%d-%H%M%S).log"
exec > >(tee -a "$LOG") 2>&1

MAX_USD=6        # budget cap per agent call (owner chose "default")
MAX_TURNS=80
TG_DIR="$HOME/.claude/channels/telegram"

notify() {
  # Telegram message to the paired chat. The token never reaches logs or argv.
  local text="$1"
  [ "$DRY" = 1 ] && { echo "[dry] would notify: $text"; return 0; }
  [ -f "$TG_DIR/.env" ] || { echo "no telegram config; message: $text"; return 0; }
  local token chat
  token=$(grep '^TELEGRAM_BOT_TOKEN=' "$TG_DIR/.env" | cut -d= -f2-)
  chat=$(python3 -c "import json;print(json.load(open('$TG_DIR/access.json'))['allowFrom'][0])")
  printf 'url = "https://api.telegram.org/bot%s/sendMessage"\n' "$token" |
    curl -s -K - --data-urlencode "chat_id=$chat" --data-urlencode "text=$text" -o /dev/null || echo "telegram send failed"
}
escalate() { echo "ESCALATE: $1"; notify "timurisa factory needs you: $1 (log: $LOG)"; exit 1; }

# One run per day (a dry run does not count).
TODAY=$(date +%Y-%m-%d)
if [ "$DRY" = 0 ] && [ -f "$HOME/.factory/last-run" ] && [ "$(cat "$HOME/.factory/last-run")" = "$TODAY" ]; then
  echo "already ran today"; exit 0
fi

# Own worktree, so the owner's checkout is never touched.
cd "$HOME_REPO"
git fetch -q origin main
if [ ! -d "$WORK" ]; then git worktree add -q --detach "$WORK" origin/main; fi
cd "$WORK"
git reset -q --hard; git clean -fdq -e node_modules -e .env.local
BRANCH="factory/$(date +%Y-%m-%d-%H%M)"
git checkout -q -B "$BRANCH" "${FACTORY_BASE:-origin/main}"
[ -e node_modules ] || ln -s "$HOME_REPO/node_modules" node_modules
[ -e .env.local ] || { [ -f "$HOME_REPO/.env.local" ] && ln -s "$HOME_REPO/.env.local" .env.local || true; }

ADD_DIRS=()
while read -r line; do
  case "$line" in ''|\#*) continue ;; esac
  for p in $(eval echo "$line"); do [ -e "$p" ] && ADD_DIRS+=(--add-dir "$p"); done
done < factory/sources.txt

agent() {  # agent <prompt-file> <extra-text>
  claude -p "$(cat "$1")"$'\n\n'"$2" \
    --permission-mode acceptEdits \
    --allowedTools "Read,Write,Edit,Glob,Grep" \
    --max-turns "$MAX_TURNS" --max-budget-usd "$MAX_USD" \
    "${ADD_DIRS[@]}"
}

echo "== writer"
agent factory/prompts/writer.md "Today is $TODAY." | tail -3
[ -f factory/ESCALATE.md ] && escalate "writer stopped: $(head -c 300 factory/ESCALATE.md)"

SLUG=$(python3 -c "import json;print(json.load(open('factory/state.json'))['factoryPosts'][-1])")
[ -f "content/drafts/stories/$SLUG.md" ] || escalate "writer did not produce a draft"
echo "slug: $SLUG"

review() {
  rm -f "factory/reviews/$SLUG.md"
  echo "== reviewer"
  agent factory/prompts/reviewer.md "Slug: $SLUG" | tail -2
  grep -q '^VERDICT: PASS$' "factory/reviews/$SLUG.md" 2>/dev/null
}

if ! review; then
  echo "== rewrite round"
  cp "factory/reviews/$SLUG.md" /tmp/factory-review-$$.md
  agent factory/prompts/writer.md "REWRITE ONLY slug $SLUG. Fix every PROBLEM below by changing the draft and the sources sidecar. Do not start a new post.
$(cat /tmp/factory-review-$$.md)" | tail -2
  review || escalate "reviewer failed the rewrite of $SLUG (see factory/reviews/$SLUG.md)"
fi

echo "== build"
node scripts/import-story-drafts.mjs | tail -1
node scripts/generate-blog-covers.mjs | tail -1
node scripts/factory/verify.mjs --build || {
  echo "gate failed once, retrying after import"
  node scripts/factory/verify.mjs --build || escalate "gate failed twice for $SLUG"
}

python3 - <<PY
import json,datetime
p='factory/state.json'; d=json.load(open(p)); d['lastRun']=datetime.datetime.now().isoformat(); json.dump(d,open(p,'w'),indent=2)
PY

git add -A content public factory
git -c user.name="timurisa factory" -c user.email="factory@users.noreply.github.com" \
  commit -q -m "Factory: add $SLUG"

if [ "$DRY" = 1 ]; then
  echo "DRY RUN OK: branch $BRANCH committed in $WORK, nothing pushed."
  git log --oneline -1
  exit 0
fi

git push -q origin "$BRANCH"
gh label create factory --color ff7b42 --description "Opened by the content factory" 2>/dev/null || true
PR_URL=$(gh pr create --base main --head "$BRANCH" --title "Factory: $SLUG" --label factory \
  --body "Gate: PASS (verify --build). Fresh-reviewer verdict: PASS. Sources: factory/sources/$SLUG.md. Merge to publish." 2>/dev/null || gh pr view --json url -q .url)
echo "$TODAY" > "$HOME/.factory/last-run"
notify "New post ready to publish: $SLUG
Merge with one tap: $PR_URL"
echo "PR: $PR_URL"
