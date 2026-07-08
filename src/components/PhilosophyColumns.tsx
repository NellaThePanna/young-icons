"use client"

import Image from "next/image"

interface PhilosophyItem {
  word: string
  caption: string
  image?: string
}

interface PhilosophyColumnsProps {
  items: readonly PhilosophyItem[]
  bg?: "black" | "off-white"
}

export default function PhilosophyColumns({ items, bg = "black" }: PhilosophyColumnsProps) {
  const isBlack = bg === "black"

  return (
    <section
      className="px-6"
      style={{
        backgroundColor: isBlack ? "var(--color-black)" : "var(--color-warm-off-white)",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        style={{ maxWidth: "1280px" }}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <div key={item.word}>
              <h3
                className="mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--font-weight-bold)",
                  fontSize: "clamp(3rem, 6vw, 5rem)",
                  color: "var(--color-academy-green)",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                {item.word}
              </h3>
              {item.image && (
                <div
                  className="relative w-full"
                  style={{
                    height: "320px",
                    marginBottom: isLast ? "-60px" : 0,
                    zIndex: isLast ? 1 : "auto",
                  }}
                >
                  <Image src={item.image} alt="" fill sizes="(max-width: 768px) 80vw, 25vw" className="object-cover" />
                </div>
              )}
              <p
                className="mt-4"
                style={{
                  fontFamily: "var(--font-body)",
                  color: isBlack ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                }}
              >
                {item.caption}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
