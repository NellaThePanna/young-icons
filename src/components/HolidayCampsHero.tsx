"use client"

import { useRef } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SCHOOLS_CAMPS_HERO } from "@/content/schools-holiday-camps"

// Client-supplied composite: HOLIDAY CAMPS, the tagline, the brush edge and the
// photograph are all baked into this one 2400x1000 artwork, so the hero renders it
// whole rather than re-creating any of it in markup.
const HEADER_IMAGE = "/images/holiday-camps/holiday-camps-wide-header-2400x1000.webp"

export default function HolidayCampsHero() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: prefersReduced ? 0 : 24,
      duration: prefersReduced ? 0.01 : 0.9,
      ease: "power2.out",
    })
  }, { scope: sectionRef })

  return (
    <div ref={sectionRef} className="w-full" style={{ backgroundColor: "var(--color-warm-off-white)" }}>
      <Image
        src={HEADER_IMAGE}
        alt={`${SCHOOLS_CAMPS_HERO.headingLine1} ${SCHOOLS_CAMPS_HERO.headingLine2} — ${SCHOOLS_CAMPS_HERO.taglineLine1} ${SCHOOLS_CAMPS_HERO.taglineLine2}`}
        width={2400}
        height={1000}
        priority
        sizes="100vw"
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </div>
  )
}
