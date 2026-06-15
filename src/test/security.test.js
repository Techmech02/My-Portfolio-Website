import { describe, it, expect } from "vitest";
import {
  sanitizeText,
  validateEmail,
  validateContactForm,
  safeHref,
  LIMITS,
} from "../utils/security";

describe("sanitizeText", () => {
  it("strips HTML tags", () => {
    expect(sanitizeText('<script>alert("xss")</script>Hello')).toBe("alert(\"xss\")Hello");
  });

  it("removes control characters", () => {
    expect(sanitizeText("hello\x00world")).toBe("helloworld");
  });

  it("trims and enforces max length", () => {
    expect(sanitizeText("  hello  ", 3)).toBe("hel");
  });

  it("returns empty string for non-string input", () => {
    expect(sanitizeText(null)).toBe("");
    expect(sanitizeText(undefined)).toBe("");
  });
});

describe("validateEmail", () => {
  it("accepts valid emails", () => {
    expect(validateEmail("user@example.com")).toBe(true);
    expect(validateEmail("name+tag@company.co.uk")).toBe(true);
  });

  it("rejects invalid emails", () => {
    expect(validateEmail("not-an-email")).toBe(false);
    expect(validateEmail("@missing.com")).toBe(false);
    expect(validateEmail("user@")).toBe(false);
    expect(validateEmail("")).toBe(false);
  });

  it("rejects emails with HTML injection", () => {
    expect(validateEmail("<script>@test.com")).toBe(false);
  });
});

describe("validateContactForm", () => {
  const validPayload = {
    name: "Jane Doe",
    email: "jane@example.com",
    message: "Hello, I would like to collaborate on a project.",
    honeypot: "",
  };

  it("accepts valid form data", () => {
    const result = validateContactForm(validPayload);
    expect(result.valid).toBe(true);
    expect(result.sanitized.name).toBe("Jane Doe");
    expect(result.sanitized.email).toBe("jane@example.com");
  });

  it("rejects empty name", () => {
    const result = validateContactForm({ ...validPayload, name: "A" });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  it("rejects short messages", () => {
    const result = validateContactForm({ ...validPayload, message: "Hi" });
    expect(result.valid).toBe(false);
    expect(result.errors.message).toBeDefined();
  });

  it("rejects honeypot submissions", () => {
    const result = validateContactForm({ ...validPayload, honeypot: "spam-bot" });
    expect(result.valid).toBe(false);
    expect(result.errors.form).toBeDefined();
  });

  it("enforces field length limits", () => {
    expect(LIMITS.name).toBe(100);
    expect(LIMITS.message).toBe(2000);
  });
});

describe("safeHref", () => {
  it("allows mailto and hash links", () => {
    expect(safeHref("mailto:test@example.com")).toBe("mailto:test@example.com");
    expect(safeHref("#contact")).toBe("#contact");
  });

  it("allows https URLs", () => {
    expect(safeHref("https://github.com/user")).toBe("https://github.com/user");
  });

  it("blocks javascript URLs", () => {
    expect(safeHref("javascript:alert(1)")).toBe("#");
  });

  it("returns # for invalid input", () => {
    expect(safeHref("")).toBe("#");
    expect(safeHref(null)).toBe("#");
  });
});
