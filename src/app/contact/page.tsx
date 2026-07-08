import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import HeroPage from "@/components/HeroPage"
import ContactForm from "@/components/ContactForm"
import NAPBlock from "@/components/NAPBlock"
import DirectAnswer from "@/components/DirectAnswer"
import Footer from "@/components/Footer"
import {
  CONTACT_HERO,
  CONTACT_FORM,
  CONTACT_NAP,
  CONTACT_DIRECT_QAS,
} from "@/content/contact"

export const metadata: Metadata = {
  title: "Contact Us | Young Icons Sports Academy",
  description:
    "Get in touch with Young Icons Sports Academy in Dubai. Book a free trial, ask about programmes, or find out how we can help.",
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: CONTACT_NAP.name,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
    streetAddress: CONTACT_NAP.address,
  },
  telephone: CONTACT_NAP.phone,
  email: CONTACT_NAP.email,
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <NavBar />
      <main>
        <HeroPage h1={CONTACT_HERO.h1} sub={CONTACT_HERO.sub} />

        <section className="py-20 px-6" style={{ backgroundColor: "var(--color-warm-off-white)" }}>
          <div className="mx-auto" style={{ maxWidth: "640px" }}>
            <ContactForm
              fields={CONTACT_FORM.fields}
              programmeOptions={CONTACT_FORM.programmeOptions}
              submitLabel={CONTACT_FORM.submitLabel}
              submittingLabel={CONTACT_FORM.submittingLabel}
              successMessage={CONTACT_FORM.successMessage}
              errorMessage={CONTACT_FORM.errorMessage}
            />
          </div>
        </section>

        <NAPBlock
          name={CONTACT_NAP.name}
          address={CONTACT_NAP.address}
          phone={CONTACT_NAP.phone}
          email={CONTACT_NAP.email}
          whatsappNumber={CONTACT_NAP.whatsappNumber}
          whatsappMessage={CONTACT_NAP.whatsappMessage}
          mapsEmbedUrl={CONTACT_NAP.mapsEmbedUrl}
          cta={CONTACT_NAP.cta}
        />

        <DirectAnswer qas={CONTACT_DIRECT_QAS} ariaLabel="Contact Young Icons Sports Academy" />
      </main>
      <Footer />
    </>
  )
}
