---
description: Resume the trail in progress from its saved state
agent: trail-writer
---
Resume the work. Slug provided (optional): $ARGUMENTS

Run the resume protocol from your prompt. If more than one folder has a
`state.md` and no slug was provided, list the trails with their current phase
and ask which one to resume. After resuming, continue from the `next_step`
recorded in `state.md`, without redoing completed phases.