"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const MARQUEE_WORDS = ["PLAY", "LEARN", "GROW"]
const MARQUEE_REPEATS = Array.from({ length: 8 })

function MarqueeTrack() {
  return (
    <div className="marquee-track flex shrink-0 items-center">
      {MARQUEE_REPEATS.flatMap((_, repeatIndex) =>
        MARQUEE_WORDS.map((word, wordIndex) => (
          <span
            key={`${repeatIndex}-${wordIndex}`}
            className="flex items-center whitespace-nowrap"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--color-black)",
              textTransform: "uppercase",
            }}
          >
            {word}
            <span style={{ margin: "0 1rem" }}>•</span>
          </span>
        ))
      )}
    </div>
  )
}

export default function MarqueeStrip() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        gsap.from(sectionRef.current, {
          opacity: 0,
          y: prefersReduced ? 0 : 32,
          duration: prefersReduced ? 0.01 : 0.7,
          ease: "power2.out",
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <div
      ref={sectionRef}
      className="overflow-hidden"
      style={{ backgroundColor: "var(--color-academy-green)", padding: "20px 0" }}
      aria-hidden="true"
    >
      <div className="flex">
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
    </div>
  )
}
