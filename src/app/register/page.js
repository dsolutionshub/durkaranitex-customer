"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/useAuthStore";
import AuthLayout from "../components/auth/AuthLayout";
import { RegisterPanel } from "../components/auth/AuthForms";

import "../login/login-page.css";

export default function RegisterPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const redirectTargetRef = useRef(null);

  if (redirectTargetRef.current === null && typeof window !== "undefined") {
    redirectTargetRef.current = sessionStorage.getItem("postLoginRedirect") || "";
  }

  useEffect(() => {
    if (isLoggedIn === true) {
      const redirectPath =
        sessionStorage.getItem("postLoginRedirect") ||
        redirectTargetRef.current ||
        "/account";
      sessionStorage.removeItem("postLoginRedirect");
      router.replace(redirectPath);
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AuthLayout>
      <RegisterPanel
        onLogin={() => router.push("/login")}
        onRegistered={() => router.push("/login")}
      />
    </AuthLayout>
  );
}
