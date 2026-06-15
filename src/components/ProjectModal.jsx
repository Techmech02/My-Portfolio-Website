import { startTransition, useCallback, useEffect, useRef } from "react";
import { ViewTransition } from "react";
import { modalData } from "../data/modalData";

export default function ProjectModal({ modalId, onClose }) {
  const closeBtnRef = useRef(null);
  const lastFocusedRef = useRef(null);
  const data = modalId ? modalData[modalId] : null;

  const close = useCallback(() => {
    startTransition(() => onClose());
  }, [onClose]);

  useEffect(() => {
    if (!modalId) return;

    lastFocusedRef.current = document.activeElement;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab") return;

      const overlay = document.getElementById("modal-overlay");
      if (!overlay) return;

      const focusable = overlay.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      lastFocusedRef.current?.focus?.();
    };
  }, [modalId, close]);

  if (!data) return null;

  return (
    <ViewTransition name="modal-root" enter="auto" exit="auto">
      <div
        className="modal-overlay"
        id="modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Project case study"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="modal-box">
          <button
            ref={closeBtnRef}
            className="modal-close"
            aria-label="Close modal"
            onClick={close}
          >
            ×
          </button>
          <div className="modal-content">
            <h2>{data.title}</h2>
            <p className="modal-sub">{data.sub}</p>
            <div className="modal-tags">
              {data.tech.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
            <h3>The Problem</h3>
            <p>{data.challenge}</p>
            <h3>The Approach</h3>
            <p>{data.approach}</p>
            <h3>Outcome</h3>
            <p>{data.outcome}</p>
          </div>
        </div>
      </div>
    </ViewTransition>
  );
}
