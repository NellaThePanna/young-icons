"use client"

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { SCHOOLS_FORM } from "@/content/schools"
import { SCHOOLS_EDITORIAL_CTA } from "@/content/schools-activities"

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
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<FormState>(EMPTY_FORM)
  const [status, setStatus] = useState<Status>("idle")
  const [focusedField, setFocusedField] = useState<keyof FormState | null>(null)
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const closeModal = () => setIsOpen(false)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    const returnFocusTo = openButtonRef.current
    document.body.style.overflow = "hidden"
    window.setTimeout(() => closeButtonRef.current?.focus(), 0)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        closeModal()
        return
      }

      if (event.key !== "Tab" || !modalRef.current) return
      const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
      ))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", onKeyDown)
      returnFocusTo?.focus()
    }
  }, [isOpen])

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("submitting")

    try {
      const payload = {
        ...formData,
        ...(formData.message.trim() ? {} : { message: undefined }),
      }
      const response = await fetch("/api/school-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error("submit failed")
      setStatus("success")
      setFormData(EMPTY_FORM)
    } catch {
      setStatus("error")
    }
  }

  const fieldLabelStyle = {
    display: "block",
    fontFamily: "var(--font-body)",
    fontSize: "0.74rem",
    letterSpacing: "0.05em",
    color: "var(--color-nursery-stone)",
  }

  const fieldStyle = (name: keyof FormState) => ({
    width: "100%",
    border: 0,
    borderBottom: `1px solid ${focusedField === name ? "var(--color-academy-green)" : "#c8c5bc"}`,
    background: "transparent",
    fontFamily: "var(--font-body)",
    fontSize: "1rem",
    color: "var(--color-black)",
    outline: "none",
    padding: "0.55rem 0",
  })

  return (
    <section className="px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14" style={{ backgroundColor: "var(--color-warm-off-white)" }}>
      <div className="mx-auto" style={{ maxWidth: "1320px" }}>
        <p style={{ fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-medium)", fontSize: "0.76rem", letterSpacing: "0.12em", color: "var(--color-academy-green)", margin: "0 0 1rem" }}>
          {SCHOOLS_EDITORIAL_CTA.label}
        </p>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center lg:gap-12">
          <h2 style={{ fontFamily: "var(--font-holiday-display), Impact, sans-serif", fontWeight: 400, fontSize: "clamp(3.1rem, calc(6.4vw - 12px), 5.7rem)", lineHeight: 0.91, letterSpacing: "-0.03em", color: "var(--color-black)", margin: 0 }}>
            <span className="block">{SCHOOLS_EDITORIAL_CTA.headingBlack}</span>
            <span className="block" style={{ color: "var(--color-academy-green)", marginTop: "0.035em" }}>{SCHOOLS_EDITORIAL_CTA.headingGreen}</span>
          </h2>
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-medium)", fontSize: "0.76rem", letterSpacing: "0.13em", color: "var(--color-black)", margin: "0 0 0.8rem" }}>
              {SCHOOLS_EDITORIAL_CTA.prompt}
            </p>
            <button
              ref={openButtonRef}
              type="button"
              onClick={() => { setStatus("idle"); setIsOpen(true) }}
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47]"
              style={{ border: 0, borderBottom: "1px solid var(--color-academy-green)", background: "transparent", color: "var(--color-academy-green)", cursor: "pointer", fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-medium)", fontSize: "0.95rem", letterSpacing: "0.07em", padding: "0 0 0.35rem" }}
            >
              {SCHOOLS_EDITORIAL_CTA.action}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 sm:px-8"
          role="presentation"
          onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal() }}
          style={{ backgroundColor: "rgba(12, 14, 12, 0.62)" }}
        >
          <div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="school-enquiry-title" className="relative max-h-full w-full overflow-y-auto p-6 sm:p-10 lg:p-12" style={{ maxWidth: "900px", backgroundColor: "var(--color-warm-off-white)" }}>
            <button ref={closeButtonRef} type="button" onClick={closeModal} aria-label="Close school enquiry form" className="absolute right-5 top-5 text-2xl leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47] sm:right-8 sm:top-8" style={{ border: 0, background: "transparent", color: "var(--color-academy-green)", cursor: "pointer" }}>×</button>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", letterSpacing: "0.14em", color: "var(--color-academy-green)", margin: "0 0 1.25rem" }}>SCHOOL ENQUIRY</p>
            <h3 id="school-enquiry-title" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 5.4rem)", lineHeight: 0.84, letterSpacing: "-0.03em", color: "var(--color-black)", margin: "0 0 2.5rem" }}>START A CONVERSATION.</h3>

            {status === "success" ? (
              <p role="status" style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.5, color: "var(--color-black)", margin: 0 }}>
                Submission received, but enquiry delivery is not configured yet.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2" noValidate>
                <Field label={SCHOOLS_FORM.fields.fullName} name="fullName" value={formData.fullName} onChange={handleChange} onFocus={() => setFocusedField("fullName")} onBlur={() => setFocusedField(null)} style={fieldStyle("fullName")} required />
                <Field label={SCHOOLS_FORM.fields.schoolName} name="schoolName" value={formData.schoolName} onChange={handleChange} onFocus={() => setFocusedField("schoolName")} onBlur={() => setFocusedField(null)} style={fieldStyle("schoolName")} required />
                <Field label={SCHOOLS_FORM.fields.email} name="email" type="email" value={formData.email} onChange={handleChange} onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)} style={fieldStyle("email")} required />
                <Field label={SCHOOLS_FORM.fields.phone} name="phone" type="tel" value={formData.phone} onChange={handleChange} onFocus={() => setFocusedField("phone")} onBlur={() => setFocusedField(null)} style={fieldStyle("phone")} required />
                <label className="sm:col-span-2" style={fieldLabelStyle}>
                  {SCHOOLS_FORM.fields.message}
                  <textarea name="message" value={formData.message} onChange={handleChange} onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)} rows={3} style={{ ...fieldStyle("message"), resize: "vertical", marginTop: "0.3rem" }} />
                </label>
                <div className="sm:col-span-2 mt-2 flex flex-col items-start gap-4">
                  <button type="submit" disabled={status === "submitting"} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47]" style={{ backgroundColor: "var(--color-academy-green)", border: 0, color: "var(--color-white)", cursor: status === "submitting" ? "wait" : "pointer", fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-medium)", fontSize: "0.85rem", letterSpacing: "0.08em", padding: "0.95rem 1.25rem" }}>
                    {status === "submitting" ? SCHOOLS_FORM.submittingLabel : SCHOOLS_FORM.submitLabel}
                  </button>
                  {status === "error" && <p role="alert" style={{ fontFamily: "var(--font-body)", color: "#9c2a2a", margin: 0 }}>{SCHOOLS_FORM.errorMessage}</p>}
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

function Field({ label, name, value, onChange, onFocus, onBlur, style, type = "text", required = false }: {
  label: string
  name: keyof FormState
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onFocus: () => void
  onBlur: () => void
  style: React.CSSProperties
  type?: string
  required?: boolean
}) {
  return (
    <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.74rem", letterSpacing: "0.05em", color: "var(--color-nursery-stone)" }}>
      {label}{required ? "*" : ""}
      <input name={name} type={type} value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur} required={required} style={{ ...style, marginTop: "0.3rem" }} />
    </label>
  )
}
