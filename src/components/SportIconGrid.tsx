"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface SportIconGridProps {
  sports: readonly string[]
  bg?: "black" | "off-white"
}

export default function SportIconGrid({ sports, bg = "black" }: SportIconGridProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = sectionRef.current?.querySelectorAll(".sport-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 24,
          duration: prefersReduced ? 0.01 : 0.5,
          ease: "power2.out",
          stagger: { amount: prefersReduced ? 0 : 0.4, from: "start" },
        })
      },
    })
  }, { scope: sectionRef })

  const isBlack = bg === "black"
  const textColor = isBlack ? "var(--color-white)" : "var(--color-black)"

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6"
      style={{
        backgroundColor: isBlack ? "var(--color-black)" : "var(--color-warm-off-white)",
      }}
    >
      <div
        className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
        style={{ maxWidth: "1120px" }}
      >
        {sports.map((sport) => (
          <div
            key={sport}
            className="sport-item flex flex-col items-center text-center"
          >
            <div
              className="rounded-full mb-4"
              style={{
                width: "72px",
                height: "72px",
                backgroundColor: "var(--color-academy-green)",
              }}
              aria-hidden="true"
            />
            <p
              className="text-sm md:text-base"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-medium)",
                color: textColor,
              }}
            >
              {sport}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
