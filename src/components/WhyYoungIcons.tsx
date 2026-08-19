"use client"

import Image from "next/image"
import { useState } from "react"
import { MULTIPLE_ACTIVITIES_CHIPS, WHY_YOUNG_ICONS } from "@/content/nurseries-about"

export default function WhyYoungIcons() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const selected = selectedIndex === null ? null : WHY_YOUNG_ICONS[selectedIndex]

  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-32" style={{ backgroundColor: "#f4f2ec" }}>
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
          WHY YOUNG ICONS
        </p>

        {selected === null ? (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-4" role="list" aria-label="Why Young Icons options">
            {WHY_YOUNG_ICONS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className="group min-h-[180px] p-5 text-left transition-colors duration-200 hover:border-[#1a7a47] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47] sm:min-h-[220px] sm:p-7"
                style={{
                  background: "transparent",
                  border: "1px solid #d8d5cc",
                  cursor: "pointer",
                }}
                role="listitem"
              >
                <span
                  className="block"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: "var(--font-weight-medium)",
                    fontSize: "0.78rem",
                    letterSpacing: "0.12em",
                    color: "var(--color-academy-green)",
                    marginBottom: "2.6rem",
                  }}
                >
                  {item.number}
                </span>
                <span
                  className="block"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.75rem, 2.8vw, 3.05rem)",
                    lineHeight: 0.88,
                    letterSpacing: "-0.02em",
                    color: "var(--color-black)",
                  }}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div
            className="relative min-h-[420px] border border-[#d8d5cc] p-6 sm:p-10 lg:min-h-[540px] lg:p-14"
            role="region"
            aria-label={selected.label}
          >
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close Why Young Icons detail"
              className="absolute right-5 top-4 text-2xl leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47] sm:right-8 sm:top-7"
              style={{ border: 0, background: "transparent", color: "var(--color-academy-green)", cursor: "pointer" }}
            >
              ×
            </button>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-medium)",
                fontSize: "0.78rem",
                letterSpacing: "0.14em",
                color: "var(--color-academy-green)",
                margin: "0 0 2.5rem",
              }}
            >
              {selected.number} — {selected.label}
            </p>

            {selected.id === "multiple-activities" ? (
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.9rem, 6.2vw, 6.8rem)",
                    lineHeight: 0.82,
                    letterSpacing: "-0.03em",
                    color: "var(--color-black)",
                    margin: "0 0 3.5rem",
                  }}
                >
                  {selected.headingLines.map((line) => <span key={line} className="block">{line}</span>)}
                </h2>
                <div className="grid grid-cols-2 border-l border-t border-[#d8d5cc] sm:grid-cols-3 lg:grid-cols-6">
                  {MULTIPLE_ACTIVITIES_CHIPS.map((activity) => (
                    <div key={activity.label} className="border-b border-r border-[#d8d5cc]">
                      <div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: "#eceae3" }}>
                        {activity.image ? (
                          <Image src={activity.image} alt={activity.label} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw" className="object-cover" />
                        ) : (
                          <span
                            className="absolute inset-0 flex items-center justify-center px-3 text-center"
                            style={{ fontFamily: "var(--font-body)", fontSize: "0.67rem", letterSpacing: "0.1em", color: "var(--color-nursery-stone)" }}
                          >
                            [ASSET REQUIRED]
                          </span>
                        )}
                      </div>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontWeight: "var(--font-weight-medium)",
                          fontSize: "0.72rem",
                          letterSpacing: "0.08em",
                          color: "var(--color-black)",
                          margin: 0,
                          padding: "0.85rem",
                        }}
                      >
                        {activity.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : selected.id === "fully-managed" ? (
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(3.1rem, 7.2vw, 7.7rem)",
                    lineHeight: 0.8,
                    letterSpacing: "-0.035em",
                    color: "var(--color-black)",
                    margin: "0 0 2rem",
                  }}
                >
                  {selected.headingLines.map((line) => <span key={line} className="block">{line}</span>)}
                </h2>
                {selected.body && (
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 1.4vw, 1.3rem)", lineHeight: 1.5, color: "var(--color-nursery-stone)", maxWidth: "490px", margin: "0 0 4rem" }}>
                    {selected.body}
                  </p>
                )}
                <div className="grid grid-cols-1 border-l border-t border-[#d8d5cc] sm:grid-cols-2 lg:grid-cols-4">
                  {selected.points?.map((point) => (
                    <p
                      key={point}
                      className="min-h-[120px] border-b border-r border-[#d8d5cc] p-5 sm:min-h-[160px] sm:p-7"
                      style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.45rem, 2.1vw, 2.4rem)", lineHeight: 0.88, color: point.startsWith("[") ? "var(--color-nursery-stone)" : "var(--color-black)", margin: 0 }}
                    >
                      {point}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-[980px]">
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(3.1rem, 7.2vw, 7.7rem)",
                    lineHeight: 0.8,
                    letterSpacing: "-0.035em",
                    color: "var(--color-black)",
                    margin: "0 0 2.4rem",
                  }}
                >
                  {selected.headingLines.map((line) => <span key={line} className="block">{line}</span>)}
                </h2>
                {"body" in selected && selected.body && (
                  <p
                    style={{
                      borderTop: "1px solid #d8d5cc",
                      paddingTop: "1.4rem",
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(1rem, 1.4vw, 1.3rem)",
                      lineHeight: 1.55,
                      color: "var(--color-nursery-stone)",
                      maxWidth: "520px",
                      margin: 0,
                    }}
                  >
                    {selected.body}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
