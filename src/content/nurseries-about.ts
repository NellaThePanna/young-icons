export const NURSERY_HERO = {
  smallHeading: "NURSERIES & EARLY YEARS",
  headingWhite: "BUILT FOR",
  headingGreen: "LITTLE MOVERS.",
  sub: "Specialist sports and movement experiences for children from age 2, delivered at your nursery.",
  ctaPrimary: "WORK WITH YOUNG ICONS",
  ctaSecondary: "EXPLORE WHAT WE OFFER",
  image: "/images/placeholder/nursery-basketball.jpg",
} as const

export const EARLY_YEARS = {
  label: "WHY YOUNG ICONS",
  word: "WHY.",
  body: "Early years movement is different. Children aged 2 to 6 don't learn sport through instruction. They learn through play, repetition and exploration. Every Young Icons session is built around this.",
  imageLarge: "/images/placeholder/obstacle-course.jpg",
  imageSmall: "/images/placeholder/ball-skills.jpg",
  stages: [
    { word: "PLAY", ages: "AGES 2–3", description: "Exploration, movement and fun. No rules, no pressure." },
    { word: "LEARN", ages: "AGES 3–4", description: "Structured activities that build coordination and confidence." },
    { word: "GROW", ages: "AGES 4–6", description: "Skill development, teamwork and a love of being active." },
  ],
} as const

export const MOVEMENT_ABC = {
  label: "THE ABCs OF MOVEMENT",
  words: ["AGILITY", "BALANCE", "COORDINATION", "STRENGTH"],
  image: "/images/placeholder/karate-crawl.jpg",
  body: "We don't just run sports sessions. We build the physical foundations children need — agility, balance, coordination and strength — through structured, age-appropriate movement.",
} as const

export const NURSERY_ACTIVITIES = {
  heading: "ONE PARTNER.",
  headingLine2: "MULTIPLE ACTIVITIES.",
  body: "Every nursery is different. Young Icons builds the sports and movement programme around your children's ages, your space and your weekly schedule. One provider, multiple activities, zero hassle.",
  activities: [
    "MULTI-SPORTS", "FOOTBALL", "BALLET",
    "GYMNASTICS", "KARATE", "TENNIS",
  ],
} as const

export const NURSERY_ENQUIRY_CTA = {
  headingWhite: "LET'S GET YOUR",
  headingGreen: "NURSERY MOVING.",
  cta: "START A CONVERSATION",
  image: "/images/placeholder/ball-skills.jpg",
} as const

// v2 light editorial rebuild — see NURSERY_HERO / EARLY_YEARS / MOVEMENT_ABC / NURSERY_ACTIVITIES above for the prior dark-hero page version (components kept, unused).

export const NURSERY_HERO_V2 = {
  smallHeading: "NURSERIES & EARLY YEARS",
  headingBlack: "WE LEARN DIFFERENTLY",
  paragraphs: [
    "Specialist Early Years movement, sports and physical education designed around how young children develop.",
    "One trusted partner for every stage of their journey.",
  ],
} as const

export const NURSERY_EDITORIAL_PHOTO = {
  image: "/images/placeholder/obstacle-course.jpg",
  alt: "Children moving through a nursery obstacle course",
} as const

export const NURSERY_FORM = {
  fields: {
    nurseryName: "Nursery Name",
    contactName: "Contact Name",
    jobRole: "Job Role",
    email: "Email Address",
    phone: "Phone Number",
    location: "Location / Emirate",
    interestedIn: "Interested In",
    message: "Message (optional)",
  },
  locationOptions: [
    "Dubai", "Abu Dhabi", "Sharjah", "Other",
  ],
  interestedInOptions: [
    "Early Years Movement",
    "Specialist Sports & Activities",
    "PE & Sports Curriculum",
    "Multiple Services",
    "Other",
  ],
  submitLabel: "START A CONVERSATION",
  submittingLabel: "Sending...",
  successMessage: "THANK YOU. WE'LL BE IN TOUCH SOON.",
  errorMessage: "Something went wrong. Please try again.",
} as const
