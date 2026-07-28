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
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)

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
      [bodyRef.current, mediaRef.current],
      {
        opacity: 0,
        y: prefersReduced ? 0 : 32,
        duration: prefersReduced ? 0.01 : 0.8,
        ease: "power2.out",
        stagger: prefersReduced ? 0 : 0.1,
      },
      prefersReduced ? "<" : "-=0.4"
    )

    if (!prefersReduced) {
      gsap.to(arrowRef.current, {
        y: 6,
        duration: 1.4,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      })
    }

    return () => splits.forEach((split) => split.revert())
  }, { scope: containerRef })

  const headingLines = [
    { text: SCHOOLS_HERO.headingLine1, color: "var(--color-black)" },
    { text: SCHOOLS_HERO.headingLine2Green, color: "var(--color-academy-green)" },
    { text: SCHOOLS_HERO.headingLine3, color: "var(--color-black)" },
  ]

  return (
    <div
      ref={containerRef}
      className="px-6"
      style={{
        paddingTop: "104px",
        paddingBottom: "var(--space-16)",
        backgroundColor: "var(--color-warm-off-white)",
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-12 lg:gap-20 items-center"
        style={{ maxWidth: "1120px" }}
      >
        <div>
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
            {SCHOOLS_HERO.eyebrow}
          </p>

          <h1
            aria-label={headingLines.map((line) => line.text).join(" ")}
            className="tracking-tight mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-bold)",
              lineHeight: 1.05,
              textTransform: "uppercase",
            }}
          >
            {headingLines.map((line, i) => (
              <span
                key={line.text}
                ref={(el) => { lineRefs.current[i] = el }}
                className="block"
                style={{ fontSize: "clamp(2.5rem, 4.2vw, 3.75rem)", color: line.color }}
              >
                {line.text}
              </span>
            ))}
          </h1>

          <p
            ref={bodyRef}
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(0,0,0,0.65)",
              fontSize: "clamp(1.05rem, 1.3vw, 1.25rem)",
              lineHeight: 1.6,
              maxWidth: "440px",
            }}
          >
            {SCHOOLS_HERO.body}
          </p>
        </div>

        <div ref={mediaRef} className="relative mx-auto lg:mx-0" style={{ width: "100%", maxWidth: "400px" }}>
          <div
            aria-hidden="true"
            className="absolute"
            style={{
              bottom: "-24px",
              right: "-24px",
              width: "100%",
              height: "100%",
              backgroundColor: "var(--color-academy-green)",
              borderRadius: "var(--radius-lg)",
              zIndex: 0,
            }}
          />
          <div
            className="relative"
            style={{ aspectRatio: "1 / 1", borderRadius: "var(--radius-lg)", overflow: "hidden", zIndex: 1 }}
          >
            <Image
              src={SCHOOLS_HERO.image}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 400px"
              className="object-cover"
              style={{ objectPosition: "center 20%" }}
            />
          </div>
        </div>
      </div>

      <div
        className="flex items-center justify-center gap-2 mx-auto"
        style={{ maxWidth: "1120px", marginTop: "var(--space-16)" }}
      >
        <span
          ref={arrowRef}
          aria-hidden="true"
          style={{ color: "var(--color-academy-green)", fontSize: "1rem", display: "inline-block" }}
        >
          ↓
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: "var(--font-weight-medium)",
            fontSize: "0.8125rem",
            color: "rgba(0,0,0,0.55)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          {SCHOOLS_HERO.scrollLabel}
        </span>
      </div>
    </div>
  )
}
