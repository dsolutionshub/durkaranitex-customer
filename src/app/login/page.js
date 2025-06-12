// "use client";
// import { useEffect, useRef } from "react";

// export default function LoginPage() {
//   const googleButtonRef = useRef(null);

//   useEffect(() => {
//     if (window.google && googleButtonRef.current) {
//       window.google.accounts.id.initialize({
//         client_id: "YOUR_GOOGLE_CLIENT_ID",
//         callback: handleCredentialResponse,
//       });

//       window.google.accounts.id.renderButton(googleButtonRef.current, {
//         theme: "outline",
//         size: "large",
//       });
//     }
//   }, []);

//   const handleCredentialResponse = async () => {
//     const token = response.credential;

//     console.log(response);
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <div className="bg-white p-4 rounded shadow text-center" style={{ maxWidth: "500px", width: "100%" , maxHeight:"300px", height: "100%"}}>
//         <div className="d-flex justify-content-center">
//           <div className="site-logo text-center my-3">
//             <Link
//               href="/"
//               className="js-logo-clone d-flex align-items-center gap-2 text-dark fw-bold p-1 text-decoration-none"
//             >
//               <Image src="/images/logo.png" height={40} width={40} alt="logo" />
//               <span>DhurgaRani Tex</span>
//             </Link>
//           </div>
//         </div>

//         <h4 className="fw-bold text-dark">Welcome back</h4>
//         <p className="text-muted mb-4">Login to manage your account.</p>

//         <button
//           onClick={() => console.log('login')
//           }
//           className="btn btn-light border d-flex align-items-center justify-content-center gap-2 w-100 shadow-sm"
//         >
//           <Image src="/images/google-icon.svg" alt="Google" width={20} height={20} />
//           <span className="fw-semibold" ref={googleButtonRef}>Sign in with Google</span>
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useEffect, useRef } from "react";
// import Link from "next/link";
// import Image from "next/image";

// export default function LoginPage() {
//   const googleButtonRef = useRef(null);

//   const handleCredentialResponse = async () => {
//     const token = response.credential;
//     console.log("ID Token:", token);
//   };

//   useEffect(() => {
//     if (window.google && googleButtonRef.current) {
//       window.google.accounts.id.initialize({
//         client_id: process.env.GOOGLE_CLIENT_ID,
//         callback: handleCredentialResponse,
//       });

//       window.google.accounts.id.renderButton(googleButtonRef.current, {
//         theme: "outline",
//         size: "large",
//         width: "250",
//       });
//     }
//   }, []);

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <div
//         className="bg-white p-4 rounded shadow text-center"
//         style={{ maxWidth: "500px", width: "100%", maxHeight: "300px", height: "100%" }}
//       >
//         <div className="d-flex justify-content-center">
//           <div className="site-logo text-center my-3">
//             <Link
//               href="/"
//               className="js-logo-clone d-flex align-items-center gap-2 text-dark fw-bold p-1 text-decoration-none"
//             >
//               <Image src="/images/logo.png" height={40} width={40} alt="logo" />
//               <span>DhurgaRani Tex</span>
//             </Link>
//           </div>
//         </div>

//         <h4 className="fw-bold text-dark">Welcome back</h4>
//         <p className="text-muted mb-4">Login to manage your account.</p>

//         {/* Google Sign-In button placeholder */}
//         <div ref={googleButtonRef}>
//           <button
//           onClick={() => console.log('login')
//           }
//           className="btn btn-light border d-flex align-items-center justify-content-center gap-2 w-100 shadow-sm"
//         >
//           <Image src="/images/google-icon.svg" alt="Google" width={20} height={20} />
//           <span className="fw-semibold" ref={googleButtonRef}>Sign in with Google</span>
//         </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useEffect, useRef } from "react";
// import Link from "next/link";
// import Image from "next/image";

// export default function LoginPage() {
//   const googleButtonRef = useRef(null);

//   const handleCredentialResponse = async () => {
//     const token = response.credential;
//     console.log("ID Token:", token);

//     // 👉 Send token to PHP backend
//     // try {
//     //   const res = await fetch("https://your-backend.com/google-login.php", {
//     //     method: "POST",
//     //     headers: {
//     //       "Content-Type": "application/json",
//     //     },
//     //     body: JSON.stringify({ token }),
//     //   });

//     //   const data = await res.json();
//     //   console.log("Response from backend:", data);
//     // } catch (error) {
//     //   console.error("Login error:", error);
//     // }
//   };

//   useEffect(() => {
//     if (window.google && googleButtonRef.current) {
//       window.google.accounts.id.initialize({
//         client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID, // 👈 must be prefixed with NEXT_PUBLIC_
//         callback: handleCredentialResponse,
//       });

//       window.google.accounts.id.renderButton(googleButtonRef.current, {
//         theme: "outline",
//         size: "large",
//         width: 250,
//       });
//     }
//   }, []);

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <div
//         className="bg-white p-4 rounded shadow text-center"
//         style={{ maxWidth: "500px", width: "100%", maxHeight: "300px", height: "100%" }}
//       >
//         <div className="d-flex justify-content-center">
//           <div className="site-logo text-center my-3">
//             <Link
//               href="/"
//               className="js-logo-clone d-flex align-items-center gap-2 text-dark fw-bold p-1 text-decoration-none"
//             >
//               <Image src="/images/logo.png" height={40} width={40} alt="logo" />
//               <span>DhurgaRani Tex</span>
//             </Link>
//           </div>
//         </div>

//         <h4 className="fw-bold text-dark">Welcome back</h4>
//         <p className="text-muted mb-4">Login to manage your account.</p>

//         {/* ✅ Google Sign-In renders here */}
//         <div ref={googleButtonRef}></div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const googleButtonRef = useRef(null);

  // Load Google's script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google && googleButtonRef.current) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: "outline",
          size: "large",
          width: 250,
        });

        // Optional: prompt Google One Tap
        // window.google.accounts.id.prompt();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = (response) => {
    const token = response.credential;
    console.log("ID Token:", token);
    console.log(response)

    // send token to backend, etc.
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="bg-white p-4 rounded shadow text-center"
        style={{ maxWidth: "500px", width: "100%", maxHeight: "300px", height: "100%" }}
      >
        <div className="d-flex justify-content-center">
          <div className="site-logo text-center my-3">
            <Link
              href="/"
              className="js-logo-clone d-flex align-items-center gap-2 text-dark fw-bold p-1 text-decoration-none"
            >
              <Image src="/images/logo.png" height={40} width={40} alt="logo" />
              <span>DhurgaRani Tex</span>
            </Link>
          </div>
        </div>

        <h4 className="fw-bold text-dark">Welcome back</h4>
        <p className="text-muted mb-4">Login to manage your account.</p>

        {/* Google Sign-In button will render here */}
        <div ref={googleButtonRef}></div>
      </div>
    </div>
  );
}
