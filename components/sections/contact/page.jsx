"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";

// ─── Config ─────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "919633053999"; // no +, no spaces
const CONTACT_EMAIL = "info.trustpip@gmail.com";
const CONTACT_PHONE_DISPLAY = "+91 96330 53999";
const CONTACT_PHONE_TEL = "+919633053999";

const EMPTY_FORM = { name: "", email: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (!values.message.trim())
    errors.message = "Please tell us a little about your query.";
  return errors;
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function GetInTouch() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (submitted) setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const text = [
      "Hello TrustPip!",
      "",
      "New contact request",
      "",
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      "",
      "Message:",
      values.message.trim(),
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );

    setValues(EMPTY_FORM);
    setErrors({});
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      // FIXED: Added `pt-24 md:pt-32` to clear the floating navbar. 
      // FIXED: Removed `mt-9 -mb-9` and added `w-full` to prevent layout shifts.
      className="relative w-full overflow-hidden bg-[#0b0b0b] px-4 py-16 pt-24 text-white sm:px-6 md:px-8 md:pt-32 lg:py-24"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 -z-10 h-96 w-96 rounded-full bg-[#86c923]/[0.07] blur-[130px]"
      />

      {/* Top rule */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-px w-[85%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#86c923]/60 to-transparent"
      />

      {/* FIXED: Replaced `max-w-5xl` with a wider standard `max-w-6xl` and ensured `mx-auto` centers it properly */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* ── Heading ──────────────────────────────────────────────────── */}
        <header className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
          <h2
            id="contact-heading"
            className="font-serif text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl"
          >
            Interested in exploring our courses?{" "}
            <span className="text-[#86c923]">Let&apos;s talk.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/55 sm:mt-5 sm:text-base sm:leading-7 lg:mx-0">
            Reach out to our team to discuss your learning goals, explore our
            courses, and learn more about TrustPip.
          </p>
        </header>

        {/* ── Grid ─────────────────────────────────────────────────────── */}
        <div className="mt-9 grid grid-cols-1 gap-10 sm:mt-12 sm:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16">
          {/* Form card */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6 md:p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                <Field
                  id="contact-name"
                  name="name"
                  label="Your Name"
                  placeholder="Enter your name"
                  value={values.name}
                  error={errors.name}
                  autoComplete="name"
                  onChange={handleChange}
                />
                <Field
                  id="contact-email"
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="you@example.com"
                  value={values.email}
                  error={errors.email}
                  autoComplete="email"
                  onChange={handleChange}
                />
              </div>

              <Field
                id="contact-message"
                name="message"
                label="Your Message"
                placeholder="Tell us how we can help..."
                value={values.message}
                error={errors.message}
                multiline
                onChange={handleChange}
              />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#6b9f2b] px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-[#86c923] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#86c923] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0b] sm:w-auto sm:min-w-[200px]"
                >
                  Send via WhatsApp
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                {submitted && (
                  <p
                    role="status"
                    className="inline-flex items-center gap-2 text-sm text-[#86c923] sm:order-last"
                  >
                    <CheckCircle2 size={16} />
                    WhatsApp opened — press send to reach us.
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Contact info */}
          <div className="flex min-w-0 flex-col justify-center">
            <div className="mb-7">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#86c923]">
                Contact Information
              </p>
              <h3 className="mt-3 font-serif text-2xl font-bold sm:text-3xl">
                We&apos;re here to help.
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/50">
                Have questions about our courses? Get in touch with our team.
              </p>
            </div>

            <ul className="space-y-5 sm:space-y-6">
              <InfoItem
                icon={<Mail size={19} />}
                label="Email Us"
                value={CONTACT_EMAIL}
                href={`mailto:${CONTACT_EMAIL}`}
                breakAll
              />
              <InfoItem
                icon={<Phone size={19} />}
                label="Call Us"
                value={CONTACT_PHONE_DISPLAY}
                href={`tel:${CONTACT_PHONE_TEL}`}
              />
              <InfoItem
                icon={<MapPin size={19} />}
                label="Our Location"
                value={
                  <>
                    Panniyankara, Kozhikode,
                    <br />
                    Kerala 673003
                  </>
                }
              />
            </ul>

            <div className="mt-8 h-px w-full bg-gradient-to-r from-[#86c923]/50 via-white/10 to-transparent" />
          </div>
        </div>

        {/* ── Risk warning ─────────────────────────────────────────────── */}
        <div className="mt-12 border-t border-white/[0.08] pt-7 text-center sm:mt-16 sm:pt-8 lg:mt-20">
          <h4 className="text-sm font-bold text-white">Risk Warning</h4>
          <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-white/45">
            Trading financial products on margin carries a high degree of risk
            and is not suitable for all investors. Losses can exceed the initial
            investment. Please ensure you fully understand the risks involved and
            take appropriate care to manage your risk.
          </p>
        </div>
      </div>

      {/* Bottom rule */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 h-px w-[85%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#86c923]/40 to-transparent"
      />
    </section>
  );
}

// ─── Subcomponents ──────────────────────────────────────────────────────────
function Field({
  id,
  name,
  label,
  placeholder,
  value,
  error,
  type = "text",
  autoComplete,
  multiline = false,
  onChange,
}) {
  const baseInput =
    "block w-full min-w-0 rounded-lg border bg-white/[0.04] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:ring-1 sm:px-4 sm:py-3.5";
  const stateInput = error
    ? "border-red-400/60 focus:border-red-400 focus:ring-red-400/30"
    : "border-white/10 focus:border-[#86c923] focus:ring-[#86c923]/30";

  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-white/80"
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={5}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`${baseInput} ${stateInput} resize-y`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`${baseInput} ${stateInput}`}
        />
      )}

      {error && (
        <p id={describedBy} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function InfoItem({ icon, label, value, href, breakAll }) {
  const content = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#86c923]/20 bg-[#86c923]/[0.08] text-[#86c923] transition group-hover:bg-[#86c923] group-hover:text-black">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs text-white/40">{label}</span>
        <span
          className={`mt-1 block text-sm font-medium text-white ${
            href ? "transition group-hover:text-[#86c923]" : ""
          } ${breakAll ? "break-all" : ""}`}
        >
          {value}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <li>
        <a href={href} className="group flex items-start gap-4">
          {content}
        </a>
      </li>
    );
  }

  return <li className="flex items-start gap-4">{content}</li>;
}