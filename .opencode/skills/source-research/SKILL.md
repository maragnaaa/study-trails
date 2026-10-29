---
name: source-research
description: Finds and verifies sources for a study guide using Context7 and web search, then distills them into sources.md (verified references) and notes.md (commands, versions, flags, concepts and pitfalls in the agent's own words), both in agent-mem. Use in the RESEARCH phase, after the interview and before the plan, and again whenever a fact needed to write is missing from notes.md.
---

# Why this skill matters
The guide must be self-contained: the learner will not open links. Everything
the guide teaches comes from `notes.md`, so research quality decides guide quality.

# Preconditions
- Read `agent-mem/<slug>/profile.md` and `state.md`. The phase must be RESEARCH
  (or you were sent here by a missing fact during EXPANSION).
- If `sources.md` or `notes.md` already exist, read them and extend them.

# Procedure
1. From the goal, kind, level and environment in the profile, derive 5 to 8
   subtopics the guide must cover. List them at the top of `notes.md`.
2. For each subtopic choose the tool:
   - Language, framework or library: Context7 first. Resolve the library ID,
     then query the documentation with SPECIFIC questions (exact setup
     commands, configuration keys, API behavior, breaking changes).
   - Concept, architecture, logic, best practices: web search and `webfetch`.
3. Preference order: official documentation > recognized book or course >
   technical article by an identifiable author > blog. Discard forums and
   anonymous content.
4. Mark each source's status:
   - `verified`: the tool returned the content in this session and you read it.
   - `partial`: it only appeared in search results and you did not open the page.
   Only `verified` sources may be listed in the guide's References.
5. For each subtopic, write into `notes.md` what a learner needs to follow
   the guide without the docs:
   - exact commands and installation steps, with versions;
   - configuration keys and what each does;
   - key behavior and the reasoning behind it;
   - pitfalls and version-specific traps (breaking changes, deprecated options);
   - what the learner should see when it works.
   Write in your own words; commands and short syntax may be verbatim. Never
   copy long passages. Tag each item with its source ID, e.g. `[S2]`.
6. Record versions explicitly (e.g. "Prisma 6.19") and the OS or environment
   they apply to.

# Output
`agent-mem/<slug>/sources.md`:
~~~
# Sources: <Topic>
| ID | Title | URL | Type | Version | Lang | Status |
|----|-------|-----|------|---------|------|--------|
## Gaps
- (subtopics without a verified source)
~~~

`agent-mem/<slug>/notes.md`:
~~~
# Notes: <Topic>
## <Subtopic 1>
- <fact, command, flag or behavior> [S1]
- Pitfall: <trap> [S2]
- Expected result: <what the learner sees>
## <Subtopic 2>
...
## Open questions
- (anything unverified; the guide must not state it as fact)
~~~
Free text in the learner's language; commands, identifiers and table values
stay in their original form.

# Gate and state update
- Gate: at least one `verified` official source for the core topic, and notes
  for every subtopic. If there is none, tell the learner and ask how to proceed.
- In `state.md`: `phase: OUTLINE`, `next_step: load the trail-outline skill`;
  copy the gaps and open questions to "Caveats".
- When called back from EXPANSION: add the missing facts, then return to the
  skill that sent you, leaving `phase` unchanged.