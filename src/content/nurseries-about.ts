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

export const APPROACH_ROWS = [
  {
    id: "play",
    number: "01",
    word: "PLAY",
    // CLIENT-TO-CONFIRM: questionnaire said "approx 2–6" overall for the nursery age range —
    // using the per-stage bands from EARLY_YEARS above until client confirms exact ages for this page
    ages: "AGES 1–3",
    body: "First movement, balance and coordination through guided, joyful play. Sessions built around curiosity — children learn to move before they know they're learning.",
    chips: ["MOVEMENT", "BALANCE", "COORDINATION"],
    image: "/images/placeholder/ball-skills.jpg",
  },
  {
    id: "learn",
    number: "02",
    word: "LEARN",
    ages: "AGES 3–4",
    body: "Developing fundamental movement, coordination and early sports skills through active learning, with measurable developmental goals for every session.",
    chips: ["FUNDAMENTALS", "EARLY SPORTS SKILLS", "ACTIVE LEARNING"],
    image: "/images/placeholder/karate-crawl.jpg",
  },
  {
    id: "grow",
    number: "03",
    word: "GROW",
    ages: "AGES 4–6",
    body: "Building confidence, teamwork and a wider range of sports skills through progressive activities that prepare children for school sport and beyond.",
    chips: ["CONFIDENCE", "TEAMWORK", "PROGRESSION"],
    image: "/images/placeholder/ballet-ribbon.jpg",
  },
] as const

export const WHY_YOUNG_ICONS = [
  {
    id: "one-partner",
    number: "01",
    label: "ONE PARTNER",
    eyebrow: "ONE PARTNER",
    heading: "EVERY ACTIVITY, ONE RELATIONSHIP.",
    body: "One agreement, one coordination point, one accountable team for every movement programme in your nursery.",
  },
  {
    id: "multiple-activities",
    number: "02",
    label: "MULTIPLE ACTIVITIES",
    eyebrow: "MULTIPLE ACTIVITIES",
    heading: "A WORLD OF ACTIVITIES. ALL IN ONE PLACE.",
    body: "From ball skills to ballet, our specialist coaches deliver a wide range of engaging activities that help children move, learn and grow.",
  },
  {
    id: "tailored-programmes",
    number: "03",
    label: "TAILORED PROGRAMMES",
    eyebrow: "TAILORED PROGRAMMES",
    heading: "DESIGNED AROUND YOUR NURSERY, YOUR CHILDREN AND YOUR GOALS.",
    body: "Every programme is tailored to your timetable, age groups and learning objectives, ensuring every session supports children's development while fitting seamlessly into your nursery.",
  },
  {
    id: "fully-managed",
    number: "04",
    label: "FULLY MANAGED",
    eyebrow: "FULLY MANAGED",
    heading: "WE HANDLE EVERYTHING.",
    body: "Registration, attendance, parent communication and quality assurance, managed end to end by Young Icons.",
  },
] as const

export const WHY_YOUNG_ICONS_PHOTO = "/images/placeholder/nursery-basketball.jpg"

export const MULTIPLE_ACTIVITIES_TAB = {
  heroImage: "/images/placeholder/nursery-basketball.jpg",
  footerNote: "Plus many more! We tailor our activities to suit your nursery and place in your core.",
} as const

// CLIENT-TO-CONFIRM: no dedicated Gymnastics or Multi-sports photography exists in the repo yet.
// Football/Ballet/Karate/Tennis reuse their exact matching assets from the original activity set;
// Gymnastics and Multi-sports stand in with the closest unused placeholder photos (boxing, rugby)
// until real Young Icons photography arrives — swap these two first.
export const MULTIPLE_ACTIVITIES_CHIPS = [
  {
    label: "Football",
    caption: "Build skills, confidence and teamwork.",
    image: "/images/placeholder/activity-football.png",
    comingSoon: false,
  },
  {
    label: "Gymnastics",
    caption: "Develop strength, coordination and flexibility.",
    image: "/images/placeholder/activity-boxing.png",
    comingSoon: true,
  },
  {
    label: "Ballet",
    caption: "Encourage creativity, rhythm and expression.",
    image: "/images/placeholder/ballet-ribbon.jpg",
    comingSoon: false,
  },
  {
    label: "Karate",
    caption: "Build discipline, focus and self-confidence.",
    image: "/images/placeholder/karate-crawl.jpg",
    comingSoon: false,
  },
  {
    label: "Tennis",
    caption: "Introduce racket skills through fun and play.",
    image: "/images/placeholder/tennis-rackets.jpg",
    comingSoon: false,
  },
  {
    label: "Multi-sports",
    caption: "A variety of games that build movement and teamwork.",
    image: "/images/placeholder/activity-rugby.png",
    comingSoon: true,
  },
] as const

export const WHY_CHOOSE_US = {
  heading: "WHY NURSERIES CHOOSE US",
  checklist: [
    "Qualified, DBS-checked coaching team",
    "Digital registration & attendance",
    "Termly progress reports for every child",
  ],
  cta: "WORK WITH US",
} as const

// Captions are client-approved as of 2026-07-22.
// Keyed by WHY_YOUNG_ICONS tab id. "multiple-activities" has no entry — that tab
// shows no proof row at all.
export const WHY_PROOF_ROW: Record<string, { label: string; caption: string }[]> = {
  "one-partner": [
    { label: "Digital Registration", caption: "Every child registered and tracked online." },
    { label: "Attendance", caption: "Live attendance logged every session." },
    { label: "Parent Comms", caption: "Regular updates sent straight to parents." },
    { label: "Quality Assurance", caption: "Ongoing coach observations and reviews." },
  ],
  "tailored-programmes": [
    { label: "PE Curriculum", caption: "Structured lesson plans with clear learning objectives." },
    { label: "Learning Outcomes", caption: "Every programme has measurable developmental goals." },
    { label: "Progress Reports", caption: "Track each child's progress throughout the year." },
    { label: "Certificates & Rewards", caption: "Celebrate achievement with reports, certificates and medals." },
  ],
  "fully-managed": [
    { label: "Staffing & Cover", caption: "Qualified substitute coaches always available." },
    { label: "Equipment & Setup", caption: "All kit provided, set up and packed away." },
    { label: "Health & Safety", caption: "Risk assessments and safeguarding built in." },
    { label: "Reporting & Admin", caption: "Invoicing and paperwork handled end to end." },
  ],
}

export const NURSERY_ACTIVITIES_STRIP = [
  "FOOTBALL", "GYMNASTICS", "BALLET", "MULTI-SPORTS", "KARATE", "TENNIS", "BASKETBALL",
] as const

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
