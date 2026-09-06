---
name: Timur Isachenko
description: An architectural portfolio with machined sculpture, charcoal surfaces, and warm typography.
colors:
  background: "#141615"
  paper: "#f0eee7"
  muted: "#a7aaa2"
  line: "#353833"
  accent: "#ff7b42"
  action-ink: "#181b17"
  book-stage: "#1e211e"
  project-olive: "#232821"
  project-warm: "#292727"
  project-cool: "#282c2c"
  reading-text: "#c4c8be"
  case-text: "#bfc3b9"
  code-background: "#1e231d"
  publication-olive: "#222820"
  publication-warm: "#282727"
  publication-cool: "#22282a"
  field-line: "#656b5d"
  search-line: "#666b60"
  success: "#c8d9b9"
  error: "#ffb697"
  assistant-background: "#1b1f1a"
  assistant-line: "#495140"
  assistant-user: "#ffb08a"
  assistant-code: "#131611"
  notice-background: "#20251f"
  notice-text: "#e3e6dc"
  reading-control: "#232820"
typography:
  display:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(54px, 5.8vw, 88px)"
    fontWeight: 480
    lineHeight: 1.03
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(34px, 4vw, 58px)"
    fontWeight: 450
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Geist, sans-serif"
    fontSize: "16px"
    lineHeight: 1.75
  label:
    fontFamily: "Geist, sans-serif"
    fontSize: "14px"
  page-display:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(44px, 5.7vw, 82px)"
    fontWeight: 460
    lineHeight: 1.07
    letterSpacing: "-0.04em"
  article-display:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(38px, 4.7vw, 67px)"
  collection-title:
    fontSize: "25px"
    fontWeight: 450
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  journal-title:
    fontSize: "27px"
    fontWeight: 450
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  reading-body:
    fontSize: "17px"
    lineHeight: 1.9
  reading-heading:
    fontSize: "32px"
    fontWeight: 480
    lineHeight: 1.25
  intro-body:
    fontSize: "17px"
    lineHeight: 1.8
  detail-deck:
    fontSize: "20px"
    lineHeight: 1.7
  metadata:
    fontSize: "12px"
  compact-label:
    fontSize: "11px"
  form-input:
    fontSize: "15px"
    lineHeight: 1.7
  code:
    fontFamily: "Geist Mono, monospace"
  assistant-code:
    fontFamily: "Geist Mono, monospace"
    fontSize: "11px"
    lineHeight: 1.7
rounded:
  dialog: "12px"
  tag: "4px"
  action: "5px"
  contact: "6px"
  stage: "8px"
  circle: "50%"
spacing:
  section-desktop: "100px"
  section-tablet: "75px"
  section-mobile: "58px"
components:
  button-primary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.action-ink}"
    rounded: "{rounded.action}"
    padding: "16px 22px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
  button-text:
    textColor: "{colors.paper}"
  book-stage:
    backgroundColor: "{colors.book-stage}"
    rounded: "{rounded.stage}"
    height: "330px"
---

# Design System: Timur Isachenko

## Overview

**Creative North Star: Architectural sculpture study.**

A quiet charcoal field holds warm white typography, a machined silver sculpture, and orange accents. Large, tightly spaced statements establish the hierarchy; compact metadata and hairline divisions support an engineering portfolio with room to inspect its evidence.

This document describes the approved homepage world and its implemented extension across projects, writing, books, contact, case studies, articles, legal pages, not-found states, and the portfolio assistant. Sources are `src/components/portfolio/portfolio.css`, `app/site.css`, the shared navigation/footer/artwork components, and their route consumers. The homepage composition remains intact. This is a code-derived snapshot, not a claim of browser verification.

Key characteristics:

- Dimensional artwork inside a predominantly flat editorial layout.
- Geist throughout, with restrained weights and generous section spacing.
- Orange punctuation, interaction feedback, and sculpture details.

## Colors

`background` is the charcoal canvas; `paper` carries primary text and the main action. `muted` supports descriptive copy and metadata, while `line` separates sections. `accent` marks the final hero line, headline punctuation, focus outlines, and hover feedback.

Project illustrations use olive, warm gray, and cool gray stages. Book covers sit on `book-stage`. These are illustration surfaces rather than a general card color taxonomy. Three.js has separate lit material colors: silver `0xb9bdb6`, dark metal `0x303631`, and orange `0xff6b2b`; lighting changes their rendered appearance.

Reading and case-study prose use brighter gray than compact metadata. Success is pale green and errors are pale peach. The assistant and cookie notice use their own dark surfaces and borders; these are overlay roles rather than replacements for the page canvas. Code blocks introduce Geist Mono.

## Typography

Geist comes from `var(--font-geist-sans)`, with a sans-serif fallback. The desktop display uses three unwrapped lines. At 1000px it becomes `clamp(42px, 5.8vw, 64px)`; at 640px it becomes `clamp(31px, 9.2vw, 59px)` with 1.06 line height.

Section headings use the headline token, falling to 34px on mobile. Project and book titles are generally 22px at weight 450. Hero body text is 16px with a 420px maximum width; mobile uses 14px. Supporting copy ranges from 13–15px. Metadata and book subjects use 10px; navigation and actions use 14px. The final contact invitation has its own larger `clamp(44px, 7.5vw, 96px)` treatment, becoming 48px on mobile.

## Layout

Desktop gutters are 5.5%; mobile gutters are 6%. Sections have 100px vertical padding, stepping to 75px at 1000px and 58px at 640px. Above 1600px, section width is capped at 1500px.

The desktop hero pairs a 58% text column with an absolutely positioned sculpture occupying 55% width. Its height is `calc(100svh - 100px)`, bounded by 690px and 980px. Mobile places a 360px sculpture below the text. The header is 100px, 85px on tablet, and 78px on mobile; mobile navigation expands below it.

Selected work uses `1.2fr 1fr 1fr`, books use three equal columns, and the biography uses `0.8fr 1.2fr`. At 640px these become one column. Career rows use aligned date, company, role, and disclosure columns, stacking their text on mobile. The footer and contact details also stack.

Inner pages use an 89% container capped at 1440px, becoming 88% at 700px. Their intro has 90px top and 70px bottom padding (50px/40px on mobile). Shared route layouts step at 1050px and 700px; homepage/navigation retains its 1000px/640px rules. Project collections go three → two → one column. Journal pages use a two-column grid with a full-width split featured story, then one column on mobile. Books alternate artwork and copy within a two-column publication row, stacking on mobile.

Case studies pair a 230px sticky navigation column with up to 800px content; articles pair a 220px contents rail with up to 750px text inside a 1160px container. Both rails become static above the body at 700px. Legal pages cap at 850px. Contact uses a 0.8fr/1.2fr split, then a single column with stacked form fields. The assistant caps at 650px wide and viewport height minus 40px.

## Elevation & Depth

Page surfaces stay flat, separated by tonal changes and one-pixel rules. Depth belongs to artwork: stacked plates, waveform bars, extruded architectural forms, tilted book covers, and the live sculpture. Book covers use `17px 21px 24px #0007`; billing plates use `8px 12px 25px #0003`. Avoid applying these illustration shadows to ordinary content containers.

The expanded publication cover uses `22px 30px 30px #0006`. Overlays are the deliberate UI elevation exception: cookie notice `0 8px 24px #0004`, assistant dialog `0 24px 70px #0007`.

## Shapes

Small radii distinguish roles: 4px tags, 5px primary actions, 6px outlined contact actions, and 8px image stages and portrait. Sculpture controls and project arrow badges are circular. The signature geometry is the open ring around a faceted core, echoed by layered or extruded project artwork.

## Components

**Actions:** the main action pairs a pale fill with dark text and an arrow. Hover turns it orange and raises it 2px over 0.2s. Text actions change to orange. The contact navigation action has a thin outline and inverts to paper on hover. Interactive elements receive a 2px orange focus outline with a 6px offset.

**Navigation:** a lowercase `ti.` wordmark anchors a compact link row and outlined contact action. Mobile replaces the link row with a labeled menu toggle; the expanded menu uses the book-stage surface.

**Projects and books:** the full item is a link. Artwork sits above metadata and copy, without an enclosing card border. Project tags are small outlined labels, not controls. Project arrows fill orange on hover; book covers rotate back to a frontal view.

**Disclosures:** native `details` and `summary` reveal experience and credentials. Thin rules establish the rows; the plus icon rotates 45 degrees when open.

**Interactive sculpture:** lazy-loaded Three.js renders 23 machined rings, a faceted orange core, and an orbit with nodes. Drag or arrow keys rotate it; labeled controls pause/play and reset. Reduced-motion preference starts it paused and disables CSS transitions. Rendering stops when hidden or outside the viewport. A CSS ring preview remains if WebGL fails, and controls stay disabled until ready. This artwork is illustrative, not a live system diagram.

**Collection tools:** category buttons are 5px-radius outlined controls with 10px/14px padding; `aria-pressed="true"` uses paper fill and dark text. Search is an underline field with an orange focus-within border, a labeled input, and a conditional clear action. Result counts are status text; empty results offer a reset.

**Forms:** contact fields use transparent backgrounds, square corners, and a bottom border that becomes orange on focus. Labels are 14px; inputs are 15px desktop and 16px mobile. Submission feedback uses separate success/error colors. The mobile submit action spans the available width.

**Reading:** prose is 17px/1.9, falling to 16px mobile; links and blockquote rules are orange. Code panels scroll horizontally. A 2px fixed progress line and 42px circular share/back/top actions support article navigation. Share feedback is a compact status overlay.

**Shared shell:** route navigation highlights the current section in orange, including nested detail pages. Legal and not-found pages reuse the same navigation, footer, palette, and type hierarchy. Cookie notice uses a bordered dark surface, pale action, and dismiss control.

**Portfolio assistant:** a 12px-radius dark dialog contains a 32px heading (27px mobile), outlined suggestion buttons, a scrollable text log, and a 16px question composer. User messages are peach; code is monospace on a darker inset. Focus uses a 2px orange outline with 3px offset. Disabled send/suggestion controls use 0.45 opacity. Its description identifies a curated knowledge base.

## Do's and Don'ts

- Do reuse `.portfolio`, `.site-shell`, and shared navigation/footer components while preserving route destinations.
- Do use orange for a deliberate emphasis or state, keeping descriptive copy muted.
- Do retain keyboard focus, reduced motion, and the sculpture fallback.
- Do keep dimensional treatment concentrated in artwork and covers.
- Don't treat project illustrations as screenshots or operational evidence.
- Don't flatten the distinct collection, reading, contact, and homepage layouts into a uniform card grid.
- Do use the established underline field treatment for search and contact, and the compact composer treatment inside the assistant.
