import type { Metadata } from "next"
import Footer from "@/components/Footer"
import HolidayCampsEditorial from "@/components/HolidayCampsEditorial"

export const metadata: Metadata = {
  title: "Holiday Camps | Young Icons",
  description: "Young Icons Holiday Camps.",
}

export default function SchoolsHolidayCampsPage() {
  return (
    <>
      <HolidayCampsEditorial />
      <Footer />
    </>
  )
}
