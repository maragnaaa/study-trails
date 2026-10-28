---
name: trail-outline
description: Creates plan.md (numbered steps, blocks, sub-guides, diagram) and the main guide skeleton with PENDING block markers, in the learner's language, then runs the approval step. Use in the OUTLINE and AWAITING_APPROVAL phases, after research and before writing any step.
---

# Preconditions
- Read `profile.md`, `sources.md`, `notes.md` and `state.md`. Phase must be
  OUTLINE or AWAITING_APPROVAL. Take `language` and `kind` from `state.md`.

# Planning rules
- Size the scope to the profile (hours per week × deadline). Narrow and
  complete beats broad and shallow.
- 3 to 6 blocks and 10 to 30 steps in total. Steps are numbered continuously
  across blocks (1, 2, 3...). Excess scope becomes a suggested follow-up trail.
- Order: each step may use only what earlier steps introduced or what the
  "Before you start" section assumes.
- `build` guides: steps follow the order in which a person would actually build
  it (setup, foundations, repeated units, wiring, run). `concept` guides:
  steps follow the dependency order of ideas, each with a concrete example.
- Sub-guide rule: a step gets its own sub-guide when it is a self-contained
  artifact (a file to create, a configuration unit) or a concept deep dive that
  would need more than about 8 lines. Everything else stays inline.
- Sub-guide names: the artifact's real name (e.g. `env.js`) or a short
  kebab-case name. Must be unique: `glob` `trails/**/<name>.md` first, and if
  it exists in another trail, make the name more specific. Never use `state`,
  `profile`, `plan`, `notes`, `sources` or the slug.

# Language tables (use the column of the stored language; never mix languages)
| Element | en | pt-BR | es |
|---|---|---|---|
| Stack (build) | Stack | Stack | Stack |
| Core concepts (concept) | Core concepts | Conceitos-chave | Conceptos clave |
| Before you start | Before you start | Antes de começar | Antes de empezar |
| Final structure (build) | Final structure | Estrutura final | Estructura final |
| Cheat sheet (concept) | Cheat sheet | Resumo rápido | Resumen rápido |
| References | References | Referências | Referencias |

# File 1: trails/<slug>/plan.md (the artifact the learner approves)
~~~
# Plan — <Topic>
- Kind: <build | concept> · Language: <code> · Level: <starting level>

## <Stack | Core concepts>
- **Name** → one-line role

## Steps
| No. | Step | Block | Sub-guide | What the learner does or learns |
|-----|------|-------|-----------|---------------------------------|

## Diagram (draft)
(mermaid; see rules)

## Closing
- build: planned final folder structure (tree)
- concept: planned cheat-sheet rows
~~~
Diagram rules: `flowchart LR` for processes and data flow, `mindmap` for concept
hierarchies. Short labels, no parentheses, quotes or colons inside labels
(except the cylinder syntax for databases). The diagram must only show things
the guide teaches.

# File 2: main guide skeleton, trails/<slug>/<slug>.md
~~~
---
topic: <Topic>
language: <code>
level: <starting level>
kind: <build | concept>
---
# <Guide title in the learner's language>

<2 to 3 sentences: what the learner will build or understand, and for whom>

## <Stack | Core concepts>
- **Name** → one-line role

## <Before you start>
- assumed knowledge and tools (short; no links)

---
<!-- PENDING:block-01 -->

---
<!-- PENDING:block-02 -->

(one marker per block, separated by `---`)

---
## <Diagram title specific to the topic, e.g. "Request flow">
(mermaid from plan.md)

<!-- PENDING:closing -->
~~~
Do not write any step text here; step headings and content are written by the
`step-expansion` skill.

# Approval (mandatory gate)
1. Update `state.md`: fill the "Blocks" table (all `pending`, plus a `closing`
   row), `phase: AWAITING_APPROVAL`, `next_step: wait for learner approval`.
2. To the learner, in their chat language, show ONLY: the steps grouped by
   block (number, title, sub-guide if any), the diagram idea in one line, and the
   paths of `plan.md` and the main guide. Ask them to reply with an approval word
   or say what to adjust.
3. If they ask for adjustments: edit `plan.md`, the markers/diagram in the main
   guide skeleton and the Blocks table in `state.md`; record the request under
   "Learner decisions"; ask again.
4. Only on an explicit approval: set in `state.md` `outline_approval: approved`,
   `phase: EXPANSION`, `next_step: expand block-01`.