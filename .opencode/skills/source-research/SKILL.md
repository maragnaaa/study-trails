---
name: source-research
description: Finds and verifies sources (official documentation, references, books) for a study trail using Context7 and web search, and writes sources.md. Use in the RESEARCH phase, after the interview and before the outline. Nothing may be cited in the trail unless it went through this skill.
---

# Preconditions
- Read `profile.md` and `state.md`. The phase must be RESEARCH.
- If `sources.md` already exists, read it and extend it instead of starting over.

# Procedure
1. From the goal and level in the profile, derive 5 to 8 subtopics the trail
   must cover. List them at the top of `sources.md`.
2. For each subtopic, choose the tool:
   - Language, framework or library: Context7 first. Resolve the library ID,
     then query the documentation with a specific question.
   - Concept, architecture, logic, best practices: web search and `webfetch`.
3. Preference order: official documentation > recognized book or course >
   technical article by an identifiable author > blog. Discard forums and
   anonymous content.
4. Mark each source's status:
   - `verified`: the tool returned the content in this session and you read it.
   - `partial`: it only appeared in search results and you did not open the page.
   Only `verified` sources may become links in the trail.
5. Record the version researched (e.g. "Python 3.13") and the source's language
   (`en`, `pt-BR`, `es`). Sources in a language other than the trail's are fine
   (official docs are often English-only); the trail must flag them (see the
   module-expansion skill).
6. Paraphrase. Do not copy long passages from documentation; summarize and link.

# Output: trails/<slug>/sources.md
```
# Sources — <Topic>
## Subtopics
1. ...
## Table
| Subtopic | Source | URL | Type | Version | Lang | Status |
|---|---|---|---|---|---|---|
## Gaps
- (subtopics without a verified source)
```
Write free text (subtopics, gaps) in the learner's language; keep table values
in their original form.

# Gate and state update
- Gate: at least one `verified` official source for the core topic. If there
  is none, tell the learner and ask how to proceed.
- In `state.md`: `phase: OUTLINE`, `next_step: load the trail-outline skill`;
  copy the gaps to "Caveats".