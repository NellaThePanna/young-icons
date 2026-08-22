# Young Icons — Agent Instructions

Read automatically by any AGENTS.md-aware tool (Codex CLI, etc.) on entering this repo — injected before every prompt, not loaded on demand. Keep this file short on purpose; it's a per-session tax, not a reference doc. Claude Code does not read this file automatically — it reads `CLAUDE.md` instead, which points here only when relevant.

## Project

Young Icons Sports Academy — Dubai kids sports academy (ages 3–14). Next.js (App Router), Tailwind + inline styles, GSAP/ScrollTrigger. Dev server: `npm run dev` on port 3333.

## Brand tokens — one source of truth

`tokens.css` is authoritative for every color/font value. Never hardcode a hex value or invent a token — check `tokens.css` first. Key values: academy-green `#1a7a47`, warm-off-white `#f5f5f2`, black/white, Anton (display) + Inter (body).

## Rules

- No hallucinated specifics — colors, copy, stats, file paths, client decisions. If it's not confirmed in the repo or docs, flag it, don't invent it.
- `NavBar` is `position: fixed`, real height ~65px — any change to top-of-page padding must clear this.
- Commit message format: see `design/nova-commit-format.md`.
- Layout/design composition is never done by an AI design tool (Stitch/Canva/Figma/v0) — those are photography-sourcing only. Don't propose layout changes on their say-so.
- Before any merge from `young-icons-v2` into `master`: run a review pass on the diff and report findings plainly — don't silently auto-fix. Master is what deploys to production (Vercel), so this is the one checkpoint that isn't optional.

## Full context

This file is intentionally minimal. Process rules, prompt scaffolds, and the full design workflow live in `RULES.md` and `design/DESIGN-EDIT-RULE.md` — not injected automatically, read them when the task actually calls for it.
