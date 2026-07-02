import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import HeroPage from "@/components/HeroPage"
import DirectAnswer from "@/components/DirectAnswer"
import ThreePillars from "@/components/ThreePillars"
import FAQAccordion from "@/components/FAQAccordion"
import LogisticsStrip from "@/components/LogisticsStrip"
import Footer from "@/components/Footer"
import {
  NURSERIES_OFFER_HERO,
  NURSERIES_OFFER_DIRECT_QAS,
  NURSERIES_OFFER_PILLARS,
  NURSERIES_OFFER_FAQS,
  NURSERIES_OFFER_LOGISTICS,
} from "@/content/nurseries-what-we-offer"

export const metadata: Metadata = {
  title: "Nursery Sports Sessions | Young Icons Dubai",
  description:
    "See what's included in Young Icons' nursery sports programme in Dubai. Age-appropriate sessions designed to build coordination and confidence from age 3.",
}

const sportsActivitySchema = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Young Icons Sports Academy — Nursery Programme",
  description:
    "Structured sports sessions for nursery-age children in Dubai from age 3, building movement, confidence, and coordination.",
  url: "[CLIENT: domain required]",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
    streetAddress: "[CLIENT: venue address required]",
  },
  telephone: "[CLIENT: phone required]",
  email: "[CLIENT: email required]",
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

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: NURSERIES_OFFER_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
}

export default function NurseriesWhatWeOfferPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsActivitySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <NavBar />
      <main>
        <HeroPage
          h1={NURSERIES_OFFER_HERO.h1}
          sub={NURSERIES_OFFER_HERO.sub}
          intro={NURSERIES_OFFER_HERO.intro}
        />
        <DirectAnswer
          qas={NURSERIES_OFFER_DIRECT_QAS}
          ariaLabel="How does the Young Icons nursery sports programme work"
        />
        <ThreePillars pillars={NURSERIES_OFFER_PILLARS} bg="off-white" />
        <FAQAccordion faqs={NURSERIES_OFFER_FAQS} bg="black" />
        <LogisticsStrip
          location={NURSERIES_OFFER_LOGISTICS.location}
          sessionTimes={NURSERIES_OFFER_LOGISTICS.sessionTimes}
          bookingNote={NURSERIES_OFFER_LOGISTICS.bookingNote}
          cta={NURSERIES_OFFER_LOGISTICS.cta}
        />
      </main>
      <Footer />
    </>
  )
}
