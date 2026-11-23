# Review: presentation-md-decks-in-any-language-and-right-to-left-pptx

Sources opened: factory/evidence/presentation-skill-pack.txt, packages/export/CHANGELOG.md (1.25.0–1.28.0), packages/export/test/lang.test.ts (lines 47–167), packages/renderer-node/tests/render-lang.test.ts, packages/studio/src/i18n/locales.ts, packages/core/CHANGELOG.md (629f438, 996a146, a337a54), examples/decks/rtl-hebrew-pitch.json (lines 1–12), LICENSE, root CHANGELOG.md line 37, content/posts/archive.json (internal link target exists).

Spot checks that held:
- 704 commits, 2026-06-05 to 2026-11-23; 384 in July, 246 in August; no September or October rows; last August commit 2026-08-05, next 2026-11-22. All match the evidence file.
- Hashes, dates and subjects for 633450b, 993adb2, 629f438, d21ea8a, 1ef7fa6, c7357ed and a9a253a match the evidence file. The quoted subject fragments are exact.
- `meta.lang` is BCP 47 with default `en`. HTML sets `<html lang dir>`. Arabic, Hebrew, Persian and Urdu are RTL. The Noto fallbacks and RTL paragraphs match export CHANGELOG 633450b.
- Word counts: "previously zero" for Cyrillic and Arabic, one word per paragraph for CJK, "English counts are unchanged". All match.
- Tables and charts carry `meta.lang` "like text boxes already did". Table cells mirror alignment. The Arabic table and chart test checks no `lang="en-US"` (test lines 81–114).
- The `scriptFontSlots` block matches test lines 128–136 word for word. The null list for en, de, ru and pt-BR matches line 137. The English deck keeps Montserrat in `cs` (line 167).
- The `he`, `fa` and `fa-IR` tests expect the lang tag, `rtl="1"`, `algn="r"` and no `algn="l"` (lines 54–72).
- SVG: 75 of 77 example decks, silently dropped, base64-encoded before embed. The fidelity report lists kind and slide number (c7357ed).
- Office-safe mode: the CLI flag, the first Office font in the theme stack, and the Georgia, Consolas and Arial fallbacks all match a9a253a. The quote "on every Office install" is exact, and the `"theme"` default is unchanged.
- locales.ts has ten locales in the order the post gives and the "ten most-used languages on the web" quote. Only `ar` is `rtl`. Hebrew and Persian are absent.
- "machine translations pending native review" is exact (core CHANGELOG 629f438).
- The Hebrew deck `meta` excerpt matches lines 3–9. The `...` marks the cut `company` and `description` keys.
- MIT license confirmed. The repo turns Deck JSON into editable `.pptx` (root CHANGELOG line 37). HTML output confirmed by `<html lang dir>`.

Writing standard: the post asks a real question in its first sentence and answers it in the first paragraph. It also names the reader and what they get. The title is descriptive. The headings carry the story. Each claim has a commit, test line or changelog entry behind it. The "What is not measured" section states the gaps and claims no run. The timeline from the evidence file plus the repo's account of four failures counts as original. The closing disclosure line is present. The closing section does not restate the article. The post copies no external text and names no client or employer. I found nothing that looks like a secret.

Checked: 70 sentences
VERDICT: PASS
