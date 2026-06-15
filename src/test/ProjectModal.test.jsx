import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectModal from "../components/ProjectModal";

describe("ProjectModal", () => {
  it("renders nothing when no modal is active", () => {
    const { container } = render(<ProjectModal modalId={null} onClose={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders modal content safely as React elements (no innerHTML)", () => {
    render(<ProjectModal modalId="modal-1" onClose={vi.fn()} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("GST Notice Explainer")).toBeInTheDocument();
    expect(screen.getByText(/Indian SMBs receive GST notices/i)).toBeInTheDocument();
    expect(screen.getByText("FastAPI")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<ProjectModal modalId="modal-3" onClose={onClose} />);

    await user.click(screen.getByLabelText(/close modal/i));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose when Escape is pressed", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<ProjectModal modalId="modal-3" onClose={onClose} />);

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledOnce();
  });
});
