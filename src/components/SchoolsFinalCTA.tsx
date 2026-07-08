"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { SCHOOLS_FINAL_CTA } from "@/content/schools"
import { FOOTER_NAP } from "@/content/home"

export default function SchoolsFinalCTA() {
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

  const whatsappHref = `https://wa.me/${FOOTER_NAP.whatsappNumber}?text=${encodeURIComponent(FOOTER_NAP.whatsappMessage)}`

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex items-center justify-center px-6"
      style={{ minHeight: "70vh" }}
    >
      <div className="absolute inset-0">
        <Image src={SCHOOLS_FINAL_CTA.image} alt="" fill className="object-cover" />
      </div>
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1 }}
        aria-hidden="true"
      />

      <div className="relative text-center" style={{ zIndex: 2, maxWidth: "780px" }}>
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
            {SCHOOLS_FINAL_CTA.headingWhite}
          </span>
          <span className="block" style={{ color: "var(--color-academy-green)" }}>
            {SCHOOLS_FINAL_CTA.headingGreen}
          </span>
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
          {SCHOOLS_FINAL_CTA.body}
        </p>

        <div className="final-cta-item flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#school-enquiry"
            className="rounded-full px-8 py-4 text-base w-full sm:w-auto text-center"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-white)",
              backgroundColor: "var(--color-academy-green)",
              textDecoration: "none",
            }}
          >
            {SCHOOLS_FINAL_CTA.ctaPrimary}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-8 py-4 text-base w-full sm:w-auto text-center"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-white)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              textDecoration: "none",
            }}
          >
            {SCHOOLS_FINAL_CTA.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  )
}
