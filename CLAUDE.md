# Young Icons — Project Memory

Read this first, every session. It's lean on purpose — detail lives in the referenced files, loaded only when the task actually touches them.

## Quick context

Young Icons Sports Academy, Dubai multi-sport kids academy. Next.js site. Repo: `C:\Dev\NOVA\young-icons`.
Working pattern: Cowork chat (claude.ai) plans, researches, drafts exact orchestrator prompts. Claude Code (you, reading this file) executes. Cowork verifies, updates Asana, writes the next prompt.

## Reference routing — load only when relevant

- Design workflow, artifact rules, icon rules → `@design/DESIGN-EDIT-RULE.md`
- Approved section designs (source of truth for shipped layouts) → `@design/approved/`
- Brand tokens (colors/fonts) → `@tokens.css` — this is the ONE source of truth for hex values. Not this file. Not DESIGN-EDIT-RULE.md's written copy. If any doc disagrees with tokens.css, tokens.css wins and the other doc is stale.
- Client brief, site structure, functional requirements → `@YOUNG_ICONS_BRIEF.md`
- Commit message format → `@design/nova-commit-format.md`
- Change history → `@CHANGELOG.md`

## Agents — verified names (checked 2026-07-22, do not trust NOVA_INVENTORY.md blindly, it's a catalogue not a live state)

Confirmed installed under NOVA names: `nova-design-pm`, `nova-design-ux`, `nova-design-copy`, `nova-design-tokens`, `nova-design-qa`, `frontend-architect`, `nova-deploy`.

NOT installed under NOVA names, use the real names instead:
- Polish pass = **Whimsy Injector** (`design-whimsy-injector.md`) — not `nova-whimsy-injector`
- Pre-deploy visual gate = **Reality Checker** (`testing-reality-checker.md`) — not `nova-reality-checker`

Unresolved: unclear whether `nova-deploy`'s hardcoded gate actually calls these unbranded agents or silently no-ops on the missing NOVA name. Flag if you find out either way.

## Standing rules

1. Section by section. Never build ahead of what's been explicitly asked for.
2. New design content (not a restore of already-approved content) → build a compliant HTML artifact (real images from `public/images`, base64-embedded fonts, full drag/scale/width/align/distribute/show-layout toolkit) → client approves → save to `design/approved/` + client Drive → only then write the orchestrator prompt. Pure content/icon swaps on already-approved designs skip the artifact step.
3. Stitch, Canva, Figma, v0, 21st.dev = photography sourcing only, never layout or composition — per `design/DESIGN-EDIT-RULE.md`. Client can override this case-by-case when explicitly requested for a specific piece of work; it is not a standing exception.
4. Every orchestrator prompt states Scope / Goal / Constraints / Verification / Report-back before the task body — see prompt scaffold below. This is how we stop the back-and-forth.
5. Never mark anything done without real execution confirmation: commit hash, `tsc` result, or a screenshot. An instruction being given is not confirmation.
6. No hallucinated specifics. If two docs conflict, stop and ask — don't silently pick one (see `tokens.css` rule above for the one standing exception: it's always authoritative over prose docs).

## Prompt scaffold

Every prompt to Claude Code should open with this block before the actual task:

```
SCOPE: [exact file(s)/component(s)/tab touched — nothing else]
GOAL: [what this achieves, one sentence]
CONSTRAINTS: [brand tokens to preserve, things not to touch, assets to reuse]
VERIFICATION: [tsc? screenshot? cross-tab check? specific thing to confirm]
REPORT BACK: [exactly what to tell Cowork — file paths, hashes, before/after]
```

## Off-white — resolved 2026-07-22

`tokens.css` has no `--off` variable at all. Three real, different off-white tokens exist:
- `--color-warm-off-white: #f5f5f2` — matches DESIGN-EDIT-RULE.md's written value. General brand off-white.
- `--color-nursery-off-white: #f4f3ee` — page-scoped to `/nurseries` specifically.
- `design/approved/why-young-icons-section.html`'s own `--off:#f2f1ec` matches neither — that artifact is stale on this value and should be corrected once the right token is confirmed for this component.

DECIDED 2026-07-22: WHY YOUNG ICONS uses `--color-warm-off-white` (`#f5f5f2`), the general brand token — not the page-scoped nursery one. Update `design/approved/why-young-icons-section.html`'s `--off` value to match on next touch.

## Work trees

Recommended pattern for section-by-section work: one worktree per in-progress section, main stays stable.
```
git worktree add ../young-icons-<section> -b fix/<section>
# work, build, verify in that folder
git checkout main && git merge fix/<section>
git worktree remove ../young-icons-<section>
git branch -d fix/<section>
```
Optional, not mandatory — adopt once more than one section is realistically in flight at a time, or when a section is experimental enough that you want a clean way to abandon it without a stash/reset dance.

## Open items (2026-07-22)

- Rail tab icons (01 ONE PARTNER / 02 MULTIPLE ACTIVITIES / 03 TAILORED PROGRAMMES / 04 FULLY MANAGED) were never implemented on the buttons themselves — separate from any of the Fix 1/2/3 work
- Fix 3 (Tailored Programmes tab content) not started — hero image found (`public/images/placeholder/obstacle-course.jpg`), needs a compliant design artifact next, not a code-snippet prompt
