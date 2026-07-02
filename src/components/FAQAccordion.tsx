"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

interface FAQAccordionProps {
  faqs: readonly { q: string; a: string }[]
  bg?: "black" | "off-white"
}

export default function FAQAccordion({ faqs, bg = "off-white" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    panelRefs.current.forEach((panel) => {
      if (panel) gsap.set(panel, { height: 0, opacity: 0 })
    })
  }, { scope: sectionRef })

  const toggle = (i: number) => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const closeDuration = prefersReduced ? 0.01 : 0.25
    const openDuration = prefersReduced ? 0.01 : 0.35

    if (openIndex !== null && openIndex !== i) {
      const currentPanel = panelRefs.current[openIndex]
      if (currentPanel) {
        gsap.to(currentPanel, { height: 0, opacity: 0, duration: closeDuration, ease: "power2.in" })
      }
    }

    if (openIndex === i) {
      const panel = panelRefs.current[i]
      if (panel) {
        gsap.to(panel, { height: 0, opacity: 0, duration: closeDuration, ease: "power2.in" })
      }
      setOpenIndex(null)
    } else {
      const panel = panelRefs.current[i]
      if (panel) {
        gsap.to(panel, { height: "auto", opacity: 1, duration: openDuration, ease: "power2.out" })
      }
      setOpenIndex(i)
    }
  }

  const isBlack = bg === "black"
  const textPrimary = isBlack ? "var(--color-white)" : "var(--color-black)"
  const textSecondary = isBlack ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.6)"
  const dividerColor = isBlack ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6"
      style={{
        backgroundColor: isBlack ? "var(--color-black)" : "var(--color-warm-off-white)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "1120px" }}>
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i
          const panelId = `faq-panel-${i}`
          const buttonId = `faq-button-${i}`

          return (
            <div key={faq.q} style={{ borderTop: `1px solid ${dividerColor}` }}>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="w-full text-left py-6 flex items-center justify-between gap-6"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--font-weight-bold)",
                  fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                  color: textPrimary,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <span>{faq.q}</span>
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 text-xl"
                  style={{ color: "var(--color-academy-green)" }}
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <div
                id={panelId}
                ref={(el) => { panelRefs.current[i] = el }}
                role="region"
                aria-labelledby={buttonId}
                style={{ overflow: "hidden" }}
              >
                <p
                  className="text-base md:text-lg leading-relaxed pb-6"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: textSecondary,
                  }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          )
        })}
        <div style={{ borderTop: `1px solid ${dividerColor}` }} aria-hidden="true" />
      </div>
    </section>
  )
}
