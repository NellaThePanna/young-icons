export const SCHOOLS_ACTIVITIES_HERO = {
  label: "FOR SCHOOLS",
  headlineLines: [
    { text: "ONE PARTNER.", tone: "black" },
    { text: "COMPLETE", tone: "green" },
    { text: "PROGRAMME.", tone: "black" },
  ],
  body: "We manage your school's complete activity programme—from planning and staffing to parent bookings, attendance and programme delivery.",
  scrollLabel: "SCROLL TO EXPLORE",
  image: "/images/schools/school-coaching-banner-2400x1000.webp",
  imageAlt: "Young Icons coach kneeling and talking with a group of school children in an indoor sports hall",
} as const

export const SCHOOLS_EDITORIAL_ROWS = [
  {
    id: "manage",
    number: "01.",
    closedTitle: "WE MANAGE THE REST.",
    headingLines: ["WE MANAGE", "THE REST."],
    body: "We handle everything behind the scenes so your school can focus on what matters most — teaching and inspiring students.",
    services: [
      { title: "Planning", body: "We design term plans and programmes that align with your school's goals." },
      { title: "Staffing", body: "Qualified, experienced and vetted coaches you can rely on." },
      { title: "Parent Bookings", body: "Easy registration and communication for parents." },
      { title: "Attendance", body: "Live registers and accurate reporting at every session." },
      { title: "Communication", body: "We keep parents informed and engaged throughout the term." },
      { title: "Programme Delivery", body: "High-quality sessions delivered consistently, week after week." },
    ],
    closingLines: ["We deliver the programme.", "You focus on education."],
    image: "/images/schools/school-coaching-banner-2400x1000.webp",
    imageAlt: "Young Icons coach kneeling and talking with a group of school children in an indoor sports hall",
  },
  {
    id: "activities",
    number: "02.",
    closedTitle: "OUR SCHOOL ACTIVITIES.",
    headingLines: ["OUR SCHOOL", "ACTIVITIES."],
    body: "A wide range of engaging programmes that inspire students, build confidence and support lifelong development.",
    categories: [
      {
        title: "INDIVIDUAL SPORTS",
        tagline: "Build skills. Build confidence.",
        image: "/images/schools/individual-sports-tennis.png",
        imageAlt: "A boy in Young Icons kit playing tennis on court",
        activities: ["Tennis", "Swimming", "Gymnastics"],
      },
      {
        title: "TEAM SPORTS",
        tagline: "Play together. Achieve together.",
        image: "/images/schools/team-sports-football.png",
        imageAlt: "Boys in Young Icons kits playing football",
        activities: ["Football", "Basketball", "Rugby", "Volleyball", "Netball", "Indoor Hockey"],
      },
      {
        title: "MARTIAL ARTS",
        tagline: "Discipline today. Strength for life.",
        image: "/images/schools/martial-arts-karate.png",
        imageAlt: "A boy in a karate gi in a fighting stance",
        activities: ["Boxing", "Karate", "Jiu-Jitsu"],
      },
      {
        title: "DANCE & MOVEMENT",
        tagline: "Express yourself. Move with confidence.",
        image: "/images/schools/dance-and-movement.png",
        imageAlt: "Girls dancing with arms raised in a studio",
        activities: ["Ballet", "Jazz", "Hip Hop", "Cheerleading"],
      },
    ],
    stem: {
      title: "STEM ACTIVITIES",
      body: "We can also integrate STEM-based activities into your programme to inspire curiosity, problem-solving and innovation.",
    },
    closingLine: "From weekly activities to complete school programmes, we build around your school.",
  },
] as const

export const SCHOOLS_TRUSTED_PARTNERS = {
  label: "03. TRUSTED PARTNERS",
  stats: [
    { primary: "45+", secondary: ["SCHOOLS"] },
    { primary: "18,000+", secondary: ["CHILDREN", "EVERY WEEK"] },
    { primary: "ACROSS THE UAE", secondary: ["AND GROWING"] },
  ],
  heading: "TRUSTED BY SCHOOLS ACROSS THE UAE.",
  logosImage: "/images/schools/00-all-school-logos-white.png",
  logosImageAlt: "Logos of partner schools: Citizens International School, Hartland International School, Nord Anglia International School, Dubai British School, Swiss International Scientific School Dubai, and Fairgreen International School",
} as const

export const SCHOOLS_EDITORIAL_CTA = {
  label: "04. LET'S CONNECT",
  headingBlack: "LET'S BUILD YOUR",
  headingGreen: "SCHOOL PROGRAMME.",
  prompt: "READY TO WORK WITH US?",
  action: "START A CONVERSATION →",
} as const
