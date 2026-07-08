import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import CampsHero from "@/components/CampsHero"
import CampsAbout from "@/components/CampsAbout"
import NurseryActivities from "@/components/NurseryActivities"
import PhilosophyColumns from "@/components/PhilosophyColumns"
import FinalCTA from "@/components/FinalCTA"
import Footer from "@/components/Footer"
import { CLASSCARD_URL } from "@/lib/config"
import { CAMPS_ACTIVITIES, CAMPS_PHILOSOPHY, CAMPS_CTA } from "@/content/camps"

export const metadata: Metadata = {
  title: "Holiday Camps | Young Icons",
  description:
    "Action-packed sports and movement holiday camps across Dubai and Abu Dhabi, every school holiday. Coached multi-sport days for children.",
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

export default function CampsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <NavBar />
      <main>
        <CampsHero />
        <CampsAbout />
        <NurseryActivities
          activities={CAMPS_ACTIVITIES.activities}
          heading={CAMPS_ACTIVITIES.heading}
          headingLine2=""
          body=""
        />
        <PhilosophyColumns items={CAMPS_PHILOSOPHY} bg="black" />
        <FinalCTA
          smallHeading=""
          headingWhite={CAMPS_CTA.headingWhite}
          headingGreen={CAMPS_CTA.headingGreen}
          sub={CAMPS_CTA.sub}
          ctaPrimary={CAMPS_CTA.ctaPrimary}
          ctaSecondary=""
          image={CAMPS_CTA.image}
          href={CLASSCARD_URL}
        />
      </main>
      <Footer />
    </>
  )
}
