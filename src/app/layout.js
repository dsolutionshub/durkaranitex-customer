import Script from "next/script";
import Link from "next/link";
import { Mukta } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";
import BazaroToaster from "./components/toast/BazaroToaster";
import { getServerSession } from "next-auth/next";

import ClientLayout from "./ClientLayout";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { ReactQueryProvider } from "./QueryClientProvider ";
import ToastManager from "./components/toast/ToastManager";
import Loader from "./components/loader/loader";
import ScrollProgress from "./components/ScrollProgress";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import "./globals.css";

const mukta = Mukta({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Kavya Creation",
    template: "%s | Kavya Creation",
  },
  description:
    "Shop a wide range of Silk Sarees, Cottonn Sarees with different type of varieties which made in Elampillai Salem, Also provided in best prices both Wholesale and Retail",
  keywords: [
    "SALEM SAREES",
    "Perumagkoundampatty sarees",
    "salem sarees",
    "ELAMPILLAI Sarees",
  ],
  icons: {
    icon: [
      { url: "/kc-logo.png", type: "image/png" },
    ],
    shortcut: "/kc-logo.png",
    apple: "/kc-logo.png",
  },
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={mukta.className} suppressHydrationWarning>
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
        <PrimeReactProvider>
          <ReactQueryProvider>
            <ClientLayout session={session}>
              <div className="site-wrap">
                <Link
                  href="https://api.whatsapp.com/send?phone=917904749251&text=Hi%2C%20I'm%20interested%20in%20your%20products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-image"
                  aria-label="Chat on WhatsApp"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
                    />
                  </svg>
                </Link>
                {children}
              </div>
              <Loader />
              <ScrollProgress />
              <BazaroToaster />
              <ToastManager />
            </ClientLayout>
          </ReactQueryProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
