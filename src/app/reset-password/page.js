"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

import AuthLayout from "../components/auth/AuthLayout";
import {
  BackArrowIcon,
  CloseEyeIcon,
  OpenEyeIcon,
} from "../components/auth/AuthIcons";
import { loader } from "../components/loader/loaderManager";
import Loader from "../components/loader/loader";
import { resetPassword } from "../api/services/authService";
import { getErrorMessage } from "../utils/helperFn";

import "../login/login-page.css";

function PasswordInput({ label, placeholder, value, onChange, name }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="aq-login-input-box">
      <label className="aq-form-label" htmlFor={name}>
        {label} <span>*</span>
      </label>
      <div className={`aq-login-input p-relative${visible ? " is-visible" : ""}`}>
        <input
          id={name}
          className="aq_password aq-form-control"
          type={visible ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
        <button
          type="button"
          className="aq-login-input-eye password-show-toggle"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          <span className="open-eye">
            <OpenEyeIcon />
          </span>
          <span className="close-eye">
            <CloseEyeIcon />
          </span>
        </button>
      </div>
    </div>
  );
}

function ChangePassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goToLogin = () => router.push("/login");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!token) {
      toast.error("This reset link is invalid or has expired.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Make sure both passwords are the same.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("token", token);
    formData.append("password", newPassword);
    formData.append("password_confirmation", confirmPassword);

    loader(true);
    try {
      await resetPassword(formData);
      setSuccess(true);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      loader(false);
    }
  };

  return (
    <div className="aq-reset-password-page">
      <div className="aq-reset-password-logo">
        <Image
          src="/images/home/KCLogo.png"
          alt="Kavya Creation"
          width={210}
          height={58}
          priority
        />
      </div>
      <AuthLayout tallThumb>
        {success ? (
          <>
            <div className="aq-login-top text-center aq-auth-mb-30">
              <h3 className="aq-login-title">Reset password</h3>
              <p>You can now log in using your new password.</p>
            </div>
            <div className="aq-login-option">
              <div className="aq-login-bottom-wrap text-center">
                <button type="button" className="aq-login-btn w-100" onClick={goToLogin}>
                  Go to Login
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="aq-login-top text-center aq-auth-mb-30">
              <h3 className="aq-login-title">Reset password</h3>
              <p>Enter a new password for your Kavya Creation account.</p>
            </div>
            <div className="aq-login-option">
              <form onSubmit={handleSubmit}>
                <div className="aq-login-input-wrapper">
                  <PasswordInput
                    name="newPassword"
                    label="New Password"
                    placeholder="8+ characters required"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                  />
                  <PasswordInput
                    name="confirmPassword"
                    label="Password confirmation"
                    placeholder="Password confirmation"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </div>
                <div className="aq-login-bottom-wrap text-center aq-auth-mb-20">
                  <button type="submit" className="aq-login-btn w-100 aq-auth-mb-10">
                    Reset Password
                  </button>
                  <button
                    type="button"
                    className="aq-login-account color"
                    onClick={goToLogin}
                  >
                    <span>
                      <BackArrowIcon />
                    </span>{" "}
                    Back to Log in
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </AuthLayout>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<Loader />}>
      <ChangePassword />
    </Suspense>
  );
}
