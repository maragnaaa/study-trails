---
description: Create a new study trail (or resume it if it already exists)
agent: trail-writer
---
Requested topic: $ARGUMENTS

Procedure:
1. If the topic above is empty, ask only for the topic (in the language the
   learner is writing in) and stop.
2. Derive the slug (rules in your prompt). Use `glob` on `trails/*/state.md`,
   read the `topic` field of each existing trail, and check whether the same
   topic already exists (it may be under a slug in another language).
3. If it exists: run the resume protocol and ask whether to continue where it
   stopped or start over.
4. If it does not exist: load the skill `learner-interview` and begin the
   INTERVIEW phase.