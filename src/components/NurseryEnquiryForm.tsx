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
    fontSize: "0.75rem",
    letterSpacing: "0.1em",
    color: "rgba(0,0,0,0.5)",
  }

  const inputStyle = {
    fontFamily: "var(--font-body)",
    color: "var(--color-black)",
    backgroundColor: "var(--color-white)",
    border: "1px solid rgba(0,0,0,0.15)",
  }

  return (
    <section
      ref={sectionRef}
      id="enquiry"
      className="px-6"
      style={{
        backgroundColor: "var(--color-nursery-off-white)",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16"
        style={{ maxWidth: "1280px" }}
      >
        <div
          className="enquiry-item relative flex flex-col justify-end overflow-hidden"
          style={{ minHeight: "420px", borderRadius: "var(--radius-lg)" }}
        >
          <Image src={NURSERY_ENQUIRY_CTA.image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
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
                color: "var(--color-nursery-green)",
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
              <span className="block" style={{ color: "var(--color-white)" }}>
                {NURSERY_ENQUIRY_CTA.headingWhite}
              </span>
              <span className="block" style={{ color: "var(--color-nursery-green)" }}>
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
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="nurseryName" className="uppercase" style={labelStyle}>
                    {NURSERY_FORM.fields.nurseryName}
                  </label>
                  <input
                    id="nurseryName"
                    name="nurseryName"
                    type="text"
                    required
                    value={formData.nurseryName}
                    onChange={handleChange}
                    className="nursery-field rounded-lg px-4 py-3 text-base"
                    style={inputStyle}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contactName" className="uppercase" style={labelStyle}>
                    {NURSERY_FORM.fields.contactName}
                  </label>
                  <input
                    id="contactName"
                    name="contactName"
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={handleChange}
                    className="nursery-field rounded-lg px-4 py-3 text-base"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="jobRole" className="uppercase" style={labelStyle}>
                    {NURSERY_FORM.fields.jobRole}
                  </label>
                  <input
                    id="jobRole"
                    name="jobRole"
                    type="text"
                    required
                    value={formData.jobRole}
                    onChange={handleChange}
                    className="nursery-field rounded-lg px-4 py-3 text-base"
                    style={inputStyle}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="location" className="uppercase" style={labelStyle}>
                    {NURSERY_FORM.fields.location}
                  </label>
                  <select
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="nursery-field rounded-lg px-4 py-3 text-base"
                    style={inputStyle}
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="uppercase" style={labelStyle}>
                    {NURSERY_FORM.fields.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="nursery-field rounded-lg px-4 py-3 text-base"
                    style={inputStyle}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="uppercase" style={labelStyle}>
                    {NURSERY_FORM.fields.phone}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="nursery-field rounded-lg px-4 py-3 text-base"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="interestedIn" className="uppercase" style={labelStyle}>
                  {NURSERY_FORM.fields.interestedIn}
                </label>
                <select
                  id="interestedIn"
                  name="interestedIn"
                  required
                  value={formData.interestedIn}
                  onChange={handleChange}
                  className="nursery-field rounded-lg px-4 py-3 text-base"
                  style={inputStyle}
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

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="uppercase" style={labelStyle}>
                  {NURSERY_FORM.fields.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="nursery-field rounded-lg px-4 py-3 text-base"
                  style={inputStyle}
                />
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
                className="nursery-submit rounded-full px-8 py-4 text-base w-full sm:w-auto text-center"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--font-weight-bold)",
                  color: "var(--color-white)",
                  backgroundColor: "var(--color-nursery-green)",
                  opacity: isSubmitting ? 0.6 : 1,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  border: "none",
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
