"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { EXPLORE_SECTION, EXPLORE_CARDS } from "@/content/home"

// TUNE: ratio ≈ 1x / 4x / 7.5x (exp07 parallax concept), capped so travel stays ≤40px
const PARALLAX_TRAVEL = [5, 20, 38] as const

const MOSAIC_LAYOUT = [
  "mosaic-early-years",
  "mosaic-schools",
  "mosaic-clubs",
  "mosaic-camps",
] as const

export default function EditorialMosaic() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const cards = sectionRef.current?.querySelectorAll(".mosaic-card") ?? []
        gsap.from(cards, {
          opacity: 0,
          y: prefersReduced ? 0 : 40,
          duration: prefersReduced ? 0.01 : 0.7,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.12,
        })
      },
    })

    if (!prefersReduced) {
      imageRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          yPercent: PARALLAX_TRAVEL[i % PARALLAX_TRAVEL.length],
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
      })
    }
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

      <div className="mosaic-grid mx-auto" style={{ maxWidth: "1280px" }}>
        {EXPLORE_CARDS.map((card, i) => (
          <Link
            key={card.label}
            href={card.href}
            className={`mosaic-card group relative block overflow-hidden ${MOSAIC_LAYOUT[i]}`}
            style={{ borderRadius: "var(--radius-lg)" }}
          >
            <div
              ref={(el) => { imageRefs.current[i] = el }}
              className="absolute"
              style={{ top: "-10%", bottom: "-10%", left: 0, right: 0 }}
            >
              <div className="mosaic-card-image relative w-full h-full">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
              }}
              aria-hidden="true"
            />

            <div className="absolute bottom-0" style={{ padding: "28px", zIndex: 2 }}>
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
                  fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)",
                  color: "var(--color-white)",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                {card.heading}
              </h3>
              <span
                className="mosaic-card-cta inline-flex items-center"
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
