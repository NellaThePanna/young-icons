import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import HeroFull from "@/components/HeroFull"
import TwoColumn from "@/components/TwoColumn"
import DirectAnswer from "@/components/DirectAnswer"
import ThreePillars from "@/components/ThreePillars"
import LogisticsStrip from "@/components/LogisticsStrip"
import Footer from "@/components/Footer"
import {
  SCHOOLS_ASA_HERO,
  SCHOOLS_ASA_ABOUT,
  SCHOOLS_ASA_DIRECT_QAS,
  SCHOOLS_ASA_PILLARS,
  SCHOOLS_ASA_PARTNERSHIPS,
  SCHOOLS_ASA_LOGISTICS,
} from "@/content/schools-asa"

export const metadata: Metadata = {
  title: "After-School Sports Activity | Young Icons Dubai",
  description:
    "Young Icons delivers after-school sports activity (ASA) programmes across Dubai schools. Qualified coaches, structured sessions for ages 5–14.",
}

const sportsActivitySchema = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Young Icons Sports Academy — After-School Activity",
  description:
    "Structured after-school sports activity (ASA) programmes delivered by Young Icons at Dubai schools for ages 5 to 14.",
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

export default function SchoolsASAPage() {
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
          h1={SCHOOLS_ASA_HERO.h1}
          sub={SCHOOLS_ASA_HERO.sub}
          ctaPrimary={SCHOOLS_ASA_HERO.ctaPrimary}
        />
        <TwoColumn
          headline={SCHOOLS_ASA_ABOUT.headline}
          paragraphs={SCHOOLS_ASA_ABOUT.paragraphs}
        />
        <DirectAnswer
          qas={SCHOOLS_ASA_DIRECT_QAS}
          ariaLabel="How does Young Icons deliver after-school sports at Dubai schools"
        />
        <ThreePillars pillars={SCHOOLS_ASA_PILLARS} bg="off-white" />
        <TwoColumn
          headline={SCHOOLS_ASA_PARTNERSHIPS.headline}
          paragraphs={SCHOOLS_ASA_PARTNERSHIPS.paragraphs}
          bg="black"
        />
        <LogisticsStrip
          location={SCHOOLS_ASA_LOGISTICS.location}
          sessionTimes={SCHOOLS_ASA_LOGISTICS.sessionTimes}
          bookingNote={SCHOOLS_ASA_LOGISTICS.bookingNote}
          cta={SCHOOLS_ASA_LOGISTICS.cta}
        />
      </main>
      <Footer />
    </>
  )
}
