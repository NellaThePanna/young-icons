"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import Image from "next/image"
import Link from "next/link"
import { CLASSCARD_URL } from "@/lib/config"
import { FINAL_CTA } from "@/content/home"

interface FinalCTAProps {
  smallHeading?: string
  headingWhite?: string
  headingGreen?: string
  sub?: string
  ctaPrimary?: string
  ctaSecondary?: string
  image?: string
  href?: string
  secondaryHref?: string
}

export default function FinalCTA({
  smallHeading = "",
  headingWhite = FINAL_CTA.headingWhite,
  headingGreen = FINAL_CTA.headingGreen,
  sub = FINAL_CTA.sub,
  ctaPrimary = FINAL_CTA.ctaPrimary,
  ctaSecondary = FINAL_CTA.ctaSecondary,
  image = FINAL_CTA.image,
  href = CLASSCARD_URL,
  secondaryHref = "/schools",
}: FinalCTAProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingLineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const auroraRefs = useRef<(HTMLDivElement | null)[]>([])
  const eyebrowUnderlineRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!prefersReduced) {
      const blobs = auroraRefs.current.filter(Boolean) as HTMLDivElement[]
      const durations = [4, 5, 4.5]
      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          x: 30,
          y: -20,
          scale: 1.15,
          duration: durations[i % durations.length],
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        })
      })
    }

    if (prefersReduced) return

    const splits: SplitText[] = []

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = sectionRef.current?.querySelectorAll(".final-cta-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.12,
        })

        const lineSplits = headingLineRefs.current
          .filter((el): el is HTMLSpanElement => el !== null)
          .map((el) => new SplitText(el, { type: "words" }))
        splits.push(...lineSplits)
        const words = lineSplits.flatMap((split) => split.words)
        gsap.from(words, {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: "power2.out",
          stagger: { amount: 0.35, from: "start" },
        })

        if (eyebrowUnderlineRef.current) {
          gsap.from(eyebrowUnderlineRef.current, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1,
            ease: "power2.out",
          })
        }
      },
    })

    return () => splits.forEach((split) => split.revert())
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex items-center justify-center px-6"
      style={{ minHeight: "70vh" }}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 20%" }}
        />
      </div>

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ zIndex: 1, pointerEvents: "none" }}
        aria-hidden="true"
      >
        <div
          ref={(el) => { auroraRefs.current[0] = el }}
          className="absolute rounded-full"
          style={{
            width: "420px",
            height: "420px",
            top: "-15%",
            left: "-8%",
            backgroundColor: "var(--color-academy-green)",
            filter: "blur(70px)",
            opacity: 0.55,
            mixBlendMode: "screen",
          }}
        />
        <div
          ref={(el) => { auroraRefs.current[1] = el }}
          className="absolute rounded-full"
          style={{
            width: "460px",
            height: "460px",
            bottom: "-18%",
            right: "-10%",
            backgroundColor: "var(--color-gulf-blue)",
            filter: "blur(70px)",
            opacity: 0.5,
            mixBlendMode: "screen",
          }}
        />
        <div
          ref={(el) => { auroraRefs.current[2] = el }}
          className="absolute rounded-full"
          style={{
            width: "360px",
            height: "360px",
            top: "35%",
            left: "38%",
            backgroundColor: "var(--color-academy-green)",
            filter: "blur(70px)",
            opacity: 0.4,
            mixBlendMode: "screen",
          }}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 2 }}
        aria-hidden="true"
      />

      <div className="relative text-center" style={{ zIndex: 3, maxWidth: "780px" }}>
        {smallHeading && (
          <p
            className="final-cta-item mb-4"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-medium)",
              fontSize: "0.875rem",
              color: "var(--color-academy-green)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
            }}
          >
            <span style={{ position: "relative", display: "inline-block" }}>
              {smallHeading}
              <span
                ref={eyebrowUnderlineRef}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: "-4px",
                  width: "100%",
                  height: "2px",
                  borderRadius: "2px",
                  background: "linear-gradient(90deg, var(--color-academy-green), var(--color-gulf-blue))",
                }}
              />
            </span>
          </p>
        )}

        <h2
          className="mb-6"
          style={{
            fontFamily: "var(--font-landing-display)",
            fontWeight: "var(--font-weight-bold)",
            fontSize: "clamp(3rem, 6vw, 5rem)",
            textTransform: "uppercase",
            lineHeight: 1.05,
          }}
        >
          <span
            ref={(el) => { headingLineRefs.current[0] = el }}
            className="block"
            style={{ color: "var(--color-white)" }}
          >
            {headingWhite}
          </span>
          {headingGreen && (
            <span
              ref={(el) => { headingLineRefs.current[1] = el }}
              className="block"
              style={{ color: "var(--color-academy-green)" }}
            >
              {headingGreen}
            </span>
          )}
        </h2>

        <p
          className="final-cta-item mx-auto mb-10"
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(255,255,255,0.7)",
            maxWidth: "560px",
            lineHeight: 1.6,
          }}
        >
          {sub}
        </p>

        <div className="final-cta-item flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta rounded-full px-8 py-4 text-base w-full sm:w-auto text-center"
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
          {ctaSecondary && (
            <Link
              href={secondaryHref}
              className="btn-cta rounded-full px-8 py-4 text-base w-full sm:w-auto text-center"
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
    </section>
  )
}
