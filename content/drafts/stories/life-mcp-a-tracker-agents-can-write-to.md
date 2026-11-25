title: life-mcp: the tool schema and guards of a workout and meal tracker that AI assistants write to
slug: life-mcp-a-tracker-agents-can-write-to
excerpt: life-mcp is a small MCP server on a Cloudflare Worker with Neon Postgres. An assistant turns plain talk about meals and training into rows. Here are its three tables, its eight tools, the instructions it sends on connect, the guards on SQL and edits, and what the repo does not test.
category: AI engineering
category: Developer workflow
date: 2026-11-25T20:00:00.000Z

How do you let an AI assistant write your meals and workouts into a database without giving it write access to the whole database? This post is for developers who want to build a small remote MCP server for personal data. It follows [life-mcp](https://github.com/isatimur/life-mcp), a Cloudflare Worker with Neon Postgres.

The short answer from its code: writes go through fixed tools, and `update_row` changes only columns on a fixed list per table. Free SQL runs in a `READ ONLY` transaction. But reads are not limited to the three tables: a `SELECT` can read any table the database user can read. You also get the tables, the tool schema and the instructions the server sends to the model.

## What the git history shows

The repo has 3 commits, all on 2026-11-23. Oldest first:

- [`fd497bd`](https://github.com/isatimur/life-mcp/commit/fd497bd): "Life MCP: Cloudflare Worker with Neon Postgres, MCP and REST doors".
- [`7bf1ba3`](https://github.com/isatimur/life-mcp/commit/7bf1ba3): "Track fiber: meals.fiber_g column, log_meal, update_row and summary".
- [`adcb4cb`](https://github.com/isatimur/life-mcp/commit/adcb4cb): "Tell the model to estimate fiber too".

The repo has no tags and no README. The main packages in `package.json` are `wrangler` ^4.162.0, `typescript` ^7.0.2 and `@neondatabase/serverless` ^1.2.1. The Worker sets `compatibility_date` to `2026-11-01`.

## Three tables, with dates as plain text

`schema.sql` holds three tables: `workouts`, `meals` and `entries`. Each date is `TEXT` in the form `YYYY-MM-DD`, with a `CHECK` on that pattern. The schema comment gives the reason: "so they travel as plain strings". The schema comment tells readers to cast with `date::date` when they need date math.

`workouts` keeps exercises in a `sets` column of type `JSONB`. `meals` has `calories`, `protein_g`, `carbs_g`, `fat_g` and `fiber_g`. `entries` covers "Anything else: weight, sleep, mood, supplements" with a `kind` and a `JSONB` `data` object.

The `meals` table in `CREATE TABLE` has `fiber_g`. One more line, with its own comment, adds the column to older databases:

```sql
-- Added 2026-11-23 for databases created before fiber was tracked.
ALTER TABLE meals ADD COLUMN IF NOT EXISTS fiber_g DOUBLE PRECISION;
```

## Eight tools for writing, reading and fixing rows

`src/index.ts` lists eight tools:

- `log_workout`, `log_meal` and `add_entry` write one row each.
- `recent` lists the newest rows of one table. The default limit is 20, and the maximum is 100.
- `summary` gives meal and workout totals per day, and a count of other entries per kind, for a date range. The default range is the last 7 days.
- `query` runs one read-only SQL `SELECT`.
- `update_row` and `delete_row` change or remove one row by id.

Here is the schema for `log_meal`, as it is in the code:

```ts
inputSchema: {
  type: "object",
  properties: {
    date: { type: "string", description: "YYYY-MM-DD. Defaults to today (UTC)." },
    meal: { type: "string", enum: ["breakfast", "lunch", "dinner", "snack"] },
    description: { type: "string" },
    calories: { type: "integer" },
    protein_g: { type: "number" },
    carbs_g: { type: "number" },
    fat_g: { type: "number" },
    fiber_g: { type: "number" },
    notes: { type: "string" },
  },
  required: ["meal", "description"],
},
```

Only `meal` and `description` are required. The schema describes the optional `date` field as "YYYY-MM-DD. Defaults to today (UTC)."

## The instructions the server sends on connect

The `initialize` reply carries an `instructions` string. The code comment says it "tells the assistant how to turn plain talk into rows". The first line says: "Personal life tracker. The user talks in plain language; you fill the fields. Never ask the user to name tables or fields."

The instructions map talk to tools. Food goes to `log_meal`, training goes to `log_workout`, and the rest goes to `add_entry`. For entries, they give a list of kinds to reuse, such as weight `{kg}`, sleep `{hours, quality_1_5}` and water `{ml}`.

The food line says: "Estimate calories, protein_g, carbs_g, fat_g and fiber_g when the user gives none, and say they are estimates." This post does not show what commit `adcb4cb` changed in that line.

The instructions tell the model to ask the user a question "only when a missing detail changes the record a lot". Before `update_row` or `delete_row`, they tell it to find the row id and confirm "when more than one row could match".

## Guards on SQL, edits and access

The `query` tool takes free SQL, so it has the most guards:

- The text must start with `select` or `with`.
- A `;` inside the text is refused: "Send one statement only."
- The query runs in a `READ ONLY` transaction with `SET LOCAL statement_timeout = '5s'`.
- The reply holds at most 500 rows.
- The guard does not check table names.

`update_row` changes only columns on a fixed list per table. Other names get the error "Cannot change: ...", with the allowed list. `id` accepts digit strings too, because "Postgres returns bigint ids as strings".

On the MCP route, the message from these checks goes back as text with `isError: true`. Other errors go back as "The database call failed.", and the code logs the details with `console.error`.

Access uses a bearer token, `MCP_TOKEN`. A second path, `/mcp/<secret>`, serves "clients that cannot send a header", with its own `MCP_PATH_TOKEN`. The code hashes both values with SHA-256 and compares them with `timingSafeEqual`.

If `MCP_TOKEN` or `DATABASE_URL` is not set, the MCP and REST routes return 503. The comment says: "The secret is the only protection".

## One tool set, two ways in

The Worker speaks "Stateless Streamable HTTP: one JSON-RPC request in, one JSON response out". It lists protocol versions `2025-06-18`, `2025-03-26` and `2024-11-05`. When a client asks for another version, `initialize` answers with `2025-06-18`.

A second route, `POST /api/tools/<tool>`, is the "REST door for the native app". It calls the same `callTool` function, so the checks inside the tools apply on both routes. The REST route takes only the bearer `MCP_TOKEN`, not the path secret. A check error there returns status 400, and other errors return 500.

## What is not measured

- The repo has no tests. The `test` script prints "Error: no test specified". A `typecheck` script exists, but no file shows its result.
- No file shows latency, row counts, or how often the model estimates nutrition correctly.
- The native app that uses the REST door is not in the repo.
- Dates default to UTC. The repo does not show what happens to a meal logged near midnight in another time zone.
- No file shows a test of the `query` guards against SQL that tries to write.

*How this post was made: an AI agent drafted it from the repo's `src/index.ts`, `schema.sql`, `package.json`, `wrangler.jsonc` and git history, a second agent reviewed it, and Timur merged it.*
