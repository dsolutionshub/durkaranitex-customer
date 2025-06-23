"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

import { useAuthStore } from "@/store/useAuthStore";
import CheckoutForm from "./components/CheckoutForm";
import OrderSummary from "./components/OrderSummary";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const { syncAccessToken } = useAuthStore();

  useEffect(() => {
    if (status === "authenticated") {
      syncAccessToken(session);
    }
  }, [status, session, syncAccessToken]);

  return (
    <div className="min-h-screen py-10 md:mx-3">
      <h2
        className="text-2xl text-center pb-1 md:pb-4 text-black font-semibold checkout-text"
        onClick={() => toast.success("Successfully toasted!")}
      >
        Checkout
      </h2>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6 ">
        <CheckoutForm />
        <OrderSummary />
      </div>
    </div>
  );
}
