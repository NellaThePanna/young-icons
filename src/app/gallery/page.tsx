import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import HeroPage from "@/components/HeroPage"
import GalleryGrid from "@/components/GalleryGrid"
import CTABand from "@/components/CTABand"
import Footer from "@/components/Footer"
import {
  GALLERY_HERO,
  GALLERY_FILTERS,
  GALLERY_ITEMS,
  GALLERY_CTA,
} from "@/content/gallery"

export const metadata: Metadata = {
  title: "Gallery | Young Icons Sports Academy Dubai",
  description:
    "Photos from Young Icons Sports Academy in Dubai — training sessions, holiday camps, and kids in action across all our programmes.",
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

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <NavBar />
      <main>
        <HeroPage
          h1={GALLERY_HERO.h1}
          sub={GALLERY_HERO.sub}
          intro={GALLERY_HERO.intro}
        />
        <GalleryGrid items={GALLERY_ITEMS} filters={GALLERY_FILTERS} />
        <CTABand
          headline={GALLERY_CTA.headline}
          cta={GALLERY_CTA.cta}
        />
      </main>
      <Footer />
    </>
  )
}
