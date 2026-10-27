---
name: learner-interview
description: Runs the initial interview that calibrates a study trail (goal, current level, time, style), detects the learner's language, and creates the state and profile files. Use in the INTERVIEW phase, before any research or writing. Do not use if profile.md already exists and the learner did not ask to redo it.
---

# Preconditions
- Slug defined (rules in the agent prompt).
- If `trails/<slug>/profile.md` already exists: do not redo the interview;
  just confirm with the learner whether anything changed.

# Procedure
1. Detect the learner's language (`en`, `pt-BR` or `es`) from their messages.
   If it is not one of these, ask which of the three they prefer.
2. Create `trails/<slug>/state.md` from the template below (phase INTERVIEW),
   including `topic` and `language`. This keeps a record even if the session
   dies mid-interview.
3. Skip questions the learner already answered in their request. Ask what is
   missing in ONE message, at most 4 numbered items, written in the learner's language:
   1. Concrete goal (e.g. get a job, migrate a service, curiosity)
   2. What they already know that is adjacent to the topic
   3. Hours per week and desired deadline
   4. Preference: more theory, more practice, or balanced
4. If an answer is vague, assume a reasonable value and STATE the assumption
   instead of asking again.
5. Write `trails/<slug>/profile.md` (free text in the learner's language):

```
# Profile — <Topic>
- Language: <en | pt-BR | es>
- Goal:
- Starting level:
- Already knows:
- Hours per week:
- Deadline:
- Style (theory/practice):
- Assumptions made:
```

# state.md template
```
# State — <Topic>
- slug: <slug>
- topic: <topic as the learner wrote it>
- language: <en | pt-BR | es>
- phase: INTERVIEW
- outline_approval: pending
- next_step: Finish the interview and write profile.md

## Modules
| No. | Name | Status |
|-----|------|--------|

## Learner decisions
- (requested changes, in chronological order)

## Assumptions
-

## Caveats
-
```
Valid `phase` values: INTERVIEW, RESEARCH, OUTLINE, AWAITING_APPROVAL,
EXPANSION, VALIDATION, DONE. Valid module status values: pending, expanded.

# Output and state update
- In `state.md`: `phase: RESEARCH`, `next_step: load the source-research skill`,
  and copy the assumptions to the "Assumptions" section.
- To the learner (in their language): summarize the profile in at most 3 lines,
  state the assumptions, and go straight to research. They can correct anything later.