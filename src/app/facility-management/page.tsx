import type { CSSProperties } from "react"
import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import FacilityHero from "@/components/FacilityHero"
import FacilityOverlapSection from "@/components/FacilityOverlapSection"
import Footer from "@/components/Footer"
import { FACILITY_HERO, FACILITY_CARD_1, FACILITY_CARD_2 } from "@/content/facility-management"

export const metadata: Metadata = {
  title: "Sports Facility Management Dubai | Young Icons",
  description:
    "Young Icons provides sports facility management services in Dubai. Qualified staffing, structured programming, and operational support for sports venues.",
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Young Icons Sports Academy",
  url: "[CLIENT: domain required]",
  description:
    "Dubai kids sports academy running structured, coach-led programmes for children aged 3 to 14.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
    streetAddress: "[CLIENT: street address required]",
  },
  telephone: "[CLIENT: phone required]",
  email: "[CLIENT: email required]",
}

// page-specific tokens from client docx "FACILITY MANAGEMENT PAGE.docx" — not in tokens.css,
// deliberately distinct from --color-warm-off-white / --color-near-black
const facilityPageVars = {
  "--fm-off-white": "#F7F7F5",
  "--fm-charcoal": "#2B2B2B",
  "--fm-body-grey": "#D1D5DB",
} as CSSProperties

export default function FacilityManagementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <NavBar />
      <main style={facilityPageVars}>
        <FacilityHero heading={FACILITY_HERO.heading} imagePlaceholder={FACILITY_HERO.imagePlaceholder} />
        <FacilityOverlapSection
          number={FACILITY_CARD_1.number}
          heading={FACILITY_CARD_1.heading}
          body={FACILITY_CARD_1.body}
          imagePlaceholder={FACILITY_CARD_1.imagePlaceholder}
        />
        <FacilityOverlapSection
          reverse
          wrapperPaddingTop={0}
          heading={FACILITY_CARD_2.heading}
          body={FACILITY_CARD_2.body}
          imagePlaceholder={FACILITY_CARD_2.imagePlaceholder}
          cta={FACILITY_CARD_2.cta}
        />
      </main>
      <Footer />
    </>
  )
}
