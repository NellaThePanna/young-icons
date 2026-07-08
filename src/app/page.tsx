import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import HeroHome from "@/components/HeroHome"
import MarqueeStrip from "@/components/MarqueeStrip"
import ExploreCards from "@/components/ExploreCards"
import WhoWeAre from "@/components/WhoWeAre"
import StatsBlock from "@/components/StatsBlock"
import ActivityCarousel from "@/components/ActivityCarousel"
import PartnerLogos from "@/components/PartnerLogos"
import TestimonialSlider from "@/components/TestimonialSlider"
import FinalCTA from "@/components/FinalCTA"
import TrustBar from "@/components/TrustBar"
import ProgrammeGrid from "@/components/ProgrammeGrid"
import DirectAnswer from "@/components/DirectAnswer"
import Testimonials from "@/components/Testimonials"
import CTABand from "@/components/CTABand"
import Footer from "@/components/Footer"
import { HOME_HERO, HOME_PROGRAMME_CARDS, HOME_DIRECT_ANSWER_QAS, HOME_CTA_BAND } from "@/content/home"

export const metadata: Metadata = {
  title: "Young Icons Sports Academy Dubai | Free Trial",
  description:
    "Dubai's trusted kids sports academy. Qualified coaches, structured programmes for ages 3–14. Book your child's free trial session today.",
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
  sameAs: ["[CLIENT: Instagram URL]", "[CLIENT: Facebook URL]"],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <NavBar />
      <main>
        <HeroHome
          smallHeading={HOME_HERO.smallHeading}
          words={HOME_HERO.words}
          wordColors={HOME_HERO.wordColors}
          sub={HOME_HERO.sub}
          ctaPrimary={HOME_HERO.ctaPrimary}
          ctaSecondary={HOME_HERO.ctaSecondary}
          videoSrc={HOME_HERO.videoSrc}
          imageFallback={HOME_HERO.imageFallback}
        />
        <MarqueeStrip />
        <ExploreCards />
        <WhoWeAre />
        <StatsBlock />
        <ActivityCarousel />
        <PartnerLogos />
        <TestimonialSlider />
        <FinalCTA />
        <TrustBar />
        <ProgrammeGrid
          cards={HOME_PROGRAMME_CARDS}
          heading="Our Programmes"
        />
        <DirectAnswer
          qas={HOME_DIRECT_ANSWER_QAS}
          ariaLabel="About Young Icons Sports Academy"
        />
        <Testimonials />
        <CTABand
          headline={HOME_CTA_BAND.headline}
          sub={HOME_CTA_BAND.sub}
          cta={HOME_CTA_BAND.cta}
        />
      </main>
      <Footer />
    </>
  )
}
