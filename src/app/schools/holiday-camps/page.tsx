import type { Metadata } from "next"
import Footer from "@/components/Footer"
import HolidayCampsEditorial from "@/components/HolidayCampsEditorial"
import NavBar from "@/components/NavBar"

export const metadata: Metadata = {
  title: "Holiday Camps | Young Icons",
  description: "Young Icons Holiday Camps.",
}

export default function SchoolsHolidayCampsPage() {
  return (
    <>
      <NavBar />
      <HolidayCampsEditorial />
      <Footer />
    </>
  )
}
