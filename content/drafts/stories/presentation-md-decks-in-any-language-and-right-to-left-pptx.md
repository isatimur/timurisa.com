title: How presentation-md got right-to-left decks and script fonts into PowerPoint export
slug: presentation-md-decks-in-any-language-and-right-to-left-pptx
excerpt: A deck tool learned to render Hebrew, Persian and Arabic right to left, and its PPTX export learned which fonts Office expects for Arabic, Thai and CJK text. Here is the commit timeline and what broke on the way.
category: Product engineering
category: Open source
date: 2026-11-23T19:00:00.000Z

What does a slide tool need before a deck in Hebrew or Japanese looks right in PowerPoint? In presentation-md, it needs the deck language on every run, including tables and charts, right-to-left paragraphs with mirrored alignment, and Office script fonts in the `ea` and `cs` slots. This post is for developers who export slides to `.pptx` and want to support non-Latin languages.

The post follows [presentation-md](https://github.com/isatimur/presentation-md), an open-source tool that turns Deck JSON into HTML and editable PPTX. You get the order of the changes, four problems the changelogs name, and the fixes. The facts come from the repo's changelogs, tests and git log.

## The timeline: two days in November

The repo has 704 commits between 2026-06-05 and 2026-11-23. July has 384 of them and August has 246. After 2026-08-05 the log shows no commits until 2026-11-22. The language work then ran over two days:

- 2026-11-22: [`633450b`](https://github.com/isatimur/presentation-md/commit/633450b) "decks in any language and Studio UI in 10 languages".
- 2026-11-22: [`993adb2`](https://github.com/isatimur/presentation-md/commit/993adb2) deck language on PPTX tables and charts.
- 2026-11-22: [`629f438`](https://github.com/isatimur/presentation-md/commit/629f438) presenter controls in the deck's language.
- 2026-11-23: [`d21ea8a`](https://github.com/isatimur/presentation-md/commit/d21ea8a) "prove Hebrew and Persian decks in HTML and PPTX".
- 2026-11-23: [`1ef7fa6`](https://github.com/isatimur/presentation-md/commit/1ef7fa6) Office script fonts for Arabic, Hebrew, Thai and CJK runs.

## Two kinds of language: the deck and the Studio interface

The deck language is a new optional field, `meta.lang`. It takes a BCP 47 tag and defaults to `en`. The Hebrew example deck sets these `meta` fields:

```json
"meta": {
  "title": "נווה — מצגת משקיעים",
  ...
  "theme": "fintech-clean",
  "lang": "he"
}
```

The Studio interface language is separate. `locales.ts` lists ten: English, Chinese, Spanish, Arabic, Portuguese (Brazil), Indonesian, French, Japanese, Russian and German. The file says they are "the ten most-used languages on the web".

Arabic is the only one marked `rtl`. Hebrew and Persian are deck languages, not Studio interface languages.

## What `meta.lang` changes in HTML and PPTX

Commit `633450b` made these changes:

- HTML sets `<html lang dir>`. Arabic, Hebrew, Persian and Urdu render right to left.
- Non-Latin scripts get Noto font fallbacks in the theme font stack and the Google Fonts URL.
- PPTX text runs carry the deck language. Right-to-left decks get paragraph RTL and mirrored left and right alignment.

The export tests check this in the slide XML. For `he`, `fa` and `fa-IR` they expect the language tag, `rtl="1"`, and `algn="r"` where the theme said left.

## Four things that broke, and the fixes

**Word counts were wrong.** The word-count gates counted Cyrillic, Arabic and other non-Latin words as zero. CJK text without spaces counted as one word per paragraph. Commit `633450b` counts them. The changelog says English counts are unchanged.

**Tables and charts did not carry the deck language.** Text boxes carried it, but PPTX tables and charts did not. Commit `993adb2` added `meta.lang` to them, and table cells now mirror alignment in right-to-left decks. A test builds an Arabic table and chart and checks that neither holds `lang="en-US"`.

**PowerPoint had to guess the font.** The changelog for `1ef7fa6` explains it. pptxgenjs writes the theme font into the East Asian (`ea`) and complex-script (`cs`) run slots too. Theme fonts are mostly Latin-only, "so PowerPoint had to guess a font" for Arabic, Hebrew, Persian, Thai, Chinese, Japanese and Korean text.

The fix sets those slots to the font that Office's own default theme uses for the script. The Latin slot keeps the theme font. The test pins the mapping:

```ts
expect(scriptFontSlots("ar")).toEqual({ cs: "Arial" });
expect(scriptFontSlots("fa-IR")).toEqual({ cs: "Arial" });
expect(scriptFontSlots("he")).toEqual({ cs: "Arial" });
expect(scriptFontSlots("th")).toEqual({ cs: "Tahoma" });
expect(scriptFontSlots("ja")).toEqual({ ea: "Yu Gothic" });
expect(scriptFontSlots("ko")).toEqual({ ea: "Malgun Gothic" });
expect(scriptFontSlots("zh")).toEqual({ ea: "DengXian" });
expect(scriptFontSlots("zh-Hant")).toEqual({ ea: "Microsoft JhengHei" });
expect(scriptFontSlots("zh-TW")).toEqual({ ea: "Microsoft JhengHei" });
```

For `en`, `de`, `ru` and `pt-BR` the function returns `null`. The changelog says decks in Latin-script languages are unchanged, and the English test deck keeps the theme font in the `cs` slot.

**SVG images vanished.** This one is not about language. pptxgenjs silently dropped URL-encoded SVG data URIs. The changelog says 75 of 77 example decks use them. Commit `c7357ed` base64-encodes them before embed.

The same commit adds a fidelity report that lists each export warning with a kind and a slide number.

## Office-safe mode swaps theme fonts for Office fonts

Commit `a9a253a` added a second font mode. `--font-mode office-safe` on the CLI swaps theme fonts for Office fonts of the same style. The first Office font in the theme's own stack wins. Otherwise serif goes to Georgia, monospace to Consolas, and anything else to Arial.

The changelog says this makes the deck look the same "on every Office install". The default, `"theme"`, is unchanged.

## What is not measured

- No file shows a test run, its output, or a pass count. The tests exist; their results are not in the sources.
- No file shows a screenshot of these decks opened in PowerPoint, Keynote or Google Slides.
- The presenter-control strings are "machine translations pending native review". The sources do not say who translated the Studio interface strings.
- Urdu is named as right to left in HTML, but the PPTX tests cover Arabic, Hebrew and Persian only.

To check the claims yourself, read `packages/export/test/lang.test.ts` and `packages/renderer-node/tests/render-lang.test.ts` in the repo. A related post: [the definition of done is a command](/blog/the-definition-of-done-is-a-command).

*How this post was made: an AI agent drafted it from the project files listed in the repo, a second agent reviewed it, and Timur merged it.*
