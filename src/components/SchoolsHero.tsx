"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Image from "next/image"
import { SplitText } from "gsap/SplitText"
import { SCHOOLS_HERO } from "@/content/schools"

export default function SchoolsHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const lines = lineRefs.current.filter((el): el is HTMLSpanElement => el !== null)
    const splits = lines.map((el) => new SplitText(el, { type: "words" }))
    const allWords = splits.flatMap((split) => split.words)
    const tl = gsap.timeline()

    tl.from(allWords, {
      opacity: 0,
      y: prefersReduced ? 0 : 24,
      duration: prefersReduced ? 0.01 : 0.8,
      ease: "power2.out",
      stagger: prefersReduced ? 0 : { amount: 0.35, from: "start" },
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

    return () => splits.forEach((split) => split.revert())
  }, { scope: containerRef })

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center px-6 pt-16 overflow-hidden"
      style={{ minHeight: "100vh", backgroundColor: "var(--color-black)" }}
    >
      <Image
        src={SCHOOLS_HERO.image}
        alt=""
        fill
        priority
        className="object-cover"
        style={{ objectPosition: "center 25%" }}
      />

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
          {SCHOOLS_HERO.smallHeading}
        </p>

        <h1
          aria-label={`${SCHOOLS_HERO.headingWhite} ${SCHOOLS_HERO.headingGreen}`}
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
            {SCHOOLS_HERO.headingWhite}
          </span>
          <span
            ref={(el) => { lineRefs.current[1] = el }}
            className="block"
            style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", color: "var(--color-academy-green)" }}
          >
            {SCHOOLS_HERO.headingGreen}
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
          {SCHOOLS_HERO.sub}
        </p>

        <div ref={ctasRef} className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#school-enquiry"
            className="rounded-full px-8 py-4 text-base text-center"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-white)",
              backgroundColor: "var(--color-academy-green)",
              textDecoration: "none",
            }}
          >
            {SCHOOLS_HERO.ctaPrimary}
          </a>
          <a
            href="#schools-asa"
            className="rounded-full px-8 py-4 text-base text-center"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-white)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              textDecoration: "none",
            }}
          >
            {SCHOOLS_HERO.ctaSecondary}
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
