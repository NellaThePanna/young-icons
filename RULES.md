# Young Icons — Standing Rules

Referenced from CLAUDE.md. Load this when drafting an orchestrator prompt, making a process decision, or when something feels like it might contradict a past decision.

## Standing rules

1. Section by section. Never build ahead of what's been explicitly asked for.
2. New design content (not a restore of already-approved content) → build a compliant HTML artifact (real images from `public/images`, base64-embedded fonts, full drag/scale/width/align/distribute/show-layout toolkit) → client approves → save to `design/approved/` + client Drive → only then write the orchestrator prompt. Pure content/icon swaps on already-approved designs skip the artifact step. Full spec: `design/DESIGN-EDIT-RULE.md`.
3. Stitch, Canva, Figma, v0, 21st.dev = photography sourcing only, never layout or composition — per `design/DESIGN-EDIT-RULE.md`. Client can override this case-by-case when explicitly requested for a specific piece of work; it is not a standing exception. Google Stitch specifically: no MCP connector exists for it, and the client runs it externally (outside Cowork) on purpose to avoid burning tokens — Cowork receives its output as uploaded files/screenshots, same as any other reference material, and never calls it directly.
4. Every orchestrator prompt states Scope / Goal / Constraints / Verification / Report-back before the task body — see Prompt Scaffold below. This is how we stop the back-and-forth.
5. Never mark anything done without real execution confirmation: commit hash, `tsc` result, or a screenshot. An instruction being given is not confirmation.
6. No hallucinated specifics. If two docs conflict, stop and ask — don't silently pick one (see the `tokens.css` rule in CLAUDE.md for the one standing exception: it's always authoritative over prose docs).
7. Cowork's sandbox git view (its own bash tool, reading the connected folder) is NOT authoritative for git state. It can return a bogus picture (phantom branches, missing history) that doesn't match the real repo. Before flagging any git-state concern to the client — detached HEAD, missing branch, unfinished merge, anything alarming — verify it via the orchestrator's real local terminal first. Don't escalate off a sandbox-only reading. (Logged 2026-07-23 after a false alarm: Cowork's bash tool reported a zero-commit "young-i" branch that never existed on the real disk.)
8. A task is not done without a real commit hash on the correct branch. "Left uncommitted, pending" is not complete, even if verification (tsc, screenshots) passed. Commit each scoped change immediately after its own verification, not batched with the next task.
9. `NavBar` is `position: fixed; top:0` — it's removed from document flow and permanently overlays whatever sits at the top of every page (see Layout Constants below). Any prompt that touches the top padding/spacing of a hero or top-of-page section MUST explicitly state the nav's real height as a hard floor and require a screenshot confirming the full heading/label is clear of the nav, not just report the padding number in isolation. (Logged 2026-07-23 after the hero compaction fix set padding below the nav height, hiding the label and clipping the heading behind it — caught by the client from a screenshot, not by verification.)
10. Every Google Stitch prompt opens with the base style block (see `design/DESIGN-EDIT-RULE.md`) before the specific ask — no exceptions, same as the orchestrator scaffold is mandatory for Claude Code prompts. This keeps sourced photography consistent in brand/style across sections instead of drifting per-request.
11. Codex (`codex@openai-codex` plugin, installed 2026-07-30) is a standing checkpoint, not a routine step: before any merge from `young-icons-v2` into `master`, run `/codex:review` on the diff and report findings — don't silently auto-fix, let the human decide what to act on. Not required on every commit or every turn; the review-gate-on-every-turn option was evaluated and deliberately left off (too much friction/subscription cost for trivial diffs). Codex is context-blind — it reads `AGENTS.md` automatically on entry, never `CLAUDE.md`, and has no access to Asana, this conversation, or client history. Treat it as a second, independent set of eyes on the code itself, not a collaborator with project context.

## The loop — how a change actually ships

Cowork (plans/drafts) → orchestrator/Claude Code (executes, reports back with real verification) → Cowork (independently verifies via direct Read/Grep/bash, not just the report) → [when merging to master] Codex review (`/codex:review`, catches code-level issues the above steps don't) → open a pull request into `master` (direct pushes to `master` are blocked by branch protection, added 2026-08-01) → GitHub Actions CI (`.github/workflows/ci.yml`: `npm run type-check` + `npm run lint`) must report passing on the PR before the merge button unlocks → merge → Vercel deploys. Every step verifies the one before it; no step trusts a self-report without checking.

CI and Codex review are two different gates, not a replacement for each other: CI is mechanical and automatic (types, lint) and hard-blocks the merge on failure — it has no opinion on whether the code does the right thing. Codex review is a judgment pass on logic/content/security that a human still has to read and act on; it doesn't block anything by itself. Run both on every merge to master — a passing CI check does not skip the Codex review step, and a completed Codex review does not skip CI.

12. When a client-provided document (docx, brief, spec) is given after other content has already been confirmed or shipped for the same section, the document is the final word — it supersedes earlier confirmed content/copy, not the other way around. Flag the supersession clearly when it happens (so the older, now-replaced version isn't silently lost), but don't ask which one wins — the newest doc always wins.

13. Any hero/header/footer section combining text with a photo (SVG clip-path text, split hero, full-bleed photo band, or similar) must be designed/edited using the full-editor pattern established in `design/approved/holiday-camps-hero-full-editor.html` — independent move (x/y) + resize (fontSize) controls for every text element, independent pan (x/y) + zoom controls for every photo, AND a real-scale NavBar danger-zone overlay (65px, position:fixed, per rule 9) rendered directly in the editor so a nav-collision is caught visually before values are ever locked in — not after a live screenshot catches it after the fact. This directly closes the gap rule 9 was originally logged to prevent: a numeric padding check alone missed a real collision once already; a visual danger-zone guide in the editor itself doesn't. (Logged 2026-08-01 after the Holiday Camps hero crop first shortened the frame without this guide, pushing HOLIDAY into the fixed nav — caught from a screenshot, fixed with this editor pattern, now standardized.)

## Layout constants — fixed nav

`src/components/NavBar.tsx`: `header` is `position: fixed; top:0; left:0; right:0; z-50`. Inner `nav` is `h-16` = **64px**, plus a 1px bottom border once scrolled/on any non-homepage page (nav is only transparent on `/` before scrolling — every other page, including `/nurseries`, renders it solid dark at full height from the first paint). Effective real height to clear: **~65px**, same at every breakpoint (no responsive height change in the component).
Any top-of-page section's padding-top must be ≥ 65px + whatever breathing room is wanted below the nav — never just the breathing-room number alone.

## Prompt scaffold (orchestrator prompts)

Every prompt to Claude Code should open with this block before the actual task:

```
SCOPE: [exact file(s)/component(s)/tab touched — nothing else]
GOAL: [what this achieves, one sentence]
CONSTRAINTS: [brand tokens to preserve, things not to touch, assets to reuse]
VERIFICATION: [tsc? screenshot? cross-tab check? specific thing to confirm]
REPORT BACK: [exactly what to tell Cowork — file paths, hashes, before/after]
```

Google Stitch prompts use a different, mandatory scaffold — see `design/DESIGN-EDIT-RULE.md` (rule 10 above).

## Off-white — resolved 2026-07-22

`tokens.css` has no `--off` variable at all. Three real, different off-white tokens exist:
- `--color-warm-off-white: #f5f5f2` — matches DESIGN-EDIT-RULE.md's written value. General brand off-white.
- `--color-nursery-off-white: #f4f3ee` — page-scoped to `/nurseries` specifically.
- `design/approved/why-young-icons-section.html`'s own `--off:#f2f1ec` matches neither — that artifact is stale on this value and should be corrected once the right token is confirmed for this component.

DECIDED 2026-07-22: WHY YOUNG ICONS uses `--color-warm-off-white` (`#f5f5f2`), the general brand token — not the page-scoped nursery one. Update `design/approved/why-young-icons-section.html`'s `--off` value to match on next touch.

## Work trees — when to actually use one

A branch is a label on commit history — only one can be checked out in a folder at a time; switching means your files on disk change too, and uncommitted work has to be stashed first. A worktree is a second folder, same repo, with a DIFFERENT branch checked out simultaneously — no switching, no stashing, both alive at once.

Trigger rule (checked automatically by a SessionStart hook, see below — the hook surfaces the signal, you make the call):
- Uncommitted work exists AND the next task is unrelated to it → use a worktree, don't stash.
- Next task is a continuation of the same uncommitted work → ignore the hook, just keep going, no worktree needed.
- Untracked files sitting idle don't count — they aren't disturbed by staying on the same branch, only branch-switching risk triggers this rule.
- Default for this project: sequential, one section at a time, committed before the next starts — most sessions won't need one. Reach for it the moment two genuinely different pieces of work need to be alive at once (e.g. an experimental redesign you might throw away, while a confirmed fix still needs finishing).

```
git worktree add ../young-icons-<section> -b fix/<section>
# work, build, verify in that folder — young-icons-v2 is untouched, its dev server keeps running
git checkout young-icons-v2 && git merge fix/<section>
git worktree remove ../young-icons-<section>
git branch -d fix/<section>
```

(Corrected 2026-07-23: there is no branch literally named `main` in this repo — `young-icons-v2` is the real, live, connected branch. Confirmed via `git rev-parse --abbrev-ref HEAD` and `git branch -a -vv`.)

### SessionStart hook — worktree advisor

`.claude/hooks/SessionStart.ps1` includes a git status check that flags uncommitted work at the start of every session (already created — see the hook file itself for the exact script). It flags the signal (uncommitted work exists), not the decision — intent detection is unreliable, the human call is not.
