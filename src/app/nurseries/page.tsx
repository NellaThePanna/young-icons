import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import HeroFull from "@/components/HeroFull"
import TwoColumn from "@/components/TwoColumn"
import DirectAnswer from "@/components/DirectAnswer"
import ThreePillars from "@/components/ThreePillars"
import LogisticsStrip from "@/components/LogisticsStrip"
import CTABand from "@/components/CTABand"
import Footer from "@/components/Footer"
import {
  NURSERIES_ABOUT_HERO,
  NURSERIES_ABOUT_STORY,
  NURSERIES_ABOUT_DIRECT_QAS,
  NURSERIES_ABOUT_PILLARS,
  NURSERIES_ABOUT_LOGISTICS,
  NURSERIES_ABOUT_CTA,
} from "@/content/nurseries-about"

export const metadata: Metadata = {
  title: "Nursery Sports Programme Dubai | Young Icons",
  description:
    "Structured sports sessions for Dubai nursery-age children from age 3. Fun, qualified coaching that builds movement, confidence, and coordination.",
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

export default function NurseriesAboutPage() {
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
      <NavBar />
      <main>
        <HeroFull
          h1={NURSERIES_ABOUT_HERO.h1}
          sub={NURSERIES_ABOUT_HERO.sub}
          ctaPrimary={NURSERIES_ABOUT_HERO.ctaPrimary}
        />
        <TwoColumn
          headline={NURSERIES_ABOUT_STORY.headline}
          paragraphs={NURSERIES_ABOUT_STORY.paragraphs}
        />
        <DirectAnswer
          qas={NURSERIES_ABOUT_DIRECT_QAS}
          ariaLabel="What age is the Young Icons nursery programme for"
        />
        <ThreePillars pillars={NURSERIES_ABOUT_PILLARS} bg="off-white" />
        <LogisticsStrip
          location={NURSERIES_ABOUT_LOGISTICS.location}
          sessionTimes={NURSERIES_ABOUT_LOGISTICS.sessionTimes}
          bookingNote={NURSERIES_ABOUT_LOGISTICS.bookingNote}
          cta={NURSERIES_ABOUT_LOGISTICS.cta}
        />
        <CTABand
          headline={NURSERIES_ABOUT_CTA.headline}
          cta={NURSERIES_ABOUT_CTA.cta}
        />
      </main>
      <Footer />
    </>
  )
}
