"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

interface TwoColumnProps {
  headline?: string
  paragraphs: readonly string[]
  imageSrc?: string
  imageAlt?: string
  bg?: "black" | "off-white"
}

export default function TwoColumn({
  headline,
  paragraphs,
  imageSrc,
  imageAlt = "",
  bg = "off-white",
}: TwoColumnProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const targets = [leftRef.current, rightRef.current].filter(Boolean)

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        gsap.from(targets, {
          opacity: 0,
          y: prefersReduced ? 0 : 32,
          duration: prefersReduced ? 0.01 : 0.8,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.15,
        })
      },
    })
  }, { scope: sectionRef })

  const isBlack = bg === "black"
  const textPrimary = isBlack ? "var(--color-white)" : "var(--color-black)"
  const textSecondary = isBlack ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)"

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6"
      style={{
        backgroundColor: isBlack ? "var(--color-black)" : "var(--color-warm-off-white)",
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
        style={{ maxWidth: "1120px" }}
      >
        <div ref={leftRef}>
          {headline && (
            <h2
              className="text-2xl md:text-3xl lg:text-4xl tracking-tight mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                color: textPrimary,
              }}
            >
              {headline}
            </h2>
          )}
          <div className="flex flex-col gap-4">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-base md:text-lg leading-relaxed"
                style={{
                  fontFamily: "var(--font-body)",
                  color: textSecondary,
                }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        <div
          ref={rightRef}
          className="relative rounded-lg overflow-hidden"
          style={{ aspectRatio: "4 / 3" }}
        >
          {imageSrc ? (
            <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                backgroundColor: isBlack ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)",
              }}
            >
              <span
                className="text-sm"
                style={{
                  fontFamily: "var(--font-body)",
                  color: isBlack ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
                }}
              >
                [IMAGE PLACEHOLDER]
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
