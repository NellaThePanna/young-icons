"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import Image from "next/image"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"

interface ComingSoonPageProps {
  smallHeading: string
  words: [string, string, string]
  subLines: [string, string]
  image: string
  imageAlt: string
  programmeName: "Ballet" | "Karate"
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

// Club hero type standard: all major display lines use deliberate, non-colliding spacing and a shared left/top alignment across programme pages.
const CLUB_HERO_TYPE_STANDARD = {
  desktopLeftInset: "clamp(3.5rem, 4.25vw, 5rem)",
  desktopTopInset: "clamp(5rem, 5vw, 6rem)",
  headlineSize: "clamp(3.75rem, 5vw, 6rem)",
  headlineLineHeight: 1.02,
  thirdLineGap: "0.14em",
  labelToHeadlineGap: "0.65rem",
  headlineToSupportingCopyGap: "1.25rem",
  periodSpacing: "0.13em",
} as const

function DisplayWord({ word }: { word: string }) {
  const hasPeriod = word.endsWith(".")
  const wordBody = hasPeriod ? word.slice(0, -1) : word

  return (
    <>
      {wordBody}
      {hasPeriod && <span style={{ marginLeft: CLUB_HERO_TYPE_STANDARD.periodSpacing }}>.</span>}
    </>
  )
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
        <section
          className="relative isolate overflow-hidden"
          style={{ height: "clamp(36.25rem, 48vw, 43.75rem)", minHeight: "36.25rem" }}
          aria-labelledby={`${programmeName.toLowerCase()}-coming-soon-heading`}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[68%_16%] sm:object-[64%_20%]"
          />
          <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.62) 38%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.04) 100%)" }} />

          <div className="relative z-10 flex h-full items-start px-6 pt-[6.75rem] sm:px-10 sm:pt-[7.25rem] lg:px-[clamp(3.5rem,4.25vw,5rem)] lg:pt-[clamp(5rem,5vw,6rem)]">
            <div className="max-w-[32rem]">
              <p
                className="mb-0"
                style={{
                  color: "var(--color-academy-green)",
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(0.68rem, 0.85vw, 0.84rem)",
                  fontWeight: "var(--font-weight-bold)",
                  letterSpacing: "0.09em",
                  marginBottom: CLUB_HERO_TYPE_STANDARD.labelToHeadlineGap,
                }}
              >
                {smallHeading}
              </p>

              <h1
                id={`${programmeName.toLowerCase()}-coming-soon-heading`}
                className="m-0"
                style={{
                  color: "var(--color-white)",
                  fontFamily: "var(--font-display)",
                  fontSize: CLUB_HERO_TYPE_STANDARD.headlineSize,
                  fontWeight: "var(--font-weight-bold)",
                  letterSpacing: "-0.025em",
                  lineHeight: CLUB_HERO_TYPE_STANDARD.headlineLineHeight,
                  textTransform: "uppercase",
                }}
              >
                <span className="block"><DisplayWord word={words[0]} /></span>
                <span className="block"><DisplayWord word={words[1]} /></span>
                <span className="block" style={{ color: "var(--color-academy-green)", marginTop: CLUB_HERO_TYPE_STANDARD.thirdLineGap }}><DisplayWord word={words[2]} /></span>
              </h1>

              <p
                className="mb-0"
                style={{
                  color: "var(--color-white)",
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(0.91rem, 1.25vw, 1.1rem)",
                  fontWeight: "var(--font-weight-medium)",
                  lineHeight: 1.48,
                  marginTop: CLUB_HERO_TYPE_STANDARD.headlineToSupportingCopyGap,
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
          <div className="mx-auto" style={{ maxWidth: "34rem" }}>
            <div className="text-center">
              <h2
                id={`${programmeName.toLowerCase()}-interest-heading`}
                className="m-0"
                style={{
                  color: "var(--color-white)",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.6rem, 4.5vw, 4.25rem)",
                  fontWeight: "var(--font-weight-bold)",
                  letterSpacing: "-0.035em",
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
                        fontSize: "0.72rem",
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
                        fontSize: "1rem",
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
