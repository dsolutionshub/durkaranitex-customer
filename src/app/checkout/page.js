"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import CheckoutForm from "./components/CheckoutForm";
import OrderSummary from "./components/OrderSummary";
import { getErrorMessage, loadRazorpayScript } from "../utils/helperFn";
import {
  getCheckoutList,
  payment,
  removeCart,
} from "../api/services/authService";
import { loader } from "../components/loader/loaderManager";
import { useRouter } from "next/navigation";
import { initiateRazorpayPayment } from "../utils/initiateRazorpay";
import { LOGIN_MSG } from "../utils/constants";
import Loader from "../components/loader/loader";

export default function CheckoutPage() {
  const router = useRouter();

  const [checkoutData, setCheckoutData] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("payNow");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

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
      if (selectedPayment === "payNow") {
        await loadRazorpayScript();
        initiateRazorpayPayment({ order: data });
      } else {
        toast.success("Order placed successfully (Cash on Delivery)");
        router.push("/payment-status?status=success");
      }
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.success(MSG);
      const status = error?.response?.status;
      if (status === 401) {
        sessionStorage.setItem("postLoginRedirect", "/checkout");
        router.push("/login");
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

  useEffect(() => {
    handleCheckoutList();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    if (!token || token === "undefined") {
      toast.error(LOGIN_MSG);
      router.replace("/login");
    } else {
      setIsCheckingAuth(false);
    }
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 md:mx-3 m-3 md:m-0">
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
        />
      </div>
    </div>
  );
}
