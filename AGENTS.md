# Young Icons — Agents & Orchestrator Capabilities

Referenced from CLAUDE.md. Load this when a task involves picking an agent/subagent, or when drafting a prompt that might benefit from a specific ambient skill.

## Agents — verified names (checked 2026-07-22, do not trust NOVA_INVENTORY.md blindly, it's a catalogue not a live state)

Confirmed installed under NOVA names: `nova-design-pm`, `nova-design-ux`, `nova-design-copy`, `nova-design-tokens`, `nova-design-qa`, `frontend-architect`, `nova-deploy`.

NOT installed under NOVA names, use the real names instead:
- Polish pass = **Whimsy Injector** (`design-whimsy-injector.md`) — not `nova-whimsy-injector`
- Pre-deploy visual gate = **Reality Checker** (`testing-reality-checker.md`) — not `nova-reality-checker`

Unresolved: unclear whether `nova-deploy`'s hardcoded gate actually calls these unbranded agents or silently no-ops on the missing NOVA name. Flag if you find out either way.

## Orchestrator capabilities — Superpowers plugin (installed 2026-07-28)

The orchestrator (Claude Code, not the Cowork session) has the Superpowers marketplace plugin installed — 14 ambient skills: brainstorming, TDD, systematic-debugging, subagent-driven-development, git-worktrees, code-review, writing-plans, writing-skills, and others. These are ambient skills, not routed agents — they fire based on the task without being named.

What this means when Cowork drafts orchestrator prompts:
- The SCOPE/GOAL/CONSTRAINTS/VERIFICATION/REPORT-BACK scaffold (see RULES.md) still applies — Superpowers layers on top of it, doesn't replace it.
- `git-worktrees` should now enforce the Work Trees rule (RULES.md) automatically. If the orchestrator still lands on the wrong branch/worktree after this, that's a real regression worth flagging, not expected behavior.
- `systematic-debugging` should apply to debugging/investigation prompts without needing step-by-step diagnostic instructions spelled out — trust it, but real verification before acceptance still applies regardless.
- If an orchestrator report names a specific skill (e.g. "systematic-debugging identified X"), that's the routing working as intended.
- `NOVA_INVENTORY.md`, `nova-orchestrator.md`, and `CURRENT_SYSTEM_MAP.md` (referenced above) live in the user's separate nova-technologies system, NOT in this repo — not reachable from Cowork. Don't attempt to edit them from here; that's orchestrator-side maintenance, already handled on that end.
- A `system-sync.ps1` hook auto-mirrors CLAUDE.md/agents/ edits into nova-technologies and pushes to GitHub (rate-limited, ~5min). Existing automation on the orchestrator side, not something Cowork triggers.

## Other orchestrator-side plugins (installed on the user's local system, not this repo)

- **taste-skill** (installed 2026-07-28, ~1,697 tokens always-on) — leads aesthetic direction (Design Read → 3 dials → design-system choice) on landing pages/portfolios/redesigns, demoting `frontend-design`/`hallmark` to secondary reference. `stitch-skill` within this plugin generates `DESIGN.md` files purpose-built for Google Stitch prompting — worth checking its output format before/if Young Icons' own design reference file gets restructured further, since the shape may already be solved there.
