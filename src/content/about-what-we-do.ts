export const ABOUT_WHAT_HERO = {
  h1: "What We Do",
  sub: "Structured sports programmes for Dubai kids from age 3 to 14.",
  intro:
    "Young Icons runs a range of sports programmes in Dubai — from nursery-age sessions to after-school activities, holiday camps, and weekly clubs. Each programme is run by qualified coaches with a structured session plan your child follows every week.",
} as const

export const ABOUT_WHAT_PROGRAMME_CARDS = [
  {
    name: "Nurseries",
    ageRange: "From age 3",
    description:
      "Sports sessions for nursery-age children — coordination, balance, and confidence, coached by qualified staff.",
    cta: "Go to programme",
    href: "/nurseries",
  },
  {
    name: "Schools ASA",
    ageRange: "Ages 5–14",
    description:
      "After-school sports activity delivered directly at your child's school.",
    cta: "Go to programme",
    href: "/schools",
  },
  {
    name: "Holiday Camps",
    ageRange: "Ages 3–14",
    description:
      "Full and half-day structured sports camps across the school holiday calendar.",
    cta: "Go to programme",
    href: "/schools/holiday-camps",
  },
  {
    name: "Clubs",
    ageRange: "[CLIENT: confirm age range per club]",
    description:
      "Weekly ballet and multi-sport clubs, open for enrolment through Classcard.",
    cta: "Go to programme",
    href: "#",
  },
] as const

export const ABOUT_WHAT_DIRECT_QAS = [
  {
    q: "What programmes does Young Icons offer?",
    a: "Young Icons Sports Academy offers the following sports programmes for children in Dubai: nursery sports from age 3 (movement, coordination, confidence); After-School Activity (ASA) at Dubai schools for ages 5–14; Holiday Camps — full and half-day sessions across school holidays for ages 3–14; Multi-Sport Club — weekly sessions rotating across [CLIENT: confirm sport list]; and Ballet Club for children aged [CLIENT: confirm age range]. All programmes are run by qualified coaches and can be booked through Classcard.",
  },
] as const

export const ABOUT_WHAT_SESSION_STEPS = [
  {
    heading: "Arrive",
    body: "Your child arrives at the session. [CLIENT: confirm drop-off process and whether parents stay or leave — this needs to be specific, not generic.]",
  },
  {
    heading: "Train",
    body: "Your child works through a structured session — warmup, skill drills, coached activity. Sessions follow the same format each week so your child knows what to expect.",
  },
  {
    heading: "Progress",
    body: "Each week builds on the last. [CLIENT: confirm whether there is any formal progress tracking or parent update — if yes, describe it specifically.]",
  },
] as const

export const ABOUT_WHAT_CTA = {
  headline: "Not sure which programme fits?",
  sub: "Get in touch and we'll point you in the right direction.",
  primaryCta: "Contact Us",
  primaryHref: "/contact",
  secondaryCta: "Book Free Trial",
} as const
