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
    label: "AGES 2–6",
    heading: "EARLY YEARS",
    sub: "Movement and sport for the youngest children.",
    cta: "FIND A CLASS",
    href: "/nurseries",
    image: "/images/placeholder/nursery-basketball.jpg",
  },
  {
    label: "NURSERY & SCHOOL DELIVERY",
    heading: "SCHOOLS",
    sub: "Specialist sports delivered at your school.",
    cta: "WORK WITH US",
    href: "/schools",
    image: "/images/placeholder/tennis-rackets.jpg",
  },
  {
    label: "PARENT-BOOKABLE",
    heading: "CLUBS",
    sub: "Weekly clubs bookable through Classcard.",
    cta: "FIND A CLASS",
    href: "/clubs/multi-sports",
    image: "/images/placeholder/ball-skills.jpg",
  },
  {
    label: "SCHOOL HOLIDAYS",
    heading: "HOLIDAY CAMPS",
    sub: "Action-packed days across Dubai and Abu Dhabi.",
    cta: "EXPLORE CAMPS",
    href: "/schools/holiday-camps",
    image: "/images/placeholder/obstacle-course.jpg",
  },
] as const

export const WHO_WE_ARE = {
  smallHeading: "THIS IS YOUNG ICONS",
  headingWhite: "BUILT FOR THE WAY CHILDREN",
  headingGreen: "MOVE.",
  body: "Age-appropriate coaching that builds skills, confidence and a lifelong love of movement.",
  cta: "MEET YOUNG ICONS",
  ctaHref: "/about/who-we-are",
  imageLarge: "/images/placeholder/ball-skills.jpg",
  imageSmall: "/images/placeholder/obstacle-course.jpg",
} as const

export const HOME_STATS = [
  {
    value: "45+",
    label: "EDUCATIONAL PARTNERS",
    isNumeric: true,
  },
  {
    value: "900+",
    label: "CHILDREN EVERY WEEK",
    isNumeric: true,
    unconfirmed: true,
  },
  {
    value: "DUBAI & ABU DHABI",
    label: "",
    isNumeric: false,
    icon: true,
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
    href: "/schools",
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

// Names from client mockup — replace with approved logo files from Luke when supplied (Asana task logged).
export const HOME_PARTNERS = [
  "British Orchard Nursery",
  "Blossom Nursery",
  "Dubai British",
  "Kings School",
  "Hartland International",
  "Jumeirah",
] as const

// Approved monochrome partner logo files, supplied 2026-08-25 (Landing_Page_Complete_Claude_Code_Package_v1).
export const HOME_PARTNER_LOGOS = [
  { name: "Cedar School", src: "/images/brand/partners/cedar-school.png" },
  { name: "Chubby Cheeks Nursery", src: "/images/brand/partners/chubby-cheeks-nursery.png" },
  { name: "Citizens School", src: "/images/brand/partners/citizens-school.png" },
  { name: "British Home Nursery", src: "/images/brand/partners/british-home-nursery.png" },
  { name: "Dubai British School Jumeira", src: "/images/brand/partners/dubai-british-school-jumeira.png" },
  { name: "Swiss International Scientific School Dubai", src: "/images/brand/partners/swiss-international-scientific-school.png" },
] as const

export const PARTNERS_SECTION = {
  eyebrow: "TRUSTED ACROSS THE UAE",
  heading: "PARTNERING WITH LEADING NURSERIES & SCHOOLS",
  sub: "We are proud to work alongside forward-thinking nurseries and schools, delivering high quality children's sports and movement programmes.",
  // CLIENT-TO-CONFIRM: Rev 3 written brief forbids naming cities. If approved, swap sub with:
  // "We are proud to work alongside forward-thinking nurseries and schools across Dubai and Abu Dhabi, delivering high quality children's sports and movement programmes."
  ctaA: "FOR NURSERIES",
  ctaAHref: "/nurseries",
  ctaB: "FOR SCHOOLS",
  ctaBHref: "/schools",
} as const

export const PARTNERING_CTA = {
  heading: "READY TO BRING MOVEMENT TO YOUR SCHOOL?",
  sub: "Let's work together to inspire every child to play, learn and grow.",
  cta: "GET IN TOUCH",
  ctaHref: "/contact",
} as const

export const HOME_CTA_BAND = {
  headline: "Book your child's free trial.",
  sub: "No commitment. One session.",
  cta: "Book Free Trial",
} as const

export const FINAL_CTA = {
  headingWhite: "READY TO MOVE?",
  headingGreen: "",
  sub: "",
  ctaPrimary: "FIND A CLASS",
  ctaSecondary: "WORK WITH US",
  image: "/images/placeholder/ready-to-move-children-running.jpg",
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
      { label: "Our School Activities", href: "/schools" },
      { label: "Facility Management", href: "/schools/facility-management" },
      { label: "Holiday Camps", href: "/schools/holiday-camps" },
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
  { label: "Contact", href: "/contact" },
] as const

export const FOOTER_NAP = {
  name: "Young Icons Sports Academy",
  address: "[CLIENT: full Dubai address required]",
  locationLine: "Dubai • Abu Dhabi / United Arab Emirates",
  phone: "+971 55 172 6530",
  // Supplied 2026-08-25 (Landing_Page_Complete_Claude_Code_Package_v1 master prompt, footer spec).
  email: "Luke@youngiconsacademy.com",
  whatsappNumber: "971551726530",
  whatsappMessage: "Hi, I'd like to find out more about Young Icons Sports Academy.",
} as const

export const FOOTER_BRAND = {
  wordmark: "YOUNG ICONS",
  motto: "PLAY • LEARN • GROW",
  tagline:
    "Specialist sports and movement programmes for nurseries, schools and communities across the UAE.",
} as const

export const FOOTER_LINKS = [
  { label: "Nurseries", href: "/nurseries" },
  { label: "Schools", href: "/schools" },
  { label: "Clubs", href: "/clubs/multi-sports" },
  { label: "Holiday Camps", href: "/schools/holiday-camps" },
  { label: "Facility Management", href: "/schools/facility-management" },
  { label: "Contact", href: "/contact" },
] as const

export const FOOTER_SOCIAL = [
  { label: "Instagram", href: "https://instagram.com/youngicons_UAE" },
  { label: "Facebook", href: "[CLIENT: Facebook URL]" },
  { label: "LinkedIn", href: "[CLIENT: LinkedIn URL]" },
] as const
