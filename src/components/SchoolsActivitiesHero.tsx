import Image from "next/image"
import { SCHOOLS_ACTIVITIES_HERO } from "@/content/schools-activities"

export default function SchoolsActivitiesHero() {
  return (
    <section className="px-5 pt-20 sm:px-8 sm:pt-22 lg:px-12 lg:pt-22" style={{ backgroundColor: "var(--color-warm-off-white)" }}>
      <div className="mx-auto" style={{ maxWidth: "1320px" }}>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: "var(--font-weight-medium)",
            fontSize: "0.76rem",
            letterSpacing: "0.12em",
            color: "var(--color-academy-green)",
            margin: "0 0 0.75rem",
          }}
        >
          {SCHOOLS_ACTIVITIES_HERO.label}
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start md:gap-14">
          <h1
            style={{
              fontFamily: "var(--font-holiday-display), Impact, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(2.2rem, calc(5.65vw - 18px), 4.3875rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              color: "var(--color-black)",
              margin: 0,
            }}
          >
            {SCHOOLS_ACTIVITIES_HERO.headlineLines.map((line, index) => (
              <span key={line.text} className="block" style={{ color: line.tone === "green" ? "var(--color-academy-green)" : "var(--color-black)", marginTop: index === 0 ? 0 : "0.035em" }}>
                {line.text}
              </span>
            ))}
          </h1>

          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.25vw, 1.18rem)",
                lineHeight: 1.5,
                color: "var(--color-black)",
                margin: "0 0 1.2rem",
                maxWidth: "290px",
              }}
            >
              {SCHOOLS_ACTIVITIES_HERO.body}
            </p>
            <a
              href="#school-editorial-rows"
              className="inline-flex items-center gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47]"
              style={{ textDecoration: "none", color: "var(--color-black)" }}
            >
              <span aria-hidden="true" style={{ color: "var(--color-academy-green)", fontSize: "1.45rem", lineHeight: 1 }}>↓</span>
              <span style={{ fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-medium)", fontSize: "0.72rem", letterSpacing: "0.15em" }}>
                {SCHOOLS_ACTIVITIES_HERO.scrollLabel}
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="relative mt-5 overflow-hidden sm:mt-6" style={{ height: "clamp(320px, 40vw, 560px)" }}>
        <Image
          src={SCHOOLS_ACTIVITIES_HERO.image}
          alt={SCHOOLS_ACTIVITIES_HERO.imageAlt}
          fill
          priority
          sizes="(max-width: 768px) 90vw, 1320px"
          className="object-cover"
          style={{ objectPosition: "50% 42%" }}
        />
      </div>
    </section>
  )
}
