"use client";
import { useState, useEffect } from "react";
import Toast from "./page";

let triggerToastFn;

export const toastCom = (
  message,
  show = true,
  type = "success",
  duration = 3000
) => {
  if (typeof triggerToastFn === "function") {
    triggerToastFn({ message, show, type, duration });
  }
};

export default function ToastManager() {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    triggerToastFn = ({ message, show, type, duration }) => {
      setToast({ show, message, type });

      setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, duration);
    };

    return () => {
      triggerToastFn = null;
    };
  }, []);

  return (
    <Toast
      message={toast.message}
      show={toast.show}
      onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      type={toast.type}
    />
  );
}
