"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import Image from "next/image"
import Link from "next/link"
import { EXPLORE_CARDS } from "@/content/home"

// TUNE: ratio ≈ 1x / 4x / 7.5x (exp07 parallax concept), capped so travel stays ≤40px
const PARALLAX_TRAVEL = [5, 20, 38] as const
// Overhang must exceed the largest PARALLAX_TRAVEL value or the image edge clears
// the card bounds mid-scroll, exposing the section's black background as a gap.
const IMAGE_OVERHANG_PX = 60

const MOSAIC_LAYOUT = [
  "mosaic-early-years",
  "mosaic-schools",
  "mosaic-clubs",
  "mosaic-camps",
] as const

export default function EditorialMosaic() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([])

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const splits: SplitText[] = []

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

        if (!prefersReduced) {
          headingRefs.current.forEach((el, i) => {
            if (!el) return
            const split = new SplitText(el, { type: "words" })
            splits.push(split)
            gsap.from(split.words, {
              opacity: 0,
              y: 12,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.04,
              delay: i * 0.12 + 0.4,
            })
          })
        }
      },
    })

    if (!prefersReduced) {
      imageRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          y: PARALLAX_TRAVEL[i % PARALLAX_TRAVEL.length],
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

    return () => splits.forEach((split) => split.revert())
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      data-section="programme-mosaic"
      className="pt-0 pb-0"
      style={{ backgroundColor: "var(--color-black)" }}
    >
      <div className="mosaic-grid">
        {EXPLORE_CARDS.map((card, i) => (
          <Link
            key={card.label}
            href={card.href}
            className={`mosaic-card group relative block overflow-hidden ${MOSAIC_LAYOUT[i]}`}
          >
            <div
              ref={(el) => { imageRefs.current[i] = el }}
              className="absolute"
              style={{ top: -IMAGE_OVERHANG_PX, bottom: -IMAGE_OVERHANG_PX, left: 0, right: 0 }}
            >
              <div className="mosaic-card-image relative w-full h-full">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes={i === 3 ? "100vw" : "(max-width: 768px) 100vw, 34vw"}
                  className="object-cover"
                  style={{ objectPosition: i === 3 ? "center 40%" : "center" }}
                />
              </div>
            </div>

            <div
              className="absolute inset-0 flex flex-col justify-end"
              style={{
                padding: "clamp(22px, 2.2vw, 38px)",
                zIndex: 2,
              }}
            >
              <p
                className="mb-2"
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
                ref={(el) => { headingRefs.current[i] = el }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--font-weight-bold)",
                  fontSize:
                    i === 0
                      ? "clamp(2rem, 2.7vw, 3.1rem)"
                      : i === 3
                        ? "clamp(2.3rem, 3.4vw, 4.1rem)"
                        : "clamp(2rem, 2.9vw, 3.35rem)",
                  lineHeight: 0.95,
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
