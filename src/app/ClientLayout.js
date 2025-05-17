'use client'

import { usePathname } from 'next/navigation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { SessionProvider } from "next-auth/react";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const showLayout = !['/login'].includes(pathname);

  return (
    <>
    <SessionProvider>
      {showLayout && <Navbar />}
      {children}
      {showLayout && <Footer />}
    </SessionProvider>  
    </>
  );
}
