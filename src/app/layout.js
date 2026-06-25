import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { Mukta } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth/next";

import ClientLayout from "./ClientLayout";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { ReactQueryProvider } from "./QueryClientProvider ";
import ToastManager from "./components/toast/ToastManager";
import Loader from "./components/loader/loader";
import { TOAST_OPTIONS } from "./utils/constants";

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
      { url: "/KCF2.jpg", type: "image/jpeg" },
    ],
    shortcut: "/KCF2.jpg",
    apple: "/KCF2.jpg",
  },
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <Head>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
      </Head>
      <body className={mukta.className}>
        <PrimeReactProvider>
          <ClientLayout session={session}>
            <ReactQueryProvider>
              <div className="site-wrap">
                <Link
                  href="https://api.whatsapp.com/send?phone=917904749251&text=Hi%2C%20I'm%20interested%20in%20your%20products"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={"/images/whatsappImg.png"}
                    height={100}
                    width={100}
                    alt="whatsapp image"
                    className="whatsapp-image"
                  />
                </Link>
                {children}
              </div>
            </ReactQueryProvider>
            <Loader />
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={TOAST_OPTIONS}
              pauseOnHover={false}
              pauseOnFocusLoss={false}
            />
            <ToastManager />
          </ClientLayout>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
