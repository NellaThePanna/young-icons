"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { EXPLORE_SECTION, EXPLORE_CARDS } from "@/content/home"

export default function ExploreCards() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const cards = sectionRef.current?.querySelectorAll(".explore-card") ?? []
        gsap.from(cards, {
          opacity: 0,
          y: prefersReduced ? 0 : 40,
          duration: prefersReduced ? 0.01 : 0.7,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.12,
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6"
      style={{ backgroundColor: "var(--color-warm-off-white)" }}
    >
      <div className="mx-auto mb-12" style={{ maxWidth: "1280px" }}>
        <p
          className="mb-3"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: "var(--font-weight-medium)",
            fontSize: "0.875rem",
            color: "var(--color-academy-green)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          {EXPLORE_SECTION.smallHeading}
        </p>
        <h2
          className="mb-4"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "var(--color-black)",
            textTransform: "uppercase",
            lineHeight: 1.1,
          }}
        >
          {EXPLORE_SECTION.heading}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(0,0,0,0.65)",
            maxWidth: "640px",
            lineHeight: 1.6,
          }}
        >
          {EXPLORE_SECTION.sub}
        </p>
      </div>

      <div
        className="mx-auto flex gap-6 overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-visible"
        style={{ maxWidth: "1280px" }}
      >
        {EXPLORE_CARDS.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="explore-card group relative block shrink-0 snap-start overflow-hidden min-w-[80vw] md:min-w-0 h-[360px] md:h-[480px]"
            style={{ borderRadius: "var(--radius-lg)" }}
          >
            <div className="explore-card-image absolute inset-0">
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(max-width: 768px) 80vw, 25vw"
                className="object-cover"
              />
            </div>

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
              }}
              aria-hidden="true"
            />

            <div className="absolute bottom-0" style={{ padding: "24px", zIndex: 2 }}>
              <p
                className="mb-1"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--font-weight-medium)",
                  fontSize: "11px",
                  color: "var(--color-academy-green)",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                }}
              >
                {card.label}
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--font-weight-bold)",
                  fontSize: "1.8rem",
                  color: "var(--color-white)",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                {card.heading}
              </h3>
              <span
                className="explore-card-cta inline-flex items-center"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "var(--color-white)",
                }}
              >
                {card.cta} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
