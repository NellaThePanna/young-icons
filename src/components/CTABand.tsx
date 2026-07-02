"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { CLASSCARD_URL } from "@/lib/config"

interface CTABandProps {
  headline: string
  cta: string
  sub?: string
  href?: string
  secondaryCta?: string
  secondaryHref?: string
}

export default function CTABand({
  headline,
  cta,
  sub,
  href,
  secondaryCta,
  secondaryHref,
}: CTABandProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        gsap.from(sectionRef.current, {
          opacity: 0,
          y: prefersReduced ? 0 : 24,
          duration: prefersReduced ? 0.01 : 0.8,
          ease: "power2.out",
        })
      },
    })
  }, { scope: sectionRef })

  const isExternal = !href
  const resolvedHref = href ?? CLASSCARD_URL
  const isSecondaryExternal = !secondaryHref
  const resolvedSecondaryHref = secondaryHref ?? CLASSCARD_URL

  return (
    <div
      ref={sectionRef}
      className="py-20 px-6 text-center"
      style={{ backgroundColor: "var(--color-academy-green)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "640px" }}>
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl tracking-tight ${sub ? "mb-4" : "mb-8"}`}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--color-white)",
          }}
        >
          {headline}
        </h2>
        {sub && (
          <p
            className="text-base md:text-lg mb-8"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            {sub}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {isExternal ? (
            <a
              href={resolvedHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full px-8 py-4 text-base"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--color-academy-green)",
                backgroundColor: "var(--color-white)",
                textDecoration: "none",
              }}
            >
              {cta}
            </a>
          ) : (
            <Link
              href={resolvedHref}
              className="inline-block rounded-full px-8 py-4 text-base"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--color-academy-green)",
                backgroundColor: "var(--color-white)",
                textDecoration: "none",
              }}
            >
              {cta}
            </Link>
          )}
          {secondaryCta && (
            isSecondaryExternal ? (
              <a
                href={resolvedSecondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full px-8 py-4 text-base"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--font-weight-bold)",
                  color: "var(--color-white)",
                  border: "1.5px solid rgba(255,255,255,0.5)",
                  textDecoration: "none",
                }}
              >
                {secondaryCta}
              </a>
            ) : (
              <Link
                href={resolvedSecondaryHref}
                className="inline-block rounded-full px-8 py-4 text-base"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--font-weight-bold)",
                  color: "var(--color-white)",
                  border: "1.5px solid rgba(255,255,255,0.5)",
                  textDecoration: "none",
                }}
              >
                {secondaryCta}
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  )
}
