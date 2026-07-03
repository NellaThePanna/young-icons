"use client"

import { useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

interface ContactFormProps {
  fields: {
    name: string
    email: string
    phone: string
    programme: string
    childAge: string
    message: string
  }
  programmeOptions: readonly string[]
  submitLabel: string
  submittingLabel: string
  successMessage: string
  errorMessage: string
  bg?: "black" | "off-white"
}

type FormState = {
  name: string
  email: string
  phone: string
  programme: string
  childAge: string
  message: string
}

type Status = "idle" | "submitting" | "success" | "error"

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  programme: "",
  childAge: "",
  message: "",
}

export default function ContactForm({
  fields,
  programmeOptions,
  submitLabel,
  submittingLabel,
  successMessage,
  errorMessage,
  bg = "off-white",
}: ContactFormProps) {
  const containerRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState<FormState>(EMPTY_FORM)
  const [status, setStatus] = useState<Status>("idle")

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    gsap.from(containerRef.current, {
      opacity: 0,
      y: prefersReduced ? 0 : 40,
      duration: prefersReduced ? 0.01 : 0.8,
      ease: "power2.out",
    })
  }, { scope: containerRef })

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
      const res = await fetch("/api/contact", {
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

  const isBlack = bg === "black"
  const textPrimary = isBlack ? "var(--color-white)" : "var(--color-black)"
  const textSecondary = isBlack ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.6)"
  const borderColor = isBlack ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"
  const isSubmitting = status === "submitting"

  const labelStyle = {
    fontFamily: "var(--font-body)",
    color: textSecondary,
  }

  const inputStyle = {
    fontFamily: "var(--font-body)",
    color: textPrimary,
    backgroundColor: "transparent",
    border: `1px solid ${borderColor}`,
  }

  if (status === "success") {
    return (
      <p
        role="status"
        className="text-base md:text-lg"
        style={{ fontFamily: "var(--font-body)", color: textPrimary }}
      >
        {successMessage}
      </p>
    )
  }

  return (
    <form ref={containerRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-xs tracking-widest uppercase" style={labelStyle}>
          {fields.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="rounded-lg px-4 py-3 text-base"
          style={inputStyle}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-xs tracking-widest uppercase" style={labelStyle}>
          {fields.email}
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
        <label htmlFor="phone" className="text-xs tracking-widest uppercase" style={labelStyle}>
          {fields.phone}
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
        <label htmlFor="programme" className="text-xs tracking-widest uppercase" style={labelStyle}>
          {fields.programme}
        </label>
        <select
          id="programme"
          name="programme"
          required
          value={formData.programme}
          onChange={handleChange}
          className="rounded-lg px-4 py-3 text-base"
          style={inputStyle}
        >
          <option value="" disabled>
            {fields.programme}
          </option>
          {programmeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="childAge" className="text-xs tracking-widest uppercase" style={labelStyle}>
          {fields.childAge}
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
        <label htmlFor="message" className="text-xs tracking-widest uppercase" style={labelStyle}>
          {fields.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="rounded-lg px-4 py-3 text-base"
          style={inputStyle}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm" style={{ fontFamily: "var(--font-body)", color: textPrimary }}>
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full px-8 py-4 text-base w-full sm:w-auto text-center"
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
        {isSubmitting ? submittingLabel : submitLabel}
      </button>
    </form>
  )
}
