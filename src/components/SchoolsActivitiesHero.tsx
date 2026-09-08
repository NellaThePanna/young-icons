import Image from "next/image"
import { SCHOOLS_ACTIVITIES_HERO } from "@/content/schools-activities"

export default function SchoolsActivitiesHero() {
  return (
    <section className="px-5 pt-20 sm:px-8 sm:pt-22 lg:px-12 lg:pt-22" style={{ backgroundColor: "var(--color-warm-off-white)" }}>
      <div className="mx-auto" style={{ maxWidth: "90vw" }}>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: "var(--font-weight-medium)",
            fontSize: "0.74rem",
            letterSpacing: "0.13em",
            color: "var(--color-academy-green)",
            margin: "0 0 0.7rem",
          }}
        >
          {SCHOOLS_ACTIVITIES_HERO.label}
        </p>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,0.58fr)_minmax(270px,0.32fr)] lg:items-center lg:gap-10 xl:gap-12">
          <h1
            style={{
              fontFamily: "var(--font-anton)",
              fontWeight: 400,
              fontSize: "clamp(3.15rem, 5.85vw, 6.8rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.008em",
              color: "var(--color-black)",
              margin: 0,
            }}
          >
            {SCHOOLS_ACTIVITIES_HERO.headlineLines.map((line, index) => (
              <span key={line.text} className="block" style={{ color: line.tone === "green" ? "var(--color-academy-green)" : "var(--color-black)", marginTop: index === 0 ? 0 : "0.085em" }}>
                {line.text}
              </span>
            ))}
          </h1>

          <div className="lg:pb-1">
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.92rem, 0.92vw, 1.03rem)",
                lineHeight: 1.55,
                color: "rgba(0,0,0,0.68)",
                margin: "0 0 1.35rem",
                maxWidth: "300px",
              }}
            >
              {SCHOOLS_ACTIVITIES_HERO.body}
            </p>
            <a
              href="#school-editorial-rows"
              className="inline-flex items-center gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47]"
              style={{ textDecoration: "none", color: "var(--color-black)" }}
            >
              <span aria-hidden="true" style={{ color: "var(--color-academy-green)", fontSize: "1.1rem", lineHeight: 1 }}>↓</span>
              <span style={{ fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-medium)", fontSize: "0.66rem", letterSpacing: "0.14em" }}>
                {SCHOOLS_ACTIVITIES_HERO.scrollLabel}
              </span>
            </a>
          </div>
        </div>
        <div className="relative mt-8 overflow-hidden sm:mt-10 lg:mt-10" style={{ height: "clamp(210px, 24vw, 350px)" }}>
          <Image
            src={SCHOOLS_ACTIVITIES_HERO.image}
            alt={SCHOOLS_ACTIVITIES_HERO.imageAlt}
            fill
            priority
            sizes="90vw"
            className="object-cover"
            style={{ objectPosition: "50% 40%" }}
          />
        </div>
      </div>
    </section>
  )
}

