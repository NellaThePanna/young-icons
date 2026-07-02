import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import HeroFull from "@/components/HeroFull"
import TwoColumn from "@/components/TwoColumn"
import DirectAnswer from "@/components/DirectAnswer"
import SportIconGrid from "@/components/SportIconGrid"
import LogisticsStrip from "@/components/LogisticsStrip"
import CTABand from "@/components/CTABand"
import Footer from "@/components/Footer"
import {
  CLUBS_MULTI_SPORTS_HERO,
  CLUBS_MULTI_SPORTS_ABOUT,
  CLUBS_MULTI_SPORTS_SPORTS,
  CLUBS_MULTI_SPORTS_DIRECT_QAS,
  CLUBS_MULTI_SPORTS_LOGISTICS,
  CLUBS_MULTI_SPORTS_CTA,
} from "@/content/clubs-multi-sports"

export const metadata: Metadata = {
  title: "Multi-Sport Club for Kids Dubai | Young Icons",
  description:
    "Young Icons runs a structured multi-sport club for children in Dubai — football, basketball, cricket and more. Qualified coaches. Book a free trial through Classcard.",
}

const sportsActivitySchema = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Young Icons Sports Academy — Multi-Sport Club",
  description:
    "Structured multi-sport club for children in Dubai. Qualified coaches, rotating sport programme.",
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

export default function MultiSportsPage() {
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
          h1={CLUBS_MULTI_SPORTS_HERO.h1}
          sub={CLUBS_MULTI_SPORTS_HERO.sub}
          ctaPrimary={CLUBS_MULTI_SPORTS_HERO.ctaPrimary}
        />
        <TwoColumn
          headline={CLUBS_MULTI_SPORTS_ABOUT.headline}
          paragraphs={CLUBS_MULTI_SPORTS_ABOUT.paragraphs}
        />
        <DirectAnswer
          qas={CLUBS_MULTI_SPORTS_DIRECT_QAS}
          ariaLabel="Multi-sport club for kids at Young Icons Dubai"
        />
        <SportIconGrid sports={CLUBS_MULTI_SPORTS_SPORTS} bg="off-white" />
        <LogisticsStrip
          location={CLUBS_MULTI_SPORTS_LOGISTICS.location}
          sessionTimes={CLUBS_MULTI_SPORTS_LOGISTICS.sessionTimes}
          bookingNote={CLUBS_MULTI_SPORTS_LOGISTICS.bookingNote}
          cta={CLUBS_MULTI_SPORTS_LOGISTICS.cta}
        />
        <CTABand
          headline={CLUBS_MULTI_SPORTS_CTA.headline}
          cta={CLUBS_MULTI_SPORTS_CTA.cta}
        />
      </main>
      <Footer />
    </>
  )
}
