"use client"

import { useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SCHOOLS_FINAL_CTA, SCHOOLS_FORM } from "@/content/schools"
import { FOOTER_NAP } from "@/content/home"

type FormState = {
  fullName: string
  schoolName: string
  email: string
  phone: string
  message: string
}

type Status = "idle" | "submitting" | "success" | "error"

const EMPTY_FORM: FormState = {
  fullName: "",
  schoolName: "",
  email: "",
  phone: "",
  message: "",
}

export default function SchoolsEnquiryCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState<FormState>(EMPTY_FORM)
  const [status, setStatus] = useState<Status>("idle")
  const [focusedField, setFocusedField] = useState<keyof FormState | null>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        const items = sectionRef.current?.querySelectorAll(".schools-enquiry-item") ?? []
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 32,
          duration: prefersReduced ? 0.01 : 0.8,
          ease: "power2.out",
          stagger: prefersReduced ? 0 : 0.12,
        })
      },
    })
  }, { scope: sectionRef })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("submitting")

    try {
      const res = await fetch("/api/school-enquiry", {
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
  const whatsappHref = `https://wa.me/${FOOTER_NAP.whatsappNumber}?text=${encodeURIComponent(FOOTER_NAP.whatsappMessage)}`

  const fieldLabelStyle = {
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
    fontSize: "14px",
    padding: "4px 2px 8px",
    color: "#111",
    outline: "none",
  })

  return (
    <section
      ref={sectionRef}
      className="mx-auto px-6 py-12 lg:px-[88px] lg:py-[74px]"
      style={{
        backgroundColor: "var(--color-white)",
        borderTop: "4px solid var(--color-academy-green)",
        maxWidth: "1440px",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 lg:gap-x-[108px] items-start">
        <div>
          <h2
            className="schools-enquiry-item"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "44px",
              lineHeight: 1.02,
              textTransform: "uppercase",
              marginBottom: "34px",
            }}
          >
            <span className="block" style={{ color: "var(--color-black)" }}>
              {SCHOOLS_FINAL_CTA.headingBlack}
            </span>
            <span className="block" style={{ color: "var(--color-academy-green)" }}>
              {SCHOOLS_FINAL_CTA.headingGreen}
            </span>
          </h2>

          <p
            className="schools-enquiry-item"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              lineHeight: 1.55,
              color: "rgba(0,0,0,0.68)",
              maxWidth: "389px",
              marginBottom: "35px",
            }}
          >
            {SCHOOLS_FINAL_CTA.body}
          </p>

          <div className="schools-enquiry-item flex flex-wrap items-center" style={{ gap: "12px" }}>
            <a
              href="#school-enquiry"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "12px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "var(--color-white)",
                backgroundColor: "var(--color-academy-green)",
                padding: "13px 22px",
                borderRadius: "8px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {SCHOOLS_FINAL_CTA.ctaPrimary}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "12px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "var(--color-near-black)",
                backgroundColor: "transparent",
                border: "1.5px solid rgba(0,0,0,0.25)",
                padding: "11.5px 20px",
                borderRadius: "8px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                justifyContent: "center",
              }}
            >
              💬 {SCHOOLS_FINAL_CTA.ctaSecondary}
            </a>
          </div>
        </div>

        <div id="school-enquiry" className="schools-enquiry-item">
          {status === "success" ? (
            <p
              role="status"
              style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--color-black)" }}
            >
              {SCHOOLS_FORM.successMessage}
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "24px 32px" }}>
                <div>
                  <label htmlFor="fullName" style={fieldLabelStyle}>
                    {SCHOOLS_FORM.fields.fullName}*
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("fullName")}
                    onBlur={() => setFocusedField(null)}
                    style={getFieldStyle("fullName")}
                  />
                </div>

                <div>
                  <label htmlFor="schoolName" style={fieldLabelStyle}>
                    {SCHOOLS_FORM.fields.schoolName}*
                  </label>
                  <input
                    id="schoolName"
                    name="schoolName"
                    type="text"
                    required
                    value={formData.schoolName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("schoolName")}
                    onBlur={() => setFocusedField(null)}
                    style={getFieldStyle("schoolName")}
                  />
                </div>

                <div>
                  <label htmlFor="email" style={fieldLabelStyle}>
                    {SCHOOLS_FORM.fields.email}*
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
                  <label htmlFor="phone" style={fieldLabelStyle}>
                    {SCHOOLS_FORM.fields.phone}*
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
                  <label htmlFor="message" style={fieldLabelStyle}>
                    {SCHOOLS_FORM.fields.message}*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={2}
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
                  style={{ fontFamily: "var(--font-body)", color: "var(--color-black)", marginTop: "16px" }}
                >
                  {SCHOOLS_FORM.errorMessage}
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
                {isSubmitting ? SCHOOLS_FORM.submittingLabel : "Send Message →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
