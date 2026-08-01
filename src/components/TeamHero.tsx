"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"

interface TeamHeroProps {
  h1: string
  sub: string
  intro?: string
}

export default function TeamHero({ h1, sub, intro }: TeamHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const introRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const restTargets = [subRef.current, introRef.current].filter(Boolean)

    if (prefersReduced) {
      gsap.from([h1Ref.current, ...restTargets], {
        opacity: 0,
        y: 0,
        duration: 0.01,
        ease: "power2.out",
        stagger: 0,
      })
      return
    }

    let split: SplitText | null = null
    const tl = gsap.timeline()

    if (h1Ref.current) {
      split = new SplitText(h1Ref.current, { type: "words, chars" })
      gsap.set(split.chars, {
        opacity: 0,
        x: () => gsap.utils.random(-90, 90),
        y: () => gsap.utils.random(-60, 60),
        rotation: () => gsap.utils.random(-25, 25),
      })
      tl.to(split.chars, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.7,
        ease: "back.out(1.6)",
        stagger: { amount: 0.5, from: "random" },
      })
    }

    tl.from(
      restTargets,
      {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
      },
      "-=0.2"
    )

    return () => split?.revert()
  }, { scope: containerRef })

  return (
    <div
      ref={containerRef}
      className="px-6"
      style={{
        backgroundColor: "var(--color-black)",
        paddingTop: "88px",
        paddingBottom: "32px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "860px" }}>
        <h1
          ref={h1Ref}
          className="tracking-tight mb-3"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--color-white)",
            fontSize: "clamp(27px, 4.6vw, 45px)",
            lineHeight: 1.08,
            textTransform: "uppercase",
          }}
        >
          {h1}
        </h1>
        <p
          ref={subRef}
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(255,255,255,0.65)",
            fontSize: "clamp(13px, 1.4vw, 15px)",
            marginBottom: intro ? "18px" : 0,
          }}
        >
          {sub}
        </p>
        {intro && (
          <p
            ref={introRef}
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(255,255,255,0.5)",
              fontSize: "clamp(12px, 1.2vw, 13px)",
              maxWidth: "474px",
            }}
          >
            {intro}
          </p>
        )}
      </div>
    </div>
  )
}
