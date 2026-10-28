---
name: step-expansion
description: Writes the approved guide one block at a time, replacing each PENDING marker in the main guide with numbered steps and creating the planned sub-guides, always in the guide's language and only from notes.md. Use in the EXPANSION phase, after approval is recorded in state.md. Also use to rewrite a specific block or sub-guide on the learner's request.
---

# Preconditions (verify before writing anything)
1. Read `state.md`. If `outline_approval` is not `approved`, STOP and go back to
   the `trail-outline` skill. Take `language` and `kind` from it.
2. Read `profile.md` and `plan.md`.
3. Pick the unit: the first `pending` block in the `state.md` table (the
   `closing` row comes last), or the one the learner asked for.
4. Read the `notes.md` sections relevant to that block and the last steps of the
   previous block (continuity: do not repeat, refer back: "as in step 4").
5. If a fact you need is not in `notes.md`: load `source-research`, add it,
   then continue. Never fill gaps from memory.

# Labels (use the column of the stored language)
| Element | en | pt-BR | es |
|---|---|---|---|
| Why? (tip callout title) | Why? | Por quê? | ¿Por qué? |
| Warning callout title | Heads up | Atenção | Atención |
| Sub-guide intro | Guide to | Guia para | Guía para |
| Untested | untested | não testado | no probado |
| Final structure (build) | Final structure | Estrutura final | Estructura final |
| Cheat sheet (concept) | Cheat sheet | Resumo rápido | Resumen rápido |
| References | References | Referências | Referencias |

# Style of a step (match the reference style)
~~~
### 7. <Step title>

<Imperative instructions: what to create, where, and what it does. Short
sentences. Name the exact file, folder, command or setting.>

> [!tip] <Why?>
> One or two sentences explaining a non-obvious decision.
~~~
- Heading is `### N. Title`, with N taken from `plan.md` (continuous across blocks).
- Inline steps: 3 to 10 lines. Open with the action; add the reasoning only
  where it is not obvious. Say what the learner should see when it works.
- Steps with a sub-guide: one or two sentences plus the wikilink, e.g.
  "Inside `src/config/`, create the file and follow the instructions in [[env.js]]."
- Callouts: at most one `[!tip]` per three steps; use `[!warning]` for
  version-specific traps found in `notes.md`. Callout TYPES stay in English;
  titles come from the labels table.
- Guide, not solution: describe what to write ("instantiate `Router()` in a
  constant, then register each endpoint"). Show code only for shell commands,
  configuration files and syntax that words cannot convey (max 10 lines).
  Self-written snippets carry "(<untested>)". You do not run code.
- Calibrate to the profile: do not explain what the learner already knows.
- Write everything in the guide's language. Keep code, identifiers, commands
  and official names untranslated.

# Style of a sub-guide: trails/<slug>/<name>.md
~~~
<Guide to> <what it creates or explains>

- Imperative bullet: what to import, create, configure or call.
- Next bullet...
- Last bullet: how to export it or how to confirm it works.
~~~
5 to 15 bullets, same rules as steps (no full solutions, no links to learn
from). Optional callouts. No frontmatter.

# Writing a block (idempotent order; the marker replacement is the commit)
1. Write every sub-guide planned for the block's steps (create or overwrite the
   file in `trails/<slug>/`).
2. Replace the marker `<!-- PENDING:block-NN -->` in the main guide, with one
   targeted edit, by:
   ~~~
   <!-- START:block-NN -->
   (the steps of the block)
   <!-- END:block-NN -->
   ~~~
3. Verify with `grep`: `START:block-NN` exists, `PENDING:block-NN` does not.
   Verify with `glob` that every `[[name]]` used in the block has a file.
4. If the session died before step 2, the marker is still PENDING: just redo
   the block from step 1.

# The closing unit (last)
Replace `<!-- PENDING:closing -->` with START/END markers around:
- `build`: `## <Final structure>`: a code-block tree of the finished project,
  one short comment per item, derived from the steps that were written.
  `concept`: `## <Cheat sheet>`: a table of the key terms, commands or rules
  taught, one line each.
- `## <References>`: bullets `[title](URL): what it covers`, only `verified`
  sources from `sources.md`, optionally tagged with the source language.

# Rewriting
To rewrite a block, replace the content between its `START` and `END`, keeping
the markers; rewrite its sub-guide files too. Keep step numbers unchanged.

# State update
- Mark the unit `expanded` in the `state.md` Blocks table and update `next_step`.
- Report to the learner in ONE line (their language) and continue to the next
  unit without asking permission.
- When no `pending` unit remains: `phase: VALIDATION`,
  `next_step: load the trail-validation skill`.