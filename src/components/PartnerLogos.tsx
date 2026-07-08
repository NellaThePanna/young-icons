import Link from "next/link"
import { PARTNERS_SECTION, HOME_PARTNERS } from "@/content/home"

const PARTNER_REPEATS = Array.from({ length: 4 })

function PartnerTrack() {
  return (
    <div className="partner-track flex shrink-0 items-center" style={{ gap: "24px" }}>
      {PARTNER_REPEATS.flatMap((_, repeatIndex) =>
        HOME_PARTNERS.map((name, nameIndex) => (
          <span
            key={`${repeatIndex}-${nameIndex}`}
            className="inline-flex items-center whitespace-nowrap rounded-full"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "var(--color-black)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              border: "1px solid rgba(0,0,0,0.15)",
              padding: "12px 24px",
            }}
          >
            {name}
          </span>
        ))
      )}
    </div>
  )
}

export default function PartnerLogos() {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: "var(--color-white)" }}>
      <div className="mx-auto mb-12 text-center" style={{ maxWidth: "780px" }}>
        <h2
          className="mb-4"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "var(--color-black)",
            textTransform: "uppercase",
            lineHeight: 1.1,
          }}
        >
          {PARTNERS_SECTION.heading}
        </h2>
        <p
          className="mx-auto"
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(0,0,0,0.65)",
            maxWidth: "640px",
            lineHeight: 1.6,
          }}
        >
          {PARTNERS_SECTION.sub}
        </p>
      </div>

      <div className="overflow-hidden mb-12" aria-hidden="true">
        <div className="flex" style={{ gap: "24px" }}>
          <PartnerTrack />
          <PartnerTrack />
        </div>
      </div>

      <div className="mx-auto flex flex-wrap items-center justify-center gap-4" style={{ maxWidth: "780px" }}>
        <Link
          href={PARTNERS_SECTION.ctaAHref}
          className="rounded-full px-8 py-4 text-base"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--color-black)",
            border: "1.5px solid rgba(0,0,0,0.2)",
            textDecoration: "none",
          }}
        >
          {PARTNERS_SECTION.ctaA}
        </Link>
        <Link
          href={PARTNERS_SECTION.ctaBHref}
          className="rounded-full px-8 py-4 text-base"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--color-black)",
            border: "1.5px solid rgba(0,0,0,0.2)",
            textDecoration: "none",
          }}
        >
          {PARTNERS_SECTION.ctaB}
        </Link>
      </div>
    </section>
  )
}
