"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

interface FacilityHeroProps {
  heading: readonly string[]
  imagePlaceholder: string
}

export default function FacilityHero({ heading, imagePlaceholder }: FacilityHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    gsap.from(h1Ref.current, {
      opacity: 0,
      y: prefersReduced ? 0 : 30,
      duration: prefersReduced ? 0.01 : 0.8,
      ease: "power2.out",
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: "70vh", backgroundColor: "var(--color-near-black)" }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center"
        style={{ background: "linear-gradient(160deg, #2a2f2a, var(--color-near-black))" }}
      >
        <span
          className="text-center px-10"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            color: "rgba(255,255,255,0.35)",
            maxWidth: "320px",
            lineHeight: 1.6,
          }}
        >
          {imagePlaceholder}
        </span>
      </div>
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.75)" }} />
      <div className="relative z-10 text-center px-10">
        <h1
          ref={h1Ref}
          className="uppercase"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            color: "var(--color-white)",
            fontSize: "clamp(42px, 8.3vw, 100px)",
            lineHeight: 0.95,
            margin: 0,
          }}
        >
          {heading.map((line) => (
            <span className="block" key={line}>
              {line}
            </span>
          ))}
        </h1>
      </div>
    </section>
  )
}
