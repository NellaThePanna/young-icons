"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Image from "next/image"
import { CLASSCARD_URL } from "@/lib/config"
import { CAMPS_HERO } from "@/content/camps"

export default function CampsHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const lines = lineRefs.current.filter((el): el is HTMLSpanElement => el !== null)
    const tl = gsap.timeline()

    tl.from(lines, {
      opacity: 0,
      y: prefersReduced ? 0 : 24,
      duration: prefersReduced ? 0.01 : 0.8,
      ease: "power2.out",
      stagger: prefersReduced ? 0 : 0.15,
    })

    tl.from(
      [subRef.current, ctasRef.current],
      {
        opacity: 0,
        y: prefersReduced ? 0 : 40,
        duration: prefersReduced ? 0.01 : 0.8,
        ease: "power2.out",
        stagger: prefersReduced ? 0 : 0.1,
      },
      prefersReduced ? "<" : "-=0.4"
    )

    if (!prefersReduced) {
      gsap.to(arrowRef.current, {
        y: 8,
        duration: 1.4,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      })
    }
  }, { scope: containerRef })

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center px-6 pt-16 overflow-hidden"
      style={{ minHeight: "100vh", backgroundColor: "var(--color-black)" }}
    >
      <Image src={CAMPS_HERO.image} alt="" fill priority className="object-cover" />

      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.55)", zIndex: 1 }}
        aria-hidden="true"
      />

      <div className="relative max-w-4xl w-full mx-auto text-center" style={{ zIndex: 2 }}>
        <p
          className="mb-4"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: "var(--font-weight-medium)",
            fontSize: "0.875rem",
            color: "var(--color-academy-green)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          {CAMPS_HERO.smallHeading}
        </p>

        <h1
          className="tracking-tight mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            lineHeight: 1.05,
            textTransform: "uppercase",
          }}
        >
          <span
            ref={(el) => { lineRefs.current[0] = el }}
            className="block"
            style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", color: "var(--color-white)" }}
          >
            {CAMPS_HERO.headingWhite}
          </span>
          <span
            ref={(el) => { lineRefs.current[1] = el }}
            className="block"
            style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", color: "var(--color-academy-green)" }}
          >
            {CAMPS_HERO.headingGreen}
          </span>
        </h1>

        <p
          ref={subRef}
          className="text-lg md:text-xl mx-auto"
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(255,255,255,0.7)",
            maxWidth: "560px",
            lineHeight: 1.6,
            marginBottom: "var(--space-12)",
          }}
        >
          {CAMPS_HERO.sub}
        </p>

        <div ref={ctasRef} className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={CLASSCARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-8 py-4 text-base text-center"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-white)",
              backgroundColor: "var(--color-academy-green)",
              textDecoration: "none",
            }}
          >
            {CAMPS_HERO.ctaPrimary}
          </a>
        </div>
      </div>

      <div
        ref={arrowRef}
        className="absolute"
        style={{ bottom: "32px", left: "50%", transform: "translateX(-50%)", zIndex: 2 }}
        aria-hidden="true"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-academy-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  )
}
