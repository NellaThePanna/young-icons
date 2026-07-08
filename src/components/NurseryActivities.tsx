"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { NURSERY_ACTIVITIES } from "@/content/nurseries-about"

export default function NurseryActivities() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = sectionRef.current?.querySelectorAll(".nursery-activities-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 24,
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
      id="activities"
      className="px-6"
      style={{
        backgroundColor: "var(--color-warm-off-white)",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <div className="nursery-activities-item mx-auto text-center mb-12" style={{ maxWidth: "780px" }}>
        <h2
          className="mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "var(--color-black)",
            textTransform: "uppercase",
            lineHeight: 1.1,
          }}
        >
          <span className="block">{NURSERY_ACTIVITIES.heading}</span>
          <span className="block">{NURSERY_ACTIVITIES.headingLine2}</span>
        </h2>
        <p
          className="mx-auto"
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(0,0,0,0.65)",
            maxWidth: "640px",
            lineHeight: 1.6,
          }}
        >
          {NURSERY_ACTIVITIES.body}
        </p>
      </div>

      <div className="mx-auto flex flex-wrap items-center justify-center gap-4" style={{ maxWidth: "900px" }}>
        {NURSERY_ACTIVITIES.activities.map((activity) => (
          <span
            key={activity}
            className="nursery-activities-item inline-flex items-center whitespace-nowrap rounded-full"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "0.875rem",
              color: "var(--color-black)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              border: "1.5px solid rgba(0,0,0,0.15)",
              padding: "14px 28px",
            }}
          >
            {activity}
          </span>
        ))}
      </div>
    </section>
  )
}
