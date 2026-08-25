import Image from "next/image"
import { MULTIPLE_ACTIVITIES_CHIPS } from "@/content/nurseries-about"

export default function MultipleActivities() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {MULTIPLE_ACTIVITIES_CHIPS.filter((activity) => activity.image).map((activity) => (
        <div key={activity.label}>
          <div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: "var(--color-nursery-off-white)" }}>
            <Image src={activity.image!} alt={activity.label} fill sizes="140px" className="object-cover" />
          </div>
          <p
            className="text-center"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-medium)",
              fontSize: "0.68rem",
              letterSpacing: "0.06em",
              color: "var(--color-black)",
              margin: "0.5rem 0 0",
            }}
          >
            {activity.label}
          </p>
        </div>
      ))}
    </div>
  )
}
