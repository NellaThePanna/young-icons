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
      style={{ backgroundColor: "#f4f2ec", paddingTop: "clamp(5.75rem, 7vw, 7rem)", paddingBottom: "clamp(2rem, 3vw, 3rem)" }}
    >
      <div className="mx-auto px-5 sm:px-8 lg:px-12" style={{ maxWidth: "1456px" }}>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <h1
            data-nursery-hero-reveal
            className="leading-[0.98] sm:leading-[0.94]"
            style={{
              fontFamily: "var(--font-holiday-display), Impact, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(2.4rem, 5.2vw, 4.25rem)",
              letterSpacing: "-0.025em",
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

          <div className="flex justify-end" data-nursery-hero-reveal>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4" style={{ maxWidth: "560px" }}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(0.8rem, 0.95vw, 0.95rem)",
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: "var(--color-black)",
                  margin: 0,
                }}
              >
                {NURSERY_HERO_V2.leftCopy}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(0.8rem, 0.95vw, 0.95rem)",
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: "var(--color-nursery-stone)",
                  margin: 0,
                }}
              >
                {NURSERY_HERO_V2.rightCopy}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative mt-8 overflow-hidden sm:mt-10"
        data-nursery-hero-reveal
        style={{ aspectRatio: "2.45 / 1", minHeight: "260px" }}
      >
        <Image
          src={NURSERY_HERO_V2.image}
          alt={NURSERY_HERO_V2.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 40%" }}
        />
      </div>
    </section>
  )
}
