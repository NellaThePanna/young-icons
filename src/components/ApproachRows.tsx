"use client"

import Image from "next/image"
import { useId, useState } from "react"
import { APPROACH_ROWS } from "@/content/nurseries-about"

export default function ApproachRows() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const sectionId = useId()

  return (
    <section
      className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-32"
      style={{ backgroundColor: "#f4f2ec" }}
    >
      <div className="mx-auto" style={{ maxWidth: "1360px" }}>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: "var(--font-weight-medium)",
            fontSize: "0.78rem",
            letterSpacing: "0.16em",
            color: "var(--color-academy-green)",
            margin: "0 0 2rem",
          }}
        >
          OUR APPROACH
        </p>

        <div style={{ borderTop: "1px solid #d8d5cc" }}>
          {APPROACH_ROWS.map((row, index) => {
            const isOpen = openIndex === index
            const isLearn = row.id === "learn"
            const panelId = `${sectionId}-${row.id}`

            return (
              <div key={row.id} style={{ borderBottom: "1px solid #d8d5cc" }}>
                <button
                  id={`${panelId}-button`}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="group flex w-full items-baseline justify-between gap-5 py-5 text-left sm:py-7"
                  style={{ background: "transparent", border: 0, cursor: "pointer" }}
                >
                  <span className="flex items-baseline gap-4 sm:gap-7">
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.78rem",
                        fontWeight: "var(--font-weight-medium)",
                        color: "var(--color-academy-green)",
                      }}
                    >
                      {row.number}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(2.4rem, 6vw, 5.8rem)",
                        lineHeight: 0.85,
                        letterSpacing: "-0.025em",
                        color: "var(--color-black)",
                      }}
                    >
                      {row.word}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="pt-2 transition-transform duration-200 group-hover:translate-x-1"
                    style={{ fontFamily: "var(--font-body)", color: "var(--color-academy-green)", fontSize: "1.15rem" }}
                  >
                    {isOpen ? "×" : "↗"}
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={`${panelId}-button`}
                    className="grid grid-cols-1 gap-8 pb-8 pt-1 lg:grid-cols-2 lg:gap-12 lg:pb-12"
                  >
                    <div className={isLearn ? "lg:order-2" : ""}>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontWeight: "var(--font-weight-medium)",
                          fontSize: "0.78rem",
                          letterSpacing: "0.12em",
                          color: "var(--color-academy-green)",
                          margin: "0 0 1.5rem",
                        }}
                      >
                        {row.number} — {row.ages.toUpperCase()}
                      </p>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(3.1rem, 6vw, 6.2rem)",
                          lineHeight: 0.82,
                          letterSpacing: "-0.025em",
                          color: "var(--color-black)",
                          margin: "0 0 1.8rem",
                        }}
                      >
                        {row.word}
                      </h3>
                      <p
                        style={{
                          borderTop: "1px solid #d8d5cc",
                          paddingTop: "1.35rem",
                          fontFamily: "var(--font-body)",
                          fontSize: "clamp(1.05rem, 1.35vw, 1.3rem)",
                          lineHeight: 1.55,
                          color: "var(--color-nursery-stone)",
                          maxWidth: "480px",
                          margin: 0,
                        }}
                      >
                        {row.body}
                      </p>
                    </div>
                    <div className={`relative overflow-hidden ${isLearn ? "lg:order-1" : ""}`} style={{ minHeight: "clamp(300px, 35vw, 560px)" }}>
                      <Image
                        src={row.image}
                        alt={row.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 48vw"
                        className="object-cover"
                        style={{ objectPosition: "50% 40%" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
