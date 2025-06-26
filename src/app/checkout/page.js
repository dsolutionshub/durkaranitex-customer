"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { useAuthStore } from "@/store/useAuthStore";
import CheckoutForm from "./components/CheckoutForm";
import OrderSummary from "./components/OrderSummary";
import { getErrorMessage } from "../utils/helperFn";
import { getCheckoutList, payment } from "../api/services/authService";
import { loader } from "../components/loader/loaderManager";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const { syncAccessToken, navigateToLogin } = useAuthStore();
  const [checkoutData, setCheckoutData] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("payNow");

  const handlePayment = async () => {
    if (!checkoutData?.address) {
      toast.error("Please Select or Add Address");
      return;
    }
    loader(true);
    try {
      const data = await payment({
        checkout_id: checkoutData?.checkout_id,
        payment_type: selectedPayment === "payNow" ? "online" : "cod",
      });
      console.log(data);
    } catch (error) {
      getErrorMessage(error);
      const status = error?.response?.status;
      if (status === 401) {
        navigateToLogin("/shop");
      }
    } finally {
      loader(false);
    }
  };

  const handleCheckoutList = async () => {
    loader(true);
    try {
      const data = await getCheckoutList();
      setCheckoutData(data || []);
    } catch (error) {
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      syncAccessToken(session);
    }
  }, [status, session, syncAccessToken]);

  useEffect(() => {
    handleCheckoutList();
  }, []);

  return (
    <div className="min-h-screen py-10 md:mx-3">
      <h2 className="text-2xl text-center pb-1 md:pb-4 text-black font-semibold checkout-text">
        Checkout
      </h2>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6 ">
        <CheckoutForm
          checkoutData={checkoutData}
          selectedPayment={selectedPayment}
          setSelectedPayment={setSelectedPayment}
        />
        <OrderSummary
          checkoutData={checkoutData}
          handlePayment={handlePayment}
        />
      </div>
    </div>
  );
}
