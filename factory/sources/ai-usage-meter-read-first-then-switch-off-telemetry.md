# Sources: ai-usage-meter-read-first-then-switch-off-telemetry

## Excerpt

- The feature started as a read-only check of telemetry switches (0d094e6). A second commit added OpenCode and Gemini CLI switches (22497a8). A later commit added the diff, backup and confirm step (72e02d1).
  Source: factory/evidence/ai-usage-meter.txt
- The privacy work is listed under `[Unreleased]`, so the excerpt says "started", not "shipped".
  Source: ~/Dev/ai-usage-meter/CHANGELOG.md

## Opening paragraph

- ai-usage-meter is at https://github.com/isatimur/ai-usage-meter.
  Source: factory/evidence/ai-usage-meter.txt
- It is a macOS menu-bar app that shows what AI coding tools cost and how much of the plan limits you have used.
  Source: ~/Dev/ai-usage-meter/README.md
- The privacy feature covers Claude Code, Codex, OpenCode and Gemini CLI.
  Source: ~/Dev/ai-usage-meter/README.md, ~/Dev/ai-usage-meter/CHANGELOG.md

## When the privacy feature landed in the repo

- 36 commits, first 2026-11-13, last 2026-11-22; five tags: v0.1.0, v0.1.1, v0.1.2, v0.1.4, v0.1.5 (no v0.1.3).
  Source: factory/evidence/ai-usage-meter.txt
- Four privacy commits on 2026-11-22, in this order oldest first: 0d094e6, 22497a8, d0f1e51, 72e02d1, with the quoted subjects. Order taken from the newest-first commit list.
  Source: factory/evidence/ai-usage-meter.txt
- The CHANGELOG lists `aium privacy`, `aium privacy --disable` and `docs/what-tools-send.md` under `[Unreleased]`.
  Source: ~/Dev/ai-usage-meter/CHANGELOG.md

## What `aium privacy` reads

- `aium privacy` command and comment "which telemetry and feedback switches are set".
  Source: ~/Dev/ai-usage-meter/README.md
- Reads process environment and local config files "and at nothing else"; reports the switches a tool ships, not what it sends.
  Source: ~/Dev/ai-usage-meter/crates/core/src/privacy.rs
- States Off, Default ("for telemetry that default is on"), On.
  Source: ~/Dev/ai-usage-meter/crates/core/src/privacy.rs
- The five Claude Code environment switches.
  Source: ~/Dev/ai-usage-meter/crates/core/src/privacy.rs
- Codex `[analytics] enabled` and `[feedback] enabled`; Gemini CLI `usageStatisticsEnabled`.
  Source: ~/Dev/ai-usage-meter/crates/core/tests/privacy_fix.rs
- Codex: the check also reads whether an `[otel]` section exists.
  Source: ~/Dev/ai-usage-meter/crates/core/src/privacy.rs (lines 188-199)
- OpenCode: the `share` config value, the `OPENCODE_DISABLE_SHARE` and `OPENCODE_AUTO_SHARE` environment switches, and `OPENCODE_DISABLE_MODELS_FETCH`.
  Source: ~/Dev/ai-usage-meter/crates/core/src/privacy.rs (lines 201-235)

## What `--disable` changes, and what it leaves alone

- `--disable` shows a diff and writes nothing; `--yes` applies, with a backup first.
  Source: ~/Dev/ai-usage-meter/README.md, ~/Dev/ai-usage-meter/crates/cli/src/main.rs
- Without `--yes`, the CLI prints the diff and then the "Dry run: nothing was written..." line (main.rs lines 111-120). With an empty plan it prints "Nothing to change: the switches I can set are already off, or the tools are not installed." and stops before the dry-run line (main.rs lines 107-110).
  Source: ~/Dev/ai-usage-meter/crates/cli/src/main.rs
- Dry-run message text.
  Source: ~/Dev/ai-usage-meter/crates/cli/src/main.rs
- The three files, the keys set, and the condition that the tool's folder exists (`.claude`, `.codex`, `.gemini`).
  Source: ~/Dev/ai-usage-meter/crates/core/src/privacy_fix.rs
- `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` is not set; test comment "the switch that also stops updates stays untouched".
  Source: ~/Dev/ai-usage-meter/crates/core/src/privacy_fix.rs, ~/Dev/ai-usage-meter/crates/core/tests/privacy_fix.rs
- "Nothing here touches a shell profile or a file outside the tools' own config."
  Source: ~/Dev/ai-usage-meter/crates/core/src/privacy_fix.rs

## How the code guards each config file

- `plan` only reads; `apply` writes; change check and error text.
  Source: ~/Dev/ai-usage-meter/crates/core/src/privacy_fix.rs
- The backup `<name>.aium-backup-<stamp>` is made only if the file exists. A new file gets no backup. Then a temporary file is written and renamed into place.
  Source: ~/Dev/ai-usage-meter/crates/core/src/privacy_fix.rs (lines 205-219)
- Key order kept, second run plans nothing, missing key inserted, inline table and invalid JSON refused and left alone.
  Source: ~/Dev/ai-usage-meter/crates/core/tests/privacy_fix.rs
- `apply` "stops at the first problem; files written before it stay written and keep their backups."
  Source: ~/Dev/ai-usage-meter/crates/core/src/privacy_fix.rs

## What one measured traffic run showed

- 72e02d1 added the measured traffic doc.
  Source: factory/evidence/ai-usage-meter.txt
- Date 2026-11-22, macOS Apple Silicon, Claude Code 2.1.330, Codex 0.170.0, one run each, the prompt, local mitmproxy, recorded fields and dropped values.
  Source: ~/Dev/ai-usage-meter/docs/what-tools-send.md
- Claude Code: 4 event batches, about 1 MB and 400 events each; 289 of 400 `tengu_skill_loaded` in the first batch; Datadog logs request.
  Source: ~/Dev/ai-usage-meter/docs/what-tools-send.md
- Codex: 6 analytics requests; metrics to `ab.chatgpt.com/otlp/v1/metrics`.
  Source: ~/Dev/ai-usage-meter/docs/what-tools-send.md

## A credential in a URL path on the first capture

- On the first attempt the script kept URL paths whole (the doc does not call the attempt a failure); one path held a credential a plugin puts in the URL; script now masks segments that are not short and plain; advice to mask from the start. The doc holds no credential value.
  Source: ~/Dev/ai-usage-meter/docs/what-tools-send.md

## Not measured

- No capture with the switches set; the doc says a second capture would test them.
  Source: ~/Dev/ai-usage-meter/docs/what-tools-send.md
- Values not recorded; `skill_name` form and backlog share unknown.
  Source: ~/Dev/ai-usage-meter/docs/what-tools-send.md
- OpenCode and Gemini CLI traffic not captured.
  Source: ~/Dev/ai-usage-meter/docs/what-tools-send.md
- One Mac, one day, one short run, one version each.
  Source: ~/Dev/ai-usage-meter/docs/what-tools-send.md
- No test results: the writer cannot run commands, and no file read shows a test run or CI result.
- Whether the privacy commits are in a tagged release: the evidence file gives no tag dates, so the post says only what the CHANGELOG says.
