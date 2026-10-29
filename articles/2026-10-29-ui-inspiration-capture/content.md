# UI Inspiration Capture: 2026-10-29

Date: 2026-10-29

**Pattern summary.** Five live product sites, five answers to the same problem: how to show a developer or productivity tool without drowning the first viewport. Linear, Resend and Framer keep a black canvas and let one object (a cropped app window, a faceted cube, a looping stage) carry the hero. Raycast replaces the product shot with atmosphere, a diagonal red light field. Cursor flips to a warm paper page with a layered mock. Across all five: one strong headline, very few colors, motion that reveals the product, and a long page built from distinct, full-width sections.

Capture method: headless Chromium driven by Playwright at 1440x900, with local video, a full-page screenshot per site, and section crops cut from that screenshot. This run used Playwright instead of the Codex in-app browser. No stitched motion-study video was made.

## 1. Linear: The product development system for teams and agents

Source: https://linear.app

![Linear hero still](linear/still.png)

<video src="linear/motion.mp4" controls muted loop playsinline width="720"></video>

### Full-Page And Section Evidence

![Linear full page](linear/full-page.png)

#### Section Crops

![Linear section-01-hero](linear/sections/section-01-hero.png)

![Linear section-02](linear/sections/section-02.png)

![Linear section-03](linear/sections/section-03.png)

![Linear section-04](linear/sections/section-04.png)

![Linear section-05](linear/sections/section-05.png)

![Linear section-06](linear/sections/section-06.png)

![Linear section-07](linear/sections/section-07.png)

![Linear section-08-footer](linear/sections/section-08-footer.png)

### Motion Progression

![Linear Opening hero](linear/motion-frames/01-hero-open.png)

![Linear Hover or settled state](linear/motion-frames/02-hover-settled.png)

![Linear Scroll transition](linear/motion-frames/03-scroll-transition.png)

![Linear Later section](linear/motion-frames/04-later-section.png)

![Linear Return to top](linear/motion-frames/05-return.png)

### What Works

A near-empty dark hero that lets one 64px-class headline and a cropped product window carry the page. The app UI sits half below the fold, so scrolling feels like pulling the product up into view.

**Visual pattern.** Dark, near-black canvas. Left-aligned two-line headline in Inter Variable, a single muted sentence, a tiny "New / Loops" link on the right, then a full-width product window that bleeds off the fold. Each later section pairs a short heading with a framed product visual.

**Interaction notes.** Sticky transparent nav with a white pill "Sign up" button. Pastel testimonial cards (lavender, acid yellow) break the dark rhythm mid-page.

**Motion notes.** The hero starts empty and fades the headline and mock in over about a second. After a few seconds the product window gains a floating agent panel on top of the issue view. On scroll, three outlined isometric icons (Purpose-built, Powered by agents, Designed for speed) fade in under a large grey statement line.

**Capture note.** Cookie or consent UI did not appear in the capture.

### AI Builder Prompt

```text
Build a landing page for a developer product, using Linear's landing page as a reference for structure and restraint, not as a template to copy.

Canvas and type: near-black background (#08090a range), off-white text, one variable sans (Inter Variable or similar). Hero headline is two lines, left-aligned, about 64px at 1440 wide, tight tracking (-0.03em), line-height 1.02. One supporting sentence in muted grey (60% white), 18px. Put one small "New: <feature> →" link at the far right of the same row.

Hero layout: nav is 72px tall, transparent with a 1px bottom border at 8% white. Headline starts about 200px below the nav. Below the copy, place a full-width product window (1320px max, 12px radius, 1px border at 10% white, inner panel 4% white). Let the window run past the fold by roughly 40% of its height so scrolling reveals it.

Sections after the hero: a short grey statement line (about 40px, 50% white) with three outlined line-art isometric icons under it, each with a one-line caption. Then four feature sections, each with a two-word eyebrow, a heading, a paragraph, and a framed UI visual. Insert one band of pastel testimonial cards (lavender and acid yellow, 24px radius, large quote in 28px, small avatar and role at the bottom). End with a quiet closing CTA and a multi-column footer.

Motion: on load, fade the headline and window in with a 12px upward translate, 700ms, cubic-bezier(0.2, 0.7, 0.2, 1), staggered 120ms. After 3s, animate a small floating agent panel into the product window (scale 0.96 to 1, 400ms). On scroll, reveal sections with opacity and 16px translate once, never replay. Respect prefers-reduced-motion by removing translate and shortening fades to 150ms.

Responsive: below 900px stack hero copy and drop the right-hand "New" link under the subtitle. Product window becomes full-bleed with 0 radius. Collapse the nav into a menu button.

Avoid: gradients behind the headline, glowing borders, stock photography, more than one accent color, and any invented customer logos or metrics. Use placeholder product names and original copy.
```

**Why this prompt works.** It names concrete values (sizes, colors, timings, breakpoints) and lists what to avoid, so a builder can make original design decisions instead of cloning the source.

## 2. Resend: Email for developers

Source: https://resend.com

![Resend hero still](resend/still.png)

<video src="resend/motion.mp4" controls muted loop playsinline width="720"></video>

### Full-Page And Section Evidence

![Resend full page](resend/full-page.png)

#### Section Crops

![Resend section-01-hero](resend/sections/section-01-hero.png)

![Resend section-02](resend/sections/section-02.png)

![Resend section-03](resend/sections/section-03.png)

![Resend section-04](resend/sections/section-04.png)

![Resend section-05](resend/sections/section-05.png)

![Resend section-06](resend/sections/section-06.png)

![Resend section-07](resend/sections/section-07.png)

![Resend section-08](resend/sections/section-08.png)

![Resend section-09](resend/sections/section-09.png)

![Resend section-10](resend/sections/section-10.png)

![Resend section-11](resend/sections/section-11.png)

![Resend section-12-footer](resend/sections/section-12-footer.png)

### Motion Progression

![Resend Opening hero](resend/motion-frames/01-hero-open.png)

![Resend Hover or settled state](resend/motion-frames/02-hover-settled.png)

![Resend Scroll transition](resend/motion-frames/03-scroll-transition.png)

![Resend Later section](resend/motion-frames/04-later-section.png)

![Resend Return to top](resend/motion-frames/05-return.png)

### What Works

A serif display headline on a black field is rare in developer tools and gives the brand a voice. A single dark 3D object stands in for the product without any screenshots in the first viewport.

**Visual pattern.** Black page with soft light sweeps. Display serif (Domaine) headline over Inter body, left-aligned, with a dark faceted cube on the right. Sections move through integrations, code samples, an editor, React templates, deliverability and a closing CTA.

**Interaction notes.** Sticky nav with a blurred dark backdrop and dropdown menus. A row of language icons (Node.js, Serverless, Ruby, Python, PHP, CLI, Go, Rust, Java, Elixir, .NET, REST, SMTP) sits above a code sample with framework sub-tabs (Next.js, Remix, Nuxt and others). The capture did not click through them.

**Motion notes.** The page opens on a brief white flash, then settles to black. The cube appears at the right after the headline is already readable. Section headings and code panels fade in as they enter the viewport.

**Capture note.** The first video frame is a white load flash, which is a loading artifact, not a design choice to copy.

### AI Builder Prompt

```text
Design a developer-tool landing page inspired by Resend's dark, serif-led hero. Treat it as reference, not a template.

Typography: pair a high-contrast display serif for headlines (Domaine, Canela, or Instrument Serif as a free option) with Inter for body and UI. Hero headline is two lines, about 88px at 1440, line-height 0.98, tight tracking, with a subtle white-to-grey vertical gradient fill. Body copy is 18px at 65% white.

Hero: pure black background with two very soft diagonal light sweeps (radial gradients at 6 to 10% white, blurred 80px). Left column: a small pill link with a thin multicolor border, the headline, two lines of subtext, then a primary button (dark grey fill, 1px border, 12px radius) and a ghost "Documentation" link. Right column: a single dark, faceted 3D object (render or WebGL cube) tilted about 20 degrees, lit from the top right, partly lost in shadow. Keep the object low contrast so the headline wins.

Sections in order: an "Integrate tonight" row of 13 icon buttons that switch a code panel; a "developer experience" intro with two small UI cards; an editor feature section; a React-templates section with a split code and preview; a deliverability section; a control and analytics section; a closing CTA; a footer. Code panels use a 1px border at 10% white, 16px radius, JetBrains Mono at 13px, muted syntax colors.

Motion: nav blurs on scroll (backdrop-filter 12px). On load, fade the headline in over 800ms, then ease the 3D object in from 40px to the right over 1200ms. Code panels fade in with 12px upward travel when 20% visible. Icon row selection slides a 2px underline between items in 200ms. No white flash: set the page background to black in the HTML head.

Responsive: below 960px stack the hero, put the object behind the headline at 40% opacity, and let the icon row scroll horizontally with snap.

Avoid: neon accents, glassmorphism cards everywhere, stock illustrations, fake customer logos, and animated gradients that compete with the 3D object.
```

**Why this prompt works.** It names concrete values (sizes, colors, timings, breakpoints) and lists what to avoid, so a builder can make original design decisions instead of cloning the source.

## 3. Raycast: Your shortcut to everything

Source: https://www.raycast.com

![Raycast hero still](raycast/still.png)

<video src="raycast/motion.mp4" controls muted loop playsinline width="720"></video>

### Full-Page And Section Evidence

![Raycast full page](raycast/full-page.png)

#### Section Crops

![Raycast section-01-hero](raycast/sections/section-01-hero.png)

![Raycast section-02](raycast/sections/section-02.png)

![Raycast section-03](raycast/sections/section-03.png)

![Raycast section-04](raycast/sections/section-04.png)

![Raycast section-05](raycast/sections/section-05.png)

![Raycast section-06](raycast/sections/section-06.png)

![Raycast section-07](raycast/sections/section-07.png)

![Raycast section-08](raycast/sections/section-08.png)

![Raycast section-09](raycast/sections/section-09.png)

![Raycast section-10](raycast/sections/section-10.png)

![Raycast section-11](raycast/sections/section-11.png)

![Raycast section-12-footer](raycast/sections/section-12-footer.png)

### Motion Progression

![Raycast Opening hero](raycast/motion-frames/01-hero-open.png)

![Raycast Hover or settled state](raycast/motion-frames/02-hover-settled.png)

![Raycast Scroll transition](raycast/motion-frames/03-scroll-transition.png)

![Raycast Later section](raycast/motion-frames/04-later-section.png)

![Raycast Return to top](raycast/motion-frames/05-return.png)

### What Works

The hero is nearly all atmosphere: diagonal red light bands behind a centered headline. It signals speed and heat without a single UI screenshot, and the floating pill nav keeps the page feeling like an app.

**Visual pattern.** Centered composition on a deep charcoal background (rgb 7, 8, 10). 64px Inter headline, two-line subhead, a white download button and tiny monospace install hints. Twelve tall sections follow, each with a distinct visual world (keyboard, extension reel, AI bento, testimonials, grid, closing image).

**Interaction notes.** Floating rounded nav pill with a white "Download" button. Install via Homebrew and Download V1 links in monospace under the hero button. A small outlined "The Raycast Keyboard" pill leads into the next section.

**Motion notes.** The hero background fades in from nothing: the diagonal stripes appear pale pink, then deepen to saturated red over a few seconds, and the hero text scrolls over them. The headline uses a fade-in-up on load. On scroll the stripes slide away and a large "Take shortcuts, not detours." line appears centered on black.

**Capture note.** The full video is longer than the others because the page is heavy and scrolled slowly in headless capture.

### AI Builder Prompt

```text
Create a product landing page for a keyboard-driven desktop tool, taking cues from Raycast's atmospheric hero. Use it as reference only.

Canvas: deep charcoal (#07080a). White text. Inter throughout, 64px semibold centered headline (two lines, tight tracking), 17px subhead at 90% white with a max width of 480px.

Hero: full-bleed animated background of 6 to 8 wide diagonal bands at about 35 degrees, soft-blurred edges with grain, color range crimson to pink with a few steel-blue edge lines. Bands sit behind the text, and text keeps a very soft shadow for legibility. Below the subhead, a white pill button "Download for Mac" with an Apple icon, then two tiny monospace lines in 50% white: system requirement and "Install via Homebrew | Download V1".

Nav: a floating rounded rectangle (16px radius, 1px border at 8% white, 70% black fill, backdrop blur) inset 120px from each side, with logo left, links centered, a white Download button right. It stays fixed on scroll.

Page rhythm: twelve sections, each full-width with its own composition: a centered statement line, a horizontally scrolling reel of extension cards, a bento grid for AI features (one large cell, four small), a testimonial strip, a dense icon grid, a big closing image with a CTA, then the footer. Alternate dark with one slightly lighter band (#0d0e11) so the scroll has rhythm.

Motion: on load, fade the headline up 16px over 700ms. Stripes fade from 0 to full over 2.5s and shift hue from pale pink to crimson while drifting 20px diagonally on a 12s loop. On scroll, stripes parallax at 0.6x speed and fade out by the end of the hero. Sections reveal once with opacity and 20px translate. The extension reel auto-scrolls and pauses on hover.

Responsive: below 900px reduce the headline to 40px, hide nav links behind a menu button, and shrink the stripes to 4 bands. Provide a static stripe image for prefers-reduced-motion.

Avoid: more than one hue family in the hero, text over busy areas without a shadow, stock photos, and any copied Raycast copy or logos.
```

**Why this prompt works.** It names concrete values (sizes, colors, timings, breakpoints) and lists what to avoid, so a builder can make original design decisions instead of cloning the source.

## 4. Cursor: Your coding agent for building ambitious software

Source: https://cursor.com

![Cursor (Anysphere) hero still](cursor/still.png)

<video src="cursor/motion.mp4" controls muted loop playsinline width="720"></video>

### Full-Page And Section Evidence

![Cursor (Anysphere) full page](cursor/full-page.png)

#### Section Crops

![Cursor (Anysphere) section-01-hero](cursor/sections/section-01-hero.png)

![Cursor (Anysphere) section-02](cursor/sections/section-02.png)

![Cursor (Anysphere) section-03](cursor/sections/section-03.png)

![Cursor (Anysphere) section-04](cursor/sections/section-04.png)

![Cursor (Anysphere) section-05](cursor/sections/section-05.png)

![Cursor (Anysphere) section-06](cursor/sections/section-06.png)

![Cursor (Anysphere) section-07](cursor/sections/section-07.png)

![Cursor (Anysphere) section-08](cursor/sections/section-08.png)

![Cursor (Anysphere) section-09](cursor/sections/section-09.png)

![Cursor (Anysphere) section-10](cursor/sections/section-10.png)

![Cursor (Anysphere) section-11](cursor/sections/section-11.png)

![Cursor (Anysphere) section-12-footer](cursor/sections/section-12-footer.png)

### Motion Progression

![Cursor (Anysphere) Opening hero](cursor/motion-frames/01-hero-open.png)

![Cursor (Anysphere) Hover or settled state](cursor/motion-frames/02-hover-settled.png)

![Cursor (Anysphere) Scroll transition](cursor/motion-frames/03-scroll-transition.png)

![Cursor (Anysphere) Later section](cursor/motion-frames/04-later-section.png)

![Cursor (Anysphere) Return to top](cursor/motion-frames/05-return.png)

### What Works

It breaks the dark-mode default of developer tools. A warm off-white page, a muted oil-painting backdrop and a layered product mock (desktop app plus CLI window) make the product look calm and tangible.

**Visual pattern.** Warm paper background, small left-aligned headline (about 28px) in CursorGothic, a dark primary button and a light secondary one. A wide painted-landscape panel holds overlapping app and CLI windows. Below: logo trust row, autonomy and tooling sections, a research-team block with a photograph, changelog, highlights, closing CTA, footer.

**Interaction notes.** Hovering the mock highlights an element in the live preview and shows a small tag (for example "InitialParagraph · span"). Sticky light nav with a dark Download pill and an outlined Contact sales pill. A cookie banner overlaps the lower right of the hero.

**Motion notes.** The product mock auto-plays: the left task list changes state, the chat shows a build in progress, and the window swaps to a "Mission Control" planning screen after several seconds. The CLI window overlaps from the lower right and scrolls its own text. Later sections reveal a blurred-focus photograph.

**Capture note.** The cookie banner overlaps the hero in the still and several motion frames; it is site chrome, not part of the design reference.

### AI Builder Prompt

```text
Design a landing page for an AI coding agent that feels calm and editorial, using Cursor's light-mode hero as a reference, not a template.

Palette: warm off-white page (#f7f7f4), near-black text (#26251e), a dark charcoal primary button, a light grey secondary button. One muted painterly image (soft landscape, low contrast) used only as a backdrop panel.

Type: a geometric grotesque (Inter Tight, or a custom face if available). Hero headline is small and confident: 28px, two lines, left-aligned, medium weight. Do not make it huge; the mock does the talking.

Hero layout: nav 52px with logo left, five links centered, "Sign in", an outlined "Contact sales" pill and a dark "Download" pill on the right. Headline starts 130px from the top. Under it, two buttons: "Download for macOS" (dark, with download icon) and "Request a demo" (light grey). Below, a 1300px wide, 16:7 panel with the painted backdrop and a centered 1080px app window (white, 10px radius, soft shadow) with three columns: task list, agent chat, live preview. Overlap a smaller CLI window (dark text on white) at the lower right.

Further sections: a quiet row of customer-logo placeholders; a "works autonomously" section with a cropped product visual; a tools-integration section; a team-and-research block with a blurred-focus photograph (use your own image) and a text link; a changelog list with dates; a three-card "Recent highlights" row; a closing "Try it now" CTA; footer.

Motion: the app window cycles between two states every 8s (a build-landing-page task, then a planning screen) with a 300ms cross-fade and 8px slide. Hovering an element in the preview draws a 1px blue outline and a small blue tag. The CLI window types text lines at 40 characters per second, looping. On scroll, sections fade in once. Use a single easing: cubic-bezier(0.25, 0.1, 0.25, 1).

Responsive: below 900px hide the CLI window, stack the three columns into a single tabbed view, and make the backdrop panel full-bleed.

Avoid: dark mode, neon glows, gradients over the headline, busy backgrounds, fake benchmarks, and any copied copy or logos. Keep consent UI out of the design frame.
```

**Why this prompt works.** It names concrete values (sizes, colors, timings, breakpoints) and lists what to avoid, so a builder can make original design decisions instead of cloning the source.

## 5. Framer: The pro website builder with a world-class design agent

Source: https://www.framer.com

![Framer hero still](framer/still.png)

<video src="framer/motion.mp4" controls muted loop playsinline width="720"></video>

### Full-Page And Section Evidence

![Framer full page](framer/full-page.png)

#### Section Crops

![Framer section-01-hero](framer/sections/section-01-hero.png)

![Framer section-02](framer/sections/section-02.png)

![Framer section-03](framer/sections/section-03.png)

![Framer section-04](framer/sections/section-04.png)

![Framer section-05](framer/sections/section-05.png)

![Framer section-06](framer/sections/section-06.png)

![Framer section-07](framer/sections/section-07.png)

![Framer section-08](framer/sections/section-08.png)

![Framer section-09-footer](framer/sections/section-09-footer.png)

### Motion Progression

![Framer Opening hero](framer/motion-frames/01-hero-open.png)

![Framer Hover or settled state](framer/motion-frames/02-hover-settled.png)

![Framer Scroll transition](framer/motion-frames/03-scroll-transition.png)

![Framer Later section](framer/motion-frames/04-later-section.png)

![Framer Return to top](framer/motion-frames/05-return.png)

### What Works

The hero is one large rounded stage that plays short product vignettes, so a visitor sees a prompt, generated code, a 3D canvas and a CMS in the first scroll. The product is the proof.

**Visual pattern.** Black page, GT Walsheim Medium headline (about 56px) left-aligned with a white "Get started for free" button and a dark "Download app" button. A bordered 1200px stage with a blue glow cycles through demos. Below: customer-site strips, platform feature sections, a "shipped with Framer" showcase, trust logos, community section and a footer.

**Interaction notes.** Sticky nav with dropdowns (Platform, Solutions, Resources) and a white "Sign up" pill. The stage shows typed prompts, a code card (ImageWheel.tsx), an interactive point-sphere and a CMS table with people cards. A "New: Framer MCP →" link sits at the right edge of the CTA row.

**Motion notes.** The stage cycles through scenes: an empty "Ask Framer…" input with a glowing blue border, a prompt typed letter by letter ("ask black homep|"), a purple-bordered canvas with an animated point sphere, then a CMS grid with a blue frame. Customer-site cards slide horizontally in a strip.

**Capture note.** A cookie banner overlaps the lower left of the hero in the still and several frames; it is site chrome, not part of the reference.

### AI Builder Prompt

```text
Build a website-builder landing page where the hero is a looping product stage. Use Framer's page as reference for the idea, not a template.

Palette: pure black page, white text, one electric blue (#0055ff to #1a6bff) used only for glow and focus rings. Headline in a humanist grotesque (GT Walsheim, or Inter Display), 56px, medium weight, two lines, left-aligned, max 760px. Subhead at 18px in 60% white.

Hero layout: nav 64px with logo, three dropdowns, Enterprise, Pricing on the left; "Log in" in grey and a white "Sign up" pill on the right. Under the subhead, a white "Get started for free" button (8px radius) and a dark grey "Download app" button; a small "New: <feature> →" link at the far right of that row. Below, a 1200px wide stage with a 1px border at 8% white, 20px radius, black fill, and an inner blue glow (box-shadow 0 0 80px rgba(0,85,255,0.35)).

Stage scenes (each about 4s): 1) a rounded input "Ask <product>…" with a glowing blue border and a model selector; 2) the same input typing a prompt letter by letter at 12 characters per second, with a block cursor; 3) a code card with a filename tab and syntax-highlighted TypeScript; 4) a purple-bordered canvas with an animated 3D point sphere; 5) a CMS table beside three people cards in a blue frame. Cross-fade scenes in 400ms. Pause the loop when the tab is hidden.

Below the hero: a horizontally sliding strip of customer-site screenshots (use your own mock sites), a platform section with four feature rows, a "shipped with" showcase grid, a quiet logo row, a community block, a closing CTA, and a footer.

Motion: the stage border glow pulses between 25% and 40% opacity over 3s. Strips scroll at 30px per second and pause on hover. Sections reveal once on scroll with 16px upward travel. Respect prefers-reduced-motion by showing only the first scene.

Responsive: below 900px make the stage full-bleed with 12px radius, show scenes 1 to 3 only, and stack the CTA row.

Avoid: multiple accent colors, drop shadows on text, stock photography, fake logos or numbers, and copied product copy.
```

**Why this prompt works.** It names concrete values (sizes, colors, timings, breakpoints) and lists what to avoid, so a builder can make original design decisions instead of cloning the source.

