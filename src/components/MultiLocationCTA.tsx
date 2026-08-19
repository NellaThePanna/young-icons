"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { MULTI_LOCATION_CTA } from "@/content/multi-sports"

function PinIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

export default function MultiLocationCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 82%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = sectionRef.current?.querySelectorAll(".location-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 22,
          duration: prefersReduced ? 0.01 : 0.65,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.1,
        })
      },
    })

    return () => trigger.kill()
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="px-6 sm:px-10 lg:px-16"
      style={{ backgroundColor: "var(--color-warm-off-white)", paddingTop: "clamp(64px, 7vw, 96px)", paddingBottom: "clamp(64px, 7vw, 96px)" }}
    >
      <div className="mx-auto grid grid-cols-1 divide-y md:grid-cols-2 md:divide-x md:divide-y-0" style={{ maxWidth: "1120px", borderColor: "rgba(27,27,27,0.16)" }}>
        <div className="location-item flex flex-col items-center px-4 pb-12 text-center md:px-12 md:pb-0">
          <div style={{ color: "var(--color-academy-green)", marginBottom: "12px" }}><PinIcon /></div>
          <p className="mb-3 text-xs font-semibold tracking-[0.16em]" style={{ fontFamily: "var(--font-body)", color: "var(--color-academy-green)" }}>
            {MULTI_LOCATION_CTA.locationEyebrow}
          </p>
          <h2
            className="whitespace-pre-line uppercase"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "clamp(1.65rem, 2.7vw, 2.4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "var(--color-black)",
              margin: 0,
            }}
          >
            {MULTI_LOCATION_CTA.locationHeading}
          </h2>
          <p
            className="mt-4 max-w-[350px]"
            style={{ fontFamily: "var(--font-body)", color: "rgba(27,27,27,0.74)", fontSize: "0.9rem", lineHeight: 1.55, marginBottom: 0 }}
          >
            {MULTI_LOCATION_CTA.locationBody}
          </p>
        </div>

        <div className="location-item flex flex-col items-center px-4 pt-12 text-center md:px-12 md:pt-0">
          <div style={{ color: "var(--color-academy-green)", marginBottom: "12px" }}><MailIcon /></div>
          <p className="mb-3 text-xs font-semibold tracking-[0.16em]" style={{ fontFamily: "var(--font-body)", color: "var(--color-academy-green)" }}>
            {MULTI_LOCATION_CTA.ctaEyebrow}
          </p>
          <p
            className="max-w-[340px]"
            style={{ fontFamily: "var(--font-body)", color: "rgba(27,27,27,0.74)", fontSize: "0.9rem", lineHeight: 1.55, margin: "0 0 24px 0" }}
          >
            {MULTI_LOCATION_CTA.ctaBody}
          </p>
          <Link
            href={MULTI_LOCATION_CTA.ctaHref}
            className="inline-flex items-center justify-center px-7 py-3.5 text-sm tracking-[0.08em] transition-colors hover:bg-[var(--color-black)]"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-white)",
              backgroundColor: "var(--color-academy-green)",
              textDecoration: "none",
              minWidth: "260px",
            }}
          >
            {MULTI_LOCATION_CTA.ctaLabel}
            <span aria-hidden="true" className="ml-4 text-base">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
