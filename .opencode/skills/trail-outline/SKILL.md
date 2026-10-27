---
name: trail-outline
description: Creates trail.md with a mermaid mind map, prerequisites, a table of 5 to 8 modules with dependencies and PENDING markers, in the learner's language, then runs the approval step. Use in the OUTLINE and AWAITING_APPROVAL phases, after research and before expanding any module.
---

# Preconditions
- Read `profile.md`, `sources.md` and `state.md`. Phase must be OUTLINE or
  AWAITING_APPROVAL. Take `language` from `state.md`.

# Sizing
- Total hours consistent with `hours per week × deadline` from the profile.
- 5 to 8 modules, each between 2 and 12 hours. What does not fit goes under "Going further".
- Acyclic dependencies: module 1 depends on nothing, and no module uses
  something that only appears later.

# Language tables (headings of trail.md)
Use the column of the stored `language`. Never mix languages in one document.

| Element | en | pt-BR | es |
|---|---|---|---|
| Title prefix | Trail | Trilha | Ruta |
| Header line | Starting level · Goal · Total time | Nível de partida · Objetivo · Tempo total | Nivel de partida · Objetivo · Tiempo total |
| Mind map | Mind map | Mapa mental | Mapa mental |
| Prerequisites | Prerequisites | Pré-requisitos | Requisitos previos |
| Overview | Overview | Visão geral | Visión general |
| Overview columns | No. · Module · Depends on · Hours · Practice | Nº · Módulo · Depende de · Horas · Prática | N.º · Módulo · Depende de · Horas · Práctica |
| Stage | Stage | Etapa | Etapa |
| Capstone project | Capstone project | Projeto integrador | Proyecto integrador |
| Common pitfalls | Common pitfalls | Armadilhas comuns | Errores comunes |
| Going further | Going further | Para ir além | Para ir más allá |
| Glossary | Glossary | Glossário | Glosario |

# Exact structure of trails/<slug>/trail.md
1. `# 🧭 <Title prefix>: <Topic>` and one header line (starting level · goal · total time).
2. `## <Mind map>` with a ```mermaid mindmap block:
   - root as `root((Topic))`, 2-space indentation;
   - short nodes, NO parentheses, colons, quotes or commas inside nodes.
3. `## <Prerequisites>` as a `- [ ]` checklist, with review links (only from `sources.md`).
4. `## <Overview>` with a table (columns from the language table).
5. For each module, exactly:
   ```
   ## <Stage> 01 — <name>
   <!-- PENDING:module-01 -->
   ```
   (two-digit numbering; never change the marker format; markers stay in English)
6. Final sections: `## <Capstone project>`, `## <Common pitfalls>`,
   `## <Going further>`, `## <Glossary>` (they may hold a short placeholder until validation).

# Approval (mandatory gate)
1. Update `state.md`: fill the "Modules" table (all `pending`),
   `phase: AWAITING_APPROVAL`, `next_step: wait for learner approval`.
2. To the learner, in their chat language, show ONLY: the modules (name, hours,
   dependency), the total time and the file path. Ask them to reply with an
   approval word or say what to adjust.
3. If they ask for adjustments: edit `trail.md` and the module table in
   `state.md`, record the request under "Learner decisions", and ask again.
4. Only on an explicit approval (see the approval words in the agent prompt):
   set in `state.md` `outline_approval: approved`, `phase: EXPANSION`,
   `next_step: expand module-01`.