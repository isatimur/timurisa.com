# Sources: haru-4b-frame-time-on-an-m1-max

Slug note: the backlog working title was `haru-47ms-per-frame`. The test notes record 43 ms (bfloat16) and 31 ms (8-bit); 47 ms appears only in the research report as a separate int8 run. A neutral slug avoids presenting 47 ms as the repo's figure.

Topic choice note: the first unchecked backlog item (`what-claude-code-hooks-stopped-in-my-sessions`) cites `~/.claude/projects`, which is not on the allowlist in `factory/sources.txt`. The next unchecked items are `[research]` topics with web sources, also outside the allowlist. This is the first unchecked topic with an allowlisted source.

## Claims

- Haru-4B is a full-duplex spoken dialogue model that listens and speaks at the same time.
  Source: ~/Dev/haru/README.md
- "Every 133 ms the model takes one frame of the user's audio and produces one frame of its own audio and text." Rate is 7.5 Hz.
  Source: ~/Dev/haru/README.md
- User audio, model audio and model text are summed into one position of the language model.
  Source: ~/Dev/haru/README.md
- The repo has one commit, 7fe6b76, dated 2026-11-13, "Release haru-speech and haru-speech-vllm 0.1.1"; tags haru-speech-v0.1.1 and haru-speech-vllm-v0.1.1; repo URL https://github.com/higurashi-ai/Haru.
  Source: factory/evidence/haru.txt
- The MLX build for Apple silicon lives in `haru_mlx/`.
  Source: ~/Dev/haru/README.md
- The test notes name `python -m haru_mlx.run_inference`, `--quantize 8` and "a 31 s recording". They give no input file, reference clip or system prompt.
  Source: ~/Dev/haru/haru_mlx/tests/README.md
- The MLX test notes record that `python -m haru_mlx.run_inference` on a 31 s recording "takes 43 ms per frame in bfloat16 and 31 ms with `--quantize 8`". The notes do not say "median" or "step", and do not say their figures quote the script's printed line. The MLX README presents `run_inference` as the offline command. Shares: 43/133 ≈ 32% ("about a third"), 31/133 ≈ 23% ("about a quarter"); arithmetic, not stated in the sources.
  Source: ~/Dev/haru/haru_mlx/tests/README.md
  Source: ~/Dev/haru/haru_mlx/README.md
- To keep up in real time, each step has to finish inside the 133 ms frame. This is inference: the report states the frame budget ("У Haru кадр длится 133 мс") and the risk of falling behind real time ("отстать от реального времени"); the Haru README gives the 133 ms frame.
  Source: ~/Dev/haru/reports/Открытые дуплексные голосовые модели.md
  Source: ~/Dev/haru/README.md
- A local research report, citing the developer blog, gives a model step of 34.2 ms in int8 on an M1 Max, inside a p50 of 65.2 ms ("из них сам шаг модели — 34,2 мс"). The writer did not read the blog; the figures come from the report. 34.2/133 ≈ 26% ("about a quarter"); the p50 "measures more than the step" because the source splits the step out of it; 65.2 − 34.2 = 31 ms ("the other ~31 ms"); arithmetic, not stated in the sources. No file names the build behind the blog figures.
  Source: ~/Dev/haru/reports/Открытые дуплексные голосовые модели.md
- The commands in the post follow the generic MLX README example, not the exact test-note run. Install with `pip install -e .`; checkpoint about 10 GB, downloaded from Hugging Face on first use; offline command `python -m haru_mlx.run_inference user.wav reply.wav --reference voice.wav --system-prompt "..."`; `--quantize` values `none` and `8`.
  Source: ~/Dev/haru/haru_mlx/README.md
- The script prints a summary line (line 87), then the transcript with `print(text)` (line 88). The post shows the summary line's format string.
  Source: ~/Dev/haru/haru_mlx/haru_mlx/run_inference.py
- The script prints the line format shown; `step_ms` is the median of `frame.seconds` over frames after the first (`frames[1:]`); the first frame comes from `session.start()`. No source gives a reason for skipping it, so the post states no reason.
  Source: ~/Dev/haru/haru_mlx/haru_mlx/run_inference.py
- `frame.seconds` (session.py) runs from `started` at the top of `step()`, before user-audio encoding (`codec.feed`), through the backbone, audio head and codec decode in `_emit`. No file shows that the blog's 34.2 ms "model step" covers the same span, so the post says the files do not show it; the post states the two figures (31 ms and 34.2 ms), says each is about a quarter of 133 ms, and says the files do not show whether they cover the same work. It does not tell the reader to compare them.
  Source: ~/Dev/haru/haru_mlx/haru_mlx/session.py
- The post says "a similar measurement", not "the same": the commands follow the generic README example and the test notes give no exact arguments.
  Source: ~/Dev/haru/haru_mlx/README.md
- The test notes do not say that their figures quote this printed line.
  Source: ~/Dev/haru/haru_mlx/tests/README.md
- Test machine: MacBook Pro, M1 Max, 64 GB, macOS 26.6, MLX 0.32.4. On a 31 s recording: 43 ms per frame in bfloat16 and 31 ms with `--quantize 8`; peak memory 13.5 GB and 11.2 GB.
  Source: ~/Dev/haru/haru_mlx/tests/README.md
- 8-bit covers the language model's weight matrices and the embedding table; codec, audio head and normalization gains keep checkpoint precision.
  Source: ~/Dev/haru/haru_mlx/README.md
- The report and the research notes are local files. They do not appear in the repo's git index, so they are not part of the published repo. The test notes and the MLX README are tracked.
  Source: ~/Dev/haru/.git/index
- The report is in Russian and compares open full-duplex models. It records an offline run of 47 ms per frame in int8 and calls it "Ваш офлайн-замер" (the measurement of the person the report was written for).
  Source: ~/Dev/haru/reports/Открытые дуплексные голосовые модели.md
- The report cites the Higurashi blog: p50 65.2 ms on M1 Max with int8 weights, model step 34.2 ms. From these blog numbers plus the 47 ms run, it concludes Haru spends about a third to a half of its frame budget.
  Source: ~/Dev/haru/reports/Открытые дуплексные голосовые модели.md
- A 133 ms frame adds up to 133 ms of framing delay, against 80 ms for Moshi; the report says the spare time lowers the risk of falling behind but does not make replies faster. The post paraphrases the Russian: "Запас снижает риск отстать от реального времени, но не делает ответы Haru быстрее."
  Source: ~/Dev/haru/reports/Открытые дуплексные голосовые модели.md
- The report records a failed live test by the person it was written for ("вашего сбоя в живом тесте"). It points at the audio path rather than model speed ("сбой в живом режиме у Haru менее вероятно связан со скоростью модели"; "сначала проверить аудиотракт"). It suggests wired headphones and the Mac's built-in microphone in place of Bluetooth and the iPhone microphone through Continuity. The report states the check as a future step ("Если сбой исчезнет, гипотеза подтвердится"); no file shows its result.
  Source: ~/Dev/haru/reports/Открытые дуплексные голосовые модели.md
- Moshi family runs at 12.5 Hz, 80 ms per frame; PersonaPlex is the main successor of Moshi.
  Source: ~/Dev/haru/research_notes/Открытые дуплексные голосовые модели/moshi_family.md
- PersonaPlex on M2 Max, three figures for the community Swift port speech-swift (https://github.com/soniqo/speech-swift): about 68 ms per step, RTF 0.87, in 4-bit from a news write-up (implicator.ai and news.lavx.hu; "Developer-measured, not independent"); "~0.94 RTF on M2 Max" from the speech-swift README; about 112 ms per step, RTF ~1.4, in 8-bit from a search-engine summary of the port's guide on soniqo.audio (marked UNVERIFIED). The CONFLICT line lists all three figures.
  Source: ~/Dev/haru/research_notes/Открытые дуплексные голосовые модели/moshi_family.md
  Source: ~/Dev/haru/reports/Открытые дуплексные голосовые модели.md
- No independent M1 Max numbers exist for these models.
  Source: ~/Dev/haru/reports/Открытые дуплексные голосовые модели.md
- The report says Higurashi published only a latency breakdown and a demo for Haru, and that no independent Full-Duplex-Bench measurement of Haru appeared by 18 November 2026. It does not say that no score of any kind was public. The report's cross-paper table has no Haru numbers.
  Source: ~/Dev/haru/reports/Открытые дуплексные голосовые модели.md

## Not measured

- The opening answer says the recorded per-frame times are well under 133 ms and that no file shows the slowest frame, a worst case or the timing of a live run (the test notes say Haru.app holds a live conversation, but record no timing for it). The test notes do not name the statistic ("per frame"); the script prints a median (`np.median`, run_inference.py line 86). A median or unnamed statistic cannot show that every step meets 133 ms.
  Source: ~/Dev/haru/haru_mlx/tests/README.md
  Source: ~/Dev/haru/haru_mlx/haru_mlx/run_inference.py

- The shares of the frame budget (about 32% and 23%) are arithmetic on the test-note numbers (43/133, 31/133), not stated in the repo.
- No file shows real output of a `run_inference` run; only the print format and the numbers in the test notes.
- The build, recording and settings behind the 47 ms int8 figure are not in the published repo. The gap to 31 ms is unexplained.
- The blog's 65.2 ms p50 includes a 34.2 ms model step. The files do not say what the other ~31 ms covers.
- No file shows whether the blog's 34.2 ms step and the test notes' 31 ms per frame cover the same work (`frame.seconds` scope above).
- No file names the build behind the blog's figures or the 47 ms run. Only 43 ms and 31 ms are tied to `haru_mlx.run_inference`.
- The test notes do not give the exact arguments of the run behind 43 ms and 31 ms.
- The "about a quarter" share of the blog's 34.2 ms step is arithmetic (34.2/133), not stated in the sources.
- No file shows the result of the audio-path check after the failed live test.

## How this post was made

The closing line says "the listed sources (the Haru repo plus local research notes)" because the report and research notes are local files, not in the published repo.
Source: ~/Dev/haru/.git/index
- The repo's 43 ms and 31 ms figures come from one 31 s recording on one M1 Max; the test notes name no other Mac. The 47 ms run and the blog's 65.2 ms and 34.2 ms figures have no named recording.
  Source: ~/Dev/haru/haru_mlx/tests/README.md
- No live-conversation latency from the macOS app.
- No Full-Duplex-Bench score for Haru appears in the repo (the draft says "in the repo"; a search of the tracked repo and the notes found none). The report's own statement is the claim on line 62.
  Source: ~/Dev/haru/reports/Открытые дуплексные голосовые модели.md
- The draft links the 68 ms figure to implicator.ai and the 112 ms figure to the soniqo.audio guide (ru). The notes say the English guide page returned 404, so 112 ms stays labelled unverified.
  Source: ~/Dev/haru/research_notes/Открытые дуплексные голосовые модели/moshi_family.md (lines 125-126)
- No side-by-side run of Haru, Moshi and PersonaPlex on one machine.
- The writer ran no commands.
