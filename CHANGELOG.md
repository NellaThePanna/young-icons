# Changelog

All notable changes to this project should be documented in this file.

## 2026-07-22 — Style(nurseries): replace proof-row placeholder checkmarks with label-matched icons
`889ff45`

### Changed
- `src/components/WhyYoungIcons.tsx` — proof row (Digital Registration, Attendance, Parent Comms, Quality Assurance) now shows 4 distinct icons (signup, calendar-check, chat, shield) matched by label via a lookup map, instead of 4 identical checkmarks. Stroke-width 1.7, round caps/joins, academy green. Checklist bullets elsewhere in the component untouched.

---

## 2026-07-22 — Feat(nurseries): flag Gymnastics and Multi-sports chips as coming soon
`e856950`

### Changed
- `src/components/WhyYoungIcons.tsx`, `src/content/nurseries-about.ts` — added a "Coming Soon" badge on the Gymnastics and Multi-sports chip photos in the Multiple Activities tab, since both currently use mismatched stand-in photography (boxing, rugby) until real assets arrive.

---

## 2026-07-22 — Feat(nurseries): add Multiple Activities tab custom layout
`bfd7795`

### Changed
- `src/components/WhyYoungIcons.tsx`, `src/content/nurseries-about.ts`, `src/app/globals.css` — rail tab 02 (MULTIPLE ACTIVITIES) now renders its own layout instead of the shared tab shell: hero photo + detail block, a 6-photo activity chip row (Football, Gymnastics, Ballet, Karate, Tennis, Multi-sports with per-activity captions), and a star-icon footer note. Football/Ballet/Karate/Tennis reuse their exact matching photos from the original activity set; Gymnastics and Multi-sports stand in with the closest unused placeholder photos pending real Young Icons photography. Tabs 01/03/04 and the shared proof row untouched.

---

## 2026-07-22 — Feat(nurseries): redesign WHY YOUNG ICONS section — rail, detail panel, photo, proof row
`661bd85`

### Changed
- `src/components/WhyYoungIcons.tsx`, `src/content/nurseries-about.ts`, `src/app/globals.css` — rebuilt Section 04 per the `design/approved/why-young-icons-section.html` reference: widened rail, restyled detail panel (eyebrow/heading/rule/body), added a photo box, a "WHY NURSERIES CHOOSE US" checklist + CTA, and a shared 4-item proof row that renders under all four tabs. Card 04 (FULLY MANAGED) is now the default open tab.
