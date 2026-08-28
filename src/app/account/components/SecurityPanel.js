"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { reset } from "@/app/api/services/authService";
import { getErrorMessage } from "@/app/utils/helperFn";
import { OpenEyeIcon, CloseEyeIcon } from "@/app/components/auth/AuthIcons";

function PasswordInput({ label, value, onChange, name }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="aq-dashboard-from-input p-relative">
      <label className="aq-form-label">
        {label} <i>*</i>
      </label>
      <div className={`aq-login-input${visible ? " is-visible" : ""}`}>
        <input
          className="aq_password aq-form-control"
          type={visible ? "text" : "password"}
          name={name}
          placeholder="*********"
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          className="aq-login-input-eye"
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

export default function SecurityPanel({ email, onBack }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleChangePassword = async (event) => {
    event.preventDefault();
    if (password && password !== confirm) {
      toast.error("Make sure both passwords are the same.");
      return;
    }
    if (!email) {
      toast.error("Email is required to reset password.");
      return;
    }
    try {
      const data = await reset({ email });
      toast.success(data?.message || "Reset instructions sent to your email.");
      setCurrentPassword("");
      setPassword("");
      setConfirm("");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="aq-dashboard-wrapper aq-dash-pt-30">
      <div className="aq-dashboard-top d-flex justify-content-between align-items-center">
        <h3 className="aq-dashboard-title">Security</h3>
        <div className="aq-dashboard-top-btn aq-dash-mb-15">
          <button type="button" className="dashboard-btn-back" onClick={onBack}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M10.75 5.75L0.75 5.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M5.75 0.75L0.75 5.75L5.75 10.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Back
          </button>
        </div>
      </div>
      <div className="aq-dashboard-content-layout aq-dash-mb-40">
        <div className="aq-dashboard-box aq-dash-mb-20">
          <div className="aq-dashboard-security-box">
            <div className="aq-dashboard-review__header">
              <div className="aq-dashboard-review__title">
                <span className="aq-dashboard-review__icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 8.33V6.67C5 3.91 5.83 1.67 10 1.67C14.17 1.67 15 3.91 15 6.67V8.33" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M14.16 18.33H5.83C2.5 18.33 1.66 17.5 1.66 14.17V12.5C1.66 9.17 2.5 8.33 5.83 8.33H14.16C17.5 8.33 18.33 9.17 18.33 12.5V14.17C18.33 17.5 17.5 18.33 14.16 18.33Z" stroke="#292D32" strokeWidth="1.5" />
                  </svg>
                </span>
                <div>
                  <h4>Change password</h4>
                  <p>Ensure your account is using a long, random password to stay secure.</p>
                </div>
              </div>
            </div>
            <form className="aq-dashboard-security-from-wrap" onSubmit={handleChangePassword}>
              <div className="row">
                <div className="col-lg-12">
                  <PasswordInput
                    label="Current password"
                    name="current"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                  />
                </div>
                <div className="col-lg-12">
                  <PasswordInput
                    label="Password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <div className="col-lg-12">
                  <PasswordInput
                    label="Password Confirmation"
                    name="confirm"
                    value={confirm}
                    onChange={(event) => setConfirm(event.target.value)}
                  />
                </div>
                <div className="col-lg-12">
                  <div className="aq-dashboard-from-input-btn text-lg-end">
                    <button type="submit" className="aq-dashboard-digital-product__download-btn">
                      Change password
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="aq-dashboard-box aq-dash-mb-20">
          <div className="aq-dashboard-security-box">
            <div className="aq-dashboard-security-manage-card">
              <div className="aq-dashboard-security-manage-header">
                <div className="aq-dashboard-security-manage-header-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                    <path d="M15.04 12.92L16.35 3.95M2.64 12.91L1.35 3.95M0.75 3.9H16.95" stroke="#B91D1F" />
                  </svg>
                </div>
                <div className="aq-dashboard-security-manage-header-info">
                  <h3 className="aq-dashboard-security-manage-title">Delete Account</h3>
                  <p className="aq-dashboard-security-manage-subtitle">
                    Permanently delete your account and all associated data.
                  </p>
                </div>
              </div>
              <div className="aq-dashboard-security-manage-body">
                <div className="aq-dashboard-security-manage-warning">
                  <div className="aq-dashboard-security-manage-warning-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
                      <path d="M8.47 1.6L0.99 14.1C0.75 14.67 0.75 15.29 0.98 15.86C1.36 16.75 2.19 16.75 17.47 16.75C18.78 16.75 19.22 15.59 18.98 14.1L11.5 1.6C10.85 0.75 9.12 0.75 8.47 1.6Z" stroke="#FF9C05" strokeWidth="1.5" />
                      <path d="M9.98 6.14V9.68M9.98 13.21H9.99" stroke="#FF9C05" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="aq-dashboard-security-manage-warning-content">
                    <h4 className="aq-dashboard-security-manage-warning-title">Warning</h4>
                    <p className="aq-dashboard-security-manage-warning-text">
                      This action will permanently delete your account and all associated data and is irreversible.
                    </p>
                  </div>
                </div>
                <div className="aq-dashboard-security-manage-footer">
                  <button
                    type="button"
                    className="aq-dashboard-security-manage-btn-delete"
                    onClick={() =>
                      toast("Please contact support to delete your account.")
                    }
                  >
                    Delete your Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
