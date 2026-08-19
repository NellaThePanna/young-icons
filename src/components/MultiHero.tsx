"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Image from "next/image"
import { SplitText } from "gsap/SplitText"
import { MULTI_HERO } from "@/content/multi-sports"

export default function MultiHero() {
  const containerRef = useRef<HTMLElement>(null)
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const subRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const lines = lineRefs.current.filter((element): element is HTMLSpanElement => element !== null)
    const splits = lines.map((element) => new SplitText(element, { type: "words" }))
    const words = splits.flatMap((split) => split.words)
    const timeline = gsap.timeline()

    timeline.from(words, {
      opacity: 0,
      y: prefersReduced ? 0 : 22,
      duration: prefersReduced ? 0.01 : 0.7,
      ease: "power2.out",
      stagger: prefersReduced ? 0 : { amount: 0.28, from: "start" },
    })

    timeline.from(
      subRef.current,
      {
        opacity: 0,
        y: prefersReduced ? 0 : 16,
        duration: prefersReduced ? 0.01 : 0.55,
        ease: "power2.out",
      },
      prefersReduced ? "<" : "-=0.28"
    )

    return () => splits.forEach((split) => split.revert())
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="relative flex overflow-hidden px-6 sm:px-10 lg:px-16"
      style={{ minHeight: "clamp(560px, 51vw, 700px)", alignItems: "flex-end", paddingBottom: "clamp(48px, 7vw, 100px)" }}
    >
      <Image
        src={MULTI_HERO.image}
        alt="Children taking part in an indoor multi-sports session"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "center 50%" }}
      />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ background: "linear-gradient(90deg, rgba(5,20,14,0.9) 0%, rgba(5,20,14,0.72) 42%, rgba(5,20,14,0.18) 73%, rgba(5,20,14,0.08) 100%)" }}
      />

      <div className="relative mx-auto w-full" style={{ maxWidth: "1280px", zIndex: 1 }}>
        <div style={{ maxWidth: "670px" }}>
          <h1
            aria-label={MULTI_HERO.headingLines.join(" ")}
            className="uppercase"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-white)",
              fontSize: "clamp(3.9rem, 6.85vw, 6.9rem)",
              lineHeight: 0.97,
              letterSpacing: "0.002em",
              margin: 0,
            }}
          >
            {MULTI_HERO.headingLines.map((line, index) => (
              <span
                key={line}
                ref={(element) => {
                  lineRefs.current[index] = element
                }}
                className="block"
              >
                {line}
              </span>
            ))}
          </h1>
          <p
            ref={subRef}
            className="uppercase"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-academy-green)",
              fontSize: "clamp(1rem, 1.8vw, 1.55rem)",
              letterSpacing: "0.09em",
              margin: "28px 0 0 0",
            }}
          >
            {MULTI_HERO.sub}
          </p>
        </div>
      </div>
    </section>
  )
}
