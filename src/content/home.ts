export const HOME_HERO = {
  smallHeading: "SPORT. MOVEMENT. DEVELOPMENT.",
  words: ["PLAY.", "LEARN.", "GROW."],
  wordColors: ["white", "white", "green"],
  sub: "Specialist sports and movement experiences for nurseries, schools and children across the UAE.",
  ctaPrimary: "FIND A CLASS",
  ctaSecondary: "WORK WITH US",
  videoSrc: "",
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

export const HOME_TESTIMONIALS = [
  {
    quote: "[CLIENT: parent testimonial 1 required]",
    author: "[CLIENT: parent first name]",
    detail: "parent of [name], age [X]",
  },
  {
    quote: "[CLIENT: parent testimonial 2 required]",
    author: "[CLIENT: parent first name]",
    detail: "parent of [name], age [X]",
  },
  {
    quote: "[CLIENT: parent testimonial 3 required]",
    author: "[CLIENT: parent first name]",
    detail: "parent of [name], age [X]",
  },
] as const

export const HOME_CTA_BAND = {
  headline: "Book your child's free trial.",
  sub: "No commitment. One session.",
  cta: "Book Free Trial",
} as const

export const NAV_LINKS = [
  { label: "Nurseries", href: "/nurseries" },
  { label: "Schools", href: "/schools" },
  { label: "Clubs", href: "/clubs/multi-sports" },
  { label: "Camps", href: "/camps" },
  { label: "About", href: "/about/who-we-are" },
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
