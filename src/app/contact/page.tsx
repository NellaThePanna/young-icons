import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import ContactEditorial from "@/components/ContactEditorial"

export const metadata: Metadata = {
  title: "Contact | Young Icons Sports Academy",
  description: "Contact Young Icons Sports Academy by form, WhatsApp, or phone.",
}

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ programme?: string }> }) {
  const { programme } = await searchParams
  return (
    <>
      <NavBar />
      <ContactEditorial programme={programme} />
      <Footer compact hideUnverifiedContact />
    </>
  )
}
