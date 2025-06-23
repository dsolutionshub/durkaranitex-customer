'use client'
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.backendToken) {
      sessionStorage.setItem("backendToken", session.backendToken);
      router.replace("/checkout");
    }
  }, [status, session, router]);

  const google_sign = async () => {
    try {
      const res = await signIn("google", { redirect: false });
      console.log(res);
      if (res?.error) {
        console.error("Google sign-in failed:", res.error);
      } else {
        console.log("Google sign-in response:", res);
      }
    } catch (err) {
      console.error("Google sign-in error:", err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="bg-white p-4 rounded shadow text-center" style={{ maxWidth: "500px", width: "100%" , maxHeight:"300px", height: "100%"}}>
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

        <button
          onClick={google_sign}
          className="btn btn-light border d-flex align-items-center justify-content-center gap-2 w-100 shadow-sm"
        >
          <Image src="/images/google-icon.svg" alt="Google" width={20} height={20} />
          <span className="fw-semibold">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
