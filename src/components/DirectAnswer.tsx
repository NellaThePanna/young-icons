"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface QA {
  readonly q: string
  readonly a: string
}

interface DirectAnswerProps {
  qas: readonly QA[]
  ariaLabel?: string
}

export default function DirectAnswer({ qas, ariaLabel = "About Young Icons" }: DirectAnswerProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = sectionRef.current?.querySelectorAll(".da-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 28,
          duration: prefersReduced ? 0.01 : 0.7,
          ease: "power2.out",
          stagger: { amount: prefersReduced ? 0 : 0.2, from: "start" },
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6"
      style={{ backgroundColor: "var(--color-black)" }}
      aria-label={ariaLabel}
    >
      <div className="mx-auto" style={{ maxWidth: "860px" }}>
        <dl className="flex flex-col gap-12">
          {qas.map((item) => (
            <div key={item.q} className="da-item">
              <dt
                className="text-xl md:text-2xl mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--font-weight-bold)",
                  color: "var(--color-white)",
                }}
              >
                {item.q}
              </dt>
              <dd
                className="text-base md:text-lg leading-relaxed m-0"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
