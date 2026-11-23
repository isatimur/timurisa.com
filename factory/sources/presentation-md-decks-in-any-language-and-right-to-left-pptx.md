# Sources: presentation-md-decks-in-any-language-and-right-to-left-pptx

## Repo and timeline

- presentation-md is at https://github.com/isatimur/presentation-md.
  Source: factory/evidence/presentation-skill-pack.txt
- presentation-md is open source (MIT License).
  Source: ~/Dev/presentation-skill-pack/LICENSE
- presentation-md turns Deck JSON into editable PPTX ("Deck JSON → editable `.pptx`").
  Source: ~/Dev/presentation-skill-pack/CHANGELOG.md
- presentation-md renders decks to HTML (633450b: "HTML sets `<html lang dir>`").
  Source: ~/Dev/presentation-skill-pack/packages/export/CHANGELOG.md
- The repo has 704 commits, first 2026-06-05, last 2026-11-23.
  Source: factory/evidence/presentation-skill-pack.txt
- 384 commits in 2026-07 and 246 in 2026-08.
  Source: factory/evidence/presentation-skill-pack.txt
- After 2026-08-05 the log shows no commits until 2026-11-22 (no commits listed for September or October).
  Source: factory/evidence/presentation-skill-pack.txt
- 633450b (2026-11-22) "feat: decks in any language and Studio UI in 10 languages".
  Source: factory/evidence/presentation-skill-pack.txt
- 993adb2 (2026-11-22) "fix: deck language on PPTX tables and charts, ...".
  Source: factory/evidence/presentation-skill-pack.txt
- 629f438 (2026-11-22) "rendered decks show presenter controls in the deck's language".
  Source: factory/evidence/presentation-skill-pack.txt
- 996a146 (2026-11-22) translate craft audit messages in Studio; a337a54 (2026-11-23) translate structural judge flags in Studio.
  Source: factory/evidence/presentation-skill-pack.txt
- d21ea8a (2026-11-23) "test(rtl): prove Hebrew and Persian decks in HTML and PPTX".
  Source: factory/evidence/presentation-skill-pack.txt
- 1ef7fa6 (2026-11-23) "feat(pptx): Office script fonts for Arabic, Hebrew, Thai and CJK runs".
  Source: factory/evidence/presentation-skill-pack.txt

## Deck language and Studio interface language

- `meta.lang` is a new optional field, BCP 47, default `en`.
  Source: ~/Dev/presentation-skill-pack/packages/export/CHANGELOG.md
- The Hebrew example deck sets `meta.title` "נווה — מצגת משקיעים", `meta.theme` `fintech-clean` and `meta.lang` `he` (lines 3-9). The post cuts the `company` and `description` keys between `title` and `theme` and marks the cut with `...`.
  Source: ~/Dev/presentation-skill-pack/examples/decks/rtl-hebrew-pitch.json
- Studio UI has ten languages: en, zh, es, ar, pt (Brasil), id, fr, ja, ru, de; described as "the ten most-used languages on the web"; only Arabic has `dir: "rtl"`.
  Source: ~/Dev/presentation-skill-pack/packages/studio/src/i18n/locales.ts
- Studio shows audit messages and judge flags "in all 10 languages".
  Source: ~/Dev/presentation-skill-pack/packages/core/CHANGELOG.md

## What meta.lang changes

- HTML sets `<html lang dir>`; Arabic, Hebrew, Persian and Urdu render right to left.
  Source: ~/Dev/presentation-skill-pack/packages/export/CHANGELOG.md
- Non-Latin scripts get Noto font fallbacks in the theme font stack and Google Fonts URL.
  Source: ~/Dev/presentation-skill-pack/packages/export/CHANGELOG.md
- PPTX text runs carry the deck language; RTL decks get paragraph RTL and mirrored alignment.
  Source: ~/Dev/presentation-skill-pack/packages/export/CHANGELOG.md
- Tests for `he`, `fa`, `fa-IR` expect the lang tag, `rtl="1"`, `algn="r"` and no `algn="l"`.
  Source: ~/Dev/presentation-skill-pack/packages/export/test/lang.test.ts
- HTML tests cover Arabic, Hebrew (Noto Sans Hebrew) and Persian with region.
  Source: ~/Dev/presentation-skill-pack/packages/renderer-node/tests/render-lang.test.ts

## What broke and the fixes

- Word-count gates counted Cyrillic, Arabic and other non-Latin words as zero ("previously zero"), and CJK text without spaces as one word per paragraph; commit 633450b counts them; "English counts are unchanged".
  Source: ~/Dev/presentation-skill-pack/packages/export/CHANGELOG.md
- 993adb2: PPTX tables and charts now carry `meta.lang` "like text boxes already did"; table cells mirror alignment in RTL decks.
  Source: ~/Dev/presentation-skill-pack/packages/export/CHANGELOG.md
- Test builds an Arabic table and chart and checks no `lang="en-US"`.
  Source: ~/Dev/presentation-skill-pack/packages/export/test/lang.test.ts
- pptxgenjs writes the theme font into `ea` and `cs` slots; theme fonts are mostly Latin-only, "so PowerPoint had to guess a font"; fix uses Office default theme fonts per script; Latin slot keeps theme font; Latin-script decks unchanged.
  Source: ~/Dev/presentation-skill-pack/packages/export/CHANGELOG.md
- The intro answer (deck language on every run including tables and charts, RTL paragraphs with mirrored alignment, Office script fonts in `ea` and `cs`) summarises commits 633450b, 993adb2 and 1ef7fa6.
  Source: ~/Dev/presentation-skill-pack/packages/export/CHANGELOG.md
- The post quotes the `scriptFontSlots` expect lines in full (lines 128-136), then states line 137 in prose.
  Source: ~/Dev/presentation-skill-pack/packages/export/test/lang.test.ts
- `scriptFontSlots` mapping (ar → cs Arial, fa-IR → cs Arial, he → cs Arial, th → cs Tahoma, ja → ea Yu Gothic, ko → ea Malgun Gothic, zh → ea DengXian, zh-Hant → ea Microsoft JhengHei, zh-TW → ea Microsoft JhengHei); null for en, de, ru, pt-BR; English deck keeps Montserrat in cs.
  Source: ~/Dev/presentation-skill-pack/packages/export/test/lang.test.ts
- pptxgenjs silently dropped URL-encoded SVG data URIs, used by 75 of 77 example decks; now base64-encoded "before embed"; the fidelity report lists "each export warning with a kind (image, approximated, skipped, fallback) and slide number". Commit c7357ed.
  Source: ~/Dev/presentation-skill-pack/packages/export/CHANGELOG.md
- c7357ed shipped on 2026-11-23.
  Source: factory/evidence/presentation-skill-pack.txt

## Office-safe font mode

- `--font-mode office-safe` swaps theme fonts for Office fonts of the same style; first Office font in the theme stack wins, otherwise serif → Georgia, monospace → Consolas, else Arial; "so the deck looks the same on every Office install"; default `"theme"` unchanged. Commit a9a253a.
  Source: ~/Dev/presentation-skill-pack/packages/export/CHANGELOG.md

## Not measured

- No test run, output or pass count appears in the sources. The post cites test files only.
- No screenshot of the decks in PowerPoint, Keynote or Google Slides appears in the sources.
- Presenter-control strings are "machine translations pending native review".
  Source: ~/Dev/presentation-skill-pack/packages/core/CHANGELOG.md
- The sources do not say how the Studio interface strings were translated.
- Urdu is listed as RTL in HTML; PPTX tests cover Arabic, Hebrew and Persian only.
  Source: ~/Dev/presentation-skill-pack/packages/export/test/lang.test.ts
- Note for the reviewer: the backlog line said "10 interface languages, including Hebrew and Persian". locales.ts shows Hebrew and Persian are not Studio interface languages. The post corrects this.
