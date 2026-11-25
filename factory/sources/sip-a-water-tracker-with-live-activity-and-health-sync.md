# Sources: sip-a-water-tracker-with-live-activity-and-health-sync

The evidence file has an empty `repo:` line, so the post links no repo URL and no commit pages. It names commit hashes as plain code.

## Opening paragraph

- Sip is a SwiftUI water tracker in the `sim-pane-demo` repo.
  Source: factory/evidence/sim-pane-demo.txt (commit ab90ebf subject)
- Short answer: each sample gets the drink's UUID as its HealthKit sync identifier (`HKMetadataKeySyncIdentifier`); an edit saves with a higher sync version (`HKMetadataKeySyncVersion`), and HealthKit replaces the old sample. Code comment: "Each drink is one sample whose HealthKit sync identifier is the drink's UUID. Saving again with a higher sync version replaces the old sample (HealthKit does this)".
  Source: ~/Dev/sim-pane-demo/Sources/HealthSync.swift (lines 6-7, 132-133)
- It uses HealthKit, ActivityKit and widgets.
  Source: ~/Dev/sim-pane-demo/Sources/HealthSync.swift, ~/Dev/sim-pane-demo/Shared/SipActivity.swift, ~/Dev/sim-pane-demo/docs/roadmap.md

## When each feature landed in the repo

- 26 commits, first 2026-11-18, last 2026-11-24.
  Source: factory/evidence/sim-pane-demo.txt
- First commit ab90ebf and its subject.
  Source: factory/evidence/sim-pane-demo.txt
- 161c39d, 483d402, fb2cf09 on 2026-11-23, in this order oldest first (taken from the newest-first list), with the quoted subjects (shortened at a semicolon or comma, words unchanged).
  Source: factory/evidence/sim-pane-demo.txt
- 42e33af later the same day adds a "Live Activity quick-add UI test".
  Source: factory/evidence/sim-pane-demo.txt

## How Apple Health sync avoids duplicates

- One Dietary Water sample per drink; sync identifier is the drink UUID; quoted comment on higher sync version.
  Source: ~/Dev/sim-pane-demo/Sources/HealthSync.swift (lines 4-8, 128-135)
- Ledger with fingerprint (counted amount, whole-second time, kind) and version.
  Source: ~/Dev/sim-pane-demo/Sources/HealthSync.swift (lines 22, 52-54)
- Plan rules: new drink version 1; changed fingerprint gets next version; missing drink deleted by sync identifier; older than 30 days leaves the ledger.
  Source: ~/Dev/sim-pane-demo/Sources/HealthSync.swift (lines 15, 57-79, 91-95)
- "history stays in Health".
  Source: ~/Dev/sim-pane-demo/Tests/HealthPlanTests.swift
- Turning Health off keeps the ledger; quoted comment.
  Source: ~/Dev/sim-pane-demo/Sources/HealthSync.swift (lines 146-147)
- Whole-second times; quoted comment.
  Source: ~/Dev/sim-pane-demo/Shared/SipShared.swift (lines 44-46)

## How tea and coffee count toward the goal

- Factors water 1.0, tea 0.9, coffee 0.8, sparkling 1.0; unknown kind 1.
  Source: ~/Dev/sim-pane-demo/Shared/SipShared.swift (lines 29-39), ~/Dev/sim-pane-demo/Tests/HydrationTests.swift
- Switch in Settings; off counts in full.
  Source: factory/evidence/sim-pane-demo.txt (161c39d), ~/Dev/sim-pane-demo/Shared/SipShared.swift (lines 57-61)
- Comment "follow common hydration-index findings"; the source file cites no study. The writer did not search the whole repo.
  Source: ~/Dev/sim-pane-demo/Shared/SipShared.swift (line 28)
- Sip writes the counted amount to Health.
  Source: ~/Dev/sim-pane-demo/Sources/HealthSync.swift (line 129)
- Coffee switch test, version 2, quoted message.
  Source: ~/Dev/sim-pane-demo/Tests/HealthPlanTests.swift

## How the Live Activity starts, updates and ends

- Sync rules (post: one paragraph for the switch-off case, then a four-item list for the other branches): ends all when the switch is off or activities are not enabled; a live activity is updated only when the goal is not reached; a live activity is ended with a one-hour dismissal when the goal is reached; starts one when none is live and the goal is not reached; does nothing when none is live and the goal is reached (SipActivity.swift lines 55-63).
  Source: ~/Dev/sim-pane-demo/Shared/SipActivity.swift (lines 22, 31-35, 48-64; branch at lines 55-60)
- Quoted comment on ended activities; `current` filters active or stale.
  Source: ~/Dev/sim-pane-demo/Shared/SipActivity.swift (lines 37-41)
- "an ended activity must not count as current".
  Source: ~/Dev/sim-pane-demo/Tests/LiveProgressTests.swift

## What the tests cover

- 62 `func test` declarations: 45 in Tests, 14 in UITests, 3 in WatchUITests. This is a text search count of declarations, not a run.
  Source: ~/Dev/sim-pane-demo/Tests/, ~/Dev/sim-pane-demo/UITests/, ~/Dev/sim-pane-demo/WatchUITests/
- HealthPlanTests: "without touching HealthKit" and the cases listed.
  Source: ~/Dev/sim-pane-demo/Tests/HealthPlanTests.swift
- testHealthSyncHasNoDuplicates: doc comment "Real HealthKit on the simulator: drinks reach Health once, edits replace, deletes remove". Logs two drinks (add250, add500), turns on the Health switch, asserts "2 drinks" in the Settings read-back; after an edit asserts "2 drinks" (message "edit duplicated"); after a delete asserts "1 drink" (message "delete left a sample").
  Source: ~/Dev/sim-pane-demo/UITests/SipUITests.swift (lines 70-109)
- LiveProgressTests: percent math, end date, "Real ActivityKit in the simulator", skip when Live Activities are off.
  Source: ~/Dev/sim-pane-demo/Tests/LiveProgressTests.swift
- SipLiveActivityTests: Notification Center, "+250 ml", total changes, `sleep(3)`.
  Source: ~/Dev/sim-pane-demo/UITests/SipLiveActivityTests.swift
- flaky.sh: up to N runs, default 4, prints failure messages on first failure.
  Source: ~/Dev/sim-pane-demo/scripts/flaky.sh

## What broke on the way to the App Store

- 5aaf00a on 2026-11-24, quoted subject start.
  Source: factory/evidence/sim-pane-demo.txt
- Devices line in the listing doc.
  Source: ~/Dev/sim-pane-demo/docs/app-store-listing.md
- No file shows the review result of the new build.

## Not measured

- No test run results in any file read. The writer cannot run commands.
- `HealthSync.sync` (the HealthKit write path) has no unit test; only `plan` is unit-tested. One simulator UI test checks it through the Settings read-back count.
  Source: ~/Dev/sim-pane-demo/Tests/HealthPlanTests.swift, ~/Dev/sim-pane-demo/Sources/HealthSync.swift, ~/Dev/sim-pane-demo/UITests/SipUITests.swift (lines 70-109)
- The roadmap still says the Health device build "needs a signing team".
  Source: ~/Dev/sim-pane-demo/docs/roadmap.md (line 30)
- Commit 17c2c4c on 2026-11-24 set up App Store signing ("Release setup: ... App Store signing for team ...", team ID left out). No file shows which is older, the roadmap note or this commit; the post does not order them.
  Source: factory/evidence/sim-pane-demo.txt
- No file shows the Health sync run on a real device.
- No test reads the Dynamic Island; the UI test uses Notification Center.
  Source: ~/Dev/sim-pane-demo/UITests/SipLiveActivityTests.swift
- No flake rate is recorded.
  Source: ~/Dev/sim-pane-demo/scripts/flaky.sh
- Left out on purpose: the signing team ID, the bundle ID and the support email in the repo. The roadmap names other apps; the post does not name them.
