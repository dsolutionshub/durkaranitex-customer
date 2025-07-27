"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

import CheckoutForm from "./components/CheckoutForm";
import OrderSummary from "./components/OrderSummary";
import Loader from "../components/loader/loader";
import { loader } from "../components/loader/loaderManager";

import {
  getCheckoutList,
  payment,
  removeCart,
} from "../api/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import { getErrorMessage, loadRazorpayScript } from "../utils/helperFn";
import { initiateRazorpayPayment } from "../utils/initiateRazorpay";
import {
  LOGIN_MSG,
  PAYMENT_METHOD,
  SELECT_ADDRESS_ERROR_MSG,
} from "../utils/constants";

export default function CheckoutPage() {
  const router = useRouter();
  const userData = useAuthStore((state) => state.userData);

  const [checkoutData, setCheckoutData] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("payNow");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const handlePayment = async () => {
    if (selectedPayment === "") {
      toast.error(PAYMENT_METHOD);
      return;
    }

    if (!checkoutData?.address) {
      toast.error(SELECT_ADDRESS_ERROR_MSG);
      return;
    }

    loader(true);
    try {
      const data = await payment({
        checkout_id: checkoutData?.checkout_id,
        payment_type:
          selectedPayment === "payLater"
            ? "cod"
            : selectedPayment === "payNow"
            ? "online"
            : "",
      });
      sessionStorage.setItem("order_id", data?.order_id);
      await loadRazorpayScript();
      initiateRazorpayPayment({ order: data, customer: userData });
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
      const status = error?.response?.status;
      if (status === 401) {
        sessionStorage.setItem("postLoginRedirect", "/checkout");
        router.push("/login");
        return;
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
      if (selectedPayment === "payLater") {
        if (!data?.delivery_fee?.isCodAvailable) {
          setSelectedPayment("");
        }
      }
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  const removeFromCart = async (id) => {
    loader(true);
    try {
      const data = await removeCart({
        cart_id: id,
      });
      handleCheckoutList();
      toast.success(data?.message);
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  const handleNavigateHome = () => {
    router.push("/");
  };

  useEffect(() => {
    handleCheckoutList();
  }, [handleCheckoutList]);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    if (!token || token === "undefined") {
      toast.error(LOGIN_MSG);
      router.replace("/login");
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  if (isCheckingAuth) {
    return (
      <div className="h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-1 md:mx-3 m-3 md:m-0">
      <div className="flex items-center justify-center mb-4">
        <Image
          src={"/images/home/logo.svg"}
          height={100}
          width={400}
          alt="logo"
          className="h-[3.5rem] w-[12rem] cursor-pointer "
          onClick={handleNavigateHome}
        />
      </div>

      <h2 className="text-2xl text-center pb-1 md:pb-4 text-black font-semibold checkout-text">
        Checkout
      </h2>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6 ">
        <CheckoutForm
          checkoutData={checkoutData}
          selectedPayment={selectedPayment}
          setSelectedPayment={setSelectedPayment}
          handleCheckoutList={handleCheckoutList}
        />
        <OrderSummary
          checkoutData={checkoutData}
          handlePayment={handlePayment}
          removeFromCart={removeFromCart}
          selectedPayment={selectedPayment}
        />
      </div>
    </div>
  );
}
