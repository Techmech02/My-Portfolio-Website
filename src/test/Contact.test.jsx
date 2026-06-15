import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "../components/Contact";

describe("Contact form", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders contact form fields", () => {
    render(<Contact />);
    expect(screen.getByLabelText(/^name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^message$/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("shows validation errors for empty submission", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Contact />);

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
    expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
  });

  it("shows success message after valid submission", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Contact />);

    await user.type(screen.getByLabelText(/^name$/i), "Jane Doe");
    await user.type(screen.getByLabelText(/^email$/i), "jane@example.com");
    await user.type(
      screen.getByLabelText(/^message$/i),
      "I would like to discuss a collaboration opportunity."
    );

    await user.click(screen.getByRole("button", { name: /send message/i }));

    await vi.advanceTimersByTimeAsync(1300);

    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    });
  });

  it("rejects honeypot submissions silently", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Contact />);

    const honeypot = document.getElementById("website");
    fireEvent.change(honeypot, { target: { value: "http://spam.example.com" } });

    await user.type(screen.getByLabelText(/^name$/i), "Jane Doe");
    await user.type(screen.getByLabelText(/^email$/i), "jane@example.com");
    await user.type(
      screen.getByLabelText(/^message$/i),
      "This is a valid length message for testing."
    );

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/submission rejected/i)).toBeInTheDocument();
  });
});
