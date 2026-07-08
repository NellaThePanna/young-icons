"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { HOME_TESTIMONIALS } from "@/content/home"

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const total = HOME_TESTIMONIALS.length
  const item = HOME_TESTIMONIALS[index]

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: prefersReduced ? 0 : 16 },
      {
        opacity: 1,
        y: 0,
        duration: prefersReduced ? 0.01 : 0.5,
        ease: "power2.out",
      }
    )
  }, { dependencies: [index], scope: cardRef })

  function goTo(next: number) {
    setIndex((next + total) % total)
  }

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: "var(--color-warm-off-white)" }}
      aria-label="Parent testimonials"
    >
      <div className="mx-auto text-center" style={{ maxWidth: "780px" }}>
        <h2
          className="mb-12"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--font-weight-bold)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "var(--color-black)",
            textTransform: "uppercase",
            lineHeight: 1.1,
          }}
        >
          What Parents Say
        </h2>

        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => goTo(index - 1)}
            aria-label="Previous testimonial"
            className="shrink-0"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1.5px solid rgba(0,0,0,0.2)",
              background: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div
            ref={cardRef}
            className="flex-1"
            style={{ minHeight: "220px" }}
            aria-live="polite"
          >
            <blockquote className="m-0 p-0">
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--font-weight-medium)",
                  fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  color: "var(--color-black)",
                  lineHeight: 1.4,
                  marginBottom: "24px",
                }}
              >
                &ldquo;{item.quote}&rdquo;
              </p>
            </blockquote>
            <footer>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--font-weight-bold)",
                  fontSize: "0.95rem",
                  color: "var(--color-black)",
                }}
              >
                {item.author}
              </p>
              <p
                className="mt-1"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  color: "rgba(0,0,0,0.5)",
                }}
              >
                {item.detail}
              </p>
            </footer>
          </div>

          <button
            onClick={() => goTo(index + 1)}
            aria-label="Next testimonial"
            className="shrink-0"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1.5px solid rgba(0,0,0,0.2)",
              background: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {HOME_TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === index}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                backgroundColor: i === index ? "var(--color-academy-green)" : "rgba(0,0,0,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
