# Review: pena-park-29-languages

Sources opened: content/drafts/stories/pena-park-29-languages.md, factory/sources/pena-park-29-languages.md, factory/WRITING-STANDARD.md, factory/evidence/pena-park-3d.txt, ~/Dev/pena-park-3d/README.md, src/i18n.js, src/style.css, scripts/i18n-check.mjs, scripts/i18n-extract.mjs (PROTECTED), scripts/build-public.mjs, scripts/verify.mjs, data/i18n/index.json, data/i18n/_source.en.json (_meta.keys), the `translator` line of all 27 data/i18n/<code>.json files, content/posts/archive.json.

Spot results:
- Commit 99d607b, 2026-11-22, subject and count of 1: match the evidence file.
- "Public at https://pena-park-3d.vercel.app (deployed 2026-10-31)", "Unofficial concept demo": README line 3.
- LANGS has 29 entries; AUTHORED = en, pt (i18n.js lines 7-38).
- index.json lists 27 files, es.json first, th.json last.
- _source.en.json `_meta.keys` is 281.
- K comment "so the two can never disagree" (i18n.js line 131).
- resolveLang order and fall-through (lines 55-61); matchLang zh/tw/hk/mo/hant, nb/nn, iw, pt-BR (lines 43-53).
- Manifest first, string-by-string fallback (lines 3, 70, 121-128); `lang="en"` (README line 121); `seq` counter (lines 98-107).
- dir, data-script set on html (line 113); per-script stacks, no @font-face (style.css lines 411-421).
- bidiSafe comment and LRI/PDI wrap (lines 139-141).
- FAIL / WARN rules match i18n-check.mjs header lines 26-33 and code lines 53-107; exit 1 on line 111.
- Summary line format, PASS while an extra key or wrong `_meta.lang` fails, no summary line after `continue`: lines 75-79, 85, 108 confirm.
- build-public.mjs skips names starting with "_" (line 40); verify.mjs step (i) (lines 140-146).
- 26 files read "machine (Claude), unreviewed"; es.json reads "pilot translation (agent), from _source.en.json".
- /blog/requirements-a-machine-can-check exists in archive.json.

Standard: real question in the first sentence, descriptive title, reader and payoff in the first paragraph, headings that carry the story, file or number behind each claim, no claimed run (the summary-line block is marked as source code), original finding (the summary line can read PASS while the run fails; es.json's translator field differs from the README), closing "What is not measured" section adds limits rather than restating, disclosure line present. No secrets, no client or employer claims, no copied external text.

Minor, not a problem: "the old code `iw`" adds the word "old", which no source states. It is true (iw is the withdrawn ISO 639 code for Hebrew) and changes no fact.

Checked: 70 sentences
VERDICT: PASS
