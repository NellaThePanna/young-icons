---
name: young-icons-workflow
description: Working process for the Young Icons Sports Academy client site — section-by-section design/build workflow, brand token discipline, and orchestrator prompt scaffold. Use whenever the user mentions Young Icons, the nurseries page, the WHY YOUNG ICONS component, or asks to plan/build/fix a section on this project.
---

# Young Icons workflow

This project is a real paying client build (Young Icons Sports Academy, Dubai). This chat plans and drafts prompts; a separate Claude Code orchestrator executes file/git work and reports back. Never claim file/code work is done without an execution report from the orchestrator (commit hash, tsc result, or screenshot).

## Before doing anything

Check open Asana tasks in "NOVA — Client Work" for Young Icons first. Work is section-by-section and client-directed — don't build ahead of what's been asked.

## Brand tokens

Green `#1A7A47` (locked). Black `#111`. Off-white `#f5f5f2` (`--color-warm-off-white`, general brand token — not the page-scoped `--color-nursery-off-white` `#f4f3ee`). Ink `#5a584f`. Line `#e3e1d8`. Fonts: Anton (display/headings, uppercase) + Inter 400/600 (body) — locked. Sea blue named in the original brief, hex never confirmed — don't invent one.

## Design artifact process

For new design content (not a restore of something already approved):
1. Build a self-contained HTML artifact: real images sourced from `public/images` first (never hand-drawn placeholder icons standing in for photos), fonts embedded as base64, full editing toolkit (move, corner-scale, width-only resize, number-value inputs, align left/centre, distribute, show-layout dump, breakpoint switcher, canvas size control).
2. Client adjusts and approves.
3. Save to `design/approved/` and the client's Drive.
4. Only then write the orchestrator prompt.

Pure icon swaps or content restores on already-approved designs skip the artifact step — go straight to a scoped orchestrator prompt.

Icon rule: every icon must be semantically tied to its label. Never reuse a generic icon just because it's already in the set.

## Orchestrator prompt scaffold

Every prompt opens with:

```
SCOPE: [exact file(s)/component(s) touched — nothing else]
GOAL: [one sentence]
CONSTRAINTS: [tokens to preserve, things not to touch, assets to reuse]
VERIFICATION: [tsc / screenshot / cross-tab check / specific assertion]
REPORT BACK: [file paths, hashes, before/after — be explicit]
```

## Agent names — use the real ones

`frontend-architect` for edits. Polish pass is **Whimsy Injector**, not `nova-whimsy-injector`. Pre-deploy visual gate is **Reality Checker**, not `nova-reality-checker`. Full pipeline (`nova-design-pm` → `ux` → `copy` → `tokens` → `qa`) is for new sections only — icon/content swaps just need `frontend-architect` + a `tsc` check, save the full pipeline and Reality Checker screenshot gate for actual new layout/content builds.

## Never

- Guess a file path or brand hex — confirm first.
- Mark something done on instruction alone — only on execution confirmation.
- Use Stitch/Canva/Figma/v0/21st for layout or composition — photography sourcing only, unless the client explicitly overrides for one specific piece of work.
- Batch multiple sections into one push — one section, one handoff, verified before the next.
