"use client"

import Image from "next/image"
import Link from "next/link"
import { WHO_WE_ARE, PHILOSOPHY } from "@/content/home"
import PhilosophyColumns from "@/components/PhilosophyColumns"

export default function WhoWeAre() {
  return (
    <>
      <section
        className="px-6"
        style={{
          backgroundColor: "var(--color-warm-off-white)",
          overflow: "visible",
          paddingTop: "80px",
          paddingBottom: "80px",
        }}
      >
        <div
          className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16"
          style={{ maxWidth: "1280px" }}
        >
          <div className="flex flex-col justify-center">
            <p
              className="mb-3"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-medium)",
                fontSize: "0.875rem",
                color: "var(--color-academy-green)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              {WHO_WE_ARE.smallHeading}
            </p>
            <h2
              className="mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--color-black)",
                textTransform: "uppercase",
                lineHeight: 1.1,
              }}
            >
              {WHO_WE_ARE.heading}
            </h2>
            <p
              className="mb-8"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(0,0,0,0.7)",
                lineHeight: 1.7,
                maxWidth: "520px",
              }}
            >
              {WHO_WE_ARE.body}
            </p>
            <Link
              href={WHO_WE_ARE.ctaHref}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--color-academy-green)",
                textDecoration: "none",
              }}
            >
              {WHO_WE_ARE.cta} →
            </Link>
          </div>

          <div className="relative">
            <div className="relative w-full" style={{ height: "400px" }}>
              <Image
                src={WHO_WE_ARE.imageLarge}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div
              className="absolute"
              style={{
                width: "45%",
                height: "240px",
                bottom: "-40px",
                left: "-30px",
                zIndex: 2,
              }}
            >
              <Image
                src={WHO_WE_ARE.imageSmall}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <PhilosophyColumns items={PHILOSOPHY} bg="black" />
    </>
  )
}
