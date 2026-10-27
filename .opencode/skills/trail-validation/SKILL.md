---
name: trail-validation
description: Reviews the complete trail.md before delivery (markers, dependencies, links, hours, template, language consistency, mermaid, glossary), fixes problems with targeted edits and closes the trail. Use in the VALIDATION phase, when all modules are expanded.
---

# Preconditions
- `state.md` with every module `expanded` and `phase: VALIDATION`.
- Read `trail.md` (in parts if long), `sources.md`, `profile.md`, and take
  `language` from `state.md`.

# Checklist (fix each failure with a targeted edit; never rewrite the whole file)
1. No `PENDING` marker left (use `grep`). Every module has `START` and `END`.
2. Module order respects the "Depends on" column.
3. Every URL in the document appears in `sources.md` with status `verified`
   (check with `grep`; use `webfetch` on at most 3 links if in doubt).
4. The sum of the Overview hours matches the header total and the profile.
5. Every module has all 6 parts of the template.
6. Language consistency: all headings and labels match the language tables of
   the `trail-outline` and `module-expansion` skills for the stored `language`;
   no passage written in another language (code, identifiers and official names excepted).
7. Mermaid: short nodes, no parentheses, colons, quotes or commas; consistent indentation.
8. Final sections filled: Capstone project (uses only what was taught, nothing
   new), Common pitfalls, Going further, Glossary (every relevant technical
   term used in the modules).
9. No version or API claim without a matching source.

# Output and state update
- Record in "Caveats" of `state.md` whatever could not be fixed
  (e.g. "module 4 has no verified source", "examples are untested").
- `phase: DONE`, `next_step: wait for deepening requests`.
- To the learner, in their language: file path, number of modules, total hours,
  caveats, and how to continue (ask to deepen module N, rewrite a module, change
  the document language, or start a new trail).