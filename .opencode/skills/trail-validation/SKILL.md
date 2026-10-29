---
name: trail-validation
description: Reviews the complete guide before delivery (leftover markers, step numbering, wikilinks and sub-guides, folder hygiene, self-containedness, facts against notes, order, language, writing style), fixes problems with targeted edits and closes the trail. Use in the VALIDATION phase, when every block and the closing unit are expanded.
---

# Preconditions
- `agent-mem/<slug>/state.md` with every unit `expanded` and `phase: VALIDATION`.
- Read the main guide (in parts if long) and the files in `agent-mem/<slug>/`.
  Take `language` and `kind` from `state.md`.

# Checklist (fix each failure with a targeted edit; never rewrite a whole file)
1. No HTML comments: `grep` for `<!--` across `trails/<slug>/` must return
   nothing. This covers any leftover `PENDING` marker.
2. Step numbers run 1..N without gaps and match `plan.md`.
3. Every `[[wikilink]]` resolves to a file in `trails/<slug>/`, every sub-guide
   planned in `plan.md` exists, and no guide file is orphaned (use `glob`).
4. Folder hygiene: `trails/<slug>/` contains only the main guide and sub-guides.
   No state, notes, plan, profile or sources file, and no mermaid block or
   diagram section anywhere in the guide.
5. Self-contained: no step tells the learner to read a page or follow a link in
   order to learn something. Links appear only under References, and each one
   is a `verified` source in `sources.md`.
6. Facts: spot-check at least 5 commands, versions, flags or config keys from
   the guide against `notes.md` (use `grep`). Anything unsupported is removed or
   sent back to `source-research`.
7. Order: no step uses something introduced later. Anything assumed is listed in
   "Before you start".
8. Language: every heading, label and callout title matches the language tables
   of `trail-outline` and `step-expansion` for the stored `language`; no passage
   in another language (code, identifiers and official names excepted).
9. Writing style, using `grep` across `trails/<slug>/`:
   - no em dash or en dash characters;
   - no emojis or decorative symbols (the arrow in the Stack list is allowed);
   - no exclamation marks outside code;
   - none of the banned openers, closers and hype words from section 9 of the
     agent prompt;
   - no bullet that starts with a bold label.
10. Shape: no code block over 10 lines except configuration files; no step
    delivers a full implementation; frontmatter present in the main guide.

# Output and state update
- Record in "Caveats" of `state.md` whatever could not be fixed
  (e.g. "step 12 relies on a partial source", "snippets are untested").
- `phase: DONE`, `next_step: wait for deepening requests`.
- To the learner, in their language: the main guide path, the number of steps
  and sub-guides, the caveats, and how to continue (deepen a block, add a
  sub-guide, change the language, or start the suggested follow-up trail).