title: Haru-4B on an M1 Max: how much of its 133 ms frame the MLX build uses
slug: haru-4b-frame-time-on-an-m1-max
excerpt: Haru-4B is a full-duplex speech model that must finish one step every 133 ms. On an M1 Max laptop, the repo's MLX test notes record 43 ms per frame in bfloat16 and 31 ms in 8-bit, about a third and a quarter of the frame. Here is how to run a similar measurement, the numbers, where they disagree, and what the files do not measure.
category: AI engineering
date: 2026-11-25T21:00:00.000Z

Can a full-duplex speech model keep up with real time on an M1 Max laptop? This post is for developers who want to run [Haru-4B](https://github.com/higurashi-ai/Haru) on an Apple silicon Mac. You get the frame budget, the per-frame times that the files record on an M1 Max, how to run a similar measurement, and the gaps in those numbers.

The short answer from the files: the recorded per-frame times are well under 133 ms, but no file shows the slowest frame or the timing of a live run. One frame holds 133 ms of audio. The MLX test notes record 31 ms per frame with `--quantize 8` and 43 ms in bfloat16, from a run of `python -m haru_mlx.run_inference` on a 31 s recording. They do not name the statistic.

A local research report, citing the developer blog, gives a model step of 34.2 ms in int8. The 31 ms and 34.2 ms figures are each about a quarter of the frame. The files do not say which build gave the blog figure, or whether the two figures cover the same work.

## What Haru-4B does in one frame

Haru listens and speaks at the same time. The README says: "Every 133 ms the model takes one frame of the user's audio and produces one frame of its own audio and text." That is a rate of 7.5 Hz. User audio, model audio and model text are summed into one position of the language model.

So the deadline is fixed. To keep up in real time, each step has to finish inside the 133 ms frame.

## What the git history shows

The repo has one commit: [7fe6b76](https://github.com/higurashi-ai/Haru/commit/7fe6b76), dated 2026-11-13, "Release haru-speech and haru-speech-vllm 0.1.1". It has two tags: `haru-speech-v0.1.1` and `haru-speech-vllm-v0.1.1`. The history does not show how the code got to that state. The MLX build for Apple silicon lives in `haru_mlx/`.

## How to run a similar measurement

The test notes name the script, `python -m haru_mlx.run_inference`, the `--quantize 8` flag and "a 31 s recording". They do not give the exact arguments of their run: no input file, reference clip or system prompt. The commands below follow the generic example in the MLX README.

The MLX package installs from its own folder. The checkpoint is about 10 GB and downloads from Hugging Face on first use.

```bash
cd haru_mlx
pip install -e .
python -m haru_mlx.run_inference user.wav reply.wav --reference voice.wav --system-prompt "..."
python -m haru_mlx.run_inference user.wav reply.wav --reference voice.wav --system-prompt "..." --quantize 8
```

The script prints a summary line, then the transcript. This is the format string of the summary line in `run_inference.py`:

```python
print(f"{count} frames ({count * frame_samples / SAMPLE_RATE:.1f} s), {step_ms:.1f} ms per frame -> {args.output}")
```

The `step_ms` value is the median time of every frame after the first one, which comes from `session.start()`. The test notes do not say that their figures quote this printed line.

## The numbers on an M1 Max

The test notes name the machine: a MacBook Pro with an M1 Max chip, 64 GB, macOS 26.6, MLX 0.32.4. On a 31 s recording, the run took:

- `--quantize none` (bfloat16): 43 ms per frame, 13.5 GB peak memory.
- `--quantize 8`: 31 ms per frame, 11.2 GB peak memory.

Against the 133 ms frame, that is about 32% of the budget in bfloat16 and about 23% in 8-bit. These shares are arithmetic. The repo does not state them.

The 8-bit mode quantizes the language model's weight matrices and the embedding table. The audio codec, the audio head and the normalization gains keep the checkpoint's precision.

## Three more int8 figures from builds the files do not name

A local research report in Russian, not part of the published repo, compares open full-duplex models. It records an offline run, by the person it was written for, at 47 ms per frame in int8. The files do not say which build, recording or settings gave 47 ms.

The report also cites the [Higurashi technical blog](https://blog.higurashi.ai/melte/haru4b/): p50 of 65.2 ms on an M1 Max with int8 weights, of which the model step is 34.2 ms, so the p50 measures more than the step. The blog's step is 34.2 ms and the test notes' figure is 31 ms per frame. The files do not show whether the two cover the same work: `frame.seconds` in `session.py` spans from the start of `step()` through the backbone, the audio head and the codec decode.

The files do not say what the other ~31 ms of the p50 covers. From the blog numbers and the 47 ms run, the report concludes that Haru spends about a third to a half of its frame budget.

The report adds a cost. A 133 ms frame adds up to 133 ms of framing delay. Moshi-family models use an 80 ms frame. The report says the spare time lowers the risk of falling behind real time, but it does not make Haru's replies faster.

## What the research notes record for Moshi-family step times

Moshi and its successor PersonaPlex run at 12.5 Hz, so each step must finish within 80 ms. The research notes collect three PersonaPlex figures on an M2 Max for the community Swift port, [speech-swift](https://github.com/soniqo/speech-swift). [A news write-up](https://www.implicator.ai/voice-ais-three-model-pipeline-is-dying-its-replacement-fits-on-a-laptop.md) gives about 68 ms per step in 4-bit (RTF 0.87), and the notes call it "Developer-measured, not independent". The port's own README lists "~0.94 RTF on M2 Max".

A search-engine summary of the port's [guide](https://soniqo.audio/ru/guides/respond) gives about 112 ms per step in 8-bit (RTF about 1.4), and the notes mark it unverified. The notes flag all three figures as in conflict. The report states that no independent M1 Max numbers exist for these models.

## What is not measured

The report mentions a failure: a live test, run by the person the report was written for, broke. The report points at the audio path, not at model speed. It suggests wired headphones and the Mac's built-in microphone in place of Bluetooth and the iPhone microphone through Continuity. No file shows the result of that check.

- The repo's 43 ms and 31 ms figures come from one 31 s recording on one M1 Max. The repo's test notes name no other Mac.
- No file shows a live-conversation latency from the macOS app.
- No Full-Duplex-Bench score for Haru appears in the repo. The report says no independent Full-Duplex-Bench measurement of Haru appeared by 18 November 2026.
- No side-by-side run of Haru, Moshi and PersonaPlex on one machine appears.

*How this post was made: an AI agent drafted it from the listed sources (the Haru repo plus local research notes), a second agent reviewed it, and Timur merged it.*
