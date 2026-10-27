---
name: module-expansion
description: Expands one module at a time of the approved trail.md, replacing its PENDING marker with full content between START/END markers, written in the trail's language. Use in the EXPANSION phase, only after approval is recorded in state.md. Also use to rewrite a specific module on the learner's request.
---

# Preconditions (verify before writing anything)
1. Read `state.md`. If `outline_approval` is not `approved`, STOP and go back
   to the `trail-outline` skill. Take `language` from it.
2. Read `profile.md` (level and style) and `sources.md`.
3. Pick the module: the first one with status `pending` in the `state.md`
   table (or the one the learner asked for).
4. Read that module's row in the Overview of `trail.md` and, if it has
   dependencies, the content of the modules it depends on. Do not repeat what
   was already taught; refer to it ("see Stage 02").

# Labels (use the column of the stored language)
| Element | en | pt-BR | es |
|---|---|---|---|
| Why it matters | Why it matters | Por que importa | Por qué importa |
| Concepts | Concepts (in study order) | Conceitos (na ordem de estudo) | Conceptos (en orden de estudio) |
| Study | Study | Estude | Estudia |
| Practice | Practice | Prática | Práctica |
| Goal | Goal | Objetivo | Objetivo |
| Deliverable | Deliverable | Entregável | Entregable |
| Done when | Done when | Critério de pronto | Criterio de terminado |
| If you get stuck | If you get stuck | Se travar | Si te atascas |
| Checkpoint | Checkpoint | Checkpoint | Punto de control |
| Expected answers | Expected answers | Respostas esperadas | Respuestas esperadas |
| Stage completed | Stage completed | Etapa concluída | Etapa completada |
| Untested | untested | não testado | no probado |
| Source language flag | (EN) when the source is in English and the trail is not | same | same |

# Module template (all sections, in this order)
```
<!-- START:module-NN -->
**<Why it matters>:** 2 to 3 sentences tied to the learner's goal.

**<Concepts>:**
- ...

**<Study>:**
- [title](URL from sources.md): what to read and what to skip

**<Practice>:**
- <Goal>: ...
- <Deliverable>: ...
- <Done when>: how the learner knows they finished
- <If you get stuck>: one hint, without giving the solution

**<Checkpoint>:**
1. ...
2. ...
3. ...
<details><summary><Expected answers></summary>
One line per question.
</details>

- [ ] <Stage completed>
<!-- END:module-NN -->
```

# Writing rules
- 300 to 600 words per module, not counting code.
- Calibrate to the profile: do not teach from scratch what the learner already knows.
- Checkpoints test understanding (why, when, what happens if), not memorization.
- Code: short, preferably adapted from the documentation consulted; self-written
  examples carry "(<untested>)". You do not run code.
- Use only links from `sources.md` with status `verified`. When the source's
  language differs from the trail's, append its language tag (e.g. "(EN)").
- Write everything in the trail's language. Keep code, identifiers, commands
  and official names untranslated.

# How to write it
1. Replace the marker `<!-- PENDING:module-NN -->` with the full block, using a
   targeted edit. The marker is unique on its own.
2. Confirm with `grep` for `START:module-NN` (must exist) and
   `PENDING:module-NN` (must not exist).
3. To rewrite an already expanded module, replace the content between `START`
   and `END`, keeping the markers.

# State update
- Mark the module `expanded` in the `state.md` table and update `next_step`.
- Report to the learner in ONE line (in their language) and move on to the next
  module without asking permission for each one.
- When no `pending` module remains: `phase: VALIDATION`,
  `next_step: load the trail-validation skill`.