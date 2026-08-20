import { redirect } from "next/navigation"

export const metadata = {
  title: "Our School Activities | Young Icons",
  description: "Young Icons school activities and programme support.",
}

export default function SchoolsASAPage() {
  redirect("/schools")
}
