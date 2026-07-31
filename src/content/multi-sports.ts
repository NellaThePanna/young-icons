export const MULTI_HERO = {
  headingLines: ["PLAY.", "LEARN.", "GROW."],
  sub: "Multi-Sports Club",
  image: "/images/placeholder/ball-skills.jpg",
} as const

export const MULTI_ABOUT = {
  eyebrow: "Multi-Sports Club",
  body: "Every week brings a new sport, new skills and new challenges. Our coaches create fun, structured sessions that help children build confidence, coordination and a lifelong love of being active.",
  cards: [
    {
      icon: "basketball",
      heading: "New Sport Every Week",
      body: "Discover football, tennis, athletics, basketball and more.",
    },
    {
      icon: "sprint",
      heading: "Build Fundamental Skills",
      body: "Develop agility, balance, coordination and strength through movement and play.",
    },
    {
      icon: "smile",
      heading: "Learn Through Play",
      body: "Fun games and challenges that build confidence, teamwork and a positive attitude.",
    },
    {
      icon: "group",
      heading: "Small Group Coaching",
      body: "Qualified coaches provide personalized support in a safe and encouraging environment.",
    },
  ],
} as const

export const MULTI_PHOTO_BAND = {
  image: "/images/placeholder/activity-football.png",
} as const

// Orphaned by the multi-sports-page.html redesign — no longer rendered anywhere,
// kept only so MultiWhat.tsx / MultiLocations.tsx still compile pending a delete decision.
export const MULTI_WHAT = {
  word: "WHAT.",
  headingBlack: "WHAT IS",
  headingGreen: "MULTI-SPORTS?",
  body: "Young Icons Multi-Sports is a weekly club where your child tries a different sport every session. Football one week, basketball the next — coached sessions that build skills across multiple disciplines.",
  statement1: "45 MINUTES.",
  statement2: "DIFFERENT SPORTS.",
  statement3: "ONE ACTIVE CLUB.",
  image: "/images/placeholder/obstacle-course.jpg",
} as const

export const MULTI_LOCATIONS = {
  smallHeading: "FIND YOUR CLUB",
  heading: "READY TO TRY",
  headingGreen: "SOMETHING NEW?",
  body: "Young Icons Multi-Sports clubs run at venues across Dubai. Find your nearest location and book through Classcard.",
  cta: "FIND A CLUB",
  locations: [
    { name: "CEDAR SCHOOL", area: "Dubai", day: "[CLIENT: confirm]", ages: "[CLIENT: confirm]" },
    { name: "BVS ISLAND", area: "Dubai", day: "[CLIENT: confirm]", ages: "[CLIENT: confirm]" },
  ],
} as const

export const MULTI_LOCATION_CTA = {
  locationEyebrow: "First Location",
  locationHeading: "Dubai Sports City",
  line1: "Saturday Mornings",
  line2: "Launching Autumn 2026",
  ctaHeading: "Ready to Join?",
  ctaBody: "Be the first to hear when registrations open.",
  ctaLabel: "Register Interest",
  ctaHref: "/contact",
} as const
