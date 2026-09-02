"use client";

import { Toaster, ToastBar, toast } from "react-hot-toast";

import { TOAST_OPTIONS } from "@/app/utils/constants";
import "./toaster.css";

export default function BazaroToaster() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={TOAST_OPTIONS}
      containerClassName="aq-toaster"
      containerStyle={{ zIndex: 2147483647 }}
      gutter={12}
    >
      {(t) => (
        <ToastBar
          toast={t}
          style={{
            background: "transparent",
            boxShadow: "none",
            padding: 0,
            maxWidth: "100%",
          }}
        >
          {({ icon, message }) => (
            <div className={`aq-toast aq-toast--${t.type || "blank"}`}>
              <span className="aq-toast-icon" aria-hidden="true">
                {icon}
              </span>
              <div className="aq-toast-message">{message}</div>
              {t.type !== "loading" ? (
                <button
                  type="button"
                  className="aq-toast-close"
                  onClick={() => toast.dismiss(t.id)}
                  aria-label="Close"
                >
                  ×
                </button>
              ) : null}
              <span className="aq-toast-progress" />
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}
