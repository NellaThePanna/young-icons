"use client"

import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from "react"
import { NURSERY_FORM } from "@/content/nurseries-about"

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
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<FormState>(EMPTY_FORM)
  const [status, setStatus] = useState<Status>("idle")
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const closeModal = () => {
    setIsOpen(false)
    setStatus("idle")
    window.setTimeout(() => openButtonRef.current?.focus(), 0)
  }

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.setTimeout(() => closeButtonRef.current?.focus(), 0)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        closeModal()
        return
      }

      if (event.key !== "Tab" || !modalRef.current) return
      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href]'
        )
      )
      if (!focusable.length) return

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
    }
  }, [isOpen])

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("submitting")

    try {
      const response = await fetch("/api/nursery-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error("submit failed")

      setStatus("success")
      setFormData(EMPTY_FORM)
    } catch {
      setStatus("error")
    }
  }

  const fieldStyle = {
    width: "100%",
    border: 0,
    borderBottom: "1px solid #bcb9b0",
    background: "transparent",
    fontFamily: "var(--font-body)",
    color: "var(--color-black)",
    fontSize: "0.95rem",
    outline: "none",
    padding: "0.55rem 0",
  }

  return (
    <section id="enquiry" className="px-5 pt-9 pb-6 text-center sm:px-8 sm:pt-10 sm:pb-7 lg:px-12 lg:pt-12 lg:pb-8" style={{ backgroundColor: "#f4f2ec" }}>
      <div className="mx-auto" style={{ maxWidth: "980px" }}>
        <p style={{ fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-bold)", fontSize: "0.72rem", letterSpacing: "0.14em", color: "var(--color-black)", margin: "0 0 1rem" }}>
          05 — LET&apos;S WORK TOGETHER
        </p>
        <h2
          style={{
            fontFamily: "var(--font-anton)",
            fontWeight: 400,
            fontSize: "clamp(3rem, 6.1vw, 6rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          <span className="block" style={{ color: "var(--color-black)" }}>LET&apos;S GET YOUR</span>
          <span className="block" style={{ color: "var(--color-academy-green)" }}>NURSERY MOVING.</span>
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", letterSpacing: "0.14em", color: "var(--color-black)", margin: "1rem 0 0.6rem" }}>
          READY TO WORK WITH US?
        </p>
        <button
          ref={openButtonRef}
          type="button"
          onClick={() => setIsOpen(true)}
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47]"
          style={{
            background: "transparent",
            border: 0,
            borderBottom: "1px solid var(--color-academy-green)",
            color: "var(--color-academy-green)",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
            fontWeight: "var(--font-weight-medium)",
            letterSpacing: "0.05em",
            padding: "0 0 0.3rem",
          }}
        >
          START A CONVERSATION →
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 sm:px-8"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal()
          }}
          style={{ backgroundColor: "rgba(11, 11, 11, 0.58)" }}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="nursery-enquiry-title"
            className="relative min-h-0 w-full overflow-y-auto rounded-2xl p-6 sm:p-9 lg:p-10"
            style={{ maxWidth: "720px", maxHeight: "85vh", backgroundColor: "#f4f2ec" }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeModal}
              aria-label="Close enquiry form"
              className="absolute right-5 top-5 text-2xl leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47] sm:right-6 sm:top-6"
              style={{ border: 0, background: "transparent", color: "var(--color-black)", cursor: "pointer" }}
            >
              ×
            </button>

            <h3 id="nursery-enquiry-title" style={{ fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-bold)", fontSize: "1.4rem", letterSpacing: "-0.01em", color: "var(--color-black)", margin: "0 0 0.4rem" }}>
              START A CONVERSATION
            </h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--color-nursery-stone)", margin: "0 0 2rem" }}>
              Fill in your details and we&apos;ll be in touch.
            </p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2" noValidate>
              <Field label={NURSERY_FORM.fields.nurseryName} name="nurseryName" value={formData.nurseryName} onChange={handleChange} style={fieldStyle} required />
              <Field label={NURSERY_FORM.fields.contactName} name="contactName" value={formData.contactName} onChange={handleChange} style={fieldStyle} required />
              <Field label={NURSERY_FORM.fields.jobRole} name="jobRole" value={formData.jobRole} onChange={handleChange} style={fieldStyle} required />
              <SelectField label={NURSERY_FORM.fields.location} name="location" value={formData.location} onChange={handleChange} options={NURSERY_FORM.locationOptions} style={fieldStyle} />
              <Field label={NURSERY_FORM.fields.email} name="email" type="email" value={formData.email} onChange={handleChange} style={fieldStyle} required />
              <Field label={NURSERY_FORM.fields.phone} name="phone" type="tel" value={formData.phone} onChange={handleChange} style={fieldStyle} required />
              <SelectField label={NURSERY_FORM.fields.interestedIn} name="interestedIn" value={formData.interestedIn} onChange={handleChange} options={NURSERY_FORM.interestedInOptions} style={fieldStyle} />
              <label className="sm:col-span-2" style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.73rem", color: "var(--color-nursery-stone)" }}>
                {NURSERY_FORM.fields.message}
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  style={{
                    width: "100%",
                    border: "1px solid #bcb9b0",
                    borderRadius: "6px",
                    background: "transparent",
                    fontFamily: "var(--font-body)",
                    color: "var(--color-black)",
                    fontSize: "0.95rem",
                    outline: "none",
                    resize: "vertical",
                    padding: "0.6rem 0.7rem",
                    marginTop: "0.3rem",
                  }}
                />
              </label>

              <div className="sm:col-span-2 mt-3 flex flex-col items-stretch gap-4">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="rounded-md text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a7a47]"
                  style={{ backgroundColor: "var(--color-academy-green)", border: 0, color: "var(--color-white)", cursor: status === "submitting" ? "wait" : "pointer", fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-medium)", fontSize: "0.9rem", letterSpacing: "0.08em", padding: "1rem 1.25rem" }}
                >
                  {status === "submitting" ? NURSERY_FORM.submittingLabel : NURSERY_FORM.submitLabel}
                </button>
                {status === "success" && <p role="status" style={{ fontFamily: "var(--font-body)", color: "var(--color-nursery-stone)", margin: 0 }}>Submission received, but enquiry delivery is not configured yet.</p>}
                {status === "error" && <p role="alert" style={{ fontFamily: "var(--font-body)", color: "#9c2a2a", margin: 0 }}>Something went wrong. Please try again.</p>}
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

function Field({ label, name, value, onChange, style, type = "text", required = false }: {
  label: string
  name: keyof FormState
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  style: React.CSSProperties
  type?: string
  required?: boolean
}) {
  return (
    <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.73rem", color: "var(--color-nursery-stone)" }}>
      {label}
      <input name={name} type={type} value={value} onChange={onChange} required={required} style={{ ...style, marginTop: "0.3rem" }} />
    </label>
  )
}

function SelectField({ label, name, value, onChange, options, style }: {
  label: string
  name: "location" | "interestedIn"
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  options: readonly string[]
  style: React.CSSProperties
}) {
  return (
    <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.73rem", color: "var(--color-nursery-stone)" }}>
      {label}
      <select name={name} value={value} onChange={onChange} required style={{ ...style, marginTop: "0.3rem" }}>
        <option value="">Select</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  )
}
