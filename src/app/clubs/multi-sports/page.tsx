import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import MultiHero from "@/components/MultiHero"
import MultiAbout from "@/components/MultiAbout"
import MultiPhotoBand from "@/components/MultiPhotoBand"
import MultiLocationCTA from "@/components/MultiLocationCTA"
import MultiFooter from "@/components/MultiFooter"

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
        <MultiAbout />
        <MultiPhotoBand />
        <MultiLocationCTA />
      </main>
      <MultiFooter />
    </>
  )
}
