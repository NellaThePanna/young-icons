import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import HolidayCampsHero from "@/components/HolidayCampsHero"
import HolidayCampsIntro from "@/components/HolidayCampsIntro"
import CampCards from "@/components/CampCards"
import CTABand from "@/components/CTABand"
import Footer from "@/components/Footer"
import {
  SCHOOLS_CAMPS_HERO,
  SCHOOLS_CAMPS_UPCOMING,
  SCHOOLS_CAMPS_CTA,
} from "@/content/schools-holiday-camps"

export const metadata: Metadata = {
  title: "Kids Sports Holiday Camp Dubai | Young Icons",
  description:
    "Young Icons runs structured sports holiday camps in Dubai for children aged 3–14. Qualified coaches, full and half-day sessions. Book your place now.",
}

const sportsActivitySchema = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Young Icons Sports Academy — Holiday Camps",
  description:
    "Structured full and half-day sports holiday camps in Dubai for children aged 3 to 14, run by qualified coaches.",
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

export default function SchoolsHolidayCampsPage() {
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
        <HolidayCampsHero />
        <HolidayCampsIntro />
        <CampCards
          heading={SCHOOLS_CAMPS_UPCOMING.heading}
          camps={SCHOOLS_CAMPS_UPCOMING.camps}
        />
        <CTABand
          headline={SCHOOLS_CAMPS_CTA.headline}
          sub={SCHOOLS_CAMPS_CTA.sub}
          cta={SCHOOLS_CAMPS_CTA.cta}
        />
      </main>
      <Footer />
    </>
  )
}
