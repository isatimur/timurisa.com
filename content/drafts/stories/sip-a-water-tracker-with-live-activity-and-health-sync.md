title: Sip, a SwiftUI water tracker: Live Activity, Apple Health sync without duplicates, and what the tests cover
slug: sip-a-water-tracker-with-live-activity-and-health-sync
excerpt: How a SwiftUI water tracker writes drinks to Apple Health so that edits replace a sample and deletes remove it, how its Live Activity starts, updates and ends, how tea and coffee count toward the goal, and which parts the tests reach and which they do not.
category: Product engineering
category: iOS
date: 2026-11-25T09:00:00.000Z

How do you write drinks to Apple Health so that an edit replaces a sample and does not add a second one? Short answer: give each sample the drink's UUID as its HealthKit sync identifier, and save an edit with a higher sync version, so HealthKit replaces the old sample.

This post is for iOS developers who build a small logging app with HealthKit, ActivityKit and widgets. It follows Sip, a SwiftUI water tracker in the `sim-pane-demo` repo. You also get the Live Activity rules, the hydration factors, and what the tests cover and leave out.

## When each feature landed in the repo

The repo has 26 commits, from 2026-11-18 to 2026-11-24. The first commit, `ab90ebf`, is "Sip: SwiftUI water tracker with 3D glass, onboarding, history, settings, UI tests". On 2026-11-23, three commits added the features in this post, oldest first:

- `161c39d`: "Hydration factors (tea 90%, coffee 80%), shown per drink, switch in Settings".
- `483d402`: "Apple Health: write drinks as Water with sync identifiers (edits replace, deletes remove)".
- `fb2cf09`: "Live Activity: Lock Screen card and Dynamic Island with one-tap logging; ends an hour after goal or at midnight".

A later commit that day, `42e33af`, added a "Live Activity quick-add UI test".

## How Apple Health sync avoids duplicates

`HealthSync` saves each drink as one Dietary Water sample. The sample's HealthKit sync identifier is the drink's UUID. The code comment says: "Saving again with a higher sync version replaces the old sample (HealthKit does this), so edits never duplicate."

A small ledger remembers what Sip last wrote. For each drink, it stores a fingerprint (the counted amount, the time in whole seconds, and the kind) and a version. The `plan` function compares drinks to the ledger:

- A new drink gets version 1.
- A drink whose fingerprint changed gets the next version, with the same sync identifier.
- A drink that is gone from the log gets deleted from Health by its sync identifier.
- A drink older than 30 days leaves the ledger. The test says "history stays in Health".

Two details came from things that can go wrong. First, a comment says turning Health off keeps the ledger: "HealthKit ignores a sync version that is not higher than the stored one, so restarting versions at 1 would silently drop updates." Second, drink times are whole seconds. The JSON log stores seconds, so "a sub-second time would not survive a save and reload, and an untouched drink would compare as changed."

## How tea and coffee count toward the goal

`DrinkKind` gives each kind a factor: water 1.0, tea 0.9, coffee 0.8, sparkling 1.0, and an unknown kind counts as 1. A switch in Settings turns the factors off, and then each drink counts in full. The source comment says the factors "follow common hydration-index findings". The source file cites no study.

The factor also reaches Health, because Sip writes the counted amount. A unit test turns the switch off for a 250 ml coffee. The plan then saves version 2 of that sample: "250 counted instead of 200, so the sample is replaced".

## How the Live Activity starts, updates and ends

`LiveProgress.sync` keeps one Live Activity in step with the day's total. If the switch is off, or the system does not allow Live Activities, it calls `endAll()`.

Otherwise it takes one of four branches:

- An activity is live and the goal is not reached: it updates the activity.
- An activity is live and the goal is reached: it ends the activity with a dismissal one hour later.
- No activity is live and the goal is not reached: it starts one.
- No activity is live and the goal is reached: it does nothing.

A comment records a trap: "Ended activities stay in `activities` for a while, so filter by state: updating an ended activity does nothing and would block a new day's activity." So `current` counts only activities that are active or stale. The test asserts "an ended activity must not count as current".

## What the tests cover

A search of the three test folders finds 62 `func test` declarations: 45 in `Tests`, 14 in `UITests` and 3 in `WatchUITests`.

- `HealthPlanTests` checks the no-duplicates rules "without touching HealthKit". It covers version 1 for new drinks, no writes on a second run, a version bump on edit, a delete, the 30-day age-out, and the hydration switch.
- `testHealthSyncHasNoDuplicates` is a UI test with "Real HealthKit on the simulator". It logs two drinks, turns on the Health switch, and expects "2 drinks" in Settings. After an edit it expects "2 drinks" again (failure message: "edit duplicated"). After a delete it expects "1 drink" ("delete left a sample").
- `LiveProgressTests` checks the percent math and the end date. One test runs "Real ActivityKit in the simulator": switch on, log, switch off. It skips when Live Activities are off in that simulator.
- `SipLiveActivityTests` opens Notification Center, taps "+250 ml" on the Live Activity, and checks that the total on the Today screen changes. It waits three seconds with `sleep(3)` while the intent runs.
- `scripts/flaky.sh` runs one UI test up to N times (4 by default) and prints the failure messages on the first failure.

## What broke on the way to the App Store

Commit `5aaf00a` on 2026-11-24 starts with: "App Store: iPhone-only build (Apple rejected portrait-only iPad)". The listing doc now sets the devices to "iPhone only (TARGETED_DEVICE_FAMILY 1), plus the watch app". The repo does not show whether the new build passed review.

## What is not measured

- No file shows a test run result. This post reports test names and assertions, not pass rates.
- The `HealthSync.sync` path that calls HealthKit has no unit test. One simulator UI test checks it through the Settings read-back count.
- The roadmap says the Health device build "needs a signing team". Commit `17c2c4c` on 2026-11-24 set up App Store signing. No file shows the Health sync run on a real device.
- No test reads the Dynamic Island. The Live Activity UI test uses Notification Center.
- No file gives a flake rate for the UI tests.

*How this post was made: an AI agent drafted it from the project files listed in the repo, a second agent reviewed it, and Timur merged it.*
