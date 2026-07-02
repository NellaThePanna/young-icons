import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import HeroFull from "@/components/HeroFull"
import TwoColumn from "@/components/TwoColumn"
import DirectAnswer from "@/components/DirectAnswer"
import ThreePillars from "@/components/ThreePillars"
import LogisticsStrip from "@/components/LogisticsStrip"
import Footer from "@/components/Footer"
import {
  CLUBS_BALLET_HERO,
  CLUBS_BALLET_ABOUT,
  CLUBS_BALLET_DIRECT_QAS,
  CLUBS_BALLET_PILLARS,
  CLUBS_BALLET_INSTRUCTOR,
  CLUBS_BALLET_LOGISTICS,
} from "@/content/clubs-ballet"

export const metadata: Metadata = {
  title: "Ballet Classes for Kids Dubai | Young Icons",
  description:
    "Young Icons runs structured ballet classes for children in Dubai. Qualified instructor, small groups, weekly progression. Book a free trial through Classcard.",
}

const sportsActivitySchema = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Young Icons Sports Academy — Ballet Club",
  description:
    "Structured ballet classes for children in Dubai. Qualified instructor, small groups, weekly progression.",
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

export default function BalletPage() {
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
          h1={CLUBS_BALLET_HERO.h1}
          sub={CLUBS_BALLET_HERO.sub}
          ctaPrimary={CLUBS_BALLET_HERO.ctaPrimary}
        />
        <TwoColumn
          headline={CLUBS_BALLET_ABOUT.headline}
          paragraphs={CLUBS_BALLET_ABOUT.paragraphs}
        />
        <DirectAnswer
          qas={CLUBS_BALLET_DIRECT_QAS}
          ariaLabel="Ballet classes for kids at Young Icons Dubai"
        />
        <ThreePillars pillars={CLUBS_BALLET_PILLARS} bg="off-white" />
        <TwoColumn
          headline={CLUBS_BALLET_INSTRUCTOR.headline}
          paragraphs={CLUBS_BALLET_INSTRUCTOR.paragraphs}
          bg="black"
        />
        <LogisticsStrip
          location={CLUBS_BALLET_LOGISTICS.location}
          sessionTimes={CLUBS_BALLET_LOGISTICS.sessionTimes}
          bookingNote={CLUBS_BALLET_LOGISTICS.bookingNote}
          cta={CLUBS_BALLET_LOGISTICS.cta}
        />
      </main>
      <Footer />
    </>
  )
}
