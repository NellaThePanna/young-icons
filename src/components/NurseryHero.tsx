"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { NURSERY_HERO_V2 } from "@/content/nurseries-about"

export default function NurseryHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLSpanElement>(null)
  const paraRefs = useRef<(HTMLParagraphElement | null)[]>([])

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReduced) return

    const split = new SplitText(headingRef.current, { type: "words" })
    const paras = paraRefs.current.filter((el): el is HTMLParagraphElement => el !== null)

    const tl = gsap.timeline()

    tl.from(split.words, {
      opacity: 0,
      y: 24,
      duration: 0.8,
      ease: "power2.out",
      stagger: { amount: 0.35, from: "start" },
    })

    tl.from(
      paras,
      {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.12,
      },
      "-=0.4"
    )

    return () => split.revert()
  }, { scope: containerRef })

  return (
    <div
      ref={containerRef}
      className="px-6 pt-32 pb-20 md:pt-40 md:pb-28"
      style={{ backgroundColor: "var(--color-nursery-off-white)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "1120px" }}>
        <p
          className="mb-4"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: "var(--font-weight-medium)",
            fontSize: "0.875rem",
            color: "var(--color-nursery-green)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          {NURSERY_HERO_V2.smallHeading}
        </p>

        {/*
          CLIENT-TO-CONFIRM: client doc says "WE are NEW HERE" but inspiration reads
          "we're NOT new here" — likely mistranscription. Luke to confirm exact hero wording.
          Alternative line if confirmed:
          <span className="block">WE ARE NEW HERE.</span>
        */}
        <h1
          className="tracking-tight mb-10"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            fontSize: "clamp(3rem, 9vw, 7.5rem)",
            lineHeight: 0.98,
            color: "var(--color-black)",
            textTransform: "uppercase",
          }}
        >
          <span ref={headingRef} className="block">
            {NURSERY_HERO_V2.headingBlack}
            <span style={{ color: "var(--color-nursery-green)" }}>.</span>
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {NURSERY_HERO_V2.paragraphs.map((paragraph, i) => (
            <p
              key={paragraph}
              ref={(el) => { paraRefs.current[i] = el }}
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(0,0,0,0.65)",
                fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                lineHeight: 1.6,
                maxWidth: "480px",
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
