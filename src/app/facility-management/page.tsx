import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import HeroPage from "@/components/HeroPage"
import TwoColumn from "@/components/TwoColumn"
import DirectAnswer from "@/components/DirectAnswer"
import ThreePillars from "@/components/ThreePillars"
import CTABand from "@/components/CTABand"
import Footer from "@/components/Footer"
import {
  FACILITY_HERO,
  FACILITY_OFFER,
  FACILITY_DIRECT_QAS,
  FACILITY_PILLARS,
  FACILITY_CASE_STUDY,
  FACILITY_CTA,
} from "@/content/facility-management"

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

export default function FacilityManagementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <NavBar />
      <main>
        <HeroPage
          h1={FACILITY_HERO.h1}
          sub={FACILITY_HERO.sub}
          intro={FACILITY_HERO.intro}
        />
        <TwoColumn
          headline={FACILITY_OFFER.headline}
          paragraphs={FACILITY_OFFER.paragraphs}
        />
        <DirectAnswer
          qas={FACILITY_DIRECT_QAS}
          ariaLabel="What does Young Icons facility management service include"
        />
        <ThreePillars pillars={FACILITY_PILLARS} bg="off-white" />
        <TwoColumn
          headline={FACILITY_CASE_STUDY.headline}
          paragraphs={FACILITY_CASE_STUDY.paragraphs}
          bg="black"
        />
        <CTABand
          headline={FACILITY_CTA.headline}
          cta={FACILITY_CTA.cta}
          href="/contact"
        />
      </main>
      <Footer />
    </>
  )
}
