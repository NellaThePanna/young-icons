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
      subRef.current,
      {
        opacity: 0,
        y: prefersReduced ? 0 : 20,
        duration: prefersReduced ? 0.01 : 0.7,
        ease: "power2.out",
      },
      prefersReduced ? "<" : "-=0.4"
    )

    return () => splits.forEach((split) => split.revert())
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden px-6"
      style={{
        display: "flex",
        alignItems: "center",
        minHeight: "640px",
        paddingTop: "96px",
        paddingBottom: "48px",
      }}
    >
      <Image
        src={MULTI_HERO.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "50% 20%" }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full" style={{ maxWidth: "1280px", zIndex: 2 }}>
        <div style={{ maxWidth: "700px" }}>
          <h1
            aria-label={MULTI_HERO.headingLines.join(" ")}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-white)",
              fontSize: "clamp(2.75rem, 8vw, 4rem)",
              lineHeight: 0.98,
              textTransform: "uppercase",
              letterSpacing: "0.01em",
              margin: 0,
            }}
          >
            {MULTI_HERO.headingLines.map((line, i) => (
              <span
                key={line}
                ref={(el) => { lineRefs.current[i] = el }}
                className="block"
              >
                {line}
              </span>
            ))}
          </h1>
          <p
            ref={subRef}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-academy-green)",
              fontSize: "clamp(1rem, 2vw, 1.375rem)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginTop: "18px",
            }}
          >
            {MULTI_HERO.sub}
          </p>
        </div>
      </div>
    </section>
  )
}
