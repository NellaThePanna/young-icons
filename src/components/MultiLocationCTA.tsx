"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { MULTI_LOCATION_CTA } from "@/content/multi-sports"

function PinIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export default function MultiLocationCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = sectionRef.current?.querySelectorAll(".loc-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 28,
          duration: prefersReduced ? 0.01 : 0.7,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.1,
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="px-6"
      style={{
        backgroundColor: "var(--color-white)",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16"
        style={{ maxWidth: "1280px" }}
      >
        <div
          className="loc-item md:pr-10 md:border-r md:border-black/10"
          style={{ color: "var(--color-academy-green)" }}
        >
          <PinIcon />
          <p
            className="mt-3"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-academy-green)",
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              margin: "12px 0 8px 0",
            }}
          >
            {MULTI_LOCATION_CTA.locationEyebrow}
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-black)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.125rem)",
              textTransform: "uppercase",
              margin: "0 0 14px 0",
            }}
          >
            {MULTI_LOCATION_CTA.locationHeading}
          </h2>
          <div style={{ width: "48px", height: "2px", backgroundColor: "rgba(26,122,71,0.3)", marginBottom: "14px" }} />
          <p style={{ fontFamily: "var(--font-body)", color: "rgba(0,0,0,0.7)", fontSize: "15px", margin: "0 0 2px 0" }}>
            {MULTI_LOCATION_CTA.line1}
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(0,0,0,0.7)",
              fontSize: "15px",
              fontWeight: "var(--font-weight-bold)",
              fontStyle: "italic",
              margin: 0,
            }}
          >
            {MULTI_LOCATION_CTA.line2}
          </p>
        </div>

        <div className="loc-item">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-black)",
              fontSize: "clamp(1.375rem, 2.5vw, 1.5rem)",
              textTransform: "uppercase",
              margin: "0 0 14px 0",
            }}
          >
            {MULTI_LOCATION_CTA.ctaHeading}
          </h2>
          <p style={{ fontFamily: "var(--font-body)", color: "rgba(0,0,0,0.65)", fontSize: "15px", margin: "0 0 24px 0" }}>
            {MULTI_LOCATION_CTA.ctaBody}
          </p>
          <Link
            href={MULTI_LOCATION_CTA.ctaHref}
            className="rounded-full inline-flex items-center"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-white)",
              backgroundColor: "var(--color-academy-green)",
              fontSize: "14px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "16px 32px",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            {MULTI_LOCATION_CTA.ctaLabel} →
          </Link>
        </div>
      </div>
    </section>
  )
}
