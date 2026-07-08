"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { ACTIVITIES_SECTION, HOME_ACTIVITIES } from "@/content/home"

export default function ActivityCarousel() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const cards = sectionRef.current?.querySelectorAll(".activity-card") ?? []
        gsap.from(cards, {
          opacity: 0,
          x: prefersReduced ? 0 : 40,
          duration: prefersReduced ? 0.01 : 0.7,
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
      style={{ backgroundColor: "var(--color-white)" }}
    >
      <div className="mx-auto mb-10" style={{ maxWidth: "1280px" }}>
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
          {ACTIVITIES_SECTION.smallHeading}
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "var(--color-black)",
            textTransform: "uppercase",
            lineHeight: 1.1,
          }}
        >
          {ACTIVITIES_SECTION.heading}
        </h2>
      </div>

      <div
        className="no-scrollbar mx-auto flex gap-4 overflow-x-auto"
        style={{ maxWidth: "1280px", paddingBottom: "16px" }}
      >
        {HOME_ACTIVITIES.map((activity) => (
          <div
            key={activity.name}
            className="activity-card relative shrink-0 overflow-hidden"
            style={{ width: "280px", height: "380px", borderRadius: "var(--radius-lg)" }}
          >
            <div className="activity-card-image absolute inset-0">
              <Image
                src={activity.image}
                alt=""
                fill
                sizes="(max-width: 768px) 80vw, 25vw"
                className="object-cover"
              />
            </div>

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
              }}
              aria-hidden="true"
            />

            <span
              className="activity-card-discover absolute"
              style={{
                bottom: "48px",
                left: "20px",
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: "var(--color-white)",
              }}
            >
              DISCOVER →
            </span>

            <h3
              className="absolute"
              style={{
                bottom: "20px",
                left: "20px",
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "2rem",
                color: "var(--color-white)",
                textTransform: "uppercase",
              }}
            >
              {activity.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  )
}
