"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface Stat {
  readonly value: string
  readonly label: string
}

interface StatStripProps {
  stats: readonly Stat[]
}

export default function StatStrip({ stats }: StatStripProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = sectionRef.current?.querySelectorAll(".stat-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 24,
          duration: prefersReduced ? 0.01 : 0.6,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.1,
        })
      },
    })
  }, { scope: sectionRef })

  const dividerColor = "rgba(0,0,0,0.08)"

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6"
      style={{ backgroundColor: "var(--color-warm-off-white)" }}
    >
      <div
        className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-0"
        style={{ maxWidth: "1120px" }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="stat-item py-8 px-6 md:px-10"
            style={{
              borderTop: `1px solid ${dividerColor}`,
              borderLeft: i % 2 !== 0 || i >= 2
                ? `1px solid ${dividerColor}`
                : undefined,
            }}
          >
            <p
              className="text-4xl md:text-5xl tracking-tight mb-2"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--color-black)",
              }}
            >
              {stat.value}
            </p>
            <p
              className="text-sm md:text-base"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(0,0,0,0.5)",
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
