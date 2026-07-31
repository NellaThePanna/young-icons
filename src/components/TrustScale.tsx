"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import Link from "next/link"
import { HOME_STATS, PARTNERING_CTA, HOME_PARTNERS } from "@/content/home"

function MapPin() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "inline-block", marginRight: 6, verticalAlign: "-2px" }}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export default function TrustScale() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const ctaBandRef = useRef<HTMLElement>(null)
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([])
  const ctaHeadingRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const splits: SplitText[] = []

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = sectionRef.current?.querySelectorAll(".stat-item, .trust-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 20,
          duration: prefersReduced ? 0.01 : 0.7,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.1,
        })

        if (!prefersReduced) {
          HOME_STATS.forEach((stat, i) => {
            if (!stat.isNumeric) return
            const el = valueRefs.current[i]
            const match = stat.value.match(/^(\d+)(.*)$/)
            if (!el || !match) return
            const target = parseInt(match[1], 10)
            const suffix = match[2]
            const counter = { val: 0 }
            gsap.to(counter, {
              val: target,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = String(Math.round(counter.val))
              },
              onComplete: () => {
                el.textContent = target + suffix
                gsap.from(el, {
                  scale: 1.3,
                  duration: 0.5,
                  ease: "back.out(2)",
                })
              },
            })
          })
        }
      },
    })

    // Own trigger: the CTA band sits far below the top-anchored trigger above and
    // was firing (and finishing) while still off-screen, so its word reveal never read.
    ScrollTrigger.create({
      trigger: ctaBandRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = ctaBandRef.current?.querySelectorAll(".cta-band-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 20,
          duration: prefersReduced ? 0.01 : 0.7,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.1,
        })

        if (!prefersReduced && ctaHeadingRef.current) {
          const split = new SplitText(ctaHeadingRef.current, { type: "words" })
          splits.push(split)
          gsap.from(split.words, {
            opacity: 0,
            y: 24,
            duration: 0.8,
            ease: "power2.out",
            stagger: { amount: 0.35, from: "start" },
          })
        }
      },
    })

    return () => splits.forEach((split) => split.revert())
  }, { scope: sectionRef })

  return (
    <div ref={sectionRef}>
      <section
        className="px-6"
        style={{
          backgroundColor: "var(--color-black)",
          paddingTop: "96px",
          paddingBottom: "96px",
        }}
      >
        <div
          className="mx-auto flex flex-col md:flex-row items-center gap-7"
          style={{ maxWidth: "1280px" }}
        >
          <div
            className="stat-item grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x w-full md:w-[40%]"
            style={{ borderColor: "rgba(255,255,255,0.12)" }}
          >
            {HOME_STATS.map((stat, i) => (
              <div
                key={`${stat.value}-${i}`}
                className="flex flex-col items-center justify-center text-center"
                style={{ padding: "22px 24px" }}
              >
                <span
                  ref={(el) => { valueRefs.current[i] = el }}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "var(--font-weight-bold)",
                    fontSize: "clamp(1.75rem, 3.5vw, 2.6875rem)",
                    color: "var(--color-academy-green)",
                    lineHeight: 1,
                  }}
                >
                  {"icon" in stat && stat.icon && <MapPin />}
                  {stat.value}
                </span>
                {stat.label && (
                  <span
                    className="mt-3"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8125rem",
                      color: "rgba(255,255,255,0.6)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {stat.label}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Text wordmarks stand in for logo files — replace with approved logo assets from Luke when supplied (Asana task logged) */}
          <div
            className="trust-item grid grid-cols-3 divide-x divide-y w-full md:w-[58%]"
            style={{ borderColor: "rgba(255,255,255,0.12)" }}
          >
            {HOME_PARTNERS.map((name) => (
              <div
                key={name}
                className="partner-logo flex items-center justify-center"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  letterSpacing: "0.04em",
                  textAlign: "center",
                  lineHeight: 1.3,
                  color: "var(--color-white)",
                  padding: "19px 14px",
                  minHeight: "76px",
                }}
                aria-label={name}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={ctaBandRef}
        className="px-6"
        style={{ backgroundColor: "var(--color-near-black)" }}
      >
        <div
          className="mx-auto flex flex-col md:flex-row items-center justify-between gap-8"
          style={{ maxWidth: "1280px", paddingTop: "56px", paddingBottom: "56px" }}
        >
          <div className="text-center md:text-left">
            <h3
              ref={ctaHeadingRef}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "var(--color-white)",
                textTransform: "uppercase",
                lineHeight: 1.15,
                marginBottom: "8px",
              }}
            >
              {PARTNERING_CTA.heading}
            </h3>
            <p
              className="cta-band-item"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {PARTNERING_CTA.sub}
            </p>
          </div>

          <Link
            href={PARTNERING_CTA.ctaHref}
            className="cta-band-item btn-cta rounded-full px-8 py-4 text-base text-center whitespace-nowrap"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-white)",
              backgroundColor: "var(--color-academy-green)",
              textDecoration: "none",
            }}
          >
            {PARTNERING_CTA.cta} →
          </Link>
        </div>
      </section>
    </div>
  )
}
