# Design Edit Rule — Young Icons (and all NOVA design work)

**This is our design workflow standard. It applies in Cowork and in the orchestrator.**

Do every design review as a self-contained HTML artifact with live drag controls, in the chat/side panel. Never round-trip through Canva/Figma/Stitch/v0/21st for layout, spacing, sizing, cropping or alignment — those tools are only for generating raw photography, never for composing or editing the design.

## Every design artifact must:

1. **One self-contained `.html` file**, opened on the side (not an inline widget mid-chat).
2. **Fonts embedded as base64** (`@font-face`, woff2) — brand type renders with no network. Serif fallback = font failed to load; fix by embedding.
3. **Real brand tokens only**: academy-green `#1a7a47`, gulf-blue `#0d6e9b`, black, warm-off-white `#f5f5f2`. Real fonts: Anton (display) + Inter (body).
4. **Real images**, base64-embedded, sourced from `public/images` first. No hand-drawn fake SVG scenes, no hallucinated imagery.
5. **Full in-artifact editor toolkit** — every design block must be editable directly, Canva-style, with ALL of these in one window:
   - **Move**: drag any block to reposition (absolute stage).
   - **Scale**: square corner handle = proportional scale (font included).
   - **Width-only**: round side handle = change width only, text reflows, font size unchanged.
   - **Number sliders**: scale/size by exact value with live readout.
   - **Alignment tool**: snap/align block edges and distribute evenly (not by eye).
   - **Show layout** button that dumps each block's position + width + scale to paste back.
   Fonts embedded base64 so type always renders. This is the "Canva-level edit, right here" standard — it saves tokens and round-trips.
6. **No wasted space / consistent backgrounds**: fill dead space with real content; don't float white cards on an off-white section — keep the section background consistent unless a colour block is deliberate.
7. **Section by section.** After the user approves a section: save the artifact to `design/approved/`, save to the client's Google Drive, then write the scoped orchestrator prompt.

## Why
On-brand and in-tokens by construction, direct drag control with no external tool, no round-trip token cost, and no privacy risk (Canva upload needs public URLs — prohibited for client files).

## Approved so far (updated 2026-07-28)
- `design/approved/holiday-camps-hero.html` — Holiday Camps hero, SVG clip-path version (CAMPS is a genuine see-through window into the photo via `<clipPath>` + `<text>`, HOLIDAY solid black, Anton). This supersedes the earlier CSS/absolute-position attempt, kept at `design/approved/SUPERSEDED-holiday-camps-hero-css-version.html` for reference only — don't build from that one. Live at `/schools/holiday-camps`, commit `3d9e278`.
- `design/approved/why-young-icons-section.html` — WHY YOUNG ICONS section for the Nurseries page. Full toolkit: move, corner-scale, side width-only, number slider, alignment tool, Show layout. Final aggressive-compaction values shipped, commit `cfb7ebb`.
- `design/approved/schools-enquiry-cta-section.html` — Schools Overview final CTA + enquiry form, merged into one light section (heading/buttons left, underline-style 5-field form right). Live, commit `98e0b08`.
- Schools Overview hero, "We Manage The Rest", and Trust Bar sections were approved via chat-reviewed artifacts (not saved as standalone approved files this round) and are live: commits `5ffb62b`, `1cbff08`, `74ad036`.
- `design/approved/meet-the-team.html` — Meet the Team page redesign (replaces the old static `CoachGrid.tsx`): gallery-hover-expand row of 7 coaches, glass-panel profile card reveal on click (frosted-glass/SVG-distortion technique). Loads in the client-approved locked state by default (hero scale 0.74 + translate(-122,-124), gallery translate(-18,-176)) — no re-dragging needed to see the approved look. Not yet built as real code as of 2026-07-30.
- `design/approved/facility-management.html` — Facility Management redesign, built exactly to "FACILITY MANAGEMENT PAGE.docx" (client brief, 2026-07-30): hero is heading-only (no eyebrow/paragraph/button), 75% black overlay, two overlapping charcoal-card sections. Page-specific colours NOT in tokens.css, given as exact hex in the brief's own colour table — documented as `--fm-off-white:#F7F7F5`, `--fm-charcoal:#2B2B2B`, `--fm-body-grey:#D1D5DB`. Green stays the real academy-green token (accent only — section number + CTA button). Loads in the locked approved state (hero scale 1.04, both cards scale 0.895). Built as real code, commit `e47fc9a`, live at `/facility-management`.
- `design/approved/trust-partners-section.html` — Home page Trust/Partners section, final locked state: black bg, white text, one unified bordered row (stats left, 6 real-named logo cells 3x2 right — British Orchard Nursery/Blossom Nursery/Dubai British/Kings School/Hartland International/Jumeirah). Heading/paragraph and the old CTA band both deleted per client instruction — this is now the only black section on the home page. Orchestrator prompt written 2026-07-31, execution not yet confirmed.
- `design/approved/multi-sports-page.html` — Clubs → Multi-Sports page, rebuilt to mirror a client-provided Google Stitch mockup (`code.html`/`DESIGN.md`, 2026-07-31) section-for-section: hero (photo + "Play. Learn. Grow." + "Multi-Sports Club"), About + 4 value cards (duplicate/delete toolkit on cards), full-bleed photo, Location + CTA two-column close. Real NavBar/Footer stay ours, not Stitch's generic ones. Two flagged content changes vs. the old shipped copy, not yet confirmed by client: hero headline swapped from "A Different Sport. Every Week." to "Play. Learn. Grow.", and location changed from the two-venue Cedar School/BVS Island list to a single "Dubai Sports City, Saturday Mornings, Launching Autumn 2026" entry. Sport-activities grid and the MOVE/PLAY/GROW columns section dropped — not present in the Stitch reference. Not yet built as real code.

## Icon rule
Every icon must be semantically tied to its label — reports → document, attendance → calendar-check, comms → chat bubble, QA → shield. Never reuse a generic icon (target/chart) just because it's already in the set; add the right glyph.

## Google Stitch prompts — mandatory base style block

Every Stitch prompt — no exceptions — opens with a base style block before the specific ask. The brand line (colors/fonts) is fixed and identical every time. The photography-style line changes by content type — use the variant that matches what's actually being photographed, don't default to the programme one out of habit.

**Fixed brand line (every variant includes this verbatim):**
```
Project: Young Icons Sports Academy — Dubai kids sports academy (ages 3–14).
Brand: academy green #1A7A47, warm off-white #f5f5f2, black/white, Anton (display) + Inter (body).
```

**Variant A — Programme/coaching pages** (Nurseries, Schools, Clubs, Holiday Camps — anywhere the subject is kids being coached):
```
Photography style: real, candid, documentary editorial — not staged stock photography.
Kids actively mid-motion (running, kicking, coached drills), natural light, real gyms/fields/courts,
not posed studio shots. Coaches visible and engaged where relevant, not just kids alone.
```

**Variant B — Facility Management page** (the subject is the venue/operations, not coaching — do not default to Variant A here):
```
Photography style: clean, professional, facility/venue-focused — NOT kids playing or coaching action.
Well-maintained sports halls, courts, fields, changing rooms, or facility infrastructure shot with
architectural/editorial clarity. Empty or lightly-populated spaces read as professional and
well-managed. If people appear, they read as staff/operations (walking a court, reviewing a
schedule) — not athletes or coached drills.
```

The specific ask (which section, what crop ratio, what the photo needs to convey) goes after the two blocks above, not instead of them. If a future page doesn't fit either variant, write a new one rather than forcing A or B — but keep the fixed brand line unchanged regardless.

One more thing worth knowing: Stitch outputs seen so far reuse a single stock image across multiple sections with different crops, pretending to be distinct photography (caught on the Facility Management mockup, 2026-07-28 — same image used 3x for hero/section/CTA). Check for this before treating any Stitch output as containing genuinely separate photos.
