import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { Mukta } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";
import { Toaster } from "react-hot-toast";

import ClientLayout from "./ClientLayout";
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
    default: "Dhurgarani Tex",
    template: "%s | Dhurgarani Tex",
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
    icon: "/dhurgaraniFavicon.png",
  },
};

export default function RootLayout({ children }) {
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
          <ClientLayout>
            <ReactQueryProvider>
              <div className="site-wrap">
                <Link
                  href="https://api.whatsapp.com/send?phone=918838137113&text=Hi%2C%20I'm%20interested%20in%20your%20products"
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
