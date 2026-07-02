"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { HOME_TESTIMONIALS } from "@/content/home"

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const cards = sectionRef.current?.querySelectorAll(".testi-card") ?? []
        gsap.from(cards, {
          opacity: 0,
          y: prefersReduced ? 0 : 28,
          duration: prefersReduced ? 0.01 : 0.5,
          ease: "power2.out",
          stagger: { amount: prefersReduced ? 0 : 0.25, from: "start" },
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6"
      style={{ backgroundColor: "var(--color-warm-off-white)" }}
      aria-label="Parent testimonials"
    >
      <div className="mx-auto" style={{ maxWidth: "1280px" }}>
        <h2
          className="text-3xl md:text-4xl tracking-tight mb-12"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--color-black)",
          }}
        >
          What parents say
        </h2>

        <div
          className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none"
          style={{ scrollbarWidth: "none" }}
        >
          {HOME_TESTIMONIALS.map((item, i) => (
            <div
              key={i}
              className="testi-card flex-shrink-0 md:flex-shrink flex flex-col p-6 snap-start"
              style={{
                minWidth: "280px",
                backgroundColor: "var(--color-white)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <blockquote className="flex-1 m-0 p-0">
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "rgba(0,0,0,0.75)",
                  }}
                >
                  &ldquo;{item.quote}&rdquo;
                </p>
              </blockquote>
              <footer>
                <p
                  className="text-sm"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: "var(--font-weight-bold)",
                    color: "var(--color-black)",
                  }}
                >
                  {item.author}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "rgba(0,0,0,0.5)",
                  }}
                >
                  {item.detail}
                </p>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
