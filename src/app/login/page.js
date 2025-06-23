'use client'
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Gift,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

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
      <div className="bg-white p-4 rounded shadow text-center" style={{ maxWidth: "500px", width: "100%" , maxHeight:"500px", height: "100%"}}>
        <div className="d-flex justify-content-center">
          <div className="text-center mb-1">
            <img 
              src="/images/home/logo.svg" 
              alt="Dhurgarani Tex" 
              className="h-20 w-auto mx-auto mb-6"
            />
          </div>
        </div>

           <h4 className="fw-bold text-dark">Join Our Collection</h4>
        <p className="text-muted mb-4">Discover the finest Saress crafted with love</p>

      <button
  onClick={() => signIn("google", { callbackUrl: "/checkout" })}
  className="btn btn-light border d-flex align-items-center justify-content-center gap-2 w-100 shadow-sm"
>
  <Image src="/images/google-icon.svg" alt="Google" width={30} height={30} />
  <span className="fw-semibold">Continue with Google</span>
</button>

{/* Terms and Privacy */}
<div className="text-center text-m text-gray-900 mb-10 mt-4">
  By continuing, you agree to our{' '}
  <a href="#" className="text-green-600 hover:text-green-700 font-medium ">
    Terms of Service
  </a>{' '}
  and{' '}
  <a href="#" className="text-green-600 hover:text-green-700 font-medium">
    Privacy Policy
  </a>
</div>

{/* Features */}
<div className="mt-3 flex flex-col items-center space-y-4 text-center">
  {/* Exclusive collections */}
  <div className="flex items-center text-emerald-600">
    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
      <Gift className="w-6 h-6" />
    </div>
    <span className="text-base text-gray-900">Exclusive collections</span>
  </div>

  {/* Personalized recommendations */}
  <div className="flex items-center text-emerald-600">
    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
      <Sparkles className="w-6 h-6" />
    </div>
    <span className="text-base text-gray-900">Personalized recommendations</span>
  </div>

  {/* Secure & fast checkout */}
  <div className="flex items-center text-emerald-600">
    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
      <ShieldCheck className="w-6 h-6" />
    </div>
    <span className="text-base text-gray-900">Secure & fast checkout</span>
  </div>
</div>
      </div>
    </div>
  );
}
