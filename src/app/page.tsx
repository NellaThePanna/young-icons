import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import HeroHome from "@/components/HeroHome"
import EditorialMosaic from "@/components/EditorialMosaic"
import TrustScale from "@/components/TrustScale"
import FinalCTA from "@/components/FinalCTA"
import Footer from "@/components/Footer"
import { HOME_HERO, FINAL_CTA } from "@/content/home"

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
    <div className="landing-page landing-anton">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <NavBar />
      <main>
        <HeroHome
          words={HOME_HERO.words}
          wordColors={HOME_HERO.wordColors}
          ctaPrimary={HOME_HERO.ctaPrimary}
          ctaSecondary={HOME_HERO.ctaSecondary}
          videoSrc={HOME_HERO.videoSrc}
          imageFallback={HOME_HERO.imageFallback}
        />
        <EditorialMosaic />
        <TrustScale />
        <FinalCTA
          smallHeading=""
          headingWhite={FINAL_CTA.headingWhite}
          headingGreen={FINAL_CTA.headingGreen}
          sub={FINAL_CTA.sub}
          ctaPrimary={FINAL_CTA.ctaPrimary}
          ctaSecondary={FINAL_CTA.ctaSecondary}
          image={FINAL_CTA.image}
        />
      </main>
      <Footer />
    </div>
  )
}
