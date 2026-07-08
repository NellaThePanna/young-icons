"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

interface HeroPageProps {
  h1: string
  sub: string
  intro?: string
  bg?: "black" | "off-white"
}

export default function HeroPage({ h1, sub, intro, bg = "black" }: HeroPageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const introRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const targets = [h1Ref.current, subRef.current, introRef.current].filter(Boolean)

    gsap.from(targets, {
      opacity: 0,
      y: prefersReduced ? 0 : 30,
      duration: prefersReduced ? 0.01 : 0.7,
      ease: "power2.out",
      stagger: 0.1,
    })
  }, { scope: containerRef })

  const isBlack = bg === "black"

  return (
    <div
      ref={containerRef}
      className="pt-32 pb-16 px-6"
      style={{
        backgroundColor: isBlack ? "var(--color-black)" : "var(--color-warm-off-white)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "860px" }}>
        <h1
          ref={h1Ref}
          className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            color: isBlack ? "var(--color-white)" : "var(--color-black)",
            lineHeight: 1.08,
            textTransform: "uppercase",
          }}
        >
          {h1}
        </h1>
        <p
          ref={subRef}
          className="text-lg md:text-xl"
          style={{
            fontFamily: "var(--font-body)",
            color: isBlack ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.6)",
            marginBottom: intro ? "var(--space-6)" : 0,
          }}
        >
          {sub}
        </p>
        {intro && (
          <p
            ref={introRef}
            className="text-base md:text-lg"
            style={{
              fontFamily: "var(--font-body)",
              color: isBlack ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
              maxWidth: "640px",
            }}
          >
            {intro}
          </p>
        )}
      </div>
    </div>
  )
}
