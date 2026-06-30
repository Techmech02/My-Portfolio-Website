const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HTML_TAG_PATTERN = /<[^>]*>/g;

export const LIMITS = {
  name: 100,
  email: 254,
  message: 2000,
};

export const FORM_RATE_LIMIT_MS = 5000;

export function sanitizeText(value, maxLength = 500) {
  if (typeof value !== "string") return "";
  return value
    .replace(HTML_TAG_PATTERN, "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim()
    .slice(0, maxLength);
}

export function validateEmail(email) {
  const cleaned = sanitizeText(email, LIMITS.email);
  if (!cleaned || cleaned.length > LIMITS.email) return false;
  return EMAIL_PATTERN.test(cleaned);
}

export function validateContactForm({ name, email, message, honeypot = "" }) {
  const errors = {};

  if (honeypot && honeypot.trim()) {
    return { valid: false, errors: { form: "Submission rejected." }, sanitized: null };
  }

  const sanitizedName = sanitizeText(name, LIMITS.name);
  const sanitizedEmail = sanitizeText(email, LIMITS.email);
  const sanitizedMessage = sanitizeText(message, LIMITS.message);

  if (!sanitizedName || sanitizedName.length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }

  if (!validateEmail(sanitizedEmail)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!sanitizedMessage || sanitizedMessage.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors, sanitized: null };
  }

  return {
    valid: true,
    errors: {},
    sanitized: {
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
    },
  };
}

export function isExternalUrl(url) {
  try {
    if (typeof window === "undefined") {
      return url.startsWith("http://") || url.startsWith("https://");
    }
    const parsed = new URL(url, window.location.origin);
    return parsed.origin !== window.location.origin;
  } catch {
    return false;
  }
}

export function safeHref(url) {
  if (!url || typeof url !== "string") return "#";
  const trimmed = url.trim();
  if (trimmed.startsWith("mailto:") || trimmed.startsWith("#")) return trimmed;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      const parsed = new URL(trimmed);
      if (!["http:", "https:", "mailto:"].includes(parsed.protocol)) return "#";
      return parsed.href;
    } catch {
      return "#";
    }
  }
  return "#";
}
