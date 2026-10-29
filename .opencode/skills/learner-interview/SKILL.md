---
name: learner-interview
description: Runs the initial interview that calibrates a study guide (goal, guide kind, current level, time, environment), detects the learner's language, and creates the state and profile files in agent-mem. Use in the INTERVIEW phase, before any research or writing. Do not use if profile.md already exists and the learner did not ask to redo it.
---

# Preconditions
- Slug defined (rules in the agent prompt).
- If `agent-mem/<slug>/profile.md` already exists: do not redo the interview;
  just confirm with the learner whether anything changed.

# Procedure
1. Detect the learner's language (`en`, `pt-BR` or `es`) from their messages.
   If it is not one of these, ask which of the three they prefer.
2. Create `agent-mem/<slug>/state.md` from the template below (phase INTERVIEW),
   including `topic` and `language`. This keeps a record even if the session
   dies mid-interview.
3. Skip questions the learner already answered in their request. Ask what is
   missing in ONE message, at most 4 numbered items, in the learner's language:
   1. Goal: what do they want to have at the end (a working project or setup,
      or a solid understanding of the concepts)?
   2. What they already know that is adjacent to the topic
   3. Hours per week and desired deadline
   4. Environment and preferences (OS, language/runtime versions, tools,
      stack choices, anything they must or must not use)
4. If an answer is vague, assume a reasonable value and STATE the assumption
   instead of asking again.
5. Decide `kind`: `build` if the goal is a working project, system or setup;
   `concept` if the goal is understanding, a mental model or theory. If both,
   choose `build` and say so in the assumptions.
6. Write `agent-mem/<slug>/profile.md` (free text in the learner's language):

~~~
# Profile: <Topic>
- Language: <en | pt-BR | es>
- Kind: <build | concept>
- Goal:
- Starting level:
- Already knows:
- Hours per week:
- Deadline:
- Environment and preferences:
- Assumptions made:
~~~

# state.md template
~~~
# State: <Topic>
- slug: <slug>
- topic: <topic as the learner wrote it>
- language: <en | pt-BR | es>
- kind: <build | concept>
- main_guide: trails/<slug>/<slug>.md
- phase: INTERVIEW
- outline_approval: pending
- next_step: Finish the interview and write profile.md

## Blocks
| No. | Title | Steps | Status |
|-----|-------|-------|--------|

## Learner decisions
- (requested changes, in chronological order)

## Assumptions
-

## Caveats
-
~~~
Valid `phase` values: INTERVIEW, RESEARCH, OUTLINE, AWAITING_APPROVAL,
EXPANSION, VALIDATION, DONE. Valid block status values: pending, expanded.

# Output and state update
- In `state.md`: set `kind`, `phase: RESEARCH`,
  `next_step: load the source-research skill`, and copy the assumptions.
- To the learner (in their language): summarize the profile in at most 3 lines,
  state the assumptions, and go straight to research. They can correct anything later.