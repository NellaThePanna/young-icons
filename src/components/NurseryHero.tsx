"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Image from "next/image"
import { SplitText } from "gsap/SplitText"
import { NURSERY_HERO } from "@/content/nurseries-about"

export default function NurseryHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)

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

    return () => splits.forEach((split) => split.revert())
  }, { scope: containerRef })

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center px-6 pt-16 overflow-hidden"
      style={{ minHeight: "100vh", backgroundColor: "var(--color-black)" }}
    >
      <Image
        src={NURSERY_HERO.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "center 20%" }}
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
          {NURSERY_HERO.smallHeading}
        </p>

        <h1
          aria-label={`${NURSERY_HERO.headingWhite} ${NURSERY_HERO.headingGreen}`}
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
            {NURSERY_HERO.headingWhite}
          </span>
          <span
            ref={(el) => { lineRefs.current[1] = el }}
            className="block"
            style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", color: "var(--color-academy-green)" }}
          >
            {NURSERY_HERO.headingGreen}
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
          {NURSERY_HERO.sub}
        </p>

        <div ref={ctasRef} className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#enquiry"
            className="rounded-full px-8 py-4 text-base text-center"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-white)",
              backgroundColor: "var(--color-academy-green)",
              textDecoration: "none",
            }}
          >
            {NURSERY_HERO.ctaPrimary}
          </a>
          <a
            href="#activities"
            className="rounded-full px-8 py-4 text-base text-center"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-white)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              textDecoration: "none",
            }}
          >
            {NURSERY_HERO.ctaSecondary}
          </a>
        </div>
      </div>
    </div>
  )
}
