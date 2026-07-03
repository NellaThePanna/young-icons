export const GALLERY_HERO = {
  h1: "Young Icons in Action",
  sub: "From nursery sessions to holiday camps — your child's academy at work.",
  intro:
    "These are photos from Young Icons Sports Academy — a kids sports academy in Dubai running structured programmes for children aged 3 to 14. The images are from real sessions: nursery sports, after-school activities, holiday camps, and weekly clubs, run by our coaching team in Dubai.",
} as const

export const GALLERY_FILTERS = [
  "All",
  "Nurseries",
  "Schools",
  "Clubs",
  "Holiday Camps",
] as const

export const GALLERY_ITEMS = [
  {
    category: "Nurseries",
    alt: "[CLIENT: photo required — nursery sports session]",
  },
  {
    category: "Schools",
    alt: "[CLIENT: photo required — after-school activity session]",
  },
  {
    category: "Clubs",
    alt: "[CLIENT: photo required — ballet or multi-sport club session]",
  },
  {
    category: "Holiday Camps",
    alt: "[CLIENT: photo required — holiday camp session]",
  },
  // [CLIENT: all photography required from real Young Icons sessions. No stock photography. Add remaining photos before this page goes live.]
] as const

export const GALLERY_CTA = {
  headline: "See it for yourself. Book a free trial.",
  cta: "Book Free Trial",
} as const
