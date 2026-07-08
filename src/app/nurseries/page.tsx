import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import NurseryHero from "@/components/NurseryHero"
import EarlyYearsDifferent from "@/components/EarlyYearsDifferent"
import MovementStartsHere from "@/components/MovementStartsHere"
import NurseryActivities from "@/components/NurseryActivities"
import StatsBlock from "@/components/StatsBlock"
import NurseryEnquiryForm from "@/components/NurseryEnquiryForm"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "Nurseries & Early Years Sports Programme | Young Icons",
  description:
    "Specialist sports and movement experiences for nursery-age children from age 2, delivered at your nursery across Dubai and Abu Dhabi.",
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

export default function NurseriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <NavBar />
      <main>
        <NurseryHero />
        <EarlyYearsDifferent />
        <MovementStartsHere />
        <NurseryActivities />
        <StatsBlock />
        <NurseryEnquiryForm />
      </main>
      <Footer />
    </>
  )
}
