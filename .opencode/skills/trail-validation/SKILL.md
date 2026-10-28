---
name: trail-validation
description: Reviews the complete guide before delivery (markers, step numbering, wikilinks and sub-guides, self-containedness, facts against notes, order, language, mermaid, style), fixes problems with targeted edits and closes the trail. Use in the VALIDATION phase, when every block and the closing unit are expanded.
---

# Preconditions
- `state.md` with every unit `expanded` and `phase: VALIDATION`.
- Read the main guide (in parts if long), `plan.md`, `notes.md`, `sources.md`,
  `profile.md`. Take `language` and `kind` from `state.md`.

# Checklist (fix each failure with a targeted edit; never rewrite the whole file)
1. No `PENDING` marker left (use `grep`). Every block and `closing` has
   `START` and `END`.
2. Step numbers run 1..N without gaps and match `plan.md`.
3. Every `[[wikilink]]` resolves to a file in `trails/<slug>/`, and every
   sub-guide planned in `plan.md` exists. Use `glob` to find orphan files that
   nothing links to.
4. Self-contained: no step tells the learner to read a page or follow a link in
   order to learn something. Links appear only under References, and each one
   is a `verified` source in `sources.md`.
5. Facts: spot-check at least 5 commands, versions, flags or config keys from
   the guide against `notes.md` (use `grep`). Anything unsupported is removed or
   sent back to `source-research`.
6. Order: no step uses something introduced later. Anything assumed is listed in
   "Before you start".
7. Language: every heading, label and callout title matches the language tables
   of `trail-outline` and `step-expansion` for the stored `language`; no passage
   in another language (code, identifiers and official names excepted).
8. Diagram: valid mermaid (short labels, no parentheses, quotes or colons) and
   it shows only things the guide teaches.
9. Style: no code block over 10 lines except configuration files; no step
   delivers a full implementation; frontmatter present.

# Output and state update
- Record in "Caveats" of `state.md` whatever could not be fixed
  (e.g. "step 12 relies on a partial source", "snippets are untested").
- `phase: DONE`, `next_step: wait for deepening requests`.
- To the learner, in their language: the main guide path, the number of steps
  and sub-guides, the caveats, and how to continue (deepen a block, add a
  sub-guide, change the language, or start the suggested follow-up trail).