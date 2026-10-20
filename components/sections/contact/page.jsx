"use client";

import { useState } from "react";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export default function GetInTouch() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Update form values
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Open WhatsApp with the contact form details
  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace this with your WhatsApp number.
    // Include the country code without + or spaces.
    const phoneNumber = "919633053999";

    const whatsappMessage = `
Hello TrustPip!

New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
    `.trim();

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    // Open WhatsApp in a new tab
    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="contact"
      className=" overflow-hidden bg-[#0b0b0b] px-5 py-16 text-white mt-9 -mb-9 sm:px-8 sm:py-20 lg:py-24"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 -z-10 h-96 w-96 rounded-full bg-[#86c923]/[0.07] blur-[130px]"
      />

      {/* Top border */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-px w-[85%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#86c923]/60 to-transparent"
      />

      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center lg:text-left">

          <h2 className="font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Interested in exploring our courses?
            <span className="text-[#86c923]">
              {" "}Let&apos;s talk.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/55 lg:mx-0 sm:text-base">
            Reach out to our team to discuss your learning goals,
            explore our courses, and learn more about TrustPip.
          </p>
        </div>

        {/* Main content */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          {/* Contact form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name and email */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-medium text-white/80"
                  >
                    Your Name
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    autoComplete="name"
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#86c923] focus:ring-1 focus:ring-[#86c923]/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-medium text-white/80"
                  >
                    Email Address
                  </label>

                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#86c923] focus:ring-1 focus:ring-[#86c923]/30"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-medium text-white/80"
                >
                  Your Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  rows={5}
                  required
                  className="w-full resize-y rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#86c923] focus:ring-1 focus:ring-[#86c923]/30"
                />
              </div>

              {/* WhatsApp submit button */}
              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#6b9f2b] px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-[#86c923] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#86c923] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0b] sm:w-auto sm:min-w-[220px]"
              >
                Contact Us

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </form>
          </div>

          {/* Contact information */}
          <div className="flex flex-col justify-center">
            <div className="mb-7">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#86c923]">
                Contact Information
              </p>

              <h3 className="mt-3 font-serif text-2xl font-bold sm:text-3xl">
                We&apos;re here to help.
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/50">
                Have questions about our courses? Get in touch with
                our team.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <a
                href="mailto:info.trustpip@gmail.com"
                className="group flex items-start gap-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#86c923]/20 bg-[#86c923]/[0.08] text-[#86c923] transition group-hover:bg-[#86c923] group-hover:text-black">
                  <Mail size={19} />
                </span>

                <span className="min-w-0">
                  <span className="block text-xs text-white/40">
                    Email Us
                  </span>

                  <span className="mt-1 block break-all text-sm font-medium text-white transition group-hover:text-[#86c923]">
                    info.trustpip@gmail.com
                  </span>
                </span>
              </a>

              {/* Phone */}
              <a
                href="tel:+919633053999"
                className="group flex items-start gap-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#86c923]/20 bg-[#86c923]/[0.08] text-[#86c923] transition group-hover:bg-[#86c923] group-hover:text-black">
                  <Phone size={19} />
                </span>

                <span>
                  <span className="block text-xs text-white/40">
                    Call Us
                  </span>

                  <span className="mt-1 block text-sm font-medium text-white transition group-hover:text-[#86c923]">
                    +91 96330 53999
                  </span>
                </span>
              </a>

              {/* Location */}
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#86c923]/20 bg-[#86c923]/[0.08] text-[#86c923]">
                  <MapPin size={19} />
                </span>

                <span>
                  <span className="block text-xs text-white/40">
                    Our Location
                  </span>

                  <span className="mt-1 block text-sm font-medium leading-6 text-white">
                    Panniyankara, Kozhikode,
                    <br />
                    Kerala 673003
                  </span>
                </span>
              </div>
            </div>

            {/* Decorative line */}
            <div className="mt-8 h-px w-full bg-gradient-to-r from-[#86c923]/50 via-white/10 to-transparent" />
          </div>
        </div>

        {/* Risk warning */}
        <div className="mt-16 border-t border-white/[0.08] pt-8 text-center sm:mt-20">
          <h4 className="text-sm font-bold text-white">
            Risk Warning
          </h4>

          <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-white/45">
            Trading financial products on margin carries a high degree
            of risk and is not suitable for all investors. Losses can
            exceed the initial investment. Please ensure you fully
            understand the risks involved and take appropriate care
            to manage your risk.
          </p>
        </div>
      </div>

      {/* Bottom border */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 h-px w-[85%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#86c923]/40 to-transparent"
      />
    </section>
  );
}