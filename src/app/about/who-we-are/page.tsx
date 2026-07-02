import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import HeroPage from "@/components/HeroPage"
import TwoColumn from "@/components/TwoColumn"
import DirectAnswer from "@/components/DirectAnswer"
import ThreePillars from "@/components/ThreePillars"
import StatStrip from "@/components/StatStrip"
import CTABand from "@/components/CTABand"
import Footer from "@/components/Footer"
import {
  ABOUT_WHO_HERO,
  ABOUT_WHO_STORY,
  ABOUT_WHO_DIRECT_QAS,
  ABOUT_WHO_PILLARS,
  ABOUT_WHO_STATS,
  ABOUT_WHO_CTA,
} from "@/content/about-who-we-are"

export const metadata: Metadata = {
  title: "About Young Icons Sports Academy | Dubai",
  description:
    "Young Icons is a Dubai kids sports academy built on qualified coaching and structured programmes for children aged 3–14. Find out who we are.",
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

export default function AboutWhoWeArePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <NavBar />
      <main>
        <HeroPage
          h1={ABOUT_WHO_HERO.h1}
          sub={ABOUT_WHO_HERO.sub}
        />
        <TwoColumn
          headline={ABOUT_WHO_STORY.headline}
          paragraphs={ABOUT_WHO_STORY.paragraphs}
        />
        <DirectAnswer
          qas={ABOUT_WHO_DIRECT_QAS}
          ariaLabel="What is Young Icons Sports Academy"
        />
        <ThreePillars pillars={ABOUT_WHO_PILLARS} />
        <StatStrip stats={ABOUT_WHO_STATS} />
        <CTABand
          headline={ABOUT_WHO_CTA.headline}
          cta={ABOUT_WHO_CTA.cta}
          href={ABOUT_WHO_CTA.href}
        />
      </main>
      <Footer />
    </>
  )
}
