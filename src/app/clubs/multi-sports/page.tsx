import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import MultiHero from "@/components/MultiHero"
import MultiWhat from "@/components/MultiWhat"
import NurseryActivities from "@/components/NurseryActivities"
import PhilosophyColumns from "@/components/PhilosophyColumns"
import MultiLocations from "@/components/MultiLocations"
import Footer from "@/components/Footer"
import { MULTI_ACTIVITIES, MULTI_PHILOSOPHY } from "@/content/multi-sports"

export const metadata: Metadata = {
  title: "Multi-Sports Club Dubai | Young Icons",
  description:
    "Weekly multi-sports club for children in Dubai. A different sport every session — football, tennis, basketball and more. Book through Classcard.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <NavBar />
      <main>
        <MultiHero />
        <MultiWhat />
        <NurseryActivities
          activities={MULTI_ACTIVITIES.activities}
          heading={MULTI_ACTIVITIES.heading}
          headingLine2={MULTI_ACTIVITIES.headingLine2}
          body={MULTI_ACTIVITIES.body}
        />
        <PhilosophyColumns items={MULTI_PHILOSOPHY} bg="black" />
        <MultiLocations />
      </main>
      <Footer />
    </>
  )
}
