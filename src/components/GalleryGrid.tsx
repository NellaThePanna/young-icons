"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Image from "next/image"

interface GalleryItem {
  readonly category: string
  readonly alt: string
  readonly src?: string
}

interface GalleryGridProps {
  items: readonly GalleryItem[]
  filters: readonly string[]
}

export default function GalleryGrid({ items, filters }: GalleryGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All")
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const itemEls = gridRef.current?.querySelectorAll(".gallery-item") ?? []
    gsap.from(itemEls, {
      opacity: 0,
      y: prefersReduced ? 0 : 24,
      duration: prefersReduced ? 0.01 : 0.5,
      ease: "power2.out",
      stagger: { amount: prefersReduced ? 0 : 0.4, from: "start" },
    })
  }, { scope: gridRef })

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: "var(--color-warm-off-white)" }}
      aria-label="Photo gallery"
    >
      <div className="mx-auto" style={{ maxWidth: "1120px" }}>
        <div
          className="flex flex-wrap gap-3 mb-10"
          role="tablist"
          aria-label="Filter gallery by programme"
        >
          {filters.map((filter) => {
            const isActive = filter === activeFilter
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(filter)}
                className="rounded-full px-5 py-2 text-sm"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--font-weight-medium)",
                  backgroundColor: isActive ? "var(--color-academy-green)" : "var(--color-white)",
                  color: isActive ? "var(--color-white)" : "var(--color-black)",
                  border: isActive ? "none" : "1px solid rgba(0,0,0,0.12)",
                }}
              >
                {filter}
              </button>
            )
          })}
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, i) => {
            const isVisible = activeFilter === "All" || item.category === activeFilter
            return (
              <div
                key={i}
                className="gallery-item relative rounded-lg overflow-hidden"
                style={{
                  aspectRatio: "4 / 3",
                  display: isVisible ? undefined : "none",
                }}
              >
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center px-4 text-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
                  >
                    <span
                      className="text-xs"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "rgba(0,0,0,0.35)",
                      }}
                    >
                      {item.alt}
                    </span>
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
