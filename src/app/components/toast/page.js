"use client";

import { useEffect } from "react";

import "./toaster.css";

function SuccessIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M3.2 8.2L6.4 11.2L12.8 4.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M4.2 4.2L11.8 11.8M11.8 4.2L4.2 11.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Toast({ message, show, onClose, type = "success" }) {
  const isSuccess = type === "success";

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="aq-toast-host">
      <div
        className={`aq-toast aq-toast--${isSuccess ? "success" : "error"}`}
        role="status"
      >
        <span className="aq-toast-icon" aria-hidden="true">
          {isSuccess ? <SuccessIcon /> : <ErrorIcon />}
        </span>
        <div className="aq-toast-message">{message}</div>
        <button type="button" className="aq-toast-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <span className="aq-toast-progress" />
      </div>
    </div>
  );
}
