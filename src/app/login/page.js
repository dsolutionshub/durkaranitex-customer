"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import LoginForm from "./components/LoginForm";
import Link from "next/link";
import ForgotPasswordModal from "./components/forgotpasswordmodal";

export default function LoginPage() {
  const router = useRouter();
  const sessionData = useSession();
  const session = sessionData?.data;
  const status = sessionData?.status;
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotModal, setShowForgotModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token && token !== "undefined" && status !== "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

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

        {status === "authenticated" ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 text-left">
            <p className="text-sm text-green-800">
              Logged in as <strong>{session.user.name || session.user.email}</strong>
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

