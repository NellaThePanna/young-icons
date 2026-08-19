"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import Image from "next/image"
import Link from "next/link"
import { WHO_WE_ARE } from "@/content/home"

const HEADLINE_LINES = ["BUILT", "FOR THE WAY", "CHILDREN", "MOVE."] as const

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let split: SplitText | null = null

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        split = headingRef.current ? new SplitText(headingRef.current, { type: "words" }) : null
        const items = sectionRef.current?.querySelectorAll(".who-item") ?? []
        const timeline = gsap.timeline()

        if (split) {
          timeline.from(split.words, {
            opacity: 0,
            y: prefersReduced ? 0 : 24,
            duration: prefersReduced ? 0.01 : 0.68,
            ease: "power2.out",
            stagger: prefersReduced ? 0 : 0.07,
          })
        }

        timeline.from(
          items,
          {
            opacity: 0,
            y: prefersReduced ? 0 : 32,
            duration: prefersReduced ? 0.01 : 0.68,
            ease: "power2.out",
            stagger: prefersReduced ? 0 : 0.1,
          },
          prefersReduced ? "<" : "-=0.35"
        )
      },
    })

    return () => {
      trigger.kill()
      split?.revert()
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      data-section="who-we-are"
      className="px-0"
      style={{ backgroundColor: "var(--color-warm-off-white)" }}
    >
      <div className="mx-auto grid min-h-[680px] grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]" style={{ maxWidth: "1600px" }}>
        <div
          className="flex items-start px-6 sm:px-10 lg:px-16 xl:px-24"
          style={{ paddingTop: "clamp(120px, 11vw, 168px)", paddingBottom: "96px" }}
        >
          <div className="max-w-[680px]">
            <p
              className="who-item mb-5 text-xs font-semibold tracking-[0.2em] sm:text-sm"
              style={{
                color: "var(--color-academy-green)",
                fontFamily: "var(--font-body)",
              }}
            >
              {WHO_WE_ARE.smallHeading}
            </p>
            <h2
              ref={headingRef}
              className="mb-8 uppercase"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "clamp(3.1rem, 5.45vw, 6.65rem)",
                color: "var(--color-black)",
                lineHeight: 0.98,
                letterSpacing: "-0.018em",
              }}
            >
              {HEADLINE_LINES.map((line) => (
                <span
                  key={line}
                  className="block"
                  style={{ color: line === "MOVE." ? "var(--color-academy-green)" : undefined }}
                >
                  {line === "MOVE." ? (
                    <>
                      MOVE
                      <span aria-hidden="true" style={{ display: "inline-block", marginLeft: "0.13em" }}>
                        .
                      </span>
                    </>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h2>
            <p
              className="who-item mb-9 max-w-[540px] text-base leading-7 sm:text-lg sm:leading-8"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(0,0,0,0.72)",
              }}
            >
              {WHO_WE_ARE.body}
            </p>
            <Link
              href={WHO_WE_ARE.ctaHref}
              className="who-item inline-flex items-center text-sm tracking-[0.06em]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--color-academy-green)",
                textDecoration: "none",
              }}
            >
              {WHO_WE_ARE.cta}
              <span aria-hidden="true" className="ml-2 text-base">→</span>
            </Link>
          </div>
        </div>

        <div className="who-item relative min-h-[460px] overflow-hidden lg:min-h-0">
          <Image
            src="/images/reference/built-for-movement-reference.png"
            alt="Children taking part in a Young Icons movement session"
            fill
            sizes="(max-width: 1024px) 100vw, 46vw"
            className="object-cover"
            style={{ objectPosition: "right center" }}
          />
        </div>
      </div>
    </section>
  )
}
