"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface Pillar {
  readonly heading: string
  readonly body: string
}

interface ThreePillarsProps {
  pillars: readonly [Pillar, Pillar, Pillar]
  bg?: "black" | "off-white"
}

export default function ThreePillars({ pillars, bg = "black" }: ThreePillarsProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const cards = sectionRef.current?.querySelectorAll(".pillar-card") ?? []
        gsap.from(cards, {
          opacity: 0,
          y: prefersReduced ? 0 : 36,
          duration: prefersReduced ? 0.01 : 0.7,
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
      className="py-20 px-6"
      style={{
        backgroundColor: isBlack ? "var(--color-black)" : "var(--color-warm-off-white)",
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-0"
        style={{ maxWidth: "1120px" }}
      >
        {pillars.map((pillar, i) => (
          <div
            key={pillar.heading}
            className="pillar-card py-10 px-8 md:px-10"
            style={{
              borderTop: `1px solid ${dividerColor}`,
              borderLeft: i > 0 ? `1px solid ${dividerColor}` : undefined,
            }}
          >
            <div
              className="w-8 h-8 rounded-sm mb-6"
              style={{ backgroundColor: "var(--color-academy-green)" }}
              aria-hidden="true"
            />
            <h2
              className="text-xl md:text-2xl tracking-tight mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                color: textPrimary,
              }}
            >
              {pillar.heading}
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{
                fontFamily: "var(--font-body)",
                color: textSecondary,
              }}
            >
              {pillar.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
