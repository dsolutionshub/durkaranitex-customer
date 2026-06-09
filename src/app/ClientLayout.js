"use client";

import { usePathname } from "next/navigation";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAuthStore } from "@/store/useAuthStore";
import useCartPanelStore from "@/store/useCartPanelStore";
import { googleSignIn } from "@/app/api/services/authService";

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
  const cardDetails = useCartPanelStore((state) => state.cardDetails);
  const wishlistDetails = useCartPanelStore((state) => state.wishlistDetails);
  const fallbackAttempted = useRef(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      fallbackAttempted.current = false;
      return;
    }

    if (status !== "authenticated" || !session?.user) return;

    const sessionToken = session.user.accessToken;

    if (sessionToken) {
      // JWT callback succeeded — token is in the session
      localStorage.setItem("accessToken", sessionToken);
      setIsLoginAuth(true);
      cardDetails();
      wishlistDetails();
      const displayName =
        session.user.name || deriveNameFromEmail(session.user.email);
      handleSaveUserData({
        id: session.user.id,
        name: displayName,
        email: session.user.email,
      });
      fallbackAttempted.current = false;
      return;
    }

    // No token in session — JWT callback failed or backend call failed.
    // Check if localStorage already has a token (e.g., from email/password login).
    const existingToken = localStorage.getItem("accessToken");
    if (existingToken && existingToken !== "undefined") {
      setIsLoginAuth(true);
      cardDetails();
      wishlistDetails();
      return;
    }

    // Client-side fallback: try calling the backend directly.
    if (!session.user.email || fallbackAttempted.current) return;
    fallbackAttempted.current = true;

    const displayName =
      session.user.name || deriveNameFromEmail(session.user.email);
    handleSaveUserData({
      id: session.user.id,
      name: displayName,
      email: session.user.email,
    });

    googleSignIn({
      email: session.user.email,
      name: displayName,
      googleId: session.user.id,
    })
      .then((response) => {
        const token = response?.data?.token || response?.token;
        if (token) {
          localStorage.setItem("accessToken", token);
          setIsLoginAuth(true);
          cardDetails();
          wishlistDetails();
          const customer = response?.data?.customer || response?.customer;
          handleSaveUserData({
            id: customer?.id || session.user.id,
            name: customer?.name || displayName,
            email: session.user.email,
          });
        } else {
          console.error(
            "[SessionSync] Client-side googleSignIn returned no token:",
            response
          );
        }
      })
      .catch((err) => {
        console.error(
          "[SessionSync] Client-side googleSignIn failed:",
          err?.message
        );
      });
  }, [status, session, handleSaveUserData, setIsLoginAuth, cardDetails, wishlistDetails]);

  return null;
}

export default function ClientLayout({ children, session: initialSession }) {
  const pathname = usePathname();

  const showLayout = !["/checkout", "/reset-password"].includes(pathname);

  return (
    <SessionProvider session={initialSession}>
      <SessionSync />
      {showLayout && <Navbar />}
      {children}
      {showLayout && <Footer />}
    </SessionProvider>
  );
}
