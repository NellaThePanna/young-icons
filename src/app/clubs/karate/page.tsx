import type { Metadata } from "next"
import ComingSoonPage from "@/components/ComingSoonPage"

export const metadata: Metadata = {
  title: "Young Icons Karate — Coming Soon | Young Icons",
  description:
    "A new Young Icons Karate experience is coming soon to Dubai. Register your interest to be the first to know.",
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

export default function KaratePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <ComingSoonPage
        smallHeading="YOUNG ICONS KARATE"
        words={["FOCUS.", "DISCIPLINE.", "GROW."]}
        subLines={["A new Young Icons Karate experience", "is coming soon to Dubai."]}
        image="/images/clubs/karate-clean-photo.png"
        imageAlt="Young boy in a white karate gi practising a forward punch in a dojo"
        programmeName="Karate"
        backgroundPosition="center 15%"
        mobileBackgroundPosition="78% center"
        enlargedCta
      />
    </>
  )
}
