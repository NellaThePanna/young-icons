"use client"

import { useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Image from "next/image"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"

interface ComingSoonPageProps {
  smallHeading: string
  words: string[]
  wordColors: ("white" | "green")[]
  sub: string
  image: string
  programmeName: string
}

type FormState = {
  parentName: string
  email: string
  phone: string
  childAge: string
  location: string
}

type Status = "idle" | "submitting" | "success" | "error"

const EMPTY_FORM: FormState = {
  parentName: "",
  email: "",
  phone: "",
  childAge: "",
  location: "",
}

export default function ComingSoonPage({
  smallHeading,
  words,
  wordColors,
  sub,
  image,
  programmeName,
}: ComingSoonPageProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const subRef = useRef<HTMLParagraphElement>(null)
  const [formData, setFormData] = useState<FormState>(EMPTY_FORM)
  const [status, setStatus] = useState<Status>("idle")

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const lines = wordRefs.current.filter((el): el is HTMLSpanElement => el !== null)
    const tl = gsap.timeline()

    tl.from(lines, {
      opacity: 0,
      y: prefersReduced ? 0 : 24,
      duration: prefersReduced ? 0.01 : 0.8,
      ease: "power2.out",
      stagger: prefersReduced ? 0 : { amount: 0.35, from: "start" },
    })

    tl.from(
      subRef.current,
      {
        opacity: 0,
        y: prefersReduced ? 0 : 24,
        duration: prefersReduced ? 0.01 : 0.8,
        ease: "power2.out",
      },
      prefersReduced ? "<" : "-=0.4"
    )
  }, { scope: heroRef })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("submitting")

    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, programme: programmeName }),
      })

      if (!res.ok) throw new Error("submit failed")

      setStatus("success")
      setFormData(EMPTY_FORM)
    } catch {
      setStatus("error")
    }
  }

  const isSubmitting = status === "submitting"

  const labelStyle = {
    fontFamily: "var(--font-body)",
    fontSize: "0.75rem",
    letterSpacing: "0.1em",
    color: "rgba(255,255,255,0.5)",
  }

  const inputStyle = {
    fontFamily: "var(--font-body)",
    color: "var(--color-white)",
    backgroundColor: "transparent",
    border: "1px solid rgba(255,255,255,0.2)",
  }

  return (
    <>
      <NavBar />
      <main>
        <div
          ref={heroRef}
          className="relative flex flex-col items-center justify-center px-6 pt-16 overflow-hidden"
          style={{ minHeight: "100vh", backgroundColor: "var(--color-black)" }}
        >
          <Image src={image} alt="" fill priority className="object-cover" />

          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1 }}
            aria-hidden="true"
          />

          <div className="relative max-w-3xl w-full mx-auto text-center" style={{ zIndex: 2 }}>
            <p
              className="mb-4"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-medium)",
                fontSize: "0.875rem",
                color: "var(--color-academy-green)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              {smallHeading}
            </p>

            <h1
              aria-label={words.join(" ")}
              className="tracking-tight mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                lineHeight: 1.05,
                textTransform: "uppercase",
              }}
            >
              {words.map((word, i) => (
                <span
                  key={i}
                  ref={(el) => { wordRefs.current[i] = el }}
                  className="block"
                  style={{
                    fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
                    color:
                      wordColors[i] === "green"
                        ? "var(--color-academy-green)"
                        : "var(--color-white)",
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>

            <p
              ref={subRef}
              className="text-lg md:text-xl mx-auto"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(255,255,255,0.7)",
                maxWidth: "480px",
                lineHeight: 1.6,
              }}
            >
              {sub}
            </p>
          </div>
        </div>

        <section
          className="px-6"
          style={{
            backgroundColor: "var(--color-black)",
            paddingTop: "80px",
            paddingBottom: "80px",
          }}
          aria-label={`${programmeName} interest form`}
        >
          <div className="mx-auto" style={{ maxWidth: "560px" }}>
            {status === "success" ? (
              <p
                role="status"
                className="text-lg text-center"
                style={{ fontFamily: "var(--font-body)", color: "var(--color-white)" }}
              >
                THANK YOU — WE'LL LET YOU KNOW.
              </p>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="parentName" className="uppercase" style={labelStyle}>
                    Parent Name
                  </label>
                  <input
                    id="parentName"
                    name="parentName"
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={handleChange}
                    className="rounded-lg px-4 py-3 text-base"
                    style={inputStyle}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="uppercase" style={labelStyle}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="rounded-lg px-4 py-3 text-base"
                    style={inputStyle}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="uppercase" style={labelStyle}>
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="rounded-lg px-4 py-3 text-base"
                    style={inputStyle}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="childAge" className="uppercase" style={labelStyle}>
                    Child Age
                  </label>
                  <input
                    id="childAge"
                    name="childAge"
                    type="text"
                    required
                    value={formData.childAge}
                    onChange={handleChange}
                    className="rounded-lg px-4 py-3 text-base"
                    style={inputStyle}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="location" className="uppercase" style={labelStyle}>
                    Location / Emirate
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="rounded-lg px-4 py-3 text-base"
                    style={inputStyle}
                  />
                </div>

                {status === "error" && (
                  <p
                    role="alert"
                    className="text-sm"
                    style={{ fontFamily: "var(--font-body)", color: "var(--color-white)" }}
                  >
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full px-8 py-4 text-base text-center"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: "var(--font-weight-bold)",
                    color: "var(--color-white)",
                    backgroundColor: "var(--color-academy-green)",
                    opacity: isSubmitting ? 0.6 : 1,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    border: "none",
                  }}
                >
                  {isSubmitting ? "Sending..." : "KEEP ME UPDATED"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
