import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders main portfolio sections", () => {
    render(<App />);

    expect(screen.getByRole("navigation", { name: /main navigation/i })).toBeInTheDocument();
    expect(screen.getByText(/building things/i)).toBeInTheDocument();
    expect(document.getElementById("about")).toBeInTheDocument();
    expect(document.getElementById("projects")).toBeInTheDocument();
    expect(document.getElementById("contact")).toBeInTheDocument();
  });

  it("includes security meta-equivalent contact form with honeypot", () => {
    render(<App />);
    const honeypot = document.getElementById("website");
    expect(honeypot).toBeInTheDocument();
    expect(honeypot.closest(".form-honeypot")).toBeInTheDocument();
  });
});
