# study-trails

An [opencode](https://opencode.ai) agent that turns any technology topic into a self-contained, step-by-step study guide in Markdown.

You name a topic. The agent interviews you, researches current documentation, proposes a plan for your approval, and writes the guide: numbered steps, sub-guides for the larger pieces, a final structure or cheat sheet, and a reference list. The guide holds the knowledge itself, so you can follow it without opening a single documentation page.

Current version: **0.1.0**

## Contents

- [What it is for](#what-it-is-for)
- [What is in this version](#what-is-in-this-version)
- [Benefits compared with studying without a method](#benefits-compared-with-studying-without-a-method)
- [How it works](#how-it-works)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [What the output looks like](#what-the-output-looks-like)
- [Design principles](#design-principles)
- [Limitations](#limitations)
- [Troubleshooting](#troubleshooting)
- [Uninstall](#uninstall)
- [Repository structure](#repository-structure)

## What it is for

Use study-trails when you want to learn something technical and need an ordered path instead of a pile of tabs.

- Set up a stack or build a project from scratch, such as a REST API with Express and Prisma, or a containerized app with Docker and Compose.
- Understand a concept or architecture, such as event-driven design, indexing in databases or how a language handles concurrency.
- Onboard to a tool your team already uses.
- Produce reference material you can keep, edit and search in Obsidian or any Markdown editor.

It does not debug your code or build your project for you. If you ask for that, it declines and offers to write a study guide about the subject.

## What is in this version

Version 0.1.0 ships one agent, two commands and five skills.

**Agent**

- `trail-writer`: a primary agent that runs the whole process. It can write files only inside `trails/` and `agent-mem/`, cannot run shell commands, and can fetch web pages.

**Commands**

- `/study <topic>`: start a new guide, or resume it if the topic already exists.
- `/study-resume [slug]`: continue the guide in progress from its saved state.

**Skills** (loaded by the agent one phase at a time)

| Skill | Phase | What it does |
|---|---|---|
| `learner-interview` | Interview | Asks up to four questions about goal, level, time and environment. Detects your language. |
| `source-research` | Research | Queries Context7 and the web, verifies sources and distills them into notes. |
| `trail-outline` | Outline and approval | Builds the plan and the guide skeleton, then waits for your approval. |
| `step-expansion` | Expansion | Writes the guide one block at a time, plus the sub-guides. |
| `trail-validation` | Validation | Checks structure, links, facts, language and writing style, then closes the trail. |

**Capabilities**

- Two guide kinds: `build` (you end with a working project or setup) and `concept` (you end with a mental model).
- Three languages: English, Brazilian Portuguese and Spanish. The agent detects your language and writes the whole guide in it.
- Guides sized for focus: 3 to 6 blocks and 10 to 30 steps. Anything beyond that becomes a suggested follow-up trail.
- Progress saved on disk, so a closed session or a long conversation does not lose your place.
- Plain writing rules enforced by the agent and checked in validation: no em dashes, no emojis, no filler or hype vocabulary.

## Benefits compared with studying without a method

| Studying without a method | With study-trails |
|---|---|
| Many tabs, tutorials written for different versions | One ordered guide built from current documentation, with versions recorded |
| No clear idea of what to learn first | Steps ordered by dependency, with assumed knowledge listed up front |
| Material too basic or too advanced | Calibrated by an interview on goal, level, time and environment |
| Outdated or conflicting tutorials | Commands and facts traced to verified sources. Gaps are flagged, not invented |
| Reading long docs to find one detail | Distilled steps that carry the knowledge. Links are optional extras |
| Copy and paste of full solutions | Guide, not solution: each step says what to write, so you write it |
| Endless scope | A bounded path with a defined end |
| Progress lost between sessions | State saved on disk, resumable with one command |
| Notes scattered across apps | Plain Markdown with wikilinks, ready for Obsidian |

A guide does not replace practice. It removes the search, ordering and filtering work so your study time goes to doing the steps.

## How it works

The agent moves through fixed phases. Each phase has a gate: the next one starts only when the previous one left its file on disk.

| Phase | Gate to advance |
|---|---|
| Interview | `profile.md` written |
| Research | `sources.md` and `notes.md` written, with at least one verified official source |
| Outline | `plan.md` and the guide skeleton created |
| Awaiting approval | You approve the plan |
| Expansion | Every block and the closing section written |
| Validation | Checklist completed |

**You approve before anything is written.** After research, the agent shows the planned steps grouped by block. Reply with an approval word ("approve", "aprovo", "apruebo") or say what to change. Expansion does not start without it.

**Files outrank memory.** All state lives in `agent-mem/<slug>/state.md`. When a session starts, when you ask to continue, or when the agent is unsure where it is, it reads that file instead of trusting the conversation. Each block is committed by replacing a single marker in the skeleton, so an interrupted session can redo the block safely.

**Facts come from notes.** The research phase writes `notes.md` with commands, versions, configuration keys and pitfalls, each tagged with its source. The guide may only state what is in those notes. Only sources the agent actually opened are listed in the references.

## Requirements

- [opencode](https://opencode.ai) installed and configured with a model.
- Node.js 18 or newer, only to run the installer.
- A model with reliable tool calling. The agent loads skills and makes targeted file edits, so a model that handles tools poorly will produce weaker results.
- Recommended: the [Context7](https://context7.com) MCP server, used for up-to-date library and framework documentation. Add it to `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "context7": { "type": "remote", "url": "https://mcp.context7.com/mcp" }
  }
}
```

Check the Context7 documentation for the current endpoint and options. Without it, the agent falls back to web search and page fetching.

## Installation

```bash
npx study-trails install                # installs into ./.opencode
npx study-trails install --global       # installs into ~/.config/opencode
npx study-trails install --force        # overwrites existing files
```

**Local install** (default) puts the agent in the current folder under `.opencode/`. It is available only when you start opencode from that folder. Run it inside a git repository: opencode looks for project skills up to the git root.

**Global install** puts the agent in `~/.config/opencode` (or `$XDG_CONFIG_HOME/opencode` when set), so it is available in every project. Guides and working files are written to `./trails` and `./agent-mem` in whichever folder you start opencode from.

**Existing files** are never overwritten unless you pass `--force`. The installer lists what it skipped.

Files installed:

```
agents/trail-writer.md
commands/study.md
commands/study-resume.md
skills/learner-interview/SKILL.md
skills/source-research/SKILL.md
skills/trail-outline/SKILL.md
skills/step-expansion/SKILL.md
skills/trail-validation/SKILL.md
```

**Install from source** if you prefer not to use npx:

```bash
git clone <repository-url> study-trails
node study-trails/bin/cli.js install --global
```

## Usage

Start opencode in your project folder and run:

```
/study Docker for Linux users
```

The command selects the `trail-writer` agent for you. You can also press Tab in opencode to switch to it and chat freely.

**1. Interview.** The agent asks up to four questions: your goal (a working project or an understanding), what you already know, hours per week and deadline, and your environment. Skip any you already answered in the request. Vague answers become stated assumptions.

**2. Research.** The agent gathers and verifies sources, then writes its notes. This phase takes the longest and decides the quality of the guide.

**3. Plan and approval.** You see the steps grouped by block. Approve or ask for changes. Typical requests: remove a block, split a step, change the order, add a sub-guide.

**4. Writing and validation.** The agent writes block by block without asking for permission at each one, then validates the guide and reports caveats such as steps that rely on a partial source.

Every reply ends with a status line:

```
Phase: EXPANSION | Done: block 2 written | Next: block 3
```

**Resume at any time:**

```
/study-resume
/study-resume docker-for-linux-users
```

**After the guide is done**, you can ask the agent to:

- deepen a block or rewrite a single step,
- add a sub-guide for a part you found thin,
- rewrite the guide in another language (English, Brazilian Portuguese or Spanish),
- start the suggested follow-up trail.

Open `trails/<slug>/` as a vault in Obsidian to follow the wikilinks between the main guide and its sub-guides.

## What the output looks like

```
trails/
└── docker-for-linux-users/
    ├── docker-for-linux-users.md     # main guide: numbered steps
    ├── dockerfile.md                 # sub-guide
    └── compose-file.md               # sub-guide

agent-mem/
└── docker-for-linux-users/
    ├── state.md                      # phase, approvals, block status
    ├── profile.md                    # your goal, level, environment
    ├── plan.md                       # the approved step list
    ├── notes.md                      # distilled facts used to write
    └── sources.md                    # verified references
```

`trails/` holds only the finished guide, ready to copy into your notes. `agent-mem/` is the agent's working memory.

A step in the main guide looks like this:

````markdown
### 4. Create the Dockerfile

In the project root, create a file named `Dockerfile` and follow the
instructions in [[dockerfile]].

> [!tip] Why?
> The Dockerfile is the recipe for the image. With it, any machine
> builds the same environment.

### 5. Build the image

From the project root, run:
```bash
docker build -t my-app:1.0 .
```
`docker images` should now list `my-app` with the tag `1.0`.
````

A sub-guide describes what to write, in short imperative bullets:

```markdown
Guide to the project Dockerfile

- Start with `FROM` and pick a small base image for your language.
- Set the working directory with `WORKDIR`.
- Copy only the dependency files first, then install them with `RUN`.
- Copy the rest of the source code.
- Set the start command with `CMD`.
```

## Design principles

- **Self-contained.** The reader never needs a link to learn something. Links appear only in the final references.
- **Guide, not solution.** Steps describe what to write. Code is shown only for commands, configuration files and syntax that words cannot convey, in at most 10 lines.
- **Files over memory.** State, plan and facts live on disk and are re-read when the agent is unsure.
- **Gates between phases.** No expansion without an approved plan. No plan without verified research.
- **No invention.** A command, flag or version that is not in the notes does not enter the guide. Missing facts send the agent back to research.
- **Plain writing.** Short imperative sentences, no emojis, no em or en dashes, no cheerleading.

## Limitations

- The agent cannot run code. Snippets come from documentation or are marked as untested.
- Quality depends on the model you use and on how much current documentation exists for the topic.
- Source verification is best effort. Check critical commands against the official documentation before running them in production.
- Wikilinks (`[[name]]`) render in Obsidian and similar tools. GitHub shows them as plain text.
- Supported languages are English, Brazilian Portuguese and Spanish.
- One guide is capped at 3 to 6 blocks and 10 to 30 steps by design.

## Troubleshooting

**`/study` is not found.** Confirm where you installed. A local install works only when opencode starts from the folder that contains `.opencode/`. Use `--global` to make it available everywhere.

**Skills are not loaded in a local install.** Run `git init` in the folder. opencode searches for project skills up to the git root.

**The agent refuses to edit a file.** By design it writes only inside `trails/` and `agent-mem/`.

**The guide mixes languages.** Ask the agent to run validation again, or ask it to rewrite the affected step in the guide language.

**The agent seems lost in a long session.** Run `/study-resume`. It rebuilds its position from `state.md`.

## Uninstall

```bash
npx study-trails uninstall              # asks for confirmation
npx study-trails uninstall --yes        # no confirmation
npx study-trails uninstall --global
```

The uninstaller removes only the files listed under [Installation](#installation), then deletes the folders that became empty. Other files in `.opencode/` stay. Your `trails/` and `agent-mem/` folders are never touched. In a non-interactive shell, `--yes` is required.

## Repository structure

```
study-trails/
├── .opencode/
│   ├── agents/trail-writer.md
│   ├── commands/
│   │   ├── study.md
│   │   └── study-resume.md
│   └── skills/
│       ├── learner-interview/SKILL.md
│       ├── source-research/SKILL.md
│       ├── trail-outline/SKILL.md
│       ├── step-expansion/SKILL.md
│       └── trail-validation/SKILL.md
├── bin/cli.js                        # installer
├── package.json
└── README.md
```

The `.opencode/` folder at the repository root is both the source the installer copies from and a working setup: open opencode in this repository to try the agent without installing it.
