import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import FacilityManagementEditorial from "@/components/FacilityManagementEditorial"

export const metadata: Metadata = {
  title: "Facility Management | Young Icons Sports Academy",
  description: "Professional sports facility management across the UAE.",
}

export default function SchoolsFacilityManagementPage() {
  return (
    <>
      <NavBar />
      <FacilityManagementEditorial />
      <Footer compact hideUnverifiedContact />
    </>
  )
}
