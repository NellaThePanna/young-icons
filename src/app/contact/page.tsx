import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import ContactEditorial from "@/components/ContactEditorial"

export const metadata: Metadata = {
  title: "Contact | Young Icons Sports Academy",
  description: "Contact Young Icons Sports Academy by form, WhatsApp, or phone.",
}

export default function ContactPage() {
  return (
    <>
      <NavBar />
      <ContactEditorial />
      <Footer compact hideUnverifiedContact />
    </>
  )
}
