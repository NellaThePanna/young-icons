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
  const mediaRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (mediaRef.current && !prefersReduced) {
      gsap.to(mediaRef.current, {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
    }

    if (glowRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      gsap.set(glowRef.current, {
        xPercent: -50,
        yPercent: -50,
        x: rect.width / 2,
        y: rect.height / 2,
      })
    }

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !glowRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    gsap.to(glowRef.current, {
      x,
      y,
      duration: 0.6,
      ease: "power2.out",
    })
  }

  const fullHeading = words.join(" ")

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center px-6 pt-16 overflow-hidden"
      style={{ minHeight: "100vh", backgroundColor: "var(--color-black)" }}
      onMouseMove={
        typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches
          ? handleMouseMove
          : undefined
      }
    >
      <div
        ref={mediaRef}
        className="absolute overflow-hidden"
        style={{ top: "-55%", bottom: "-55%", left: 0, right: 0 }}
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
            style={{ objectPosition: "center 30%" }}
          />
        )}
      </div>

      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.55)", zIndex: 1 }}
        aria-hidden="true"
      />

      <div
        ref={glowRef}
        className="absolute"
        style={{
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(26,122,71,0.35) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 3,
          left: 0,
          top: 0,
        }}
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
