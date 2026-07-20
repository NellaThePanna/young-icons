"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { HOME_STATS, PARTNERS_SECTION, PARTNERING_CTA, HOME_PARTNERS } from "@/content/home"

const LOGO_GRID_SIZE = 10

function MapPin() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "inline-block", marginRight: 6, verticalAlign: "-2px" }}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export default function TrustScale() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([])
  const logoSlots = HOME_PARTNERS.slice(0, LOGO_GRID_SIZE)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = sectionRef.current?.querySelectorAll(".stat-item, .trust-item, .cta-band-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 30,
          duration: prefersReduced ? 0.01 : 0.7,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.1,
        })

        if (!prefersReduced) {
          HOME_STATS.forEach((stat, i) => {
            if (!stat.isNumeric) return
            const el = valueRefs.current[i]
            const match = stat.value.match(/^(\d+)(.*)$/)
            if (!el || !match) return
            const target = parseInt(match[1], 10)
            const suffix = match[2]
            const counter = { val: 0 }
            gsap.to(counter, {
              val: target,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = String(Math.round(counter.val))
              },
              onComplete: () => {
                el.textContent = target + suffix
                gsap.from(el, {
                  scale: 1.3,
                  duration: 0.5,
                  ease: "back.out(2)",
                })
              },
            })
          })
        }
      },
    })
  }, { scope: sectionRef })

  return (
    <div ref={sectionRef}>
      <section
        className="px-6"
        style={{
          backgroundColor: "var(--color-warm-off-white)",
          paddingTop: "96px",
          paddingBottom: "96px",
        }}
      >
        <div className="mx-auto text-center" style={{ maxWidth: "1280px" }}>
          <p
            className="trust-item mb-4"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-medium)",
              fontSize: "0.875rem",
              color: "var(--color-academy-green)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
            }}
          >
            {PARTNERS_SECTION.eyebrow}
          </p>

          <h2
            className="trust-item mx-auto mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "clamp(2.25rem, 5vw, 4rem)",
              color: "var(--color-black)",
              textTransform: "uppercase",
              lineHeight: 1.05,
              maxWidth: "900px",
            }}
          >
            {PARTNERS_SECTION.heading}
            <span style={{ color: "var(--color-academy-green)" }}>.</span>
          </h2>

          <p
            className="trust-item mx-auto mb-16"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(0,0,0,0.6)",
              maxWidth: "620px",
              lineHeight: 1.6,
            }}
          >
            {PARTNERS_SECTION.sub}
          </p>

          <div
            className="stat-item grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x mb-20"
            style={{ borderColor: "rgba(0,0,0,0.1)" }}
          >
            {HOME_STATS.map((stat, i) => (
              <div
                key={`${stat.value}-${i}`}
                className="flex flex-col items-center justify-center text-center px-6 py-8"
              >
                <span
                  ref={(el) => { valueRefs.current[i] = el }}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "var(--font-weight-bold)",
                    fontSize: "clamp(1.75rem, 4vw, 3rem)",
                    color: "var(--color-academy-green)",
                    lineHeight: 1,
                  }}
                >
                  {"icon" in stat && stat.icon && <MapPin />}
                  {stat.value}
                </span>
                {stat.label && (
                  <span
                    className="mt-3"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      color: "rgba(0,0,0,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {stat.label}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div
            className="trust-item grid grid-cols-2 sm:grid-cols-5 divide-x divide-y sm:divide-y-0 mx-auto"
            style={{ maxWidth: "1100px", borderColor: "rgba(0,0,0,0.08)" }}
          >
            {logoSlots.map((name) => (
              <div
                key={name}
                className="partner-logo flex items-center justify-center px-4 py-8"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  textAlign: "center",
                }}
                aria-label={name}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="px-6"
        style={{ backgroundColor: "var(--color-near-black)" }}
      >
        <div
          className="mx-auto flex flex-col md:flex-row items-center justify-between gap-8"
          style={{ maxWidth: "1280px", paddingTop: "56px", paddingBottom: "56px" }}
        >
          <div className="cta-band-item text-center md:text-left">
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "var(--color-white)",
                textTransform: "uppercase",
                lineHeight: 1.15,
                marginBottom: "8px",
              }}
            >
              {PARTNERING_CTA.heading}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {PARTNERING_CTA.sub}
            </p>
          </div>

          <Link
            href={PARTNERING_CTA.ctaHref}
            className="cta-band-item btn-cta rounded-full px-8 py-4 text-base text-center whitespace-nowrap"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-white)",
              backgroundColor: "var(--color-academy-green)",
              textDecoration: "none",
            }}
          >
            {PARTNERING_CTA.cta} →
          </Link>
        </div>
      </section>
    </div>
  )
}
