"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { googleSignIn } from "@/app/api/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import AuthLayout from "../components/auth/AuthLayout";
import { ForgotPanel, LoginPanel } from "../components/auth/AuthForms";

import "./login-page.css";

const deriveNameFromEmail = (email) => {
  if (!email) return "";
  const [localPart] = email.split("@");
  const parts = localPart.split(/[._-]/).filter(Boolean);
  const nameParts = parts.slice(0, 2).map((part) =>
    part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
  );
  return nameParts.join(" ") || localPart;
};

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { handleSaveUserData, setIsLoginAuth, isLoggedIn } = useAuthStore();
  const [showForgot, setShowForgot] = useState(false);
  const [isAcquiringToken, setIsAcquiringToken] = useState(false);
  const [tokenError, setTokenError] = useState(null);
  const acquireAttempted = useRef(false);

  useEffect(() => {
    if (status === "loading") return;
    if (status !== "authenticated") return;

    const localToken = localStorage.getItem("accessToken");
    const sessionToken = session?.user?.accessToken;

    if ((localToken && localToken !== "undefined") || sessionToken) {
      if (sessionToken && (!localToken || localToken === "undefined")) {
        localStorage.setItem("accessToken", sessionToken);
        setIsLoginAuth(true);
      }
      const redirectPath = sessionStorage.getItem("postLoginRedirect") || "/account";
      sessionStorage.removeItem("postLoginRedirect");
      router.replace(redirectPath);
      return;
    }

    if (!session?.user?.email || acquireAttempted.current) return;
    acquireAttempted.current = true;
    toast.dismiss();
    setIsAcquiringToken(true);

    const displayName = session.user.name || deriveNameFromEmail(session.user.email);

    googleSignIn({ email: session.user.email, name: displayName, googleId: session.user.id })
      .then((response) => {
        const token = response?.data?.token || response?.token;
        if (token) {
          localStorage.setItem("accessToken", token);
          setIsLoginAuth(true);
          const customer = response?.data?.customer || response?.customer;
          handleSaveUserData({
            id: customer?.id || session.user.id,
            name: customer?.name || displayName,
            email: session.user.email,
          });
          const redirectPath = sessionStorage.getItem("postLoginRedirect") || "/account";
          sessionStorage.removeItem("postLoginRedirect");
          router.replace(redirectPath);
        } else {
          setTokenError("Unable to complete sign-in. Please sign out and try again.");
          setIsAcquiringToken(false);
        }
      })
      .catch((err) => {
        const detail =
          err?.response?.data?.message ||
          (err?.response?.status ? `HTTP ${err.response.status}` : null) ||
          err?.message ||
          "Unknown error";
        setTokenError(`Sign-in failed: ${detail}`);
        setIsAcquiringToken(false);
      });
  }, [status, session, router, setIsLoginAuth, handleSaveUserData]);

  useEffect(() => {
    if (isLoggedIn === true) {
      const redirectPath = sessionStorage.getItem("postLoginRedirect") || "/account";
      sessionStorage.removeItem("postLoginRedirect");
      router.replace(redirectPath);
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showForgot]);

  let content;

  if (status === "authenticated" && isAcquiringToken) {
    content = (
      <div className="aq-auth-status">
        <div className="aq-auth-status-spin" />
        <p>Setting up your account...</p>
      </div>
    );
  } else if (status === "authenticated" && tokenError) {
    content = (
      <div className="aq-auth-alert error">
        <p>{tokenError}</p>
        <button
          type="button"
          className="aq-login-btn w-100"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Sign out and try again
        </button>
      </div>
    );
  } else if (status === "authenticated") {
    content = (
      <div className="aq-auth-alert success">
        <p>
          Logged in as{" "}
          <strong>
            {session.user.name ? session.user.name : deriveNameFromEmail(session.user.email)}
          </strong>
        </p>
        <p>Email: {session.user.email}</p>
        <button
          type="button"
          className="aq-login-btn w-100 aq-auth-mb-10"
          onClick={() => router.push("/account")}
        >
          Go to Profile
        </button>
        <button
          type="button"
          className="aq-login-btn btn-transparent w-100"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </button>
      </div>
    );
  } else if (showForgot) {
    content = <ForgotPanel onBack={() => setShowForgot(false)} />;
  } else {
    content = (
      <LoginPanel
        onCreateAccount={() => router.push("/register")}
        onForgot={() => setShowForgot(true)}
      />
    );
  }

  return <AuthLayout tallThumb>{content}</AuthLayout>;
}
