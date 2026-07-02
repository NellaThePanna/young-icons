"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CLASSCARD_URL } from "@/lib/config"

interface LogisticsStripProps {
  location: string
  sessionTimes: string
  bookingNote: string
  cta: string
  bg?: "black" | "off-white"
}

export default function LogisticsStrip({
  location,
  sessionTimes,
  bookingNote,
  cta,
  bg = "off-white",
}: LogisticsStripProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const targets = [infoRef.current, ctaRef.current].filter(Boolean)

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        gsap.from(targets, {
          opacity: 0,
          y: prefersReduced ? 0 : 32,
          duration: prefersReduced ? 0.01 : 0.8,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.12,
        })
      },
    })
  }, { scope: sectionRef })

  const isBlack = bg === "black"
  const textPrimary = isBlack ? "var(--color-white)" : "var(--color-black)"
  const textSecondary = isBlack ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.6)"
  const dividerColor = isBlack ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"

  return (
    <section
      ref={sectionRef}
      className="py-16 px-6"
      style={{
        backgroundColor: isBlack ? "var(--color-black)" : "var(--color-warm-off-white)",
      }}
    >
      <div
        className="mx-auto pt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-10 md:gap-16"
        style={{
          maxWidth: "1120px",
          borderTop: `1px solid ${dividerColor}`,
        }}
      >
        <div ref={infoRef} className="flex flex-col sm:flex-row gap-10 md:gap-16">
          <div className="flex flex-col gap-1">
            <span
              className="text-xs tracking-widest uppercase"
              style={{ fontFamily: "var(--font-body)", color: textSecondary }}
            >
              Location
            </span>
            <address
              className="not-italic text-base md:text-lg"
              style={{ fontFamily: "var(--font-body)", color: textPrimary }}
            >
              {location}
            </address>
          </div>

          <div className="flex flex-col gap-1">
            <span
              className="text-xs tracking-widest uppercase"
              style={{ fontFamily: "var(--font-body)", color: textSecondary }}
            >
              Session Times
            </span>
            <p
              className="text-base md:text-lg"
              style={{ fontFamily: "var(--font-body)", color: textPrimary }}
            >
              {sessionTimes}
            </p>
          </div>
        </div>

        <div ref={ctaRef} className="flex flex-col gap-4 md:items-end">
          <p
            className="text-sm md:text-base"
            style={{
              fontFamily: "var(--font-body)",
              color: textSecondary,
              maxWidth: "24rem",
            }}
          >
            {bookingNote}
          </p>
          <a
            href={CLASSCARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-8 py-4 text-base inline-block text-center"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-white)",
              backgroundColor: "var(--color-academy-green)",
              textDecoration: "none",
            }}
          >
            {cta}
          </a>
        </div>
      </div>
    </section>
  )
}
