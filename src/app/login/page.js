"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import LoginForm from "./components/LoginForm";
import Link from "next/link";
import ForgotPasswordModal from "./components/forgotpasswordmodal";
import toast from "react-hot-toast";
import { googleSignIn } from "@/app/api/services/authService";
import { useAuthStore } from "@/store/useAuthStore";

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
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [isAcquiringToken, setIsAcquiringToken] = useState(false);
  const [tokenError, setTokenError] = useState(null);
  const acquireAttempted = useRef(false);

  // Redirect whenever a valid token is confirmed — covers both the
  // immediate case (already have a token) and the late case (SessionSync
  // or our own fetch sets isLoggedIn after the first render).
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

    // Google session active but no backend token yet — acquire it here.
    if (!session?.user?.email || acquireAttempted.current) return;
    acquireAttempted.current = true;
    toast.dismiss(); // Clear any stale "please login" toasts from the previous page
    setIsAcquiringToken(true);

    const displayName = session.user.name || deriveNameFromEmail(session.user.email);

    googleSignIn({ email: session.user.email, name: displayName, googleId: session.user.id })
      .then((response) => {
        console.log("[LoginPage] googleSignIn response:", JSON.stringify(response));
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
          console.error("[LoginPage] Backend returned no token. Full response:", JSON.stringify(response));
          setTokenError(`No token in response: ${JSON.stringify(response)}`);
          setIsAcquiringToken(false);
        }
      })
      .catch((err) => {
        const detail =
          err?.response?.data?.message ||
          (err?.response?.status ? `HTTP ${err.response.status}` : null) ||
          err?.message ||
          "Unknown error";
        console.error("[LoginPage] googleSignIn failed:", err?.response?.data || err?.message);
        setTokenError(`Sign-in failed: ${detail}`);
        setIsAcquiringToken(false);
      });
  }, [status, session, router, setIsLoginAuth, handleSaveUserData]);

  // Also redirect when SessionSync sets the token after an async delay.
  useEffect(() => {
    if (isLoggedIn === true) {
      const redirectPath = sessionStorage.getItem("postLoginRedirect") || "/account";
      sessionStorage.removeItem("postLoginRedirect");
      router.replace(redirectPath);
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isLogin]);

  return (
    <div className="bg-gray-50 flex items-center justify-center p-4 ">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <Image
            src="/images/home/logo.svg"
            alt="Dhurgarani Tex"
            width={200}
            height={100}
            className="mx-auto mb-2"
          />
          <h2 className="text-2xl font-bold text-black">
            {isLogin ? "Welcome Back" : "Join Our Collection"}
          </h2>
          <p className="text-black mt-1 text-sm">
            {isLogin
              ? "Sign in to your account"
              : "Discover the finest Sarees crafted with love"}
          </p>
        </div>

        {status === "authenticated" && isAcquiringToken ? (
          <div className="text-center py-6">
            <div className="inline-block w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-gray-600 text-sm">Setting up your account...</p>
          </div>
        ) : status === "authenticated" && tokenError ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-left">
            <p className="text-sm text-red-700 mb-3">{tokenError}</p>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
            >
              Sign out and try again
            </button>
          </div>
        ) : status === "authenticated" ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 text-left">
            <p className="text-sm text-green-800">
              Logged in as <strong>{session.user.name ? session.user.name : deriveNameFromEmail(session.user.email)}</strong>
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Email: {session.user.email}
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Logout
              </button>
              <button
                type="button"
                onClick={() => router.push("/account")}
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Go to Profile
              </button>
            </div>
          </div>
        ) : (
          <LoginForm setIsLogin={setIsLogin} isLogin={isLogin} />
        )}

        {isLogin && (
          <div className="text-center mt-2">
            <button
              onClick={() => setShowForgotModal(true)}
              className="text-[var(--primary-dark)] hover:underline text-sm"
            >
              Forgot Password?
            </button>
          </div>
        )}

        <div className="text-center text-sm text-black mt-3">
          By continuing, you agree to our{" "}
          <Link
            href={"/terms-and-conditions"}
            className="text-[var(--primary-dark)] hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href={"/privacy-policy"}
            className="text-[var(--primary-dark)] hover:underline"
          >
            Privacy Policy
          </Link>
        </div>
      </div>

      {showForgotModal && (
        <ForgotPasswordModal onClose={() => setShowForgotModal(false)} />
      )}
    </div>
  );
}

