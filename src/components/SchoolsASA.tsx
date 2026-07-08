"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SCHOOLS_ASA } from "@/content/schools"

export default function SchoolsASA() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const intro = sectionRef.current?.querySelectorAll(".schools-asa-intro") ?? []
        const features = sectionRef.current?.querySelectorAll(".schools-asa-feature") ?? []

        gsap.from(intro, {
          opacity: 0,
          y: prefersReduced ? 0 : 28,
          duration: prefersReduced ? 0.01 : 0.7,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.12,
        })

        gsap.from(features, {
          opacity: 0,
          y: prefersReduced ? 0 : 28,
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
      id="schools-asa"
      className="px-6"
      style={{
        backgroundColor: "var(--color-white)",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <div className="schools-asa-intro mx-auto text-center mb-12" style={{ maxWidth: "780px" }}>
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
          {SCHOOLS_ASA.smallHeading}
        </p>
        <h2
          className="mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            textTransform: "uppercase",
            lineHeight: 1.1,
          }}
        >
          <span className="block" style={{ color: "var(--color-black)" }}>
            {SCHOOLS_ASA.headingBlack}
          </span>
          <span className="block" style={{ color: "var(--color-academy-green)" }}>
            {SCHOOLS_ASA.headingGreen}
          </span>
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
          {SCHOOLS_ASA.body}
        </p>
      </div>

      <div
        className="schools-asa-intro flex gap-4 overflow-x-auto mb-16"
        style={{ scrollbarWidth: "none" }}
      >
        {SCHOOLS_ASA.activities.map((activity) => (
          <span
            key={activity}
            className="inline-flex items-center whitespace-nowrap rounded-full shrink-0"
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

      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
        style={{ maxWidth: "1000px" }}
      >
        {SCHOOLS_ASA.features.map((feature) => (
          <div key={feature.heading} className="schools-asa-feature">
            <h3
              className="mb-3"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "1.5rem",
                color: "var(--color-academy-green)",
                textTransform: "uppercase",
                lineHeight: 1.1,
              }}
            >
              {feature.heading}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(0,0,0,0.7)",
                lineHeight: 1.6,
              }}
            >
              {feature.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
