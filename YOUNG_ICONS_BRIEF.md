# Young Icons Sports Academy — Client Brief
Last updated: 2026-06-30
Status: Planning phase — no code written yet

---

## Client

**Young Icons — Sports Academy**, Dubai. Multi-sport kids academy transitioning from existing brand into a full digital presence. Logo exists (black/white circular badge mark) — needs light editing only, not redesign. New domain already purchased by client.

This is an evolving brand transition, not a one-time finished build. Ongoing project, reasonable revisions expected within scope.

---

## Brand Direction

- **Logo**: existing Young Icons mark, edit wording only, do not redesign
- **Color palette**: black, green, sea blue — final hex values to be proposed and confirmed before build starts
- **Tone**: professional sports academy for kids, Dubai market

---

## Reference Sites

**Structure reference**: [stryxsports.com](https://stryxsports.com) — Dubai multi-sport academy, closest direct competitor in offering and structure (nursery, schools, ASA, academies, holiday camps, facility management)

**Design/animation reference**: [theme.madsparrow.me/osty](https://theme.madsparrow.me/osty/about-us/) — creative agency theme, bold typography, animated, modern feel

---

## Site Structure (from client brief)

```
Home
About
  - Who We Are
  - What We Do
  - Meet the Team
Nurseries
  - About
  - What We Offer
Schools
  - ASA
  - Holiday Camps
Facility Management
Clubs
  - Ballet
  - Multi Sports
  - Karate (Coming Soon)
  - Football (Coming Soon)
Gallery
Contact
```

Note from client: full content/photography not yet available for new club areas (Karate, Football). Wording will be provided; imagery may need placeholders initially. May add additional clubs in future.

---

## Functional Requirements

**Booking integration**: Client uses Classcard. Must be fully operational on website, phone, and tablet. Integration mechanism (embed/iframe/API/redirect) — TO BE CONFIRMED before booking pages are designed.

**Digital setup required**:
- Full domain setup and configuration (domain already purchased by client)
- Facebook page setup, professional, branding matched to website
- Proper linking of Facebook, Instagram, and email to website
- WhatsApp integration
- Classcard booking integration (web/phone/tablet)

**SEO — advanced, not basic**:
- Keyword research focused on Dubai sports academy searches
- Page-level optimization
- Professionally written meta titles and descriptions
- Speed optimization
- Google indexing setup

---

## Competitor Research (completed 2026-06-30)

6 direct Dubai competitors researched: Stryx Sports, Little Legends, ISM Sports, LionHeart Sports, Elite Sports, Super Fun Sport.

**Repeating SEO keyword patterns found across all 6:**
- "sports academy Dubai" / "sports academy for kids Dubai"
- "after school activities/programs Dubai"
- "multi sports program for kids"
- "holiday camp Dubai"
- "nursery sports program"
- "trusted UAE sports academy"

**Common trust signals used across competitors:**
- Certified/qualified coaches
- Free trial session offer
- Age-specific program breakdown
- School partnership logos
- Parent testimonials

**Differentiation note**: Stryx's SEO angle leans heavily on branded academy partnerships (Barça, NBA). Young Icons does not have international brand partnerships — SEO/positioning strategy should differentiate on something else (likely: personal/family-feel brand, Dubai-local trust, breadth of programs from nursery through multi-sport clubs).

---

## Technical Stack (proposed, pending orchestrator confirmation)

- Next.js App Router
- GSAP + ScrollTrigger (scroll-driven animation)
- Lenis (smooth scroll)
- Three.js / React Three Fiber (if WebGL background elements are used)
- nova-design pipeline: pm → ux → copy → tokens → qa
- frontend-architect (build)
- nova-whimsy-injector (polish pass, mandatory before QA)
- nova-reality-checker + playwright-mcp (mandatory visual proof gate before deploy)
- nova-deploy (Vercel)

**Open question**: nova-motion-rules skill (exits faster than entrances, transform/opacity only, reduced-motion support) was identified as needed but not yet built — confirm status before starting animation work.

**Open question**: Classcard integration mechanism not yet confirmed — research before designing booking flow.

---

## Project Setup

- GitHub repo: github.com/NellaThePanna/young-icons (dedicated, separate from NOVA system repos)
- Asana: tracked under "NOVA — Client Work" project
- Local folder: path to be confirmed by orchestrator, do not assume

---

## Rules Carried Over From NOVA System

- Never guess a file path — confirm via search first
- Never mark something done without execution confirmation, not just edit confirmation
- Reality-checker must PASS (with real Playwright screenshots) before any deploy
- Every agent install/decision gets logged in Asana, not just made silently
- No AI slop, no hallucinated specifics — ground every claim in actual files or confirmed research
