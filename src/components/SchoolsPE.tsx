"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { SCHOOLS_PE } from "@/content/schools"

const STATEMENT_COLORS = ["white", "green", "white"] as const

export default function SchoolsPE() {
  const sectionRef = useRef<HTMLElement>(null)

  const statementLines = SCHOOLS_PE.statement
    .split(".")
    .map((line) => line.trim())
    .filter(Boolean)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = sectionRef.current?.querySelectorAll(".schools-pe-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 32,
          duration: prefersReduced ? 0.01 : 0.8,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.15,
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="pe-support"
      className="px-6"
      style={{
        backgroundColor: "var(--color-black)",
        paddingTop: "80px",
        paddingBottom: "80px",
        overflow: "visible",
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
        style={{ maxWidth: "1280px" }}
      >
        <div className="schools-pe-item">
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
            {SCHOOLS_PE.smallHeading}
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
            <span className="block" style={{ color: "var(--color-white)" }}>
              {SCHOOLS_PE.headingBlack}
            </span>
            <span className="block" style={{ color: "var(--color-academy-green)" }}>
              {SCHOOLS_PE.headingGreen}
            </span>
          </h2>

          <p
            className="mb-4"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.7,
              maxWidth: "480px",
            }}
          >
            {SCHOOLS_PE.body}
          </p>
          <p
            className="mb-10"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.7,
              maxWidth: "480px",
            }}
          >
            {SCHOOLS_PE.body2}
          </p>

          <div>
            {statementLines.map((line, i) => (
              <span
                key={line}
                className="block"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--font-weight-bold)",
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  color:
                    STATEMENT_COLORS[i] === "green"
                      ? "var(--color-academy-green)"
                      : "var(--color-white)",
                  textTransform: "uppercase",
                  lineHeight: 1.15,
                }}
              >
                {line}.
              </span>
            ))}
          </div>
        </div>

        <div
          className="schools-pe-item relative"
          style={{
            backgroundColor: "var(--color-academy-green)",
            padding: "40px",
          }}
        >
          <div
            className="relative w-full"
            style={{
              marginTop: "-40px",
              marginBottom: "-40px",
              height: "480px",
            }}
          >
            <Image
              src={SCHOOLS_PE.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
