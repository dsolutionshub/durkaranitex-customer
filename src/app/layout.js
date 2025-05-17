import "./globals.css";
import "../../public/css/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ClientLayout from "./ClientLayout";
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css'; 
import 'primeicons/primeicons.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';


export const metadata = {
  title: "Dhurgarani Tex",
};

export default function RootLayout({ children}) {

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Mukta:300,400,700&display=optional"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/fonts/icomoon/style.css" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/jquery-ui.css" />
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body>
      <PrimeReactProvider>
        <ClientLayout>
          <div className="site-wrap">
            {children}
          </div>
        </ClientLayout>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
