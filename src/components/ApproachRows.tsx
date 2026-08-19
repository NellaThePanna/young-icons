"use client"

import Image from "next/image"
import { useId, useState } from "react"
import { APPROACH_ROWS } from "@/content/nurseries-about"

export default function ApproachRows() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const sectionId = useId()

  return (
    <section className="px-5 pt-8 pb-10 sm:px-8 sm:pt-10 sm:pb-12 lg:px-12 lg:pt-10 lg:pb-12" style={{ backgroundColor: "#f4f2ec" }}>
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

            if (!isOpen) {
              return (
                <div key={row.id} style={{ borderBottom: "1px solid #d8d5cc" }}>
                  <button
                    id={`${panelId}-button`}
                    type="button"
                    aria-expanded="false"
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(index)}
                    className="group flex w-full items-baseline justify-between gap-5 py-4 text-left sm:py-6"
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
                          fontSize: "clamp(2.15rem, calc(6vw - 4px), 5.55rem)",
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
                      ↗
                    </span>
                  </button>
                </div>
              )
            }

            return (
              <div key={row.id} id={panelId} role="region" aria-labelledby={`${panelId}-button`} style={{ borderBottom: "1px solid #d8d5cc" }}>
                <div className="relative grid grid-cols-1 gap-8 py-8 lg:grid-cols-2 lg:gap-16 lg:py-12">
                  <button
                    id={`${panelId}-button`}
                    type="button"
                    aria-expanded="true"
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(null)}
                    aria-label={`Close ${row.word} approach detail`}
                    className="absolute right-0 top-0 z-10 text-xl leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47]"
                    style={{ border: 0, background: "transparent", color: "var(--color-academy-green)", cursor: "pointer" }}
                  >
                    ×
                  </button>

                  <div className={isLearn ? "lg:order-2 lg:pl-5" : "lg:pr-5"}>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: "var(--font-weight-medium)",
                        fontSize: "0.78rem",
                        letterSpacing: "0.12em",
                        color: "var(--color-academy-green)",
                        margin: "0 2rem 1.5rem 0",
                      }}
                    >
                      {row.number} — {row.ages.toUpperCase()}
                    </p>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(3.4rem, 6.5vw, 7rem)",
                        lineHeight: 0.82,
                        letterSpacing: "-0.025em",
                        color: "var(--color-black)",
                        margin: "0 0 1.8rem",
                      }}
                    >
                      {row.word}
                    </h2>
                    <p
                      style={{
                        borderTop: "1px solid #d8d5cc",
                        paddingTop: "1.35rem",
                        fontFamily: "var(--font-body)",
                        fontSize: "clamp(1.05rem, 1.35vw, 1.3rem)",
                        lineHeight: 1.55,
                        color: "var(--color-nursery-stone)",
                        maxWidth: "500px",
                        margin: 0,
                      }}
                    >
                      {row.body}
                    </p>
                  </div>

                  <div className={`relative overflow-hidden lg:mt-8 ${isLearn ? "lg:order-1" : ""}`} style={{ minHeight: "clamp(280px, 34vw, 520px)" }}>
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
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
