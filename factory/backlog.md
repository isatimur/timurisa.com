# Backlog

Format: `- [ ] slug-or-working-title | source path(s) | one-line angle`. The factory ticks a box when its PR merges.

Build stories first. Each one must come from the repo's own files: what shipped, what broke, what was measured, what is still open. No inspiration slogans. The story is the evidence.

- [x] presentation-md-ten-languages-and-right-to-left (slug: presentation-md-decks-in-any-language-and-right-to-left-pptx) | ~/Dev/presentation-skill-pack | An open-source presentation tool and its path to 10 interface languages, including Hebrew and Persian right-to-left. Use CHANGELOG.md and docs. Report what broke in PPTX export (Arabic, Hebrew, Thai, CJK fonts) and how it was fixed. Counts only from the repo.
- [ ] arouca-3d-the-second-map-from-a-written-contract | ~/Dev/arouca-3d, ~/Dev/braga-3d | How the Arouca map reused the Braga work through a written delta contract. Layers panel, loading status and retry, phones starting in Compact. Read the README and the progress log. Say what the contract did not cover.
- [ ] ai-usage-meter-read-first-then-switch-off-telemetry | ~/Dev/ai-usage-meter | A meter for AI tool usage that first reads telemetry settings, then turns switches off with a diff, a backup and a confirm. Use CHANGELOG.md and docs. Report the measured traffic only if the repo gives numbers.
- [ ] sip-a-water-tracker-with-live-activity-and-health-sync | ~/Dev/sim-pane-demo | A SwiftUI water tracker: Live Activity, Dynamic Island, Apple Health sync with edits and deletes, hydration factors per drink. Read the docs folder. Say how it is tested and what is not tested.

- [ ] what-claude-code-hooks-stopped-in-my-sessions | ~/.claude/projects (personal projects only), ~/.claude/CLAUDE.md | Which guard hooks fired, and what each one prevented. Use counts from logs only.
- [ ] pena-park-29-languages | ~/Dev/pena-park-3d | How a 3D park site ships in 29 languages, and where translation checks sit.
- [ ] life-mcp-a-tracker-agents-can-write-to | ~/Dev/life-mcp | A Cloudflare Worker and Neon Postgres MCP for workouts and meals. What the tool schema looks like.
- [ ] chip-mascot-lip-sync | ~/Dev/chip-mascot-lab | Blender shape keys, Three.js, and realtime voice: how the lips follow the audio. Check LIVE.md for open gaps.
- [ ] [research] iot-mqtt-the-protocol-behind-most-device-messages | web: MQTT specification (OASIS), broker docs | What MQTT is, topics, QoS levels 0 to 2, retained messages, last will. Use the spec for facts.
- [ ] [research] iot-matter-one-standard-for-the-smart-home | web: Connectivity Standards Alliance, Matter spec and docs | What Matter is, what it runs on, which transports it uses, and what it does not replace. Give versions.
- [ ] [research] iot-edge-or-cloud-where-the-decision-runs | web: vendor and standards docs on edge computing for devices | Latency, bandwidth, offline behaviour, and privacy as trade-offs. Mark vendor claims as vendor claims.
- [ ] [research] iot-device-security-the-minimum-list | web: OWASP IoT project, NIST IR 8259, ETSI EN 303 645 | What the three baselines ask of a device maker. Name the overlap and the differences.
- [ ] [research] iot-over-the-air-updates-without-bricking-devices | web: Uptane, Mender or RAUC docs, NIST guidance | Signed images, A/B partitions, rollback. What each source recommends.
- [ ] haru-47ms-per-frame | ~/Dev/haru | A full-duplex speech model on a laptop. Only report figures that appear in the repo.
