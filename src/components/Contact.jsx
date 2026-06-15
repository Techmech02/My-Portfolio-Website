import { useState, useRef, startTransition } from "react";
import {
  validateContactForm,
  FORM_RATE_LIMIT_MS,
  LIMITS,
} from "../utils/security";
import siteContent from "../data/content.json";

export default function Contact() {
  const [fields, setFields] = useState({ name: "", email: "", message: "", website: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const lastSubmitRef = useRef(0);

  const updateField = (key, value) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = Date.now();
    if (now - lastSubmitRef.current < FORM_RATE_LIMIT_MS) {
      setErrors({ form: "Please wait a few seconds before submitting again." });
      return;
    }

    const result = validateContactForm({
      name: fields.name,
      email: fields.email,
      message: fields.message,
      honeypot: fields.website,
    });

    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setLoading(true);
    lastSubmitRef.current = now;

    try {
      // Replace with Formspree or your API endpoint when ready
      await new Promise((resolve) => setTimeout(resolve, 1200));
      startTransition(() => {
        setSuccess(true);
        setFields({ name: "", email: "", message: "", website: "" });
      });
      setTimeout(() => setSuccess(false), 6000);
    } catch {
      setErrors({ form: "Something went wrong. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  const { contactEmail, github, linkedin } = siteContent;

  return (
    <section className="section section-alt" id="contact" aria-label="Contact section">
      <div className="container">
        <div className="section-label">
          <span className="mono accent">05</span> Contact
        </div>
        <div className="contact-grid">
          <div className="contact-text">
            <h2 className="section-heading">
              Let&apos;s build
              <br />
              something.
            </h2>
            <p>
              I&apos;m open to internships, freelance projects, collaborations, or just a good
              technical conversation. If you have a real problem and want someone who&apos;ll
              actually ship — reach out.
            </p>
            <div className="contact-links">
              <a href={`mailto:${contactEmail}`} className="contact-link" aria-label="Send email">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {contactEmail}
              </a>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
                aria-label="GitHub profile (opens in new tab)"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M8 1C4.134 1 1 4.134 1 8c0 3.09 2.004 5.716 4.784 6.641.35.064.478-.152.478-.337 0-.166-.006-.606-.01-1.19-1.947.423-2.358-.94-2.358-.94-.318-.81-.777-1.025-.777-1.025-.635-.434.048-.425.048-.425.702.049 1.071.72 1.071.72.624 1.069 1.637.76 2.036.582.063-.452.244-.76.444-.935-1.554-.177-3.188-.777-3.188-3.46 0-.764.273-1.388.72-1.878-.072-.177-.312-.889.068-1.853 0 0 .587-.188 1.923.717A6.7 6.7 0 018 4.84c.594.003 1.192.08 1.75.234 1.334-.905 1.92-.717 1.92-.717.382.964.141 1.676.069 1.853.449.49.72 1.114.72 1.878 0 2.69-1.637 3.281-3.197 3.455.251.217.475.644.475 1.298 0 .936-.008 1.69-.008 1.92 0 .187.126.405.48.337C12.998 13.714 15 11.09 15 8c0-3.866-3.134-7-7-7z"
                    fill="currentColor"
                  />
                </svg>
                {github.replace("https://", "")}
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
                aria-label="LinkedIn profile (opens in new tab)"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="1" y="1" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M4 6.5v5M4 4v.5M8 11.5V9a1.5 1.5 0 013 0v2.5M8 6.5v5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                {linkedin.replace("https://", "")}
              </a>
            </div>
          </div>
          <div className="contact-form-wrap">
            <form className="contact-form" id="contact-form" noValidate onSubmit={handleSubmit}>
              <div className="form-honeypot" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={fields.website}
                  onChange={(e) => updateField("website", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Your name"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  maxLength={LIMITS.name}
                  value={fields.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className={errors.name ? "error" : ""}
                />
                {errors.name && <span className="form-error" role="alert">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="you@company.com"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  maxLength={LIMITS.email}
                  value={fields.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && <span className="form-error" role="alert">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="What are you building?"
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  maxLength={LIMITS.message}
                  value={fields.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className={errors.message ? "error" : ""}
                />
                {errors.message && <span className="form-error" role="alert">{errors.message}</span>}
              </div>
              {errors.form && (
                <div className="form-error form-error-block" role="alert">
                  {errors.form}
                </div>
              )}
              <button type="submit" className={`btn btn-primary btn-full${loading ? " loading" : ""}`} disabled={loading}>
                <span className="btn-text">Send message</span>
                <span className="btn-loading" aria-hidden="true">
                  Sending…
                </span>
              </button>
              {success && (
                <div className="form-success" role="alert" aria-live="polite">
                  ✓ Message sent. I&apos;ll reply within 24 hours.
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="hire-cta" aria-hidden="true">
          <svg viewBox="0 0 600 100" xmlns="http://www.w3.org/2000/svg" className="hire-svg">
            <text
              x="300"
              y="72"
              textAnchor="middle"
              fontFamily="Space Grotesk"
              fontSize="64"
              fontWeight="700"
              fill="#6C63FF"
              opacity="0.06"
            >
              HIRE ME
            </text>
            <text
              x="300"
              y="72"
              textAnchor="middle"
              fontFamily="Space Grotesk"
              fontSize="64"
              fontWeight="700"
              fill="none"
              stroke="#6C63FF"
              strokeWidth="1"
              opacity="0.15"
            >
              HIRE ME
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
