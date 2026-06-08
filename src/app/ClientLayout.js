"use client";

import { usePathname } from "next/navigation";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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

function SessionSync() {
  const { data: session, status } = useSession();
  const { handleSaveUserData, setIsLoginAuth } = useAuthStore();

  useEffect(() => {
    if (status !== "authenticated" || !session?.user) {
      return;
    }

    const token = session.user.accessToken;
    if (token) {
      localStorage.setItem("accessToken", token);
      setIsLoginAuth(true);
    }

    if (session.user.email) {
      const displayName = session.user.name
        ? session.user.name
        : deriveNameFromEmail(session.user.email);
      handleSaveUserData({
        name: displayName,
        email: session.user.email,
      });
    }
  }, [status, session, handleSaveUserData, setIsLoginAuth]);

  return null;
}

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const showLayout = !["/checkout", "/reset-password"].includes(pathname);

  return (
    <SessionProvider>
      <SessionSync />
      {showLayout && <Navbar />}
      {children}
      {showLayout && <Footer />}
    </SessionProvider>
  );
}
