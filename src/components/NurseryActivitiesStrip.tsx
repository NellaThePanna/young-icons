import { NURSERY_ACTIVITIES_STRIP } from "@/content/nurseries-about"

const REPEATS = Array.from({ length: 6 })

function ActivitiesTrack() {
  return (
    <div className="marquee-track flex shrink-0 items-center">
      {REPEATS.flatMap((_, repeatIndex) =>
        NURSERY_ACTIVITIES_STRIP.map((activity, activityIndex) => (
          <span
            key={`${repeatIndex}-${activityIndex}`}
            className="flex items-center whitespace-nowrap"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--color-white)",
              textTransform: "uppercase",
            }}
          >
            {activity}
            <span style={{ margin: "0 1.5rem", color: "rgba(255,255,255,0.3)" }}>•</span>
          </span>
        ))
      )}
    </div>
  )
}

export default function NurseryActivitiesStrip() {
  return (
    <div
      className="marquee-strip overflow-hidden"
      style={{ backgroundColor: "var(--color-nav-dark)", padding: "36px 0" }}
      aria-label={`Activities: ${NURSERY_ACTIVITIES_STRIP.join(", ")}`}
    >
      <div className="flex" aria-hidden="true">
        <ActivitiesTrack />
        <ActivitiesTrack />
      </div>
    </div>
  )
}
