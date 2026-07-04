"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

interface ProgrammeCard {
  readonly name: string
  readonly ageRange: string
  readonly description: string
  readonly cta: string
  readonly href: string
}

interface ProgrammeGridProps {
  cards: readonly ProgrammeCard[]
  heading?: string
}

export default function ProgrammeGrid({ cards, heading }: ProgrammeGridProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const cardEls = sectionRef.current?.querySelectorAll(".prog-card") ?? []
        gsap.from(cardEls, {
          opacity: 0,
          y: prefersReduced ? 0 : 32,
          scale: prefersReduced ? 1 : 0.96,
          duration: prefersReduced ? 0.01 : 0.5,
          ease: "power2.out",
          stagger: { amount: prefersReduced ? 0 : 0.3, from: "start" },
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6"
      style={{ backgroundColor: "var(--color-warm-off-white)" }}
      aria-label={heading ?? "Our programmes"}
    >
      <div className="mx-auto" style={{ maxWidth: "1280px" }}>
        {heading && (
          <h2
            className="text-3xl md:text-4xl tracking-tight mb-12"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-black)",
            }}
          >
            {heading}
          </h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.name}
              className="prog-card flex flex-col p-6"
              style={{
                backgroundColor: "var(--color-white)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <p
                className="text-xs uppercase tracking-widest mb-3"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--color-academy-green)",
                }}
              >
                {card.ageRange}
              </p>
              <h3
                className="text-xl mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--font-weight-bold)",
                  color: "var(--color-black)",
                }}
              >
                {card.name}
              </h3>
              <p
                className="text-sm leading-relaxed mb-6 flex-1"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "rgba(0,0,0,0.65)",
                }}
              >
                {card.description}
              </p>
              <Link
                href={card.href}
                className="text-sm"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--color-academy-green)",
                  textDecoration: "none",
                }}
              >
                {card.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
