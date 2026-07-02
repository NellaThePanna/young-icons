export const CLUBS_MULTI_SPORTS_HERO = {
  h1: "Multi-Sport Club for Kids — Dubai",
  sub: "Football, basketball, cricket and more. Structured sessions, qualified coaches.",
  ctaPrimary: "Book Free Trial",
} as const

export const CLUBS_MULTI_SPORTS_ABOUT = {
  headline: "Your child doesn't have to pick one sport yet.",
  paragraphs: [
    "Young Icons' multi-sport club runs in Dubai for children aged [CLIENT: confirm age range]. Each session covers a sport from the rotation — so your child builds skills across a range of disciplines rather than specialising in one from the start.",
    "[CLIENT: confirm before publishing: how the rotation works (one sport per session, or multiple sports within each session), how long a full cycle is, venue, session frequency.]",
    "Every session follows the same structure as all our programmes — warmup, skill drills, coached game. Your child gets a consistent, coached session regardless of which sport is on for the week.",
  ],
} as const

export const CLUBS_MULTI_SPORTS_SPORTS = [
  "Football",
  "Basketball",
  "Cricket",
  "[CLIENT: confirm full sport list for rotation]",
] as const

export const CLUBS_MULTI_SPORTS_DIRECT_QAS = [
  {
    q: "What sports are included in the Young Icons multi-sport club?",
    a: "[CLIENT: full sport list required. Template: The Young Icons multi-sport club in Dubai includes [list of sports]. Sessions rotate through these sports on a [weekly/fortnightly — CLIENT: confirm] basis.]",
  },
  {
    q: "How does a multi-sport session work?",
    a: "Each session runs for [CLIENT: duration required] and follows a structured plan. Children start with a warmup, then work on the sport for that session through skill-based drills and a coached game. Groups are kept to [CLIENT: maximum group size required] and run by [CLIENT: number of coaches] qualified coaches.",
  },
] as const

export const CLUBS_MULTI_SPORTS_LOGISTICS = {
  location: "[CLIENT: venue(s) required]",
  sessionTimes: "[CLIENT: session days and times required]",
  bookingNote:
    "Book your child's free trial session through Classcard — no commitment required for the first session.",
  cta: "Book Free Trial",
} as const

export const CLUBS_MULTI_SPORTS_CTA = {
  headline: "Try every sport. Book a free session.",
  cta: "Book Free Trial",
} as const
