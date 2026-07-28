"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { SCHOOLS_MORE_THAN } from "@/content/schools"

export default function SchoolsMoreThan() {
  const sectionRef = useRef<HTMLElement>(null)
  const accentBlockRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = sectionRef.current?.querySelectorAll(".schools-more-than-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 32,
          duration: prefersReduced ? 0.01 : 0.8,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.15,
        })
      },
    })

    if (!prefersReduced) {
      gsap.from(accentBlockRef.current, {
        clipPath: "inset(0 100% 0 0)",
        duration: 0.8,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: accentBlockRef.current,
          start: "top 80%",
          once: true,
          invalidateOnRefresh: true,
        },
      })
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="px-6"
      style={{
        backgroundColor: "var(--color-warm-off-white)",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-[530px_1fr] gap-12 lg:gap-20 items-center"
        style={{ maxWidth: "1200px" }}
      >
        <div className="schools-more-than-item">
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
            {SCHOOLS_MORE_THAN.eyebrow}
          </p>

          <h2
            className="tracking-tight mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-bold)",
              lineHeight: 1.05,
              textTransform: "uppercase",
            }}
          >
            <span className="block" style={{ fontSize: "clamp(2.9rem, 4.8vw, 4.3rem)", color: "var(--color-black)" }}>
              {SCHOOLS_MORE_THAN.headingBlack}
            </span>
            <span className="block" style={{ fontSize: "clamp(2.9rem, 4.8vw, 4.3rem)", color: "var(--color-academy-green)" }}>
              {SCHOOLS_MORE_THAN.headingGreen}
            </span>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(0,0,0,0.65)",
              fontSize: "clamp(1.2rem, 1.5vw, 1.4rem)",
              lineHeight: 1.6,
              maxWidth: "500px",
            }}
          >
            {SCHOOLS_MORE_THAN.body}
          </p>

          <div
            aria-hidden="true"
            style={{ width: "40px", height: "2px", backgroundColor: "var(--color-academy-green)", margin: "28px 0" }}
          />

          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {SCHOOLS_MORE_THAN.list.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span aria-hidden="true" style={{ width: "6px", height: "6px", backgroundColor: "var(--color-academy-green)", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "rgba(0,0,0,0.75)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div>
            <span
              className="block"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "1.15rem",
                color: "var(--color-academy-green)",
                lineHeight: 1.5,
              }}
            >
              {SCHOOLS_MORE_THAN.closingLine1}
            </span>
            <span
              className="block"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "1.15rem",
                color: "var(--color-academy-green)",
                lineHeight: 1.5,
              }}
            >
              {SCHOOLS_MORE_THAN.closingLine2}
            </span>
          </div>
        </div>

        <div className="schools-more-than-item relative mx-auto lg:mx-0" style={{ width: "100%", maxWidth: "440px" }}>
          <div
            ref={accentBlockRef}
            aria-hidden="true"
            className="absolute"
            style={{
              bottom: "-28px",
              right: "-28px",
              width: "100%",
              height: "100%",
              backgroundColor: "var(--color-academy-green)",
              borderRadius: "var(--radius-lg)",
              zIndex: 0,
            }}
          />
          <div
            className="relative"
            style={{ aspectRatio: "1 / 1", borderRadius: "var(--radius-lg)", overflow: "hidden", zIndex: 1 }}
          >
            <Image
              src={SCHOOLS_MORE_THAN.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 440px"
              className="object-cover"
              style={{ objectPosition: "center 30%" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
