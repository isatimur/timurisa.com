# Sources: pena-park-29-languages

Topic note: the first unchecked backlog item (`what-claude-code-hooks-stopped-in-my-sessions`) cites `~/.claude/projects`, which is not in `factory/sources.txt`. The writer skipped it and took the next item.

## Opening paragraph

- pena-park-3d is at https://github.com/isatimur/pena-park-3d.
  Source: factory/evidence/pena-park-3d.txt
- It is a real-scale Three.js map of Pena Park Hotel and Pena Aventura Park (Ribeira de Pena, Portugal).
  Source: ~/Dev/pena-park-3d/README.md
- The repo calls it an "unofficial concept demo".
  Source: ~/Dev/pena-park-3d/README.md
- The menu lists 29 languages; 27 have no native-speaker read.
  Source: ~/Dev/pena-park-3d/README.md

## Files used (no sentence in the post)

- Files used: README.md, EGM.md, src/i18n.js, src/style.css, scripts/i18n-check.mjs, scripts/i18n-extract.mjs, scripts/build-public.mjs, scripts/verify.mjs, data/i18n/, git log.
  Source: ~/Dev/pena-park-3d/README.md, ~/Dev/pena-park-3d/EGM.md, ~/Dev/pena-park-3d/src/i18n.js, ~/Dev/pena-park-3d/src/style.css, ~/Dev/pena-park-3d/scripts/i18n-check.mjs, ~/Dev/pena-park-3d/scripts/i18n-extract.mjs, ~/Dev/pena-park-3d/scripts/build-public.mjs, ~/Dev/pena-park-3d/scripts/verify.mjs, ~/Dev/pena-park-3d/data/i18n/index.json, factory/evidence/pena-park-3d.txt

## What the git history can and cannot show

- One commit, 99d607b, 2026-11-22, "Initial commit: Pena Park 3D as it stands on 2026-11-22".
  Source: factory/evidence/pena-park-3d.txt
- Public at https://pena-park-3d.vercel.app, deployed 2026-10-31.
  Source: ~/Dev/pena-park-3d/README.md

## Two languages in the code, 27 in files

- `LANGS` in `src/i18n.js` lists 29 languages.
  Source: ~/Dev/pena-park-3d/src/i18n.js, ~/Dev/pena-park-3d/README.md
- English and Portuguese are written in the code: chapter copy in `src/journey.js`, figures in `data/facts.json`, UI strings in `STRINGS` in `src/ui.js`.
  Source: ~/Dev/pena-park-3d/README.md
- Other languages come from `data/i18n/<code>.json`.
  Source: ~/Dev/pena-park-3d/README.md
- `index.json` lists 27 files, `es.json` first and `th.json` last.
  Source: ~/Dev/pena-park-3d/data/i18n/index.json
- `_source.en.json` holds 281 keys (`_meta.keys`).
  Source: ~/Dev/pena-park-3d/data/i18n/_source.en.json
- Keys are stable paths such as `chapter.<id>.title` and `fact.<id>.value`; app and extract share `K`; comment "so the two can never disagree".
  Source: ~/Dev/pena-park-3d/src/i18n.js, ~/Dev/pena-park-3d/scripts/i18n-check.mjs

## How the app picks a language

- Order: `?lang=`, `localStorage.lang`, browser languages, English; unknown sources fall through.
  Source: ~/Dev/pena-park-3d/src/i18n.js, ~/Dev/pena-park-3d/README.md
- `pt-BR` -> `pt`; `zh` with `tw`, `hk`, `mo` or `hant` -> `zh-Hant`, other `zh` -> `zh-Hans`; `nb`, `nn` -> `no`; `iw` -> `he`.
  Source: ~/Dev/pena-park-3d/src/i18n.js

## How English fills the gaps

- The app fetches `index.json` first and fetches only files it lists.
  Source: ~/Dev/pena-park-3d/src/i18n.js, ~/Dev/pena-park-3d/README.md
- A missing key, missing file or failed fetch falls back to English, string by string.
  Source: ~/Dev/pena-park-3d/src/i18n.js
- A string that falls back carries `lang="en"`.
  Source: ~/Dev/pena-park-3d/README.md
- A later language switch wins over a slower earlier one (counter `seq`).
  Source: ~/Dev/pena-park-3d/src/i18n.js

## Right-to-left and script fonts

- Arabic and Hebrew use `dir="rtl"`; each script gets its own system font stack; no web fonts.
  Source: ~/Dev/pena-park-3d/README.md, ~/Dev/pena-park-3d/src/i18n.js, ~/Dev/pena-park-3d/src/style.css
- The app sets `data-script` on the page.
  Source: ~/Dev/pena-park-3d/src/i18n.js
- Bidi comment: digits after Arabic letters turn "2026-10-29" into "29-10-2026"; `bidiSafe` isolates ISO dates left-to-right in rtl pages.
  Source: ~/Dev/pena-park-3d/src/i18n.js

## The check that fails a translation

- Five-step workflow: extract, translate `_source.en.json` reading each `_note`, save as `<code>.json`, run the check, list in `index.json`.
  Source: ~/Dev/pena-park-3d/README.md
- `i18n-check.mjs` exits 1 on any FAIL.
  Source: ~/Dev/pena-park-3d/scripts/i18n-check.mjs
- Per-file FAIL rules (header lines 26-29): invalid JSON, missing or extra key, empty string, `_meta.lang` not the file's code, lost digit run ("8.08" may become "8,08"), lost URL, ISO date, {placeholder}, © or ODbL, a {placeholder} the English does not have, placeholder text (TODO, lorem ipsum).
  Source: ~/Dev/pena-park-3d/scripts/i18n-check.mjs
- Run-level FAIL (header line 30, code lines 53-66): stale `_source.en.json`; `index.json` lists a file that is missing. These fail against `_source.en.json` and `index.json`, not against a translation file.
  Source: ~/Dev/pena-park-3d/scripts/i18n-check.mjs
- WARN rules (header lines 31-33, code lines 80-81, 98): length ratio outside 0.4 to 3.5 for English of 8+ characters; missing protected proper noun; `_meta.sourceHash` differs from the current source; a language file that `index.json` does not list.
  Source: ~/Dev/pena-park-3d/scripts/i18n-check.mjs
- "Fantasticable" and "Caminho do Abade" are in `PROTECTED`.
  Source: ~/Dev/pena-park-3d/scripts/i18n-extract.mjs
- `npm run verify` runs the check as step (i).
  Source: ~/Dev/pena-park-3d/scripts/verify.mjs, ~/Dev/pena-park-3d/README.md
- The per-file summary line format is taken from the `console.log` in the script (line 108), not from a captured run.
  Source: ~/Dev/pena-park-3d/scripts/i18n-check.mjs
- The first word of the summary line is `FAIL` when the file has missing keys, empty strings, lost numbers, lost tokens, unknown placeholders or placeholder text; otherwise `PASS` (line 108).
  Source: ~/Dev/pena-park-3d/scripts/i18n-check.mjs
- An extra key (line 85) or a wrong `_meta.lang` (line 79) calls `fail()`, which prints its own FAIL line (line 45), but line 108 does not count them, so the summary line can still read PASS.
  Source: ~/Dev/pena-park-3d/scripts/i18n-check.mjs
- Any `fail()` raises the fail count, and the script exits with 1 when the count is above zero (line 111).
  Source: ~/Dev/pena-park-3d/scripts/i18n-check.mjs
- Invalid JSON (line 75) or no `strings` object (line 77) calls `fail()` and then `continue`, so the file gets no summary line.
  Source: ~/Dev/pena-park-3d/scripts/i18n-check.mjs
- `build-public.mjs` copies `data/i18n/` into the build and skips names starting with `_`.
  Source: ~/Dev/pena-park-3d/scripts/build-public.mjs, ~/Dev/pena-park-3d/README.md
- Link to /blog/requirements-a-machine-can-check: the slug exists.
  Source: content/posts/archive.json

## Who wrote the translations

- All 27 translated files are machine translations (Claude), "checked for keys and figures but not read by a native speaker".
  Source: ~/Dev/pena-park-3d/README.md
- 26 of the 27 files read `"translator": "machine (Claude), unreviewed"` in `_meta` (line 5 of each).
  Source: ~/Dev/pena-park-3d/data/i18n/ (ar, ca, cs, da, de, el, fi, fr, gl, he, hi, id, it, ja, ko, nl, no, pl, ru, sv, th, tr, uk, vi, zh-Hans, zh-Hant .json)
- `es.json` reads `"translator": "pilot translation (agent), from _source.en.json"`.
  Source: ~/Dev/pena-park-3d/data/i18n/es.json

## Not measured

- No captured output of `i18n-check.mjs` or `npm run verify` exists in the sources. No pass is claimed.
- Translation quality is unknown; no native speaker read the 27 files (README).
- The check does not test meaning, tone or grammar (read from the rules in `scripts/i18n-check.mjs`).
- No screenshot in the sources shows the rtl layout or script fonts on a real device.
- Cut on purpose: a README sentence that names the hotel as a future user of the translations. The post does not repeat it.
