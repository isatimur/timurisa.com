// Content for the 9 AI-engineering blog posts, sourced from research notes
// compiled while writing "From Copilot to Colleague" (with Daniel Mohanrao).
// Body text uses a light markdown subset (##, ###, >, -, **bold**) that
// scripts/publish-blog-posts.mjs converts into Sanity Portable Text blocks.

export const posts = [
  {
    slug: 'constrained-delegation-is-the-architecture-not-a-training-wheel',
    title: 'Constrained Delegation Is the Architecture, Not a Training Wheel',
    excerpt:
      "The gap between a demo agent and a production agent isn't intelligence. It's how tightly you've defined what the agent can see, decide, and act on.",
    category: 'AI Engineering',
    tags: ['agents', 'architecture', 'delegation'],
    body: `While researching **From Copilot to Colleague** with Daniel Mohanrao, one idea kept resurfacing across dozens of conference talks until it became the organizing thesis of the book: constrained delegation. The term sounds like a compromise. It isn't. It's the actual architecture that makes delegating real work to an AI system trustworthy at scale — and it maps directly onto problems I've been solving since long before "agent" was a product category.

At IDS, I headed a billing platform architecture that ran on a custom Spring Cloud API Gateway, Keycloak SSO, and Kafka streaming. None of that infrastructure existed because we distrusted our engineers. It existed because "let the service do whatever it needs to do" doesn't scale past a handful of components. You scope access, you define contracts between services, and you build observability so a failure is diagnosable instead of mysterious. Agent systems need the same discipline, and most teams skip it because delegation to an LLM feels conversational rather than architectural.

## The three dimensions that actually matter

**Scope constraints** — what the agent can see and touch. File system access, database permissions, tool registries, network boundaries. This isn't just security hygiene; a smaller action space makes an agent's behavior more predictable. Intercom's internal skills catalog is a good example at the org level: agents only get to invoke skills that have already been vetted, not the raw ability to do anything a human engineer could do.

**Delegation contracts** — explicit, written definitions of "done," agreed before a single line of output is produced. The clearest version of this I've seen in the research is a Planner-Generator-Evaluator harness where the generator and evaluator negotiate a 27-criteria contract up front. The evaluator then grades against that contract, not against the original vague request. That's the difference between delegation with a specification and delegation with a prayer.

**Accountability mechanisms** — how a human actually verifies the work and intervenes. Workflow UIs that expose every step, audit trails on auto-approved changes, adversarial evaluators that don't just re-read the diff but exercise the running app. These give you visibility into the agent's decisions at the moment they're made, not just a postmortem after something breaks.

## Why constraints enable rather than limit

Unconstrained delegation — hand the agent a goal, walk away — produces great demos and unreliable production systems. It looks like autonomy, but it's really just an absence of design. Constrained delegation produces something closer to a colleague: an agent that can own substantial pieces of work because the boundaries are explicit, the contract is written down, and someone can see what it did and why.

This isn't a new discipline for engineers who've built distributed systems. It's the same instinct that gives you a gateway instead of open service-to-service calls, and a schema instead of a free-text payload. We're just applying it to a new kind of worker.`
  },
  {
    slug: 'harness-engineering-the-work-cell-around-the-model',
    title: 'Harness Engineering: The Work Cell Around the Model',
    excerpt:
      "A capable model without a harness produces spectacle, not dependable output. The harness — not the prompt — is where production agent quality actually comes from.",
    category: 'AI Engineering',
    tags: ['agents', 'harness', 'engineering practice'],
    body: `A recurring pattern across the research corpus behind **From Copilot to Colleague** is a shift in vocabulary: away from "prompting" a model and toward engineering a harness around it. The harness is everything that surrounds the model call — repo structure, task framing, tests, permissions, observability, edit boundaries, validation steps, recovery flows. It's the work cell, not the worker.

I think about this the same way I thought about designing reactive microservice architectures with Spring WebFlux and R2DBC: the business logic in any single service was rarely the hard part. The hard part was the surrounding system — backpressure, retries, circuit breakers, structured logging — that turned a service that mostly works into one you could actually run in production and sleep at night. A model without a harness is a service without any of that scaffolding. It might produce a correct answer once. It won't produce correct answers reliably, and when it fails, you won't know why.

## What a harness actually does

- Converts open-ended generation into bounded execution — the agent isn't asked to "fix the bug," it's asked to fix a specific failing test within a specific set of files.
- Designs the workspace the agent operates in, including what it can and can't touch.
- Makes human oversight practical without forcing a human to re-read every token the model produces.
- Shifts quality away from prompt cleverness and toward system design — a well-harnessed mediocre prompt beats a brilliant prompt with no guardrails.
- Turns one-off AI assistance into a repeatable assembly line instead of a lucky one-time result.

## From single agent to software factory

The newer material in the research sharpens this further: the harness is expanding into what's now being called a **software factory** — planning stages, specialized subagents, codified review steps, reusable skills, and environment-level safety boundaries. It's no longer a wrapper around one model call. It's the production system in which multiple agents cooperate, each with a defined role and its own context window.

That framing should feel familiar to anyone who's led an engineering team of twenty-plus people, which is roughly what I did leading the reactive billing product team at IDS. You don't get reliable delivery by hiring smarter individuals and leaving them unmanaged. You get it by defining roles, handoffs, review gates, and a shared understanding of what "done" means before work starts. Harness engineering is that same organizational discipline, compressed into the design of an AI system's operating environment.

The practical takeaway for any team adopting coding agents right now: stop evaluating models in isolation. Evaluate the harness. A weaker model in a well-designed harness will outperform a stronger model dropped into a repo with no tests, no permission boundaries, and no review step — every time.`
  },
  {
    slug: 'context-engineering-is-not-prompt-ornament',
    title: "Context Engineering Isn't Prompt Ornament — It's Infrastructure",
    excerpt:
      'More tokens do not reliably produce more truth. As models get better, the bottleneck shifts to deciding what they should even see.',
    category: 'AI Engineering',
    tags: ['agents', 'context', 'RAG'],
    body: `One claim from the research behind **From Copilot to Colleague** that keeps proving itself true in practice: better models don't remove the need for context engineering. They increase it, because a better model makes more ambitious workflows possible, and ambitious workflows need a much larger, messier set of information to draw on correctly.

Context engineering is the discipline of deciding what information a system should see, in what form, at what moment, with what guarantees of relevance and freshness. It's broader than retrieval. It includes chunking, ranking, summarization, compression, state handoff between agent steps, memory policy, and progressive tool discovery. Treated seriously, it's systems design. Treated casually, it's "just paste more stuff into the context window and hope."

## The failure is shifting, not disappearing

Early agent failures were often simple absence-of-information problems: the model didn't know something it needed to know. That failure mode still exists, but the research points to a second, sneakier one becoming dominant: **context misassembly**. The system sees too much. It sees the wrong layer of abstraction. It pays attention to an overloaded surface where the signal is buried under noise it can't distinguish from substance.

I saw a version of this problem long before LLMs existed, working on the Sberbank.ru migration at AT-Consulting. Integrating the UC2GET component wasn't hard because we lacked data — it was hard because the *right* data was scattered across systems that weren't designed to talk to each other, and the wrong data (stale caches, duplicate records, inconsistent formats) was easy to mistake for signal. Naive stuffing — throwing every available field into the integration — would have made the migration worse, not better. The fix was deciding, explicitly, what each component actually needed to see and in what shape. That's context engineering with a different name.

## What holds up in practice

1. **Naive stuffing fails.** More tokens do not reliably produce more truth — they often just give the model more surface area to get distracted by.
2. **Context is increasingly an interface-design problem**, not only a retrieval problem. Once tools, APIs, and remote servers become part of the environment, someone has to decide what capabilities are even visible to the agent at a given moment, and when.
3. **Treat the context window as a scarce operational budget**, not a bottomless scratchpad. Every token you spend on irrelevant history is a token you didn't spend on the thing that actually matters right now.
4. **Memory and tool use have to cooperate.** A system that retrieves well but manages state poorly will still produce inconsistent behavior across a multi-step task.

The organizing question for any team building agent workflows shouldn't be "how do we give the model more context." It should be "how do we guarantee the model sees the right slice of the world, at the right layer, at the right moment" — which is a much harder and much more valuable question to answer well.`
  },
  {
    slug: 'one-shot-ai-failure-is-a-workflow-bug-not-a-model-limit',
    title: "One-Shot AI Failure Is a Workflow Bug, Not a Model Limit",
    excerpt:
      "When a complex task fails on the first try, the instinct is to blame the model. Almost always, the real bug is in how the work was framed.",
    category: 'AI Engineering',
    tags: ['agents', 'evals', 'workflow design'],
    body: `A pattern that shows up constantly in the research for **From Copilot to Colleague**, and constantly in my own work leading engineering teams: one-shot thinking. A team expects a model to solve a complex task correctly in a single pass, the output disappoints, and the conclusion drawn is "the model isn't good enough yet." Usually the actual problem is upstream of the model entirely.

## The failure pattern

1. A human gives a broad instruction.
2. The model produces a plausible-looking output.
3. The output gets treated as finished work rather than a draft.
4. Hidden requirements and edge cases surface later, usually in production.
5. The team blames the model instead of the workflow that handed it an underspecified task and skipped every intermediate check.

I've watched this exact five-step pattern play out with human teams, long before agents were involved. Hand a junior engineer a one-line ticket — "make search faster" — walk away, and come back expecting a finished, correct, edge-case-covered feature, and you'll be disappointed for reasons that have nothing to do with the engineer's competence. The instruction didn't specify what "faster" meant, what the acceptable trade-offs were, or what "done" looked like. Blaming the engineer for a specification failure would be absurd. Blaming the model for the identical failure is just as absurd, but far more common, because we haven't built the habit of treating AI delegation with the same rigor we'd apply to delegating to a person.

## The better pattern

Turn intent into a spec or task frame before generation starts. Give the system the context and constraints it actually needs — not everything you have, the relevant slice. Build in an intermediate check: a test, a partial review, an evaluator pass, before the output is treated as final. Iterate against feedback instead of accepting the first plausible answer.

This connects directly to harness engineering, evals, and observability — they're all responses to the same insight: production AI work improves through iteration and structure, not through a single perfect prompt. It's also the clearest explanation I have for why "vibe coding" — asking for a thing and accepting whatever comes back — has to mature into structured delegated work the moment the stakes go above toy projects. The models keep getting better. The one-shot expectation is what needs fixing, and no model improvement will fix it for you.`
  },
  {
    slug: 'agent-observability-debugging-what-you-cannot-diff',
    title: 'Agent Observability: Debugging What You Cannot Diff',
    excerpt:
      "Classic telemetry tells you a request failed. Agent telemetry has to explain a much messier reality: what the model saw, what it chose, and where the workflow drifted.",
    category: 'AI Engineering',
    tags: ['agents', 'observability', 'evals'],
    body: `Agent observability came up constantly while researching **From Copilot to Colleague**, and it's a topic I have direct, pre-LLM experience with: managing IT infrastructure for Sochi 2014 taught me that observability isn't a dashboard you check when something feels wrong — it's the only reason you can tell the difference between "working" and "about to fail" in a system too large for any one person to hold in their head. Agent systems have the same property, with a harder problem underneath it.

Classic software telemetry answers a narrow question: did the request fail, did the service get slow. Agent telemetry has to explain something much messier — what the model saw, which tool it chose and why, what happened inside that tool call, what state changed as a result, where the workflow drifted from what you expected, and where a human could have intervened but didn't get the chance to.

## Observability, eval, and governance are converging

The sharpest framing I've come across in the research is that observability, evaluation, and governance are increasingly the same problem viewed from different angles. That tracks with what I've seen managing systems at scale: a good trace isn't just for incident response after something breaks. It's raw material for building better eval sets, for finding the brittle assumptions baked into your harness, and for deciding where you're missing a human control surface entirely.

The operational version of this is what some of the research calls **trace-linked evaluation** — when an eval signal fails, an operator should be able to jump directly into the specific trajectory that produced the failure and compare it against prior runs, rather than starting a debugging session from zero. That's a direct analog to distributed tracing in microservices: knowing a transaction failed is nearly useless without the ability to walk the exact path it took through every service it touched.

## What this looks like in practice

- Traces and trajectory views that make non-deterministic behavior legible instead of mysterious.
- A connection back from production traces into the offline eval loop — every real failure becomes a candidate eval case, not just a Slack message.
- Enough visibility that a human supervising a long-running or parallelized agent task can actually intervene, instead of discovering the outcome after the fact.
- Evidence trails sufficient for compliance and trust decisions — which matters enormously the moment agents touch anything regulated, financial, or customer-facing, a lesson banking integrations taught me well before agents existed.

The uncomfortable truth for teams shipping agents fast: if you can't explain why an agent did what it did after the fact, you don't actually have an agent in production. You have a black box you're hoping keeps behaving. Observability is what turns the second thing into the first.`
  },
  {
    slug: 'evals-before-more-model',
    title: 'Evals Before More Model',
    excerpt:
      "Teams reach for a bigger model when a workflow underperforms. The research — and two decades of shipping software — suggests the fix is almost always measurement, not scale.",
    category: 'AI Engineering',
    tags: ['evals', 'reliability', 'engineering practice'],
    body: `Evals & Reliability is the single largest theme across the research corpus behind **From Copilot to Colleague** — it touches nearly 380 of the talks I've synthesized, more than any other topic. That density isn't an accident. It reflects an industry-wide realization that arrived later than it should have: you cannot improve what you cannot measure, and most teams shipping AI features had no measurement layer at all.

This isn't a new lesson, just a new domain. Every serious engineering org I've worked in — banking integrations, Olympic-scale infrastructure, enterprise billing platforms — had some version of "we don't ship without tests." Nobody argued this slowed teams down in a way that mattered, because the alternative (shipping broken things faster) was obviously worse. AI-powered features got a strange exemption from this instinct for a while, largely because "how do you write a test for a probabilistic system" felt like a hard question. It's a hard question. It's not an unanswerable one, and the corpus is full of teams who answered it.

## What a real eval practice includes

- **LLM-as-judge rubrics** that score outputs against explicit criteria, not vibes — and judges that get their own evaluation, because a judge nobody has calibrated is just a second unreliable opinion.
- **Structural and schema checks** that catch a huge share of failures cheaply, before you ever need a judge model.
- **Gold-standard reference outputs**, curated and maintained, the same way you'd maintain a regression test suite — they rot if nobody owns them.
- **Trace-linked evaluation**, so a failing eval signal points directly at the trajectory that produced it instead of starting every investigation from zero.
- **Human annotation feeding back into the judge**, because judge-based systems drift and need recalibration against real human judgment on a cadence, not once at launch.

## The instinct to resist

When a workflow underperforms, the fastest-feeling fix is switching to a bigger, more expensive model. Sometimes that's genuinely the answer. Far more often, in the research and in my own experience building reactive systems that had to hit real SLAs, the workflow was underspecified, the context was wrong, or there was no measurement telling you *what specifically* was failing — so you couldn't have targeted a fix even if you wanted to. Scaling the model papers over the symptom without ever finding the cause, and it's the most expensive way to not fix your problem.

Building an eval layer before scaling the model isn't caution for its own sake. It's the only way to know whether the next change you make actually helped.`
  },
  {
    slug: 'org-design-for-constrained-delegation-not-autonomy',
    title: 'Org Design for Constrained Delegation, Not Autonomy',
    excerpt:
      'Adding AI agents to a team is an org design problem before it is a tooling problem. Get the roles and review gates wrong, and better models will not save you.',
    category: 'AI Engineering',
    tags: ['leadership', 'org design', 'agents'],
    body: `Org Design & Leadership is the most-discussed theme in the research corpus behind **From Copilot to Colleague** apart from coding agents themselves — 241 talks and counting touch it. That matches something I learned leading teams of twenty-plus engineers on enterprise platforms, long before AI agents existed: the org chart is a technical decision. Get the boundaries and review gates wrong, and no amount of individual talent — human or model — will produce a reliable system.

Adding AI agents to an existing team isn't primarily a tooling rollout. It's a second org design problem stacked on top of the first one. Who reviews an agent's output? At what stage? What happens when an agent's proposed change touches something a human hasn't looked at in a year? These aren't questions a model card answers. They're questions a leader has to answer deliberately, the same way you'd answer them for a new hire — except the "hire" can operate at a speed and volume no human team lead has ever had to plan around before.

## What actually needs deciding

**Roles, not just permissions.** A planner-generator-evaluator split, borrowed from the software factory concept, mirrors a real engineering org: someone decomposes the problem, someone implements, someone reviews adversarially rather than rubber-stamping. Assigning these roles to agents doesn't remove the need for the roles — it just changes who fills them.

**Review capacity as a hard constraint.** An agent system that produces ten times the pull requests a team could review manually isn't ten times more productive. It's a queue that will either bottleneck on human review or get rubber-stamped, and rubber-stamped review is worse than no review because it looks like safety while providing none. Intercom's internal data — roughly 17.6% of PRs auto-approved through an automated pipeline — is notable precisely because it shows a *deliberate, measured* automation of part of the review gate, not a removal of it.

**A maturity ladder, not a leap.** Use the tool manually, then automate the repeatable parts, then codify the automation into a reusable skill, then optimize the environment specifically for agents to operate in. Skipping straight to "agents run the pipeline" without walking that ladder is how teams end up with impressive demos and no idea how to debug a production incident six months later.

## The leadership job hasn't changed

What's changed is the throughput a well-designed team can achieve and the speed at which a badly-designed one accumulates invisible risk. The leadership job — define roles clearly, make review gates real instead of theatrical, build a maturity path instead of a leap of faith — is the same job it's always been. It just now applies to a workforce that includes agents, and the cost of getting it wrong compounds faster than it used to.`
  },
  {
    slug: 'mcp-and-the-interface-design-problem-hiding-inside-tool-use',
    title: 'MCP and the Interface Design Problem Hiding Inside Tool Use',
    excerpt:
      "A protocol for connecting agents to tools was never going to be the hard part. Deciding what a tool should expose, and when, is."
    ,
    category: 'AI Engineering',
    tags: ['MCP', 'tooling', 'agents'],
    body: `MCP & Tooling shows up across 111 talks in the research behind **From Copilot to Colleague**, and the theme that unifies almost all of them isn't the protocol itself — it's what the protocol exposes once you actually try to use it at scale: tool design is interface design, and most teams are bad at interface design for the same reasons they've always been bad at API design, just with higher stakes now.

I spent years designing API gateways and service contracts for banking and enterprise platforms. The lesson that transfers almost unchanged: an interface that technically works but exposes too much, or exposes the wrong abstraction, or doesn't tell the caller when *not* to use it, will get misused in exactly the ways you didn't anticipate. MCP servers are having this lesson relearned in public, one bad server at a time.

## Where it actually breaks

**Security.** An MCP server that wasn't designed with the assumption that an agent might be manipulated into misusing it "won't survive production" — that's a near-direct quote from the research, and it matches every hard lesson I've seen about trusting client input in a system that touches real infrastructure. Treat every tool boundary as a trust boundary, because it is one.

**Capability sprawl.** A server that exposes forty tools "just in case" doesn't give an agent more power — it gives the agent a bigger space to make a wrong choice in, and gives you a bigger space to have to reason about when something goes wrong. Progressive tool discovery — showing the agent only what's relevant to the current step — is the tool-use equivalent of least-privilege access.

**The "your MCP server is bad" problem.** A pointed talk title from the research, but an accurate one: many early MCP servers were built by exposing whatever an internal API already did, without redesigning it for an agent caller instead of a human one. A human reading API docs can infer intent and correct for ambiguity. An agent calling a tool acts on the literal interface it's given. If that interface is ambiguous, the agent will be too.

**Code-mode as an alternative.** Some of the more interesting recent material argues for letting agents write and execute code against a tool's underlying API directly, rather than forcing every interaction through a fixed set of pre-defined tool calls — "let the code do the talking" rather than negotiating everything through a rigid schema. It's not a universal answer, but it's a sign the field is still actively rethinking what the right abstraction even is.

The pattern across all of this: MCP solved the transport problem — how an agent connects to a tool. It did not solve, and can't solve, the design problem — what that tool should expose, to whom, under what constraints. That's still an engineering judgment call, and right now most teams are making it without the decades of API-design scar tissue that would tell them where the sharp edges usually are.`
  },
  {
    slug: 'software-factories-start-with-a-spec',
    title: 'Software Factories Start With a Written Spec, Not a Prompt',
    excerpt:
      'The teams getting real throughput from AI engineering are not the ones with the best prompts. They are the ones who turned intent into a contract before generation started.',
    category: 'AI Engineering',
    tags: ['spec-driven development', 'software factory', 'agents'],
    body: `Two concepts from the research behind **From Copilot to Colleague** turn out to be the same idea at two different scales: spec-driven development at the level of a single task, and the software factory at the level of an entire engineering org. Both rest on the same premise — that as generation gets cheaper, ambiguity gets more dangerous, not less.

## Specs as alignment artifacts, not documentation

Spec-driven development treats a spec as a contract that both humans and agents can implement against reliably — not paperwork that happens after the real work is done. A good spec shrinks the search space before generation starts, gives reviewers something concrete to compare output against, and doubles as a seed for the eval set you'll eventually need anyway. The corpus is blunt about the failure mode this prevents: as coding agents get more capable, a vague request becomes more dangerous, because the agent will confidently fill the ambiguity with something plausible-looking and wrong, at a speed no human reviewer can keep up with by just reading diffs.

This is not bureaucracy-driven development in disguise. Spec quality compounds with repo quality — agents perform better when system boundaries are already explicit, which means the spec habit and the clean-architecture habit reinforce each other rather than competing for time.

## The factory is the spec, scaled up across a pipeline

The software factory concept is what happens when you apply that same discipline across an entire delivery pipeline instead of a single task: specialized agents handling planning, implementation, review, and testing as distinct stages, with humans supervising the pipeline rather than executing inside it. The clearest version in the research is a three-stage split — a planner that decomposes the work, a generator that implements, and an evaluator that grades against a pre-negotiated contract by actually exercising the running app, not by reading a diff. Each stage gets its own context window, mirroring how a real engineering team splits cognitive load across roles rather than asking one person to plan, build, and QA simultaneously.

I recognize this structure because I've built versions of it with human teams: a billing platform team of twenty-plus people isn't productive because everyone is smart. It's productive because decomposition, implementation, and review are distinct stages with clear handoffs and nobody is grading their own homework. The software factory just formalizes that same separation of concerns and runs part of it through agents instead of exclusively through people.

## The throughput number worth paying attention to

Intercom's internal maturity ladder — use the tool, automate the repeatable parts, codify into a reusable skill, optimize the environment for agents — produced roughly a 2x throughput multiplier, and the skills catalog that made it possible is really just an encoded set of specs: pre-negotiated contracts for common tasks that any agent can invoke without renegotiating intent from scratch every time. That's the payoff spec-driven development is actually chasing. Not neater documentation — a system where intent only has to be clarified once, and then it compounds.`
  }
]
