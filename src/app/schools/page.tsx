import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import SchoolsActivitiesHero from "@/components/SchoolsActivitiesHero"
import SchoolsEditorialRows from "@/components/SchoolsEditorialRows"
import SchoolsTrustedPartners from "@/components/SchoolsTrustedPartners"
import SchoolsEnquiryCTA from "@/components/SchoolsEnquiryCTA"

export const metadata: Metadata = {
  title: "Our School Activities | Young Icons",
  description: "Young Icons manages complete school activity programmes—from planning and staffing to parent bookings, attendance and programme delivery.",
}

export default function SchoolsPage() {
  return (
    <>
      <NavBar />
      <main>
        <SchoolsActivitiesHero />
        <SchoolsEditorialRows />
        <SchoolsTrustedPartners />
        <SchoolsEnquiryCTA />
      </main>
      <Footer />
    </>
  )
}
