"use client";

import { useEffect } from "react";

import { ForgotPanel, LoginPanel, RegisterPanel } from "./AuthForms";
import "../../login/login-page.css";

export default function AuthModal({ view, onClose, onChangeView }) {
  useEffect(() => {
    if (!view) return undefined;

    document.body.classList.add("aq-auth-modal-open");

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("aq-auth-modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [view, onClose]);

  if (!view) return null;

  return (
    <div className="aq-login-modal-style">
      <div
        className="aq-auth-modal-overlay"
        onClick={onClose}
        role="presentation"
      >
        <div
          className="aq-auth-modal-dialog"
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={
            view === "register"
              ? "Create Account"
              : view === "forgot"
                ? "Forgot password"
                : "Sign in"
          }
        >
          <div className="aq-auth-modal-content">
            <button
              type="button"
              className="aq-auth-modal-close"
              aria-label="Close"
              onClick={onClose}
            />
            <div className="aq-login-wrapper">
              {view === "login" && (
                <LoginPanel
                  onCreateAccount={() => onChangeView("register")}
                  onForgot={() => onChangeView("forgot")}
                />
              )}
              {view === "register" && (
                <RegisterPanel
                  onLogin={() => onChangeView("login")}
                  onRegistered={() => onChangeView("login")}
                />
              )}
              {view === "forgot" && (
                <ForgotPanel onBack={() => onChangeView("login")} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
