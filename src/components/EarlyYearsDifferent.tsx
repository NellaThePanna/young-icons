"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { EARLY_YEARS } from "@/content/nurseries-about"

export default function EarlyYearsDifferent() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = sectionRef.current?.querySelectorAll(".early-years-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 32,
          duration: prefersReduced ? 0.01 : 0.7,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : { amount: 0.4, from: "start" },
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="px-6"
      style={{
        backgroundColor: "var(--color-warm-off-white)",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-20"
        style={{ maxWidth: "1280px" }}
      >
        <div className="early-years-item flex flex-col justify-center">
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
            {EARLY_YEARS.label}
          </p>
          <h2
            className="mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: "var(--color-black)",
              textTransform: "uppercase",
              lineHeight: 1.05,
            }}
          >
            {EARLY_YEARS.word}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(0,0,0,0.7)",
              lineHeight: 1.7,
              maxWidth: "520px",
            }}
          >
            {EARLY_YEARS.body}
          </p>
        </div>

        <div className="early-years-item relative">
          <div className="relative w-full" style={{ height: "400px" }}>
            <Image
              src={EARLY_YEARS.imageLarge}
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div
            className="absolute"
            style={{
              width: "45%",
              height: "240px",
              bottom: "-40px",
              left: "-30px",
              zIndex: 2,
            }}
          >
            <Image
              src={EARLY_YEARS.imageSmall}
              alt=""
              fill
              sizes="(max-width: 768px) 80vw, 25vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        style={{ maxWidth: "1280px" }}
      >
        {EARLY_YEARS.stages.map((stage) => (
          <div key={stage.word} className="early-years-item">
            <h3
              className="mb-2"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--color-academy-green)",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              {stage.word}
            </h3>
            <p
              className="mb-3"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-medium)",
                fontSize: "0.75rem",
                color: "rgba(0,0,0,0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {stage.ages}
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(0,0,0,0.7)",
                fontSize: "0.9rem",
                lineHeight: 1.6,
              }}
            >
              {stage.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
