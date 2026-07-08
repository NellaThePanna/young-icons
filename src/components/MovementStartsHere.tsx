"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { MOVEMENT_ABC } from "@/content/nurseries-about"

export default function MovementStartsHere() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = sectionRef.current?.querySelectorAll(".movement-abc-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 28,
          duration: prefersReduced ? 0.01 : 0.7,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.15,
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="px-6"
      style={{
        backgroundColor: "var(--color-black)",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
        style={{ maxWidth: "1280px" }}
      >
        <div className="movement-abc-item">
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
            {MOVEMENT_ABC.label}
          </p>
          <p
            className="mb-8"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.7,
              maxWidth: "480px",
            }}
          >
            {MOVEMENT_ABC.body}
          </p>

          <div
            className="grid grid-cols-2 divide-x divide-y divide-[rgba(255,255,255,0.1)]"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
          >
            {MOVEMENT_ABC.words.map((word) => (
              <div key={word} className="px-6 py-6">
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "var(--font-weight-bold)",
                    fontSize: "1.25rem",
                    color: "var(--color-white)",
                    textTransform: "uppercase",
                  }}
                >
                  {word}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="movement-abc-item relative w-full" style={{ height: "480px" }}>
          <Image
            src={MOVEMENT_ABC.image}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
