"use client"

import { useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SCHOOLS_FORM } from "@/content/schools"

type FormState = {
  schoolName: string
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
  schoolName: "",
  contactName: "",
  jobRole: "",
  email: "",
  phone: "",
  location: "",
  interestedIn: "",
  message: "",
}

export default function SchoolEnquiryForm() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState<FormState>(EMPTY_FORM)
  const [status, setStatus] = useState<Status>("idle")

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
    <section
      ref={sectionRef}
      id="school-enquiry"
      className="px-6"
      style={{
        backgroundColor: "var(--color-black)",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "720px" }}>
        {status === "success" ? (
          <p
            role="status"
            className="enquiry-item text-lg text-center"
            style={{ fontFamily: "var(--font-body)", color: "var(--color-white)" }}
          >
            {SCHOOLS_FORM.successMessage}
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div className="enquiry-item grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="schoolName" className="uppercase" style={labelStyle}>
                  {SCHOOLS_FORM.fields.schoolName}
                </label>
                <input
                  id="schoolName"
                  name="schoolName"
                  type="text"
                  required
                  value={formData.schoolName}
                  onChange={handleChange}
                  className="rounded-lg px-4 py-3 text-base"
                  style={inputStyle}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contactName" className="uppercase" style={labelStyle}>
                  {SCHOOLS_FORM.fields.contactName}
                </label>
                <input
                  id="contactName"
                  name="contactName"
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={handleChange}
                  className="rounded-lg px-4 py-3 text-base"
                  style={inputStyle}
                />
              </div>
            </div>

            <div className="enquiry-item grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="jobRole" className="uppercase" style={labelStyle}>
                  {SCHOOLS_FORM.fields.jobRole}
                </label>
                <input
                  id="jobRole"
                  name="jobRole"
                  type="text"
                  required
                  value={formData.jobRole}
                  onChange={handleChange}
                  className="rounded-lg px-4 py-3 text-base"
                  style={inputStyle}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="location" className="uppercase" style={labelStyle}>
                  {SCHOOLS_FORM.fields.location}
                </label>
                <select
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="rounded-lg px-4 py-3 text-base"
                  style={inputStyle}
                >
                  <option value="" disabled>
                    {SCHOOLS_FORM.fields.location}
                  </option>
                  {SCHOOLS_FORM.locationOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="enquiry-item grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="uppercase" style={labelStyle}>
                  {SCHOOLS_FORM.fields.email}
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
                  {SCHOOLS_FORM.fields.phone}
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
            </div>

            <div className="enquiry-item flex flex-col gap-2">
              <label htmlFor="interestedIn" className="uppercase" style={labelStyle}>
                {SCHOOLS_FORM.fields.interestedIn}
              </label>
              <select
                id="interestedIn"
                name="interestedIn"
                required
                value={formData.interestedIn}
                onChange={handleChange}
                className="rounded-lg px-4 py-3 text-base"
                style={inputStyle}
              >
                <option value="" disabled>
                  {SCHOOLS_FORM.fields.interestedIn}
                </option>
                {SCHOOLS_FORM.interestedInOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="enquiry-item flex flex-col gap-2">
              <label htmlFor="message" className="uppercase" style={labelStyle}>
                {SCHOOLS_FORM.fields.message}
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
              <p
                role="alert"
                className="enquiry-item text-sm"
                style={{ fontFamily: "var(--font-body)", color: "var(--color-white)" }}
              >
                {SCHOOLS_FORM.errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="enquiry-item rounded-full px-8 py-4 text-base w-full sm:w-auto text-center"
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
              {isSubmitting ? SCHOOLS_FORM.submittingLabel : SCHOOLS_FORM.submitLabel}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
