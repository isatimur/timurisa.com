title: How the Pena Park 3D tour handles 29 languages and checks its translations
slug: pena-park-29-languages
excerpt: A Three.js scroll tour lists 29 languages in its menu. Two are written in the code, 27 come from JSON files. Here is how the app picks a language, falls back to English, and how one script fails a translation that loses a number.
category: Product engineering
category: 3D maps
date: 2026-11-25T09:30:00.000Z

How do you ship a small 3D site in 29 languages when no native speaker has read 27 of them? This post is for developers who add translations to a static web app. It follows [pena-park-3d](https://github.com/isatimur/pena-park-3d), a real-scale Three.js map of Pena Park Hotel and Pena Aventura Park in Ribeira de Pena, Portugal. The repo calls it an "unofficial concept demo". You get the file layout, the fallback rules, and the checks one script runs on each translation file.

## What the git history can and cannot show

The repo has one commit: [99d607b](https://github.com/isatimur/pena-park-3d/commit/99d607b) on 2026-11-22, "Initial commit: Pena Park 3D as it stands on 2026-11-22". So git gives no order of events for the language work. The README says the site went public at https://pena-park-3d.vercel.app on 2026-10-31.

## Two languages in the code, 27 in files

`LANGS` in `src/i18n.js` lists 29 languages. English and Portuguese are written in the code. The chapter copy lives in `src/journey.js`, the figures in `data/facts.json`, and the UI strings in `STRINGS` in `src/ui.js`.

Every other language comes from `data/i18n/<code>.json`. The manifest `data/i18n/index.json` lists 27 files, from `es.json` to `th.json`. The English source file `_source.en.json` holds 281 keys.

Keys are stable paths, for example `chapter.<id>.title` or `fact.<id>.value`. The app and the extract script build them from the same object `K`. A code comment says this is so "the two can never disagree".

## How the app picks a language

`resolveLang` tries four sources in order: `?lang=` in the URL, then `localStorage.lang`, then the browser languages, then English. A source that names no known language falls through to the next one.

`matchLang` maps tags to the registry. `pt-BR` becomes `pt`. `zh-TW`, `zh-HK` and `zh-MO` become `zh-Hant`, and other `zh` becomes `zh-Hans`. `nb` and `nn` become `no`, and the old code `iw` becomes `he`.

## How English fills the gaps

The app fetches `index.json` first, so it does not ask for a file that the manifest does not list. A missing key, a missing file or a failed fetch falls back to English, string by string. A string that falls back carries `lang="en"`.

When two language switches overlap, a counter makes the later call win over a slower earlier one.

## Right-to-left and script fonts

Arabic and Hebrew set `dir="rtl"` on the page. The app also sets `data-script`, and `src/style.css` gives each script its own system font stack. The app downloads no web fonts.

One bidi problem has its own fix. A code comment says that in an rtl page, European digits after Arabic letters turn into Arabic numbers, so "2026-10-29" shows as "29-10-2026". `bidiSafe` wraps each ISO date in left-to-right isolate marks when the page is rtl.

## The check that fails a translation

The workflow in the README has five steps:

```
node scripts/i18n-extract.mjs
# translate data/i18n/_source.en.json, read each _note
# save it as data/i18n/<code>.json
node scripts/i18n-check.mjs
# list the file in data/i18n/index.json
```

`scripts/i18n-check.mjs` exits with 1 on any FAIL. Its header lists these FAIL rules for a translation file:

- invalid JSON, a missing key, an extra key, or an empty string;
- `_meta.lang` that is not the file's code;
- a lost number: each run of digits in the English must appear as many times in the translation ("8.08" may become "8,08");
- a lost URL, ISO date, `{placeholder}`, "©" or "ODbL";
- a `{placeholder}` that the English does not have;
- placeholder text such as TODO or "lorem ipsum".

The whole run also fails when `_source.en.json` is stale, or when `index.json` lists a file that does not exist.

The script warns, and does not fail, for:

- a length ratio outside 0.4 to 3.5, for English strings of 8 or more characters;
- a missing protected name such as "Fantasticable" or "Caminho do Abade";
- a `_meta.sourceHash` that differs from the current source;
- a language file that `index.json` does not list.

`npm run verify` runs this check as step (i). For more on checks of this kind, see [Requirements a machine can check](/blog/requirements-a-machine-can-check).

For each file the script prints one summary line in this format (source code, not a captured run):

```
<PASS or FAIL>  <file>: <n>/<total> keys, <n> identical to English (names and figures), <n> lost numbers, <n> warnings
```

The first word is FAIL when a key is missing, a string is empty, a string lost a number or token, or a string holds an unknown placeholder or placeholder text. An extra key or a wrong `_meta.lang` prints its own FAIL line, but the summary line can still read PASS. Either way the run exits with 1. A file with invalid JSON or no `strings` object gets no summary line.

`scripts/build-public.mjs` copies `data/i18n/` into the public build, but skips names that start with `_`. So the translator input `_source.en.json` stays out of `dist/`.

## Who wrote the translations

The README says all 27 translated files are machine translations (Claude), "checked for keys and figures but not read by a native speaker". In the `_meta` blocks, 26 of the 27 files read `"translator": "machine (Claude), unreviewed"`. `es.json` reads `"translator": "pilot translation (agent), from _source.en.json"`.

## What is not measured

- No file in the repo shows a captured output of `node scripts/i18n-check.mjs` or `npm run verify`. This post does not claim a pass.
- No native speaker has read the 27 translated files, per the README. Their quality is unknown.
- The check counts digits, tokens and keys. It does not test meaning, tone, or grammar.
- No screenshot in the sources shows the rtl layout or the script fonts on a real device.

*How this post was made: an AI agent drafted it from the project files listed in the repo, a second agent reviewed it, and Timur merged it.*
