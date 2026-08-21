import type { Metadata } from "next"
import ComingSoonPage from "@/components/ComingSoonPage"

export const metadata: Metadata = {
  title: "Young Icons Ballet — Coming Soon | Young Icons",
  description:
    "A new Young Icons Ballet experience is coming soon to Dubai. Register your interest to be the first to know.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <ComingSoonPage
        smallHeading="YOUNG ICONS BALLET"
        words={["MOVE.", "CREATE.", "GROW."]}
        subLines={["BALLET, THE YOUNG ICONS WAY.", "COMING SOON TO DUBAI."]}
        image="/images/placeholder/ballet-coming-soon-hero.jpg"
        imageAlt="Young ballerina in a pale pink tutu practising in a sunlit ballet studio"
        programmeName="Ballet"
      />
    </>
  )
}
