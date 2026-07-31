"use client"

import { useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Image from "next/image"
import { NURSERY_ENQUIRY_CTA, NURSERY_FORM } from "@/content/nurseries-about"

type FormState = {
  nurseryName: string
  contactName: string
  jobRole: string
  email: string
  phone: string
  location: string
  interestedIn: string
  message: string
}

type Status = "idle" | "submitting" | "success" | "error"

const EMPTY_FORM: FormState = {
  nurseryName: "",
  contactName: "",
  jobRole: "",
  email: "",
  phone: "",
  location: "",
  interestedIn: "",
  message: "",
}

export default function NurseryEnquiryForm() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState<FormState>(EMPTY_FORM)
  const [status, setStatus] = useState<Status>("idle")
  const [focusedField, setFocusedField] = useState<keyof FormState | null>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    gsap.from(sectionRef.current?.querySelectorAll(".enquiry-item") ?? [], {
      opacity: 0,
      y: prefersReduced ? 0 : 32,
      duration: prefersReduced ? 0.01 : 0.8,
      ease: "power2.out",
      stagger: prefersReduced ? 0 : 0.15,
    })
  }, { scope: sectionRef })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("submitting")

    try {
      const res = await fetch("/api/nursery-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
    fontSize: "11px",
    color: "rgba(0,0,0,0.5)",
    marginBottom: "4px",
    display: "block",
  }

  const getFieldStyle = (name: keyof FormState) => ({
    width: "100%",
    border: "none",
    borderBottom: `1px solid ${focusedField === name ? "var(--color-academy-green)" : "rgba(0,0,0,0.18)"}`,
    background: "transparent",
    fontFamily: "var(--font-body)",
    fontSize: "13px",
    padding: "4px 2px 8px",
    color: "var(--color-black)",
    outline: "none",
  })

  return (
    <section
      ref={sectionRef}
      id="enquiry"
      className="px-6"
      style={{
        backgroundColor: "var(--color-white)",
        borderTop: "2px solid var(--color-academy-green)",
        paddingTop: "48px",
        paddingBottom: "48px",
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-[33%_1fr] gap-8 md:gap-10"
        style={{ maxWidth: "1280px", alignItems: "stretch" }}
      >
        <div
          className="enquiry-item relative flex flex-col justify-end overflow-hidden"
          style={{ height: "347px", borderRadius: "var(--radius-lg)" }}
        >
          <Image
            src={NURSERY_ENQUIRY_CTA.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            style={{ objectPosition: "31% 9%" }}
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0,0,0,0.55)", zIndex: 1 }}
            aria-hidden="true"
          />
          <div className="relative p-8" style={{ zIndex: 2 }}>
            <p
              className="mb-4"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-medium)",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.85)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              {NURSERY_ENQUIRY_CTA.cta}
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                textTransform: "uppercase",
                lineHeight: 1.1,
              }}
            >
              {/* white, not brand green, on this dark photo overlay — green here measured ~1.6-1.9:1 contrast, failing WCAG */}
              <span className="block" style={{ color: "var(--color-white)" }}>
                {NURSERY_ENQUIRY_CTA.headingWhite}
              </span>
              <span className="block" style={{ color: "var(--color-white)" }}>
                {NURSERY_ENQUIRY_CTA.headingGreen}
              </span>
            </h2>
          </div>
        </div>

        <div className="enquiry-item">
          {status === "success" ? (
            <p
              role="status"
              className="text-lg"
              style={{ fontFamily: "var(--font-body)", color: "var(--color-black)" }}
            >
              {NURSERY_FORM.successMessage}
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "12px 20px" }}>
                <div>
                  <label htmlFor="nurseryName" style={labelStyle}>
                    {NURSERY_FORM.fields.nurseryName}
                  </label>
                  <input
                    id="nurseryName"
                    name="nurseryName"
                    type="text"
                    required
                    value={formData.nurseryName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("nurseryName")}
                    onBlur={() => setFocusedField(null)}
                    style={getFieldStyle("nurseryName")}
                  />
                </div>

                <div>
                  <label htmlFor="contactName" style={labelStyle}>
                    {NURSERY_FORM.fields.contactName}
                  </label>
                  <input
                    id="contactName"
                    name="contactName"
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("contactName")}
                    onBlur={() => setFocusedField(null)}
                    style={getFieldStyle("contactName")}
                  />
                </div>

                <div>
                  <label htmlFor="jobRole" style={labelStyle}>
                    {NURSERY_FORM.fields.jobRole}
                  </label>
                  <input
                    id="jobRole"
                    name="jobRole"
                    type="text"
                    required
                    value={formData.jobRole}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("jobRole")}
                    onBlur={() => setFocusedField(null)}
                    style={getFieldStyle("jobRole")}
                  />
                </div>

                <div>
                  <label htmlFor="location" style={labelStyle}>
                    {NURSERY_FORM.fields.location}
                  </label>
                  <select
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("location")}
                    onBlur={() => setFocusedField(null)}
                    style={getFieldStyle("location")}
                  >
                    <option value="" disabled>
                      {NURSERY_FORM.fields.location}
                    </option>
                    {NURSERY_FORM.locationOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="email" style={labelStyle}>
                    {NURSERY_FORM.fields.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    style={getFieldStyle("email")}
                  />
                </div>

                <div>
                  <label htmlFor="phone" style={labelStyle}>
                    {NURSERY_FORM.fields.phone}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    style={getFieldStyle("phone")}
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="interestedIn" style={labelStyle}>
                    {NURSERY_FORM.fields.interestedIn}
                  </label>
                  <select
                    id="interestedIn"
                    name="interestedIn"
                    required
                    value={formData.interestedIn}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("interestedIn")}
                    onBlur={() => setFocusedField(null)}
                    style={getFieldStyle("interestedIn")}
                  >
                    <option value="" disabled>
                      {NURSERY_FORM.fields.interestedIn}
                    </option>
                    {NURSERY_FORM.interestedInOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="message" style={labelStyle}>
                    {NURSERY_FORM.fields.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...getFieldStyle("message"), resize: "vertical", padding: "4px 2px 24px" }}
                  />
                </div>
              </div>

              {status === "error" && (
                <p
                  role="alert"
                  className="text-sm"
                  style={{ fontFamily: "var(--font-body)", color: "var(--color-black)" }}
                >
                  {NURSERY_FORM.errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--font-weight-bold)",
                  fontSize: "12px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "var(--color-academy-green)",
                  background: "none",
                  border: "none",
                  padding: 0,
                  marginTop: "20px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  opacity: isSubmitting ? 0.6 : 1,
                }}
              >
                {isSubmitting ? NURSERY_FORM.submittingLabel : NURSERY_FORM.submitLabel}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
