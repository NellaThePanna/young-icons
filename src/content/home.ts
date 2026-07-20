export const HOME_HERO = {
  words: ["SPORT.", "MOVEMENT.", "FOR EVERY CHILD."],
  wordColors: ["white", "white", "green"],
  ctaPrimary: "FIND A CLASS",
  ctaSecondary: "WORK WITH US",
  videoSrc: "/videos/hero-loop.mp4",
  imageFallback: "/images/placeholder/nursery-basketball.jpg",
} as const

export const HOME_TRUST_CHIPS = [
  "Ages 3–14",
  "Qualified Coaches",
  "Dubai-Based",
  "Free Trial Available",
] as const

export const EXPLORE_SECTION = {
  smallHeading: "EXPLORE YOUNG ICONS",
  heading: "FIND YOUR WAY TO MOVE.",
  sub: "From first movements to school activities, clubs and holiday experiences, discover where Young Icons fits into your child's journey.",
} as const

export const EXPLORE_CARDS = [
  {
    label: "EARLY YEARS",
    heading: "AGES 2–6",
    sub: "Movement and sport for the youngest children.",
    cta: "FIND A CLASS",
    href: "/nurseries",
    image: "/images/placeholder/nursery-basketball.jpg",
  },
  {
    label: "SCHOOLS",
    heading: "ASA & PE SUPPORT",
    sub: "Specialist sports delivered at your school.",
    cta: "WORK WITH US",
    href: "/schools",
    image: "/images/placeholder/tennis-rackets.jpg",
  },
  {
    label: "CLUBS & ACADEMIES",
    heading: "PARENT BOOKABLE",
    sub: "Weekly clubs bookable through Classcard.",
    cta: "FIND A CLASS",
    href: "/clubs/multi-sports",
    image: "/images/placeholder/ball-skills.jpg",
  },
  {
    label: "HOLIDAY CAMPS",
    heading: "SCHOOL HOLIDAYS",
    sub: "Action-packed days across Dubai and Abu Dhabi.",
    cta: "EXPLORE CAMPS",
    href: "/camps",
    image: "/images/placeholder/obstacle-course.jpg",
  },
] as const

export const WHO_WE_ARE = {
  smallHeading: "THIS IS YOUNG ICONS",
  heading: "BUILT FOR THE WAY CHILDREN MOVE.",
  body: "Young Icons is a UAE-based sports and movement provider working with nurseries, schools, clubs and holiday camps across Dubai and Abu Dhabi. Founded by Luke Hannon, a UK-qualified PE teacher with 15+ years experience, every programme is built around structured coaching, qualified staff and genuine development.",
  cta: "MEET YOUNG ICONS",
  ctaHref: "/about/who-we-are",
  imageLarge: "/images/placeholder/ball-skills.jpg",
  imageSmall: "/images/placeholder/obstacle-course.jpg",
} as const

export const PHILOSOPHY = [
  {
    word: "PLAY",
    caption: "Sessions children genuinely look forward to.",
    image: "/images/placeholder/nursery-basketball.jpg",
  },
  {
    word: "LEARN",
    caption: "Age-appropriate coaching that builds skills through movement.",
    image: "/images/placeholder/tennis-rackets.jpg",
  },
  {
    word: "GROW",
    caption: "Confidence, coordination and positive relationships with sport.",
    image: "/images/placeholder/karate-crawl.jpg",
  },
] as const

export const HOME_STATS = [
  {
    value: "50+",
    label: "EDUCATIONAL FACILITIES",
    isNumeric: true,
  },
  {
    value: "900+",
    label: "CHILDREN MOVING EVERY WEEK",
    isNumeric: true,
    unconfirmed: true,
  },
  {
    value: "2–18",
    label: "AGES WE SUPPORT",
    isNumeric: false,
  },
  {
    value: "DUBAI +\nABU DHABI",
    label: "ACROSS THE UAE",
    isNumeric: false,
  },
] as const

export const ACTIVITIES_SECTION = {
  smallHeading: "WHAT GETS US MOVING",
  heading: "SOMETHING FOR EVERY ICON.",
} as const

export const HOME_ACTIVITIES = [
  { name: "MULTI-SPORTS", image: "/images/placeholder/ball-skills.jpg" },
  { name: "FOOTBALL", image: "/images/placeholder/activity-football.png" },
  { name: "BALLET", image: "/images/placeholder/ballet-ribbon.jpg" },
  { name: "GYMNASTICS", image: "/images/placeholder/obstacle-course.jpg" },
  { name: "KARATE", image: "/images/placeholder/karate-crawl.jpg" },
  { name: "TENNIS", image: "/images/placeholder/tennis-rackets.jpg" },
  { name: "BASKETBALL", image: "/images/placeholder/nursery-basketball.jpg" },
  { name: "RUGBY", image: "/images/placeholder/activity-rugby.png" },
  { name: "BOXING", image: "/images/placeholder/activity-boxing.png" },
] as const

export const HOME_PROGRAMME_CARDS = [
  {
    name: "Nurseries",
    ageRange: "From age 3",
    description:
      "Sports sessions for nursery-age children in Dubai — building coordination, balance, and confidence from the start.",
    cta: "Learn more",
    href: "/nurseries",
  },
  {
    name: "Schools ASA",
    ageRange: "Ages 5–14",
    description:
      "After-school sports activity delivered at your child's school by our coaching team.",
    cta: "Learn more",
    href: "/schools/asa",
  },
  {
    name: "Holiday Camps",
    ageRange: "Ages 3–14",
    description:
      "Structured full and half-day sports camps across the school holiday calendar.",
    cta: "Learn more",
    href: "/schools/holiday-camps",
  },
  {
    name: "Clubs",
    ageRange: "[CLIENT: confirm age range]",
    description:
      "Weekly sports clubs — ballet and multi-sport — run by qualified coaches and bookable through Classcard.",
    cta: "Learn more",
    // TODO: update href when /clubs index page is built
    href: "#",
  },
] as const

export const HOME_DIRECT_ANSWER_QAS = [
  {
    q: "What age groups does Young Icons cater to?",
    a: "Young Icons Sports Academy runs structured sports programmes for children aged 3 to 14 in Dubai. We have specific programmes for nursery-age children from age 3, primary school children, and older kids up to 14.",
  },
  {
    q: "Where is Young Icons Sports Academy located in Dubai?",
    a: "[CLIENT: venue address and area name required for this answer — do not publish without it]",
  },
] as const

// DEVELOPMENT ONLY — replace with approved client testimonials before go-live
export const HOME_TESTIMONIALS = [
  {
    quote: "My daughter asks every week if today is her Young Icons day. The coaches have made her so much more confident and excited to be active.",
    author: "Sarah",
    detail: "parent of daughter, age 5",
  },
  {
    quote: "The difference in his confidence and coordination has been amazing. He absolutely loves the sessions and talks about his coach all week.",
    author: "Emma",
    detail: "parent of son, age 4",
  },
  {
    quote: "Young Icons is the first activity she has genuinely looked forward to every single week. The coaches understand how to keep young children engaged.",
    author: "Rachel",
    detail: "parent of daughter, age 6",
  },
] as const

export const HOME_PARTNERS = [
  "NURSERY PARTNER 1",
  "NURSERY PARTNER 2",
  "SCHOOL PARTNER 1",
  "SCHOOL PARTNER 2",
  "NURSERY PARTNER 3",
  "SCHOOL PARTNER 3",
  "NURSERY PARTNER 4",
  "SCHOOL PARTNER 4",
] as const

export const PARTNERS_SECTION = {
  heading: "TRUSTED BY NURSERIES & SCHOOLS ACROSS THE UAE.",
  sub: "From early years settings to established schools, Young Icons works with 50+ educational facilities across Dubai and Abu Dhabi.",
  ctaA: "FOR NURSERIES",
  ctaAHref: "/nurseries",
  ctaB: "FOR SCHOOLS",
  ctaBHref: "/schools",
} as const

export const HOME_CTA_BAND = {
  headline: "Book your child's free trial.",
  sub: "No commitment. One session.",
  cta: "Book Free Trial",
} as const

export const FINAL_CTA = {
  smallHeading: "READY TO MOVE?",
  heading: "LET'S GET MOVING.",
  sub: "Find a Young Icons class or discover how we can work with your nursery or school.",
  ctaPrimary: "FIND A CLASS",
  ctaSecondary: "WORK WITH US",
  image: "/images/placeholder/ball-skills.jpg",
} as const

export type NavDropdownItem = { label: string; href: string }
export type NavItem = {
  label: string
  href: string
  dropdown?: NavDropdownItem[]
}

export const NAV_LINKS: NavItem[] = [
  { label: "Nurseries", href: "/nurseries" },
  {
    label: "Schools",
    href: "/schools",
    dropdown: [
      { label: "Schools Overview", href: "/schools" },
      { label: "After-School Activity", href: "/schools/asa" },
      { label: "Facility Management", href: "/facility-management" },
    ],
  },
  {
    label: "Clubs",
    href: "/clubs/multi-sports",
    dropdown: [
      { label: "Multi-Sports", href: "/clubs/multi-sports" },
      { label: "Ballet — Coming Soon", href: "/clubs/ballet" },
      { label: "Karate — Coming Soon", href: "/clubs/karate" },
    ],
  },
  { label: "Camps", href: "/camps" },
  {
    label: "About",
    href: "/about/who-we-are",
    dropdown: [
      { label: "Who We Are", href: "/about/who-we-are" },
      { label: "What We Do", href: "/about/what-we-do" },
      { label: "Meet the Team", href: "/about/meet-the-team" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const

export const FOOTER_NAP = {
  name: "Young Icons Sports Academy",
  address: "[CLIENT: full Dubai address required]",
  phone: "+971 55 172 6530",
  email: "[CLIENT: email address required]",
  whatsappNumber: "971551726530",
  whatsappMessage: "Hi, I'd like to find out more about Young Icons Sports Academy.",
} as const
