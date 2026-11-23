#!/bin/bash
# Weekly habits review. Reads the scan numbers, checks current Anthropic guidance,
# writes a report to ~/.factory/reports, and messages the owner a short summary.
# It only proposes. It opens no PR and edits no config. Reports stay local (they
# describe work sessions, so they never enter the public repo).
# Usage: scripts/factory/weekly-review.sh [--dry]
set -euo pipefail

export PATH="$HOME/.local/bin:/opt/homebrew/bin:$HOME/.nvm/versions/node/v24.22.2/bin:/usr/bin:/bin"
DRY=0; [ "${1:-}" = "--dry" ] && DRY=1
HOME_REPO="$HOME/Dev/timurisa.com"
WORK="$HOME/.factory-work/weekly"
OUT="$HOME/.factory/reports"; LOG_DIR="$HOME/.factory/logs"
mkdir -p "$WORK" "$OUT" "$LOG_DIR"
LOG="$LOG_DIR/weekly-$(date +%Y%m%d-%H%M%S).log"
exec > >(tee -a "$LOG") 2>&1
TG_DIR="$HOME/.claude/channels/telegram"
STAMP=$(date +%Y-%m-%d)

notify() {
  local text="$1"
  [ "$DRY" = 1 ] && { echo "[dry] would notify: $text"; return 0; }
  [ -f "$TG_DIR/.env" ] || { echo "no telegram config"; return 0; }
  local token chat
  token=$(grep '^TELEGRAM_BOT_TOKEN=' "$TG_DIR/.env" | cut -d= -f2-)
  chat=$(python3 -c "import json;print(json.load(open('$TG_DIR/access.json'))['allowFrom'][0])")
  printf 'url = "https://api.telegram.org/bot%s/sendMessage"\n' "$token" |
    curl -s -K - --data-urlencode "chat_id=$chat" --data-urlencode "text=$text" -o /dev/null || echo "telegram send failed"
}

rm -rf "$WORK"/*; cd "$WORK"
SCAN_FLAGS="--days 7 --json"; [ "$DRY" = 1 ] && SCAN_FLAGS="$SCAN_FLAGS --no-record"
python3 "$HOME/.claude/skills/weekly-scan/scripts/scan.py" $SCAN_FLAGS > input.json
python3 -c "import json;json.load(open('input.json'))" || { notify "weekly review: scan output unreadable (log: $LOG)"; exit 1; }

# The prompt comes from the trusted repo checkout's base ref, not from the working dir.
PROMPT=$(git -C "$HOME_REPO" show origin/main:factory/prompts/weekly.md 2>/dev/null || cat "$HOME_REPO/factory/prompts/weekly.md")
claude -p "$PROMPT" \
  --permission-mode dontAsk \
  --allowedTools "Read(./**),Edit(./report.md),WebSearch,WebFetch(domain:code.claude.com),WebFetch(domain:docs.claude.com),WebFetch(domain:docs.anthropic.com),WebFetch(domain:www.anthropic.com),WebFetch(domain:anthropic.com)" \
  --disallowedTools "Read(//${HOME#/}/.claude/**),Read(//${HOME#/}/.ssh/**),Read(//${HOME#/}/.config/**),Read(**/.env*)" \
  --max-turns 40 --max-budget-usd 3 | tail -2

[ -s report.md ] || { notify "weekly review produced no report (log: $LOG)"; exit 1; }
cp report.md "$OUT/$STAMP-weekly.md"
notify "Weekly habits review ($STAMP)
$(head -c 900 report.md)
Full report: $OUT/$STAMP-weekly.md"
echo "report: $OUT/$STAMP-weekly.md"
