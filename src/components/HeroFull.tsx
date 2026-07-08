"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Link from "next/link"
import { SplitText } from "gsap/SplitText"
import { CLASSCARD_URL } from "@/lib/config"
import { HOME_HERO } from "@/content/home"

interface HeroFullProps {
  h1?: string
  sub?: string
  ctaPrimary?: string
  ctaSecondary?: string
  ctaSecondaryHref?: string
}

export default function HeroFull({
  h1 = HOME_HERO.h1,
  sub = HOME_HERO.sub,
  ctaPrimary = HOME_HERO.ctaPrimary,
  ctaSecondary,
  ctaSecondaryHref,
}: HeroFullProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const split = new SplitText(h1Ref.current, { type: "words" })
    const tl = gsap.timeline()

    tl.from(split.words, {
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

    return () => split.revert()
  }, { scope: containerRef })

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 pt-16"
      style={{ backgroundColor: "var(--color-black)" }}
    >
      <div className="max-w-4xl w-full mx-auto text-center">
        <h1
          ref={h1Ref}
          aria-label={h1}
          className="text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--color-white)",
            lineHeight: 1.05,
            textTransform: "uppercase",
          }}
        >
          {h1}
        </h1>

        <p
          ref={subRef}
          className="text-lg md:text-xl mx-auto"
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(255,255,255,0.7)",
            maxWidth: "36rem",
            lineHeight: 1.6,
            marginBottom: "var(--space-12)",
          }}
        >
          {sub}
        </p>

        <div ref={ctasRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={CLASSCARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-8 py-4 text-base w-full sm:w-auto text-center"
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
          {ctaSecondary && ctaSecondaryHref && (
            <Link
              href={ctaSecondaryHref}
              className="rounded-full px-8 py-4 text-base w-full sm:w-auto text-center"
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
          )}
        </div>
      </div>
    </div>
  )
}
