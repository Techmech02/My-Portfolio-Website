"use client";

import { useState } from "react";
import content from "@/data/content.json";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import { sanitizeText, validateEmail } from "@/utils/security";
import styles from "./Contact.module.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", honeypot: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check (anti-spam)
    if (form.honeypot) {
      setStatus("success"); // Fail silently to confuse bots
      return;
    }

    // Validation
    const validationErrors = {};
    const sanitizedName = sanitizeText(form.name, 100);
    const sanitizedEmail = form.email.trim();
    const sanitizedSubject = sanitizeText(form.subject, 100);
    const sanitizedMessage = sanitizeText(form.message, 2000);

    if (!sanitizedName) validationErrors.name = "Name is required.";
    if (!sanitizedEmail) {
      validationErrors.email = "Email is required.";
    } else if (!validateEmail(sanitizedEmail)) {
      validationErrors.email = "Please enter a valid email address.";
    }
    if (!sanitizedSubject) validationErrors.subject = "Subject is required.";
    if (!sanitizedMessage) validationErrors.message = "Message is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sanitizedName,
          email: sanitizedEmail,
          subject: sanitizedSubject,
          message: sanitizedMessage,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "", honeypot: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to deliver message. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error. Please verify your connection and try again.");
    }
  };

  return (
    <section className={styles.contact} id="contact">
      <div className="container">
        <SectionHeading
          title="Get In Touch"
          subtitle="Contact"
          align="left"
        />

        <div className={styles.grid}>
          {/* Left Column: Direct Info & Social Link Icons */}
          <div className={styles.leftCol}>
            <FadeIn direction="up" delay={0.1}>
              <h3 className={styles.title}>Let&apos;s Build Something Intelligent</h3>
              <p className={styles.desc}>
                If you are looking to hire an AI/ML developer who can engineer predictive
                models, optimize AWS cloud expenditure, or build adaptive systems, get in touch.
              </p>

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Email:</span>
                <a href={`mailto:${content.contactEmail}`} className={styles.infoLink}>
                  {content.contactEmail}
                </a>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Location:</span>
                <span className={styles.infoValue}>{content.location}</span>
              </div>
              {content.phone && (
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Phone:</span>
                  <a href={`tel:${content.phone}`} className={styles.infoLink}>
                    {content.phone}
                  </a>
                </div>
              )}
            </div>

            <div className={styles.socials}>
              <a
                href={content.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="GitHub Profile"
              >
                GitHub
              </a>
              <a
                href={content.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="LinkedIn Profile"
              >
                LinkedIn
              </a>
            </div>
            
            <div className={styles.watermark} aria-hidden="true">
              HIRE ME
            </div>
          </FadeIn>
        </div>

        {/* Right Column: Contact form Card */}
        <div className={styles.rightCol}>
          <FadeIn direction="up" delay={0.2}>
            <GlassCard hoverEffect={false} className={styles.formCard}>
              {status === "success" ? (
                <div className={styles.successWrapper} role="alert">
                  <div className={styles.successIcon}>✓</div>
                  <h3 className={styles.successTitle}>Message Sent</h3>
                  <p className={styles.successText}>
                    Thank you. Sagar will reply within 24 hours.
                  </p>
                  <Button onClick={() => setStatus("idle")} variant="secondary" size="sm">
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  {/* Honeypot field (hidden) */}
                  <div className={styles.honeypot} aria-hidden="true">
                    <label htmlFor="honeypot">Leave this blank</label>
                    <input
                      type="text"
                      id="honeypot"
                      name="honeypot"
                      value={form.honeypot}
                      onChange={handleChange}
                      tabIndex="-1"
                      autoComplete="off"
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="name" className={styles.label}>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                      disabled={status === "loading"}
                      required
                    />
                    {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                      disabled={status === "loading"}
                      required
                    />
                    {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="subject" className={styles.label}>
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.subject ? styles.inputError : ""}`}
                      disabled={status === "loading"}
                      required
                    />
                    {errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="message" className={styles.label}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows="5"
                      className={`${styles.input} ${styles.textarea} ${
                        errors.message ? styles.inputError : ""
                      }`}
                      disabled={status === "loading"}
                      required
                    />
                    {errors.message && <span className={styles.errorText}>{errors.message}</span>}
                  </div>

                  {status === "error" && (
                    <div className={styles.formError} role="alert">
                      {errorMessage}
                    </div>
                  )}

                  <div className={styles.submitWrapper}>
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={status === "loading"}
                      className={styles.submitBtn}
                    >
                      {status === "loading" ? "Delivering..." : "Transmit Message"}
                    </Button>
                  </div>
                </form>
              )}
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </div>
  </section>
  );
}
