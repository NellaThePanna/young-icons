"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Image from "next/image"
import Link from "next/link"
import { SplitText } from "gsap/SplitText"
import { CLASSCARD_URL } from "@/lib/config"

interface HeroHomeProps {
  smallHeading: string
  words: readonly string[]
  wordColors: readonly string[]
  sub: string
  ctaPrimary: string
  ctaSecondary: string
  videoSrc: string
  imageFallback: string
}

export default function HeroHome({
  smallHeading,
  words,
  wordColors,
  sub,
  ctaPrimary,
  ctaSecondary,
  videoSrc,
  imageFallback,
}: HeroHomeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const splits = wordRefs.current
      .filter((el): el is HTMLSpanElement => el !== null)
      .map((el) => new SplitText(el, { type: "words" }))
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

  const fullHeading = words.join(" ")

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center px-6 pt-16 overflow-hidden"
      style={{ minHeight: "100vh", backgroundColor: "var(--color-black)" }}
    >
      {videoSrc ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src={videoSrc}
        />
      ) : (
        <Image
          src={imageFallback}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

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
          {smallHeading}
        </p>

        <h1
          aria-label={fullHeading}
          className="tracking-tight mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            lineHeight: 1.05,
            textTransform: "uppercase",
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => { wordRefs.current[i] = el }}
              className="block"
              style={{
                fontSize: "clamp(4rem, 9vw, 7rem)",
                color:
                  wordColors[i] === "green"
                    ? "var(--color-academy-green)"
                    : "var(--color-white)",
              }}
            >
              {word}
            </span>
          ))}
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
          {sub}
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
            {ctaPrimary}
          </a>
          <Link
            href="/schools"
            className="rounded-full px-8 py-4 text-base text-center"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-white)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              textDecoration: "none",
            }}
          >
            {ctaSecondary}
          </Link>
        </div>
      </div>
    </div>
  )
}
