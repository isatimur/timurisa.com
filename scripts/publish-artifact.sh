#!/usr/bin/env bash
# Publish a single-file HTML artifact to https://timurisa.com/a/<slug>/.
# Usage: scripts/publish-artifact.sh FILE.html [slug]
# Commits only the artifact path and pushes; Vercel builds from git.
set -euo pipefail

file="${1:?usage: publish-artifact.sh FILE.html [slug]}"
slug="${2:-$(basename "${file%.*}")}"
[[ "$slug" =~ ^[a-z0-9][a-z0-9-]*$ ]] || { echo "slug must be lowercase letters, digits, dashes" >&2; exit 1; }

root="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
dest="public/a/$slug/index.html"

mkdir -p "$root/public/a/$slug"
cp "$file" "$root/$dest"

git -C "$root" add -- "$dest"
git -C "$root" commit -m "Publish artifact: $slug" -- "$dest"
git -C "$root" push origin HEAD

echo "https://timurisa.com/a/$slug/"
