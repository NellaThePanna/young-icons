"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CLASSCARD_URL } from "@/lib/config"
import { MULTI_LOCATIONS } from "@/content/multi-sports"

export default function MultiLocations() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = sectionRef.current?.querySelectorAll(".location-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 32,
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
      id="locations"
      className="px-6"
      style={{
        backgroundColor: "var(--color-black)",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <div className="mx-auto text-center mb-16" style={{ maxWidth: "780px" }}>
        <p
          className="mb-4"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: "var(--font-weight-medium)",
            fontSize: "0.875rem",
            color: "var(--color-academy-green)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          {MULTI_LOCATIONS.smallHeading}
        </p>
        <h2
          className="mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            textTransform: "uppercase",
            lineHeight: 1.05,
          }}
        >
          <span className="block" style={{ color: "var(--color-white)" }}>
            {MULTI_LOCATIONS.heading}
          </span>
          <span className="block" style={{ color: "var(--color-academy-green)" }}>
            {MULTI_LOCATIONS.headingGreen}
          </span>
        </h2>
        <p
          className="mx-auto"
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(255,255,255,0.7)",
            maxWidth: "640px",
            lineHeight: 1.6,
          }}
        >
          {MULTI_LOCATIONS.body}
        </p>
      </div>

      <div
        className="mx-auto flex flex-col md:flex-row mb-16"
        style={{ maxWidth: "1280px" }}
      >
        {MULTI_LOCATIONS.locations.map((location, i) => (
          <div
            key={location.name}
            className="location-item flex-1"
            style={{
              padding: "32px",
              borderTop: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none",
              borderLeft:
                i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none",
            }}
          >
            <h3
              className="mb-3"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: "var(--color-white)",
                textTransform: "uppercase",
                lineHeight: 1.1,
              }}
            >
              {location.name}
            </h3>
            <p
              className="mb-4"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
              }}
            >
              {location.area} · {location.day} · {location.ages}
            </p>
            <a
              href={CLASSCARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--color-academy-green)",
                textDecoration: "none",
              }}
            >
              BOOK THIS CLUB →
            </a>
          </div>
        ))}
      </div>

      <div className="text-center">
        <a
          href={CLASSCARD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full px-8 py-4 text-base inline-block"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--color-white)",
            backgroundColor: "var(--color-academy-green)",
            textDecoration: "none",
          }}
        >
          {MULTI_LOCATIONS.cta}
        </a>
      </div>
    </section>
  )
}
