import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import HolidayCampsHero from "@/components/HolidayCampsHero"
import HolidayCampsIntro from "@/components/HolidayCampsIntro"
import TwoColumn from "@/components/TwoColumn"
import DirectAnswer from "@/components/DirectAnswer"
import ThreePillars from "@/components/ThreePillars"
import LogisticsStrip from "@/components/LogisticsStrip"
import CTABand from "@/components/CTABand"
import Footer from "@/components/Footer"
import {
  SCHOOLS_CAMPS_HERO,
  SCHOOLS_CAMPS_ABOUT,
  SCHOOLS_CAMPS_DIRECT_QAS,
  SCHOOLS_CAMPS_PILLARS,
  SCHOOLS_CAMPS_LOGISTICS,
  SCHOOLS_CAMPS_CTA,
} from "@/content/schools-holiday-camps"

export const metadata: Metadata = {
  title: "Kids Sports Holiday Camp Dubai | Young Icons",
  description:
    "Young Icons runs structured sports holiday camps in Dubai for children aged 3–14. Qualified coaches, full and half-day sessions. Book your place now.",
}

const sportsActivitySchema = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Young Icons Sports Academy — Holiday Camps",
  description:
    "Structured full and half-day sports holiday camps in Dubai for children aged 3 to 14, run by qualified coaches.",
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

export default function SchoolsHolidayCampsPage() {
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
        <HolidayCampsHero />
        <HolidayCampsIntro />
        <TwoColumn
          headline={SCHOOLS_CAMPS_ABOUT.headline}
          paragraphs={SCHOOLS_CAMPS_ABOUT.paragraphs}
        />
        <DirectAnswer
          qas={SCHOOLS_CAMPS_DIRECT_QAS}
          ariaLabel="What happens at a Young Icons holiday camp in Dubai"
        />
        <ThreePillars pillars={SCHOOLS_CAMPS_PILLARS} bg="off-white" />
        <LogisticsStrip
          location={SCHOOLS_CAMPS_LOGISTICS.location}
          sessionTimes={SCHOOLS_CAMPS_LOGISTICS.sessionTimes}
          bookingNote={SCHOOLS_CAMPS_LOGISTICS.bookingNote}
          cta={SCHOOLS_CAMPS_LOGISTICS.cta}
        />
        <CTABand
          headline={SCHOOLS_CAMPS_CTA.headline}
          sub={SCHOOLS_CAMPS_CTA.sub}
          cta={SCHOOLS_CAMPS_CTA.cta}
        />
      </main>
      <Footer />
    </>
  )
}
