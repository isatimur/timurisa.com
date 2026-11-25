# Sources: life-mcp-a-tracker-agents-can-write-to

Note: the first unchecked backlog topic (what-claude-code-hooks-stopped-in-my-sessions) cites `~/.claude/projects` and `~/.claude/CLAUDE.md`, which are not on the allowlist in `factory/sources.txt`. The writer skipped it and took the next unchecked topic.

Note: `.dev.vars`, `.mcp-token` and `.mcp-path-token` exist in the repo folder and are listed in `.gitignore`. The writer did not open them. The post quotes no secret, account id or connection string.

## Excerpt and opening paragraph

- life-mcp is at https://github.com/isatimur/life-mcp.
  Source: factory/evidence/life-mcp.txt
- It is a small remote MCP server on Cloudflare Workers with Neon Postgres, a "Personal life tracker".
  Source: ~/Dev/life-mcp/src/index.ts
- Three tables, eight tools, instructions sent on connect.
  Source: ~/Dev/life-mcp/schema.sql, ~/Dev/life-mcp/src/index.ts
- Short answer in the first paragraph: writes go through fixed tools (log_workout, log_meal, add_entry, update_row, delete_row); update_row changes only columns on a fixed list per table; free SQL (query) runs in a READ ONLY transaction; reads are not limited to the three tables, because checkReadOnly tests only the leading keyword and the ";" character, so a SELECT can read any table the database user can read. The question asks about write access only, to match what the code does.
  Source: ~/Dev/life-mcp/src/index.ts (lines 33-37, 43-145, 172-177, 264-271)

## What the git history shows

- 3 commits, first and last on 2026-11-23; hashes and subjects fd497bd, 7bf1ba3, adcb4cb; order taken from the newest-first list.
  Source: factory/evidence/life-mcp.txt
- No tags.
  Source: factory/evidence/life-mcp.txt
- No README in the repo root (root files: tsconfig.json, neon.ts, package.json, package-lock.json, wrangler.jsonc, schema.sql, .gitignore, plus ignored local files).
  Source: ~/Dev/life-mcp (file listing)
- Main packages: wrangler ^4.162.0, typescript ^7.0.2, @neondatabase/serverless ^1.2.1. The post says "main packages" because package.json also lists @cloudflare/workers-types ^5.20261115.1, @neon/config ^1.14.0 and @neon/env ^2.1.3.
  Source: ~/Dev/life-mcp/package.json
- compatibility_date 2026-11-01.
  Source: ~/Dev/life-mcp/wrangler.jsonc

## Three tables, with dates as plain text

- Tables workouts, meals, entries; date TEXT with CHECK on YYYY-MM-DD; "so they travel as plain strings". The schema comment (line 2) is an instruction: "Use date::date in queries when you need date math". The post reports it as what the comment tells readers, not as what the code does.
  Source: ~/Dev/life-mcp/schema.sql
- workouts.sets JSONB; meals columns calories, protein_g, carbs_g, fat_g, fiber_g; entries "Anything else: weight, sleep, mood, supplements" with kind and data JSONB.
  Source: ~/Dev/life-mcp/schema.sql
- meals in CREATE TABLE has fiber_g; the ALTER TABLE line and its comment ("for databases created before fiber was tracked"), quoted as written.
  Source: ~/Dev/life-mcp/schema.sql (lines 15-30)

## Eight tools for writing, reading and fixing rows

- The eight tool names and what each does; recent default 20, maximum 100; summary defaults to the last 7 days; query is one read-only SELECT; update_row and delete_row by id.
  Source: ~/Dev/life-mcp/src/index.ts (TOOLS, lines 43-145)
- "`summary` gives meal and workout totals per day, and a count of other entries per kind, for a date range." The tool description reads "calories and macros per day, workouts per day, and a count of other entries per kind". The handler groups meals and workouts by date and groups entries by kind across the whole range.
  Source: ~/Dev/life-mcp/src/index.ts (lines 106-117 and 235-262)
- log_meal inputSchema quoted as written; required meal and description. The optional date field is described in the schema as "YYYY-MM-DD. Defaults to today (UTC)." (src/index.ts line 66).
  Source: ~/Dev/life-mcp/src/index.ts (lines 60-78)

## The instructions the server sends on connect

- The initialize reply carries `instructions`; comment "tells the assistant how to turn plain talk into rows". The first line of the string is quoted as written: "Personal life tracker. The user talks in plain language; you fill the fields. Never ask the user to name tables or fields." "Personal life tracker." is the first sentence of that line, not a line of its own.
  Source: ~/Dev/life-mcp/src/index.ts (lines 22-23, 304-307)
- Mapping of food, training and other talk to tools; kinds to reuse; estimate quote.
  Source: ~/Dev/life-mcp/src/index.ts (lines 24-26)
- The food line quoted as written (line 24). The subject of commit adcb4cb is "Tell the model to estimate fiber too". The post quotes the subject only; it does not claim what the diff changed.
  Source: ~/Dev/life-mcp/src/index.ts (line 24), factory/evidence/life-mcp.txt
- The instructions tell the model to ask "only when a missing detail changes the record a lot", and to find the row id and confirm "when more than one row could match". The post states these as instructions only; no file shows the model obeys them.
  Source: ~/Dev/life-mcp/src/index.ts (lines 28, 30)

## Guards on SQL, edits and access

- query: must start with select or with; ";" refused with "Send one statement only."; READ ONLY transaction; statement_timeout 5s; MAX_ROWS 500.
  Source: ~/Dev/life-mcp/src/index.ts (lines 20, 172-177, 264-271)
- The query guard does not check table names: checkReadOnly tests only the leading keyword and the ";" character. A SELECT can read any table the database user can read.
  Source: ~/Dev/life-mcp/src/index.ts (lines 172-177)
- update_row allowed columns per table; "Cannot change: ..." error with allowed list; id accepts digit strings because "Postgres returns bigint ids as strings".
  Source: ~/Dev/life-mcp/src/index.ts (lines 33-37, 165-170, 272-286)
- On the MCP route, ToolError messages go back as text with isError: true; other errors "The database call failed." and console.error.
  Source: ~/Dev/life-mcp/src/index.ts (lines 316-323)
- Bearer MCP_TOKEN; /mcp/<secret> path for "clients that cannot send a header" with MCP_PATH_TOKEN; SHA-256 then timingSafeEqual; 503 when MCP_TOKEN or DATABASE_URL is unset; "The secret is the only protection".
  Source: ~/Dev/life-mcp/src/index.ts (lines 330-337, 349, 371-384)
- Secrets MCP_TOKEN and DATABASE_URL are set with `wrangler secret put` (not quoted in the post).
  Source: ~/Dev/life-mcp/wrangler.jsonc

## One tool set, two ways in

- "Stateless Streamable HTTP: one JSON-RPC request in, one JSON response out".
  Source: ~/Dev/life-mcp/src/index.ts (line 2)
- Protocol versions 2025-06-18, 2025-03-26, 2024-11-05; initialize answers with the first one when the requested version is not on the list.
  Source: ~/Dev/life-mcp/src/index.ts (lines 19, 305-306)
- POST /api/tools/<tool>, "REST door for the native app", calls callTool, so the checks inside the tools apply on both routes.
  Source: ~/Dev/life-mcp/src/index.ts (lines 347-370)
- The REST route checks only the bearer MCP_TOKEN, not MCP_PATH_TOKEN; ToolError returns 400; other errors return 500 with "The database call failed.".
  Source: ~/Dev/life-mcp/src/index.ts (lines 349-352, 365-368)
- Link /blog/mcp-rest-api-part-1 exists. The link text is the archive title, "MCP and REST APIs, part 1: expose warehouse operations as tools". The post makes no other claim about that article.
  Source: content/posts/archive.json
  Source: content/posts/archive.json

## Not measured

- No tests: the test script prints "Error: no test specified". A typecheck script exists; no file shows its result.
  Source: ~/Dev/life-mcp/package.json
- No latency, row counts, or accuracy of model estimates in any file.
- The native app is not in the repo.
- Dates default to UTC ("Defaults to today (UTC)"); behaviour near midnight in other time zones is not shown.
  Source: ~/Dev/life-mcp/src/index.ts (lines 39, 50)
- No test of the query guards against SQL that tries to write.
- Whether the Worker is deployed is not shown in any file read. The post does not claim it.
- No file shows what the database user can read beyond the three tables.
- The writer ran no commands.

## Closing line

- The italic line names the sources: src/index.ts, schema.sql, package.json, wrangler.jsonc and git history. The repo has no README or file that lists sources, so the line names them instead of the factory's default wording.
  Source: factory/WRITING-STANDARD.md
