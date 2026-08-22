"use client"

import { useEffect, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Image from "next/image"
import Link from "next/link"
import { SplitText } from "gsap/SplitText"
import { CLASSCARD_URL } from "@/lib/config"

interface HeroHomeProps {
  words: readonly string[]
  wordColors: readonly string[]
  ctaPrimary: string
  ctaSecondary: string
  videoSrc: string
  imageFallback: string
}

export default function HeroHome({
  words,
  wordColors,
  ctaPrimary,
  ctaSecondary,
  videoSrc,
  imageFallback,
}: HeroHomeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const ctasRef = useRef<HTMLDivElement>(null)
  const curtainLeftRef = useRef<HTMLDivElement>(null)
  const curtainRightRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Video is not `autoPlay` — that attribute makes browsers fetch the full
    // file eagerly during initial HTML parse, competing with LCP. Playing it
    // programmatically, deferred to the browser's idle time, lets the poster
    // Image paint (and the hero text render) before the video fetch starts.
    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : (cb: () => void) => setTimeout(cb, 1)
    const handle = idle(() => {
      videoRef.current?.play().catch(() => {})
    })
    return () => {
      if (typeof window.cancelIdleCallback === "function" && typeof handle === "number") {
        window.cancelIdleCallback(handle)
      }
    }
  }, [])

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const curtains = [curtainLeftRef.current, curtainRightRef.current].filter(Boolean)

    if (prefersReduced) {
      gsap.set(curtains, { scaleX: 0 })
    }

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

      if (!prefersReduced) {
        gsap.to(glowRef.current, {
          scale: 1.12,
          opacity: 0.85,
          duration: 2.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        })
      }
    }

    const splits = wordRefs.current
      .filter((el): el is HTMLSpanElement => el !== null)
      .map((el) => new SplitText(el, { type: "words" }))
    const allWords = splits.flatMap((split) => split.words)
    const tl = gsap.timeline()

    if (!prefersReduced) {
      tl.fromTo(
        curtains,
        { scaleX: 1 },
        { scaleX: 0, duration: 0.9, ease: "expo.out" }
      )
    }

    tl.from(
      allWords,
      {
        opacity: 0,
        y: prefersReduced ? 0 : 24,
        duration: prefersReduced ? 0.01 : 0.8,
        ease: "power2.out",
        stagger: prefersReduced ? 0 : { amount: 0.35, from: "start" },
      },
      prefersReduced ? undefined : "-=0.35"
    )

    tl.from(
      ctasRef.current,
      {
        opacity: 0,
        y: prefersReduced ? 0 : 40,
        duration: prefersReduced ? 0.01 : 0.8,
        ease: "power2.out",
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
          <>
            <Image
              src={imageFallback}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "center 30%" }}
            />
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              muted
              loop
              playsInline
              preload="none"
              src={videoSrc}
            />
          </>
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
          zIndex: 1,
          left: 0,
          top: 0,
        }}
        aria-hidden="true"
      />

      <div
        ref={curtainLeftRef}
        className="absolute top-0 bottom-0 left-0"
        style={{
          width: "50%",
          backgroundColor: "var(--color-academy-green)",
          transformOrigin: "left center",
          zIndex: 3,
        }}
        aria-hidden="true"
      />
      <div
        ref={curtainRightRef}
        className="absolute top-0 bottom-0 right-0"
        style={{
          width: "50%",
          backgroundColor: "var(--color-academy-green)",
          transformOrigin: "right center",
          zIndex: 3,
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-5xl w-full mx-auto text-center" style={{ zIndex: 2 }}>
        <h1
          aria-label={fullHeading}
          className="tracking-tight mb-10"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            lineHeight: 0.92,
            textTransform: "uppercase",
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => { wordRefs.current[i] = el }}
              className="block"
              style={{
                fontSize: "clamp(3.5rem, 11vw, 9.5rem)",
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

        <div ref={ctasRef} className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={CLASSCARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta rounded-full px-8 py-4 text-base text-center"
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
            className="btn-cta rounded-full px-8 py-4 text-base text-center"
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
