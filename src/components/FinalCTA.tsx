"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { CLASSCARD_URL } from "@/lib/config"
import { FINAL_CTA } from "@/content/home"

interface FinalCTAProps {
  smallHeading?: string
  headingWhite?: string
  headingGreen?: string
  sub?: string
  ctaPrimary?: string
  ctaSecondary?: string
  image?: string
  href?: string
  secondaryHref?: string
}

export default function FinalCTA({
  smallHeading = FINAL_CTA.smallHeading,
  headingWhite = FINAL_CTA.heading,
  headingGreen = "",
  sub = FINAL_CTA.sub,
  ctaPrimary = FINAL_CTA.ctaPrimary,
  ctaSecondary = FINAL_CTA.ctaSecondary,
  image = FINAL_CTA.image,
  href = CLASSCARD_URL,
  secondaryHref = "/schools",
}: FinalCTAProps) {
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
        <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1 }}
        aria-hidden="true"
      />

      <div className="relative text-center" style={{ zIndex: 2, maxWidth: "780px" }}>
        {smallHeading && (
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
            {smallHeading}
          </p>
        )}

        <h2
          className="final-cta-item mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            fontSize: "clamp(3rem, 6vw, 5rem)",
            textTransform: "uppercase",
            lineHeight: 1.05,
          }}
        >
          <span className="block" style={{ color: "var(--color-white)" }}>
            {headingWhite}
          </span>
          {headingGreen && (
            <span className="block" style={{ color: "var(--color-academy-green)" }}>
              {headingGreen}
            </span>
          )}
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
          {sub}
        </p>

        <div className="final-cta-item flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={href}
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
            {ctaPrimary}
          </a>
          {ctaSecondary && (
            <Link
              href={secondaryHref}
              className="rounded-full px-8 py-4 text-base w-full sm:w-auto text-center"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--color-white)",
                border: "1.5px solid rgba(255,255,255,0.3)",
                textDecoration: "none",
              }}
            >
              {ctaSecondary}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
