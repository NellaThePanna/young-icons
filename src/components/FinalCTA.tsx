"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { CLASSCARD_URL } from "@/lib/config"
import { FINAL_CTA } from "@/content/home"

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = sectionRef.current?.querySelectorAll(".final-cta-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: 32,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.12,
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex items-center justify-center px-6"
      style={{ minHeight: "70vh" }}
    >
      <div className="absolute inset-0">
        <Image src={FINAL_CTA.image} alt="" fill className="object-cover" />
      </div>
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1 }}
        aria-hidden="true"
      />

      <div className="relative text-center" style={{ zIndex: 2, maxWidth: "780px" }}>
        <p
          className="final-cta-item mb-4"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: "var(--font-weight-medium)",
            fontSize: "0.875rem",
            color: "var(--color-academy-green)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          {FINAL_CTA.smallHeading}
        </p>

        <h2
          className="final-cta-item mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            fontSize: "clamp(3rem, 6vw, 5rem)",
            color: "var(--color-white)",
            textTransform: "uppercase",
            lineHeight: 1.05,
          }}
        >
          {FINAL_CTA.heading}
        </h2>

        <p
          className="final-cta-item mx-auto mb-10"
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(255,255,255,0.7)",
            maxWidth: "560px",
            lineHeight: 1.6,
          }}
        >
          {FINAL_CTA.sub}
        </p>

        <div className="final-cta-item flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={CLASSCARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-8 py-4 text-base w-full sm:w-auto text-center"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-white)",
              backgroundColor: "var(--color-academy-green)",
              textDecoration: "none",
            }}
          >
            {FINAL_CTA.ctaPrimary}
          </a>
          <Link
            href="/schools"
            className="rounded-full px-8 py-4 text-base w-full sm:w-auto text-center"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-white)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              textDecoration: "none",
            }}
          >
            {FINAL_CTA.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  )
}
