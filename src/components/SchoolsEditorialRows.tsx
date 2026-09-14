"use client"

import { useId, useState } from "react"
import Image from "next/image"
import { SCHOOLS_EDITORIAL_ROWS } from "@/content/schools-activities"

const editorialRowArrowClassName = "h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12"

function EditorialRowArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={64}
      height={64}
      className={editorialRowArrowClassName}
      style={{ color: "var(--color-academy-green)", flexShrink: 0 }}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.35"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d="M3 3l14 14" />
      <path d="M17 5v12H5" />
    </svg>
  )
}
function ServiceIcon({ index }: { index: number }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.55, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }

  return (
    <span aria-hidden="true" className="mt-1 block h-5 w-5 shrink-0" style={{ color: "var(--color-academy-green)" }}>
      {index === 0 && <svg viewBox="0 0 24 24" className="h-full w-full"><rect x="4" y="5" width="16" height="15" rx="1" {...common} /><path d="M8 3v4M16 3v4M7 11h10M8 15h3" {...common} /></svg>}
      {index === 1 && <svg viewBox="0 0 24 24" className="h-full w-full"><circle cx="9" cy="8" r="3" {...common} /><path d="M3 20c.6-4 2.5-6 6-6s5.4 2 6 6M16 10c2.5.2 4.2 1.7 4.8 4.3M16 6.5a2.5 2.5 0 1 1 0 5" {...common} /></svg>}
      {index === 2 && <svg viewBox="0 0 24 24" className="h-full w-full"><rect x="7" y="3" width="10" height="18" rx="1" {...common} /><path d="M10 18h4" {...common} /></svg>}
      {index === 3 && <svg viewBox="0 0 24 24" className="h-full w-full"><circle cx="12" cy="12" r="8" {...common} /><path d="m8.5 12 2.3 2.3 4.8-5" {...common} /></svg>}
      {index === 4 && <svg viewBox="0 0 24 24" className="h-full w-full"><path d="M5 6h14v10H9l-4 3V6Z" {...common} /><path d="M9 10h6M9 13h4" {...common} /></svg>}
      {index === 5 && <svg viewBox="0 0 24 24" className="h-full w-full"><path d="m4 12 16-7-5 16-3-6-8-3Z" {...common} /><path d="m12 15 3-3" {...common} /></svg>}
    </span>
  )
}

function CategoryIcon({ index }: { index: number }) {
  const common = { fill: "none" as const, stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }

  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" {...common}>
      {index === 0 && <><ellipse cx="12" cy="9" rx="6" ry="7" /><line x1="12" y1="16" x2="12" y2="21" /><line x1="9" y1="21" x2="15" y2="21" /></>}
      {index === 1 && <><circle cx="8" cy="8" r="2.5" /><path d="M3 19c.4-3 2-4.5 5-4.5s4.6 1.5 5 4.5" /><circle cx="17" cy="9" r="2" /><path d="M14.5 19c.3-2.3 1.5-3.5 3.5-3.5" /></>}
      {index === 2 && <><path d="M8 11V8a2 2 0 1 1 4 0" /><path d="M12 10.5V7.5a2 2 0 1 1 4 0v1" /><path d="M16 9.5V8a1.7 1.7 0 1 1 3.4 0v5.5c0 3-2 5.5-5.5 5.5H11c-2 0-3-1-4-2.3L4.8 14a1.4 1.4 0 0 1 2-2l1.2 1" /></>}
      {index === 3 && <><circle cx="12" cy="5" r="2" /><path d="M12 7v6l-3.5 5M12 13l4 4M12 10l-4-2M12 10l4.5-1.5" /></>}
    </svg>
  )
}

function CategoryIconBadge({ index }: { index: number }) {
  return (
    <span
      aria-hidden="true"
      className="absolute z-10 flex items-center justify-center rounded-full text-white"
      style={{ left: "-12px", bottom: "-12px", width: "50px", height: "50px", backgroundColor: "var(--color-academy-green)", boxShadow: "0 2px 6px rgba(0,0,0,0.25)" }}
    >
      <span className="block h-6 w-6">
        <CategoryIcon index={index} />
      </span>
    </span>
  )
}

function AtomIcon() {
  return (
    <span aria-hidden="true" className="block h-7 w-7 shrink-0" style={{ color: "var(--color-academy-green)" }}>
      <svg viewBox="0 0 32 32" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="1.4"><ellipse cx="16" cy="16" rx="13" ry="5" /><ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(60 16 16)" /><ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(120 16 16)" /><circle cx="16" cy="16" r="1.8" fill="currentColor" stroke="none" /></svg>
    </span>
  )
}

export default function SchoolsEditorialRows() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const rootId = useId()

  return (
    <section id="school-editorial-rows" className="px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14" style={{ backgroundColor: "var(--color-warm-off-white)" }}>
      <div className="mx-auto" style={{ maxWidth: "1320px" }}>
        {SCHOOLS_EDITORIAL_ROWS.map((row, index) => {
          const isOpen = openIndex === index
          const panelId = `${rootId}-${row.id}`

          if (!isOpen) {
            return (
              <button
                key={row.id}
                type="button"
                aria-expanded="false"
                aria-controls={panelId}
                onClick={() => setOpenIndex(index)}
                className="group flex w-full items-center justify-between gap-4 border-y border-[#d8d5cc] py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47] sm:py-5"
                style={{ background: "transparent", borderRight: 0, borderLeft: 0, cursor: "pointer", marginTop: index === 0 ? 0 : "-1px" }}
              >
                <span className="flex items-center gap-4 sm:gap-7">
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1.35rem, 2.35vw, 2.25rem)", fontWeight: "var(--font-weight-medium)", color: "var(--color-academy-green)" }}>{row.number}</span>
                  <span style={{ fontFamily: "var(--font-anton)", fontWeight: 400, fontSize: "clamp(1.6rem, calc(4.25vw - 5px), 3.85rem)", lineHeight: 0.9, letterSpacing: "0.005em", color: "var(--color-black)" }}>{row.closedTitle}</span>
                </span>
                <span aria-hidden="true" className="mr-1 flex shrink-0 items-center justify-center transition-transform duration-200 group-hover:translate-x-1 sm:mr-2 lg:mr-3">
                  <EditorialRowArrow />
                </span>
              </button>
            )
          }

          return (
            <section key={row.id} id={panelId} aria-labelledby={`${panelId}-button`} className="border-y border-[#d8d5cc] py-6 sm:py-8 lg:py-9" style={{ marginTop: index === 0 ? 0 : "-1px" }}>
              <button
                id={`${panelId}-button`}
                type="button"
                aria-expanded="true"
                aria-controls={panelId}
                onClick={() => setOpenIndex(null)}
                className="grid w-full grid-cols-[auto_1fr_auto] items-start gap-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47] sm:gap-7 lg:grid-cols-[auto_minmax(0,430px)_300px_minmax(0,1fr)_auto]"
                style={{ background: "transparent", border: 0, cursor: "pointer" }}
              >
                <span style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1.35rem, 2.35vw, 2.25rem)", fontWeight: "var(--font-weight-medium)", color: "var(--color-academy-green)" }}>{row.number}</span>
                <h2 style={{ fontFamily: "var(--font-anton)", fontWeight: 400, fontSize: row.id === "manage" ? "clamp(1.8rem, calc(4.4vw - 7px), 4.0625rem)" : "clamp(2rem, calc(6vw - 14px), 5.325rem)", lineHeight: 0.96, letterSpacing: "0.005em", color: "var(--color-black)", margin: 0 }}>
                  {row.headingLines.map((line, lineIndex) => <span className="block" key={line} style={{ marginTop: lineIndex === 0 ? 0 : "0.15em" }}>{line}</span>)}
                </h2>
                <p className="hidden lg:col-start-3 lg:block" style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.5, color: "var(--color-black)", margin: "0.45rem 0 0", maxWidth: "300px" }}>{row.body}</p>
                <span aria-hidden="true" className="lg:col-start-5" style={{ color: "var(--color-academy-green)", fontSize: "clamp(1.4rem, 2.2vw, 2rem)", lineHeight: 1 }}>↑</span>
              </button>

              <p className="mt-6 max-w-xl lg:hidden" style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.5, color: "var(--color-black)", marginBottom: 0 }}>{row.body}</p>

              <div className="mt-6 border-t border-[#d8d5cc] pt-6 sm:mt-7 sm:pt-7">
                {row.id === "manage" ? (
                  <div>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-10">
                      <div className="divide-y divide-[#e0ddd5]">
                        {row.services.map((service, serviceIndex) => (
                          <div key={service.title} className="flex gap-3 py-2.5 first:pt-0">
                            <ServiceIcon index={serviceIndex} />
                            <div>
                              <h3 style={{ fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-bold)", fontSize: "1rem", color: "var(--color-black)", margin: "0 0 0.32rem" }}>{service.title}</h3>
                              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", lineHeight: 1.35, color: "var(--color-nursery-stone)", margin: 0 }}>{service.body}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="relative overflow-hidden" style={{ height: "clamp(380px, 32vw, 520px)" }}>
                        <Image src={row.image} alt={row.imageAlt} fill sizes="(max-width: 1024px) 90vw, 760px" className="object-cover" style={{ objectPosition: "50% 38%" }} />
                      </div>
                    </div>
                    <p className="mt-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem, 2vw, 2rem)", lineHeight: 0.96, color: "var(--color-black)", marginBottom: 0 }}>
                      <span className="block">{row.closingLines[0]}</span>
                      <span className="block" style={{ color: "var(--color-academy-green)" }}>{row.closingLines[1]}</span>
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                      {row.categories.map((category, categoryIndex) => (
                        <article key={category.title} className={`pb-8 pt-0 sm:px-5 ${categoryIndex > 0 ? "border-t border-[#d8d5cc] sm:border-l sm:border-t-0" : ""} ${categoryIndex === 3 ? "lg:pr-0" : ""}`}>
                          <div className="relative" style={{ height: "clamp(160px, 10vw, 185px)" }}>
                            <div className="absolute inset-0 overflow-hidden">
                              <Image src={category.image} alt={category.imageAlt} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw" className="object-cover" style={{ objectPosition: "50% 38%" }} />
                            </div>
                            <CategoryIconBadge index={categoryIndex} />
                          </div>
                          <h3 className="mt-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 1.9vw, 2rem)", lineHeight: 0.9, letterSpacing: "-0.02em", color: "var(--color-black)", marginBottom: "0.3rem" }}>{category.title}</h3>
                          <p style={{ fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-medium)", fontSize: "0.85rem", lineHeight: 1.35, color: "var(--color-academy-green)", margin: "0 0 0.7rem" }}>{category.tagline}</p>
                          <ul
                            className={`m-0 list-disc pl-5 marker:text-current ${category.activities.length >= 5 ? "grid grid-cols-1 gap-x-4 gap-y-0 sm:grid-cols-2" : ""}`}
                            style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", lineHeight: 1.65, color: "var(--color-black)" }}
                          >
                            {category.activities.map((activity) => <li key={activity}>{activity}</li>)}
                          </ul>
                        </article>
                      ))}
                    </div>
                    <div className="flex gap-4 border-y border-[#d8d5cc] px-4 py-5 sm:px-6">
                      <AtomIcon />
                      <div>
                        <h3 style={{ fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-bold)", fontSize: "0.9rem", color: "var(--color-academy-green)", margin: "0 0 0.35rem" }}>{row.stem.title}</h3>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.45, color: "var(--color-black)", margin: 0 }}>{row.stem.body}</p>
                      </div>
                    </div>
                    <p className="mt-5 flex items-center gap-4" style={{ fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-medium)", fontSize: "0.92rem", color: "var(--color-black)", marginBottom: 0 }}>
                      <span aria-hidden="true" style={{ color: "var(--color-academy-green)", fontSize: "1.5rem" }}>→</span>
                      {row.closingLine}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )
        })}
      </div>
    </section>
  )
}

