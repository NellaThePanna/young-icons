"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

interface Coach {
  name: string
  role: string
  credential: string
  photoSrc?: string
  photoAlt?: string
}

interface CoachGridProps {
  coaches: Coach[]
}

export default function CoachGrid({ coaches }: CoachGridProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const cardEls = sectionRef.current?.querySelectorAll(".coach-card") ?? []
        gsap.from(cardEls, {
          opacity: 0,
          y: prefersReduced ? 0 : 32,
          duration: prefersReduced ? 0.01 : 0.6,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.1,
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6"
      style={{ backgroundColor: "var(--color-warm-off-white)" }}
      aria-label="Coaching team"
    >
      <div className="mx-auto" style={{ maxWidth: "1120px" }}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {coaches.map((coach, i) => (
            <div key={i} className="coach-card flex flex-col">
              <div
                className="relative rounded-lg overflow-hidden mb-4"
                style={{ aspectRatio: "3 / 4" }}
              >
                {coach.photoSrc ? (
                  <Image
                    src={coach.photoSrc}
                    alt={coach.photoAlt ?? coach.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
                  >
                    <span
                      className="text-xs text-center px-2"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "rgba(0,0,0,0.3)",
                      }}
                    >
                      [PHOTO]
                    </span>
                  </div>
                )}
              </div>
              <p
                className="text-xs uppercase tracking-widest mb-1"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--color-academy-green)",
                }}
              >
                {coach.credential}
              </p>
              <p
                className="text-base mb-1"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--font-weight-bold)",
                  color: "var(--color-black)",
                }}
              >
                {coach.name}
              </p>
              <p
                className="text-sm"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "rgba(0,0,0,0.55)",
                }}
              >
                {coach.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
