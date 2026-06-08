"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const showLayout = !["/checkout", "/reset-password"].includes(pathname);

  return (
    <SessionProvider>
      <>
        {showLayout && <Navbar />}
        {children}
        {showLayout && <Footer />}
      </>
    </SessionProvider>
  );
}
