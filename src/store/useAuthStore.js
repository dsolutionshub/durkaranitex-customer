import { create } from "zustand";
import { signIn, signOut } from "next-auth/react";

export const useAuthStore = create((set) => ({
  navigateToLogin: (path = "/") => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("postLoginRedirect", path);
      window.location.href = "/login";
    }
  },

  handleGoogleSignIn: () => {
    if (typeof window !== "undefined") {
      const redirectPath =
        sessionStorage.getItem("postLoginRedirect") || "/checkout";
      signIn("google", { callbackUrl: redirectPath });
    }
  },

  syncAccessToken: (session) => {
    if (typeof window === "undefined") return;
    if (session?.user?.accessToken) {
      sessionStorage.setItem("accessToken", session.user.accessToken);
    }
  },

  handleLogout: (redirectPath = "/") => {
    sessionStorage.removeItem("accessToken");
    signOut({ callbackUrl: "/login" });
    sessionStorage.clear();
  },
}));
