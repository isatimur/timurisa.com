# Backlog

Format: `- [ ] slug-or-working-title | source path(s) | one-line angle`. The factory ticks a box when its PR merges.

Build stories first. Each one must come from the repo's own files: what shipped, what broke, what was measured, what is still open. No inspiration slogans. The story is the evidence.

- [x] presentation-md-ten-languages-and-right-to-left (slug: presentation-md-decks-in-any-language-and-right-to-left-pptx) | ~/Dev/presentation-skill-pack | An open-source presentation tool and its path to 10 interface languages, including Hebrew and Persian right-to-left. Use CHANGELOG.md and docs. Report what broke in PPTX export (Arabic, Hebrew, Thai, CJK fonts) and how it was fixed. Counts only from the repo.
- [x] arouca-3d-delta-contract-against-braga (slug: arouca-3d-delta-contract-against-braga) | ~/Dev/arouca-3d, ~/Dev/braga-3d | How the Arouca map was forked and ported from the Braga map, and what the delta contract written afterwards covers. Check the dates in git: the fork and the port came before the contract. Layers panel, loading status and retry, phones starting in Compact. Read the README and the progress log. Say what the contract did not cover. Keep each paragraph to four sentences or fewer.
- [x] ai-usage-meter-read-first-then-switch-off-telemetry (slug: ai-usage-meter-read-first-then-switch-off-telemetry) | ~/Dev/ai-usage-meter | A meter for AI tool usage that first reads telemetry settings, then turns switches off with a diff, a backup and a confirm. Use CHANGELOG.md and docs. Report the measured traffic only if the repo gives numbers.
- [x] sip-a-water-tracker-with-live-activity-and-health-sync (slug: sip-a-water-tracker-with-live-activity-and-health-sync) | ~/Dev/sim-pane-demo | A SwiftUI water tracker: Live Activity, Dynamic Island, Apple Health sync with edits and deletes, hydration factors per drink. Read the docs folder. Say how it is tested and what is not tested.

- [ ] what-claude-code-hooks-stopped-in-my-sessions | ~/.claude/projects (personal projects only), ~/.claude/CLAUDE.md | Which guard hooks fired, and what each one prevented. Use counts from logs only.
- [x] pena-park-29-languages (slug: pena-park-29-languages) | ~/Dev/pena-park-3d | How a 3D park site ships in 29 languages, and where translation checks sit.
- [x] life-mcp-a-tracker-agents-can-write-to (slug: life-mcp-a-tracker-agents-can-write-to) | ~/Dev/life-mcp | A Cloudflare Worker and Neon Postgres MCP for workouts and meals. What the tool schema looks like.
- [!] chip-mascot-lip-sync | ~/Dev/chip-mascot-lab | PARKED 2026-11-25: the character spec says it comes from "the original Cricket art", which may be a client or brand asset. Do not pick until Timur confirms in writing that the character is his own work. Angle: Blender shape keys, Three.js, and realtime voice: how the lips follow the audio. Check LIVE.md for open gaps.
- [x] [research] iot-mqtt-topics-qos-retained-messages-and-last-will | web: MQTT specification (OASIS), broker docs | What MQTT is, topics, QoS levels 0 to 2, retained messages, last will. Use the spec for facts.
- [ ] [research] iot-matter-what-it-is-and-what-it-runs-on | web: Connectivity Standards Alliance, Matter spec and docs | What Matter is, what it runs on, which transports it uses, and what it does not replace. Give versions.
- [ ] [research] iot-edge-and-cloud-trade-offs-for-device-decisions | web: vendor and standards docs on edge computing for devices | Latency, bandwidth, offline behaviour, and privacy as trade-offs. Mark vendor claims as vendor claims.
- [ ] [research] iot-device-security-owasp-nist-and-etsi-compared | web: OWASP IoT project, NIST IR 8259, ETSI EN 303 645 | What the three baselines ask of a device maker. Name the overlap and the differences.
- [ ] [research] iot-over-the-air-update-recommendations-compared | web: Uptane, Mender or RAUC docs, NIST guidance | Signed images, A/B partitions, rollback. What each source recommends.
- [x] haru-47ms-per-frame (slug: haru-4b-frame-time-on-an-m1-max) | ~/Dev/haru | A full-duplex speech model on a laptop. Only report figures that appear in the repo.

Added by the source scan on 2026-11-26. The first unchecked item above reads `~/.claude/projects`, which is outside the allowlist; the `[research]` items belong to the research lane.

- [x] porto-3d-walk-mode-street-level-faults-and-fixes (slug: porto-3d-walk-mode-street-level-faults-and-fixes) | ~/Dev/porto-3d | Walk mode ported from braga-3d on 2026-11-24, and the street-level faults the progress log records in the next two days (freeze, terraces, start in the river, paving against ground), with before and after counts.
- [ ] portugal-3d-phone-pass-44-px-targets | ~/Dev/portugal-3d | The 2026-11-18 phone pass on the globe landing: 44 px targets, no text under 12 px, the globe first and card pictures later. Use the commits and tests; say what was measured on a phone.
- [ ] ai-engineering-book-diagram-truth-gate | ~/Dev/LifeOS/knowledge-bases/ai-engineer-book | Three diagrams said 794 videos while the corpus held 1,468 (commit ac32f1b), and a gate that "would have cried wolf on a near-tie" (1846b5b). How the gate checks numbers in figures.
- [ ] ai-engineering-book-captions-are-not-proof | ~/Dev/LifeOS/knowledge-bases/ai-engineer-book | Ingest fixes from October 2026: a rate limit recorded as "no captions", an absent subtitle file is not proof, fail fast on a blocked video. Use the commits and the ingest docs.
- [ ] porto-3d-draw-only-the-road-cells-in-view | ~/Dev/porto-3d | Perf round 3 (2026-11-17): cell-runs.js, a counting sort over grid cells, honest bounds instead of frustumCulled = false. Report only the numbers in BASELINE and the progress log.
