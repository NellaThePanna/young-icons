"use client"

import { Fragment, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { HOME_TRUST_CHIPS } from "@/content/home"

export default function TrustBar() {
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
          y: prefersReduced ? 0 : 20,
          duration: prefersReduced ? 0.01 : 0.6,
          ease: "power2.out",
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <div
      ref={sectionRef}
      className="py-5 px-6"
      style={{
        backgroundColor: "var(--color-black)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="mx-auto flex items-center justify-center flex-wrap gap-y-3"
        style={{ maxWidth: "1280px" }}
      >
        {HOME_TRUST_CHIPS.map((chip, i) => (
          <Fragment key={chip}>
            <span
              className="px-5 text-sm whitespace-nowrap"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--color-white)",
                letterSpacing: "0.01em",
              }}
            >
              {chip}
            </span>
            {i < HOME_TRUST_CHIPS.length - 1 && (
              <span
                aria-hidden="true"
                className="select-none"
                style={{ color: "var(--color-academy-green)" }}
              >
                |
              </span>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
