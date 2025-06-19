import Image from "next/image";
import Link from "next/link";
import { Mukta } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";
import ClientLayout from "./ClientLayout";
import Loader from "./components/loader/loader";

import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../app/styles/style.css";
import Head from "next/head";

const mukta = Mukta({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata = {
  title: "Dhurgarani Tex",
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
            <div className="site-wrap">
              <Link
                href="https://wa.me/919489607841?text=Hi%2C%20I'm%20interested%20in%20your%20products"
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
            <Loader />
          </ClientLayout>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
