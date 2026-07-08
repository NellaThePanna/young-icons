export const CONTACT_HERO = {
  h1: "Get in Touch",
  sub: "Book a free trial, ask about programmes, or find out how we can help.",
} as const

export const CONTACT_FORM = {
  fields: {
    name: "Your name",
    email: "Email address",
    phone: "Phone number",
    programme: "Which programme are you interested in?",
    childAge: "Your child's age",
    message: "Your message (optional)",
  },
  programmeOptions: [
    "Nurseries",
    "After-School Activity (ASA)",
    "Holiday Camps",
    "Ballet Club",
    "Multi-Sport Club",
    "Facility Management",
    "Something else",
  ],
  slaNote:
    "[CLIENT: confirm response time SLA before publishing — e.g. \"We'll get back to you within 24 hours.\" Do not invent the SLA.]",
  submitLabel: "Send Message",
  submittingLabel: "Sending…",
  successMessage: "Your message has been sent. We'll be in touch shortly.",
  errorMessage:
    "Something went wrong. Please try again, or reach us on WhatsApp.",
} as const

export const CONTACT_NAP = {
  name: "Young Icons Sports Academy",
  address: "[CLIENT: full Dubai address required]",
  phone: "+971 55 172 6530",
  email: "[CLIENT: email required]",
  whatsappNumber: "971551726530",
  whatsappMessage: "Hi, I'd like to find out more about Young Icons Sports Academy.",
  mapsEmbedUrl: "[CLIENT: Google Maps embed URL required]",
  cta: "WhatsApp Chat",
} as const

export const CONTACT_DIRECT_QAS = [
  {
    q: "Where is Young Icons Sports Academy located in Dubai?",
    a: "[CLIENT: address and nearby landmark required. Template: Young Icons Sports Academy is located at [address], Dubai, near [landmark — CLIENT: confirm].]",
  },
  {
    q: "How do I book a free trial session?",
    a: "You can book a free trial for your child through Classcard — the first session is free with no commitment required. Alternatively, fill in the contact form on this page and we'll get back to you with session availability.",
  },
] as const

export const CONTACT_SOCIAL = {
  headline: "Follow along.",
  paragraphs: [
    "Follow us on Instagram: [CLIENT: handle required]",
    "Facebook: [CLIENT: page URL required]",
    "Drop us a message on Instagram or Facebook — we reply to DMs.",
  ],
} as const
