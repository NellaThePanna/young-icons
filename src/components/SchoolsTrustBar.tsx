"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SCHOOLS_TRUST_BAR } from "@/content/schools"

// rgb(15,43,28) from the client's mockup — no tokens.css value is close enough
// (--color-near-black/--color-nav-dark read as neutral, not green); flagged, not tokenized.
const TRUST_BAR_BG = "#0f2b1c"

export default function SchoolsTrustBar() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = sectionRef.current?.querySelectorAll(".trust-bar-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 24,
          duration: prefersReduced ? 0.01 : 0.7,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.08,
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="px-6"
      style={{ backgroundColor: TRUST_BAR_BG, paddingTop: "72px", paddingBottom: "72px" }}
    >
      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12 lg:gap-20 items-start"
        style={{ maxWidth: "1200px" }}
      >
        <div className="trust-bar-item">
          <p
            className="mb-8"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-medium)",
              fontSize: "0.875rem",
              color: "var(--color-academy-green)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
            }}
          >
            {SCHOOLS_TRUST_BAR.label}
          </p>

          <div className="flex flex-col gap-6 mb-8">
            {SCHOOLS_TRUST_BAR.stats.map((stat) => (
              <div key={stat.line2}>
                <span
                  className="block"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "var(--font-weight-bold)",
                    fontSize: "clamp(2rem, 3.2vw, 2.75rem)",
                    color: "var(--color-white)",
                    textTransform: "uppercase",
                    lineHeight: 1.1,
                  }}
                >
                  {stat.line1}
                </span>
                <span
                  className="block"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8125rem",
                    color: "rgba(255,255,255,0.6)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginTop: "4px",
                  }}
                >
                  {stat.line2}
                </span>
              </div>
            ))}
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-2"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "0.875rem",
              color: "var(--color-white)",
              textDecoration: "none",
              letterSpacing: "0.05em",
            }}
          >
            {SCHOOLS_TRUST_BAR.link} →
          </a>
        </div>

        <div
          className="trust-bar-item grid grid-cols-3"
          style={{ columnGap: "clamp(1.25rem, 3vw, 2.75rem)", rowGap: "clamp(1.75rem, 4vw, 3.4rem)" }}
        >
          {SCHOOLS_TRUST_BAR.partners.map((partner) => (
            <div
              key={partner}
              className="flex items-center justify-center text-center"
              style={{
                minHeight: "80px",
                padding: "14px 12px",
                borderRadius: "var(--radius-md)",
                border: "1px solid rgba(255,255,255,0.15)",
                backgroundColor: "rgba(255,255,255,0.04)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--font-weight-medium)",
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.35,
                }}
              >
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
