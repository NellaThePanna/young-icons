# Young Icons — Project Memory

Read this first, every session. It's a thin entry point on purpose — everything else lives in scoped reference files, loaded only when the task actually touches them. Don't read the referenced files preemptively; go to the one that matches what you're doing.

## Quick context

Young Icons Sports Academy, Dubai multi-sport kids academy. Next.js site. Repo: `C:\Dev\NOVA\young-icons`.
Working pattern: Cowork chat (claude.ai) plans, researches, drafts exact orchestrator prompts. Claude Code (you, reading this file) executes. Cowork verifies, updates Asana, writes the next prompt.

## Reference routing — load only when relevant

- **Standing rules, prompt scaffolds, layout constants, work-tree policy** → `@RULES.md`
- **Agents, orchestrator ambient-skill capabilities (Superpowers, taste-skill, etc.)** → `@AGENTS.md`
- **Design workflow, artifact rules, icon rules, Google Stitch base-style-blocks, approved-designs log** → `@design/DESIGN-EDIT-RULE.md`
- Approved section designs (source of truth for shipped layouts) → `@design/approved/`
- Brand tokens (colors/fonts) → `@tokens.css` — this is the ONE source of truth for hex values. Not this file, not any other doc's written copy. If any doc disagrees with tokens.css, tokens.css wins and the other doc is stale.
- Client brief, site structure, functional requirements → `@YOUNG_ICONS_BRIEF.md`
- Commit message format → `@design/nova-commit-format.md`
- Change history → `@CHANGELOG.md`

## Open items (updated 2026-07-28)

DONE, verified live via direct Read/Grep + commit hash, not just orchestrator claim:
- WHY_YOUNG_ICONS: rail tab icons (`42905ea`), tab-specific proof rows (`d58a0e3`), spacing rhythm (`2b3885e`→merged `5daf231`), Multiple Activities restructure (`63fe6ed`), final aggressive compaction all 4 tabs (`cfb7ebb`), H2 title resize (`56ab106`).
- Nursery hero compaction + photo crop + nav clearance (merged `5daf231`), activities marquee removed + enquiry section compacted (`ad09a0f`).
- Schools Overview page rebuilt to match client-approved reference end to end: Hero (`5ffb62b`), We Manage The Rest (`1cbff08`), Trust Bar (`74ad036`), enquiry form reduced to 5 fields (`acac8a6`), Final CTA + enquiry merged into one light section (`98e0b08`), ASA/StatsBlock/PE sections removed (`68af223`).
- Holiday Camps: moved back under `/schools` per client's new docx (supersedes the July 8 standalone-`/camps` decision — see `design/approved/holiday-camps-hero.html` for the SVG clip-path hero technique). Hero + intro section live (`3d9e278`).
- All of the above pushed to origin/young-icons-v2 as of `e07d7cc`.

NOT DONE — see Cowork task list for the live version of this:
- Holiday Camps camp-cards section — blocked on real dates/ages/times from client, do not invent.
- Holiday Camps remaining sections (About/FAQ/Pillars/Logistics/CTA) — old generic-template content, needs reconciling against the new design.
- `/camps` page fate — needs an explicit decision now that Holiday Camps lives under `/schools` again.
- Docx blank numbered sections — still waiting on client content.
- Facility Management page — not started. Real confirmed client content exists in Asana (service scope, venue types, pending Cedar School case study). A Stitch mockup exists for compositional inspiration only, not literal spec — has a real-photo duplication issue (same stock image reused 3x), see `design/DESIGN-EDIT-RULE.md`.
- Real photography — several sections still on stock/placeholder images. Client sourcing via Google Stitch externally (see `RULES.md` rule 3, and the base-style-blocks in `design/DESIGN-EDIT-RULE.md`).
