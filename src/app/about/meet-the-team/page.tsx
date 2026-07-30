import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import TeamHero from "@/components/TeamHero"
import CoachGallery from "@/components/CoachGallery"
import DirectAnswer from "@/components/DirectAnswer"
import TwoColumn from "@/components/TwoColumn"
import CTABand from "@/components/CTABand"
import Footer from "@/components/Footer"
import {
  MEET_TEAM_HERO,
  MEET_TEAM_COACHES,
  MEET_TEAM_DIRECT_QAS,
  MEET_TEAM_PHILOSOPHY,
  MEET_TEAM_CTA,
} from "@/content/meet-the-team"

export const metadata: Metadata = {
  title: "Meet the Coaching Team | Young Icons Dubai",
  description:
    "Young Icons' qualified coaching team in Dubai. Certified, experienced coaches across nursery sports, schools programmes, and multi-sport clubs.",
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
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

export default function MeetTheTeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <NavBar />
      <main>
        <TeamHero
          h1={MEET_TEAM_HERO.h1}
          sub={MEET_TEAM_HERO.sub}
          intro={MEET_TEAM_HERO.intro}
        />
        <CoachGallery coaches={MEET_TEAM_COACHES} />
        <DirectAnswer
          qas={MEET_TEAM_DIRECT_QAS}
          ariaLabel="Are the coaches at Young Icons qualified"
        />
        <TwoColumn
          headline={MEET_TEAM_PHILOSOPHY.headline}
          paragraphs={MEET_TEAM_PHILOSOPHY.paragraphs}
        />
        <CTABand
          headline={MEET_TEAM_CTA.headline}
          cta={MEET_TEAM_CTA.cta}
        />
      </main>
      <Footer />
    </>
  )
}
