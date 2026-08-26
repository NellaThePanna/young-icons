"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"

interface ComingSoonPageProps {
  smallHeading: string
  words: [string, string, string]
  subLines: [string, string]
  image: string
  imageAlt: string
  programmeName: "Ballet" | "Karate"
  backgroundPosition?: string
  mobileBackgroundPosition?: string
  /** Narrowly-scoped CTA/form typography bump — opt-in per page so it never affects pages that don't pass it. */
  enlargedCta?: boolean
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

const FIELD_DEFINITIONS: Array<{
  id: keyof FormState
  label: string
  type: "text" | "email" | "tel" | "number"
}> = [
  { id: "parentName", label: "PARENT NAME", type: "text" },
  { id: "email", label: "EMAIL", type: "email" },
  { id: "phone", label: "PHONE", type: "tel" },
  { id: "childAge", label: "CHILD AGE", type: "number" },
  { id: "location", label: "LOCATION / EMIRATE", type: "text" },
]

export default function ComingSoonPage({
  smallHeading,
  words,
  subLines,
  image,
  imageAlt,
  programmeName,
  backgroundPosition = "center center",
  mobileBackgroundPosition = "center center",
  enlargedCta = false,
}: ComingSoonPageProps) {
  const [formData, setFormData] = useState<FormState>(EMPTY_FORM)
  const [status, setStatus] = useState<Status>("idle")

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("submitting")

    try {
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, programme: programmeName }),
      })

      if (!response.ok) throw new Error("Interest submission failed")

      setStatus("success")
      setFormData(EMPTY_FORM)
    } catch {
      setStatus("error")
    }
  }

  const isSubmitting = status === "submitting"

  return (
    <>
      <NavBar />
      <main style={{ backgroundColor: "var(--color-black)" }}>
        {/* Desktop/tablet hero */}
        <section
          className="relative isolate hidden overflow-hidden md:block"
          style={{ height: "clamp(36.25rem, 48vw, 43.75rem)", minHeight: "36.25rem" }}
          aria-labelledby={`${programmeName.toLowerCase()}-coming-soon-heading-desktop`}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition }}
            role="img"
            aria-label={imageAlt}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, rgba(4,13,11,0.76) 0%, rgba(4,13,11,0.48) 32%, rgba(4,13,11,0.08) 58%, transparent 72%)" }}
          />

          <div className="relative z-10 flex h-full items-center" style={{ paddingLeft: "6.5%" }}>
            <div style={{ maxWidth: "39%" }}>
              <p
                className="m-0"
                style={{
                  fontFamily: "Arial, Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  lineHeight: 1.2,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  color: "#087A45",
                  marginBottom: "14px",
                }}
              >
                {smallHeading}
              </p>

              <h1
                id={`${programmeName.toLowerCase()}-coming-soon-heading-desktop`}
                className="m-0"
                style={{
                  fontFamily: "var(--font-anton)",
                  fontWeight: 400,
                  fontSize: "clamp(58px, 6.1vw, 92px)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.01em",
                  textTransform: "uppercase",
                  textAlign: "left",
                  color: "#F7F5EF",
                }}
              >
                <span className="block">{words[0]}</span>
                <span className="block">{words[1]}</span>
                <span className="block" style={{ color: "#087A45" }}>{words[2]}</span>
              </h1>

              <p
                className="m-0"
                style={{
                  fontFamily: "Arial, Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: 1.65,
                  textAlign: "left",
                  color: "#F7F5EF",
                  marginTop: "24px",
                }}
              >
                <span className="block">{subLines[0]}</span>
                <span className="block">{subLines[1]}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Mobile hero */}
        <section
          className="relative isolate overflow-hidden md:hidden"
          style={{ minHeight: "620px", height: "clamp(620px, 105svh, 700px)" }}
          aria-labelledby={`${programmeName.toLowerCase()}-coming-soon-heading-mobile`}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: mobileBackgroundPosition }}
            role="img"
            aria-label={imageAlt}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, rgba(4,13,11,0.9) 0%, rgba(4,13,11,0.7) 30%, rgba(4,13,11,0.25) 60%, transparent 82%), linear-gradient(90deg, rgba(4,13,11,0.55) 0%, transparent 55%)",
            }}
          />

          <div className="relative z-10 flex h-full items-end" style={{ paddingLeft: "6.5%", paddingRight: "6.5%", paddingBottom: "48px" }}>
            <div style={{ width: "88%", maxWidth: "none" }}>
              <p
                className="m-0"
                style={{
                  fontFamily: "Arial, Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  lineHeight: 1.2,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  color: "#087A45",
                  marginBottom: "14px",
                }}
              >
                {smallHeading}
              </p>

              <h1
                id={`${programmeName.toLowerCase()}-coming-soon-heading-mobile`}
                className="m-0"
                style={{
                  fontFamily: "var(--font-anton)",
                  fontWeight: 400,
                  fontSize: "clamp(48px, 15vw, 70px)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.01em",
                  textTransform: "uppercase",
                  textAlign: "left",
                  color: "#F7F5EF",
                }}
              >
                <span className="block">{words[0]}</span>
                <span className="block">{words[1]}</span>
                <span className="block" style={{ color: "#087A45" }}>{words[2]}</span>
              </h1>

              <p
                className="m-0"
                style={{
                  fontFamily: "Arial, Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: 1.65,
                  textAlign: "left",
                  color: "#F7F5EF",
                  marginTop: "24px",
                }}
              >
                <span className="block">{subLines[0]}</span>
                <span className="block">{subLines[1]}</span>
              </p>
            </div>
          </div>
        </section>

        <section
          className="px-6 py-20 sm:px-10 sm:py-24 lg:py-[7.25rem]"
          aria-labelledby={`${programmeName.toLowerCase()}-interest-heading`}
          style={{ backgroundColor: "var(--color-black)" }}
        >
          <div className="mx-auto" style={{ maxWidth: enlargedCta ? "40rem" : "34rem" }}>
            <div className="text-center">
              <h2
                id={`${programmeName.toLowerCase()}-interest-heading`}
                className={enlargedCta ? "m-0 md:whitespace-nowrap" : "m-0"}
                style={{
                  color: "var(--color-white)",
                  fontFamily: enlargedCta ? "var(--font-anton)" : "var(--font-display)",
                  fontSize: enlargedCta ? "clamp(2.15rem, 5.4vw, 5.1rem)" : "clamp(2.6rem, 4.5vw, 4.25rem)",
                  fontWeight: enlargedCta ? 400 : "var(--font-weight-bold)",
                  letterSpacing: enlargedCta ? "-0.01em" : "-0.035em",
                  lineHeight: 0.94,
                  textTransform: "uppercase",
                }}
              >
                BE FIRST TO KNOW.
              </h2>
              <p
                className="mt-4 mb-10"
                style={{
                  color: "rgba(255,255,255,0.72)",
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(0.94rem, 1.35vw, 1.08rem)",
                  lineHeight: 1.5,
                }}
              >
                <span className="block">Register your interest and we’ll let you know</span>
                <span className="block">when Young Icons {programmeName} launches.</span>
              </p>
            </div>

            {status === "success" ? (
              <p
                role="status"
                className="py-8 text-center"
                style={{ color: "var(--color-white)", fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.5 }}
              >
                THANK YOU — WE’LL LET YOU KNOW.
              </p>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                {FIELD_DEFINITIONS.map((field) => (
                  <div key={field.id} className="flex flex-col gap-2">
                    <label
                      htmlFor={`${programmeName.toLowerCase()}-${field.id}`}
                      style={{
                        color: "rgba(255,255,255,0.66)",
                        fontFamily: "var(--font-body)",
                        fontSize: enlargedCta ? "0.8rem" : "0.72rem",
                        fontWeight: "var(--font-weight-medium)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      id={`${programmeName.toLowerCase()}-${field.id}`}
                      name={field.id}
                      type={field.type}
                      required
                      value={formData[field.id]}
                      onChange={handleChange}
                      className="h-12 rounded-xl px-4 outline-none transition-colors sm:h-[3.25rem]"
                      style={{
                        appearance: field.type === "number" ? "textfield" : undefined,
                        backgroundColor: "var(--color-black)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "var(--color-white)",
                        fontFamily: "var(--font-body)",
                        fontSize: enlargedCta ? "1.1rem" : "1rem",
                      }}
                    />
                  </div>
                ))}

                {status === "error" && (
                  <p role="alert" className="m-0 text-sm" style={{ color: "var(--color-white)", fontFamily: "var(--font-body)" }}>
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-1 h-12 rounded-full px-8 sm:h-[3.25rem]"
                  style={{
                    backgroundColor: "var(--color-academy-green)",
                    border: 0,
                    color: "var(--color-white)",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.88rem",
                    fontWeight: "var(--font-weight-bold)",
                    opacity: isSubmitting ? 0.6 : 1,
                  }}
                >
                  {isSubmitting ? "SENDING..." : "KEEP ME UPDATED"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer compact />
    </>
  )
}
