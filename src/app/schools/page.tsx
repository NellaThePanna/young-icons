import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import SchoolsHero from "@/components/SchoolsHero"
import SchoolsMoreThan from "@/components/SchoolsMoreThan"
import SchoolsTrustBar from "@/components/SchoolsTrustBar"
import SchoolsEnquiryCTA from "@/components/SchoolsEnquiryCTA"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "School Sports & PE Support | Young Icons",
  description:
    "Specialist after-school activities and PE support for schools across Dubai and Abu Dhabi — specialist coaches, parent bookings, attendance management and full programme support.",
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

export default function SchoolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <NavBar />
      <main>
        <SchoolsHero />
        <SchoolsMoreThan />
        <SchoolsTrustBar />
        <SchoolsEnquiryCTA />
      </main>
      <Footer />
    </>
  )
}
