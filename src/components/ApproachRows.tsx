"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { APPROACH_ROWS } from "@/content/nurseries-about"

const CLOSED_SIZE = { mobile: 22, desktop: 26 }
const OPEN_SIZE = { mobile: 40, desktop: 68 }

function PlusIcon({ plusRef }: { plusRef: (el: SVGSVGElement | null) => void }) {
  return (
    <svg
      ref={plusRef}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0"
      style={{ color: "var(--color-nursery-green)" }}
    >
      <line x1="10" y1="3" x2="10" y2="17" stroke="currentColor" strokeWidth="1.5" />
      <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export default function ApproachRows() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState(0)
  const [prefersReduced, setPrefersReduced] = useState(false)

  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const ageRefs = useRef<(HTMLSpanElement | null)[]>([])
  const plusRefs = useRef<(SVGSVGElement | null)[]>([])
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])

  // GSAP owns height/fontSize/color/rotate on these refs after mount — JSX below
  // only ever renders their *default* (row 0 open) values so React never fights
  // a tween mid-flight by re-applying a stale style on re-render.
  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setPrefersReduced(reduced)
    const isMobile = window.innerWidth < 768

    APPROACH_ROWS.forEach((_, idx) => {
      const isOpenNow = reduced || idx === 0
      gsap.set(panelRefs.current[idx], { height: isOpenNow ? "auto" : 0 })
      gsap.set(wordRefs.current[idx], {
        fontSize: isOpenNow
          ? isMobile ? OPEN_SIZE.mobile : OPEN_SIZE.desktop
          : isMobile ? CLOSED_SIZE.mobile : CLOSED_SIZE.desktop,
        color: isOpenNow ? "var(--color-nursery-green)" : "var(--color-nursery-stone)",
      })
      gsap.set(ageRefs.current[idx], { opacity: isOpenNow ? 1 : 0 })
      gsap.set(plusRefs.current[idx], { rotate: isOpenNow ? 45 : 0 })
    })

    if (reduced) return

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const rows = sectionRef.current?.querySelectorAll(".approach-row") ?? []
        gsap.from(rows, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.15,
        })
      },
    })
  }, { scope: sectionRef })

  const handleToggle = (i: number) => {
    if (prefersReduced || i === openIndex) return

    const isMobile = window.innerWidth < 768
    const closedSize = isMobile ? CLOSED_SIZE.mobile : CLOSED_SIZE.desktop
    const openSize = isMobile ? OPEN_SIZE.mobile : OPEN_SIZE.desktop
    const prevIndex = openIndex

    gsap.timeline()
      .to(panelRefs.current[prevIndex], { height: 0, duration: 0.4, ease: "power2.inOut" }, 0)
      .to(wordRefs.current[prevIndex], { fontSize: closedSize, color: "var(--color-nursery-stone)", duration: 0.4, ease: "power2.inOut" }, 0)
      .to(ageRefs.current[prevIndex], { opacity: 0, duration: 0.2 }, 0)
      .to(plusRefs.current[prevIndex], { rotate: 0, duration: 0.4, ease: "power2.inOut" }, 0)
      .to(panelRefs.current[i], { height: "auto", duration: 0.4, ease: "power2.inOut" }, 0)
      .to(wordRefs.current[i], { fontSize: openSize, color: "var(--color-nursery-green)", duration: 0.4, ease: "power2.inOut" }, 0)
      .to(ageRefs.current[i], { opacity: 1, duration: 0.3, delay: 0.15 }, 0)
      .to(plusRefs.current[i], { rotate: 45, duration: 0.4, ease: "power2.inOut" }, 0)

    setOpenIndex(i)
  }

  return (
    <section
      ref={sectionRef}
      className="px-6"
      style={{
        backgroundColor: "var(--color-nursery-off-white)",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "1120px" }}>
        <p
          className="mb-6"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: "var(--font-weight-medium)",
            fontSize: "0.875rem",
            color: "var(--color-nursery-green)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          OUR APPROACH
        </p>

        {APPROACH_ROWS.map((row, i) => {
          const isOpen = prefersReduced || openIndex === i
          const panelId = `approach-panel-${row.id}`
          const buttonId = `approach-button-${row.id}`

          return (
            <div
              key={row.id}
              className="approach-row"
              style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}
            >
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleToggle(i)}
                disabled={prefersReduced}
                className="approach-row-button w-full text-left flex items-center justify-between gap-6 py-6"
                style={{
                  background: "none",
                  border: "none",
                  cursor: prefersReduced ? "default" : "pointer",
                }}
              >
                <span className="flex items-baseline gap-4 flex-wrap">
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: "var(--font-weight-medium)",
                      fontSize: "0.875rem",
                      color: "rgba(0,0,0,0.4)",
                    }}
                  >
                    {row.number}
                  </span>
                  <span
                    ref={(el) => { wordRefs.current[i] = el }}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "var(--font-weight-bold)",
                      fontSize: i === 0 ? OPEN_SIZE.desktop : CLOSED_SIZE.desktop,
                      color: i === 0 ? "var(--color-nursery-green)" : "var(--color-nursery-stone)",
                      textTransform: "uppercase",
                      lineHeight: 1,
                    }}
                  >
                    {row.word}
                  </span>
                  <span
                    ref={(el) => { ageRefs.current[i] = el }}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: "var(--font-weight-medium)",
                      fontSize: "0.875rem",
                      color: "rgba(0,0,0,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      opacity: i === 0 ? 1 : 0,
                    }}
                  >
                    {row.ages}
                  </span>
                </span>
                <PlusIcon plusRef={(el) => { plusRefs.current[i] = el }} />
              </button>

              <div
                id={panelId}
                ref={(el) => { panelRefs.current[i] = el }}
                role="region"
                aria-labelledby={buttonId}
                style={{
                  overflow: "hidden",
                  height: i === 0 ? "auto" : 0,
                }}
              >
                <div className="approach-panel-grid pb-10">
                  <div>
                    <div style={{ width: 48, height: 2, backgroundColor: "var(--color-nursery-green)", marginBottom: 20 }} />
                    <p
                      className="mb-6"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "rgba(0,0,0,0.7)",
                        lineHeight: 1.7,
                        maxWidth: "440px",
                      }}
                    >
                      {row.body}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {row.chips.map((chip) => (
                        <span
                          key={chip}
                          className="inline-flex items-center rounded-full"
                          style={{
                            fontFamily: "var(--font-body)",
                            fontWeight: "var(--font-weight-medium)",
                            fontSize: "0.7rem",
                            color: "var(--color-black)",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            border: "1.5px solid rgba(0,0,0,0.15)",
                            padding: "8px 16px",
                          }}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                    <a
                      href="#enquiry"
                      className="link-arrow inline-flex items-center"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: "var(--font-weight-bold)",
                        fontSize: "0.875rem",
                        color: "var(--color-black)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        textDecoration: "underline",
                        textUnderlineOffset: "4px",
                      }}
                    >
                      WORK WITH US →
                    </a>
                  </div>
                  <div className="relative w-full" style={{ minHeight: "380px" }}>
                    <Image
                      src={row.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
                      className="object-cover"
                      style={{ borderRadius: "var(--radius-md)" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }} aria-hidden="true" />
      </div>
    </section>
  )
}
