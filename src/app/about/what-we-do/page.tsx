import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import HeroPage from "@/components/HeroPage"
import ProgrammeGrid from "@/components/ProgrammeGrid"
import DirectAnswer from "@/components/DirectAnswer"
import ThreePillars from "@/components/ThreePillars"
import CTABand from "@/components/CTABand"
import Footer from "@/components/Footer"
import {
  ABOUT_WHAT_HERO,
  ABOUT_WHAT_PROGRAMME_CARDS,
  ABOUT_WHAT_DIRECT_QAS,
  ABOUT_WHAT_SESSION_STEPS,
  ABOUT_WHAT_CTA,
} from "@/content/about-what-we-do"

export const metadata: Metadata = {
  title: "Our Sports Programmes | Young Icons Dubai",
  description:
    "From nursery sports to after-school activities and multi-sport clubs — Young Icons runs structured programmes for Dubai kids aged 3–14.",
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

export default function AboutWhatWeDoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <NavBar />
      <main>
        <HeroPage
          h1={ABOUT_WHAT_HERO.h1}
          sub={ABOUT_WHAT_HERO.sub}
          intro={ABOUT_WHAT_HERO.intro}
        />
        <ProgrammeGrid cards={ABOUT_WHAT_PROGRAMME_CARDS} />
        <DirectAnswer
          qas={ABOUT_WHAT_DIRECT_QAS}
          ariaLabel="What programmes does Young Icons offer"
        />
        <ThreePillars
          pillars={ABOUT_WHAT_SESSION_STEPS}
          bg="off-white"
        />
        <CTABand
          headline={ABOUT_WHAT_CTA.headline}
          sub={ABOUT_WHAT_CTA.sub}
          cta={ABOUT_WHAT_CTA.primaryCta}
          href={ABOUT_WHAT_CTA.primaryHref}
          secondaryCta={ABOUT_WHAT_CTA.secondaryCta}
        />
      </main>
      <Footer />
    </>
  )
}
