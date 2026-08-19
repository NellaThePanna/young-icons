"use client"

import Image from "next/image"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { NURSERY_HERO_V2 } from "@/content/nurseries-about"

export default function NurseryHero() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const elements = sectionRef.current?.querySelectorAll("[data-nursery-hero-reveal]") ?? []
    gsap.from(elements, {
      opacity: 0,
      y: 20,
      duration: 0.65,
      ease: "power2.out",
      stagger: 0.1,
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="px-5 sm:px-8 lg:px-12"
      style={{ backgroundColor: "#f4f2ec", paddingTop: "clamp(8rem, 13vw, 12.5rem)", paddingBottom: "clamp(3rem, 6vw, 5rem)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "1360px" }}>
        <h1
          data-nursery-hero-reveal
          className="leading-[0.94] sm:leading-[0.83]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            fontSize: "clamp(3.4rem, 9.3vw, 9rem)",
            letterSpacing: "-0.035em",
            color: "var(--color-black)",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {NURSERY_HERO_V2.headlineLines.map((line, index) => (
            <span key={line} className="block">
              {line}
              <span style={{ color: "var(--color-academy-green)", marginLeft: "0.08em" }}>.</span>
              {index === 0 && <br className="hidden" />}
            </span>
          ))}
        </h1>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12" data-nursery-hero-reveal>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 1.25vw, 1.2rem)",
              lineHeight: 1.52,
              color: "var(--color-black)",
              maxWidth: "430px",
              margin: 0,
            }}
          >
            {NURSERY_HERO_V2.leftCopy}
          </p>
          <p
            className="md:justify-self-end"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 1.25vw, 1.2rem)",
              lineHeight: 1.52,
              color: "var(--color-nursery-stone)",
              maxWidth: "390px",
              margin: 0,
            }}
          >
            {NURSERY_HERO_V2.rightCopy}
          </p>
        </div>

        <div
          className="relative mt-12 overflow-hidden sm:mt-16"
          data-nursery-hero-reveal
          style={{ aspectRatio: "16 / 7", minHeight: "260px" }}
        >
          <Image
            src={NURSERY_HERO_V2.image}
            alt={NURSERY_HERO_V2.imageAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 92vw"
            className="object-cover"
            style={{ objectPosition: "50% 40%" }}
          />
        </div>
      </div>
    </section>
  )
}
