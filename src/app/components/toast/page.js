"use client";
import { useEffect } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

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
    <div
      style={{
        position: "fixed",
        top: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "100%",
        maxWidth: "90vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded shadow-lg`}
        style={{
          border: "1px solid",
          borderColor: isSuccess ? "#bbf7d0" : "#fecaca",
          boxShadow: isSuccess
            ? "0 2px 8px rgba(34, 197, 94, 0.1)"
            : "0 2px 8px rgba(239, 68, 68, 0.1)",
          background: isSuccess ? "#ecfdf5" : "#fef2f2",
          color: isSuccess ? "#065f46" : "#991b1b",
          maxWidth: "450px",
          width: "100%",
        }}
      >
        {isSuccess ? (
          <CheckCircle className="text-xl text-[var(--primary-main)]" />
        ) : (
          <AlertCircle className="text-xl text-red-600" />
        )}
        <span>{message}</span>
      </div>
    </div>
  );
}
