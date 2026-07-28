"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SCHOOLS_CAMPS_INTRO } from "@/content/schools-holiday-camps"

export default function HolidayCampsIntro() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        gsap.from([headingRef.current, bodyRef.current], {
          opacity: 0,
          y: prefersReduced ? 0 : 24,
          duration: prefersReduced ? 0.01 : 0.7,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.12,
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="px-6 py-16"
      style={{ backgroundColor: "var(--color-white)" }}
    >
      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
        style={{ maxWidth: "1120px" }}
      >
        <h2
          ref={headingRef}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            fontSize: "48px",
            lineHeight: 1.1,
            textTransform: "uppercase",
            color: "var(--color-black)",
          }}
        >
          <span className="block">{SCHOOLS_CAMPS_INTRO.headingLine1}</span>
          <span className="block">{SCHOOLS_CAMPS_INTRO.headingLine2}</span>
        </h2>

        <p
          ref={bodyRef}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            lineHeight: 1.6,
            color: "rgba(0,0,0,0.6)",
          }}
        >
          {SCHOOLS_CAMPS_INTRO.body}
        </p>
      </div>
    </section>
  )
}
