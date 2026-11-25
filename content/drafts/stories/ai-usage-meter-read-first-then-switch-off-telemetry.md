title: How ai-usage-meter reads AI tool telemetry switches, then turns them off with a diff and a backup
slug: ai-usage-meter-read-first-then-switch-off-telemetry
excerpt: The privacy feature in ai-usage-meter started as a read-only check of telemetry switches for Claude Code and Codex. A second commit added OpenCode and Gemini CLI, and a later commit added a dry-run diff, a backup and a confirm step. Here is what it changes, how it guards config files, and what one measured traffic run showed.
category: AI engineering
category: Developer workflow
date: 2026-11-24T20:00:00.000Z

Which telemetry switches are on for your AI coding tools, and how do you turn them off without damaging their config files? This post is for developers who use Claude Code, Codex, OpenCode or Gemini CLI. It follows the privacy feature of [ai-usage-meter](https://github.com/isatimur/ai-usage-meter), a macOS menu-bar app that shows what AI coding tools cost and how much of a plan limit you have used. You get the commands, the exact switches they change, the guards around each file write, and the results of one measured traffic run.

## When the privacy feature landed in the repo

The repo has 36 commits, from 2026-11-13 to 2026-11-22, and five tags: `v0.1.0`, `v0.1.1`, `v0.1.2`, `v0.1.4` and `v0.1.5`. The privacy work is four commits on 2026-11-22. Oldest first:

- [`0d094e6`](https://github.com/isatimur/ai-usage-meter/commit/0d094e6): "aium privacy, a read-only check of telemetry and feedback switches".
- [`22497a8`](https://github.com/isatimur/ai-usage-meter/commit/22497a8): "OpenCode and Gemini CLI switches".
- [`d0f1e51`](https://github.com/isatimur/ai-usage-meter/commit/d0f1e51): "Privacy section in Settings, backed by aium_privacy".
- [`72e02d1`](https://github.com/isatimur/ai-usage-meter/commit/72e02d1): "turn off telemetry switches with diff, backup and confirm; measured traffic doc".

The CHANGELOG lists the check, the `--disable` option and the traffic doc under `[Unreleased]`.

## What `aium privacy` reads

```sh
aium privacy                         # which telemetry and feedback switches are set
```

The check looks at the process environment and local config files, "and at nothing else". It reports the switches a tool ships, not what the tool sends. Each switch is `Off`, `Default` (not set, and "for telemetry that default is on") or `On`.

For Claude Code, it checks five environment switches: `DISABLE_TELEMETRY`, `DISABLE_ERROR_REPORTING`, `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`, `CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY` and `CLAUDE_CODE_ENABLE_TELEMETRY`. For Codex, it reads `enabled` under `[analytics]` and `[feedback]`, and whether an `[otel]` section exists. For OpenCode, it reads the `share` setting, the `OPENCODE_DISABLE_SHARE` and `OPENCODE_AUTO_SHARE` environment switches, and `OPENCODE_DISABLE_MODELS_FETCH`. For Gemini CLI, it reads `usageStatisticsEnabled`.

## What `--disable` changes, and what it leaves alone

```sh
aium privacy --disable               # show the diff, write nothing
aium privacy --disable --yes         # back up each file, then write
```

Without `--yes`, the CLI prints the diff and then: "Dry run: nothing was written. Run again with --yes to apply. Each file gets a backup first." When there is nothing to change, it prints this line instead: "Nothing to change: the switches I can set are already off, or the tools are not installed."

`--disable` covers three files, and only when the tool's folder exists:

- `~/.claude/settings.json`: sets `DISABLE_TELEMETRY`, `DISABLE_ERROR_REPORTING` and `CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY` to `"1"` under `env`.
- `~/.codex/config.toml`: sets `enabled = false` under `[analytics]` and `[feedback]`.
- `~/.gemini/settings.json`: sets `usageStatisticsEnabled` to `false`.

It does not set `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`. A test comment gives the reason: "the switch that also stops updates stays untouched". The module also says: "Nothing here touches a shell profile or a file outside the tools' own config."

## How the code guards each config file

`plan` only reads. `apply` writes. Before each write, `apply` checks that the file did not change since the plan. If it did, the run stops with "changed since the plan was made. Nothing was written to it. Run again." If the file exists, it copies it to `<name>.aium-backup-<stamp>`. Then it writes the new text to a temporary file and renames that file into place.

The tests in `crates/core/tests/privacy_fix.rs` pin down more cases:

- Other keys in Claude settings keep their order and values.
- A second run plans no changes.
- Codex `[analytics]` with no `enabled` key gets the key inserted.
- An inline table such as `analytics = { enabled = true }`, or a settings file that is not valid JSON, is refused and left as it was.

One limit is in the code comments. `apply` "stops at the first problem; files written before it stay written and keep their backups."

## What one measured traffic run showed

The commit that added `--disable` also added [docs/what-tools-send.md](https://github.com/isatimur/ai-usage-meter/blob/main/docs/what-tools-send.md). On 2026-11-22, on one Apple Silicon Mac, Claude Code 2.1.330 and Codex 0.170.0 each ran once with the prompt "Reply with the single word ok.". Traffic went through a local mitmproxy. The proxy recorded hosts, paths, header names and JSON key names, not values.

Claude Code sent `POST /api/event_logging/v2/batch` 4 times, at about 1 MB and 400 events each. In the first batch, 289 of 400 events were `tengu_skill_loaded`. The doc also lists a `POST` to `http-intake.logs.us5.datadoghq.com`, described as "Logs sent to Datadog".

Codex sent `POST /backend-api/codex/analytics-events/events` 6 times. It also sent metrics to `ab.chatgpt.com/otlp/v1/metrics`.

## A credential in a URL path on the first capture

On the first capture attempt, the proxy script kept URL paths whole. One path held a credential that a plugin puts in the URL. The script now masks path segments that are not short and plain. The doc's advice: if you repeat this, mask paths from the start.

## What is not measured

- No capture ran with the switches set. The doc says "A second capture with the switches set would test them." So the repo does not show which requests each switch stops.
- The capture did not record values. It does not show whether `skill_name` is a plain name or a hash, or how much of each 400-event batch was a backlog from earlier sessions.
- OpenCode and Gemini CLI traffic was not captured. Only their switches were read.
- The capture covers one Mac, one day, one short run, and one version of each tool.
- This post does not report a test run. No file read for it shows test results.

*How this post was made: an AI agent drafted it from the ai-usage-meter files listed in its sources file, a second agent reviewed it, and Timur merged it.*
