import { permanentRedirect } from "next/navigation"

export default function FacilityManagementLegacyRedirect() {
  permanentRedirect("/schools/facility-management")
}
