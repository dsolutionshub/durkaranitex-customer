"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

import CheckoutForm from "./components/CheckoutForm";
import OrderSummary from "./components/OrderSummary";
import { LoaderComponent } from "../components/loader/loader";
import { loader } from "../components/loader/loaderManager";

import {
  applyCoupon,
  getCheckoutList,
  payment,
} from "../api/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import { getErrorMessage, loadRazorpayScript } from "../utils/helperFn";
import { initiateRazorpayPayment } from "../utils/initiateRazorpay";
import {
  LOGIN_MSG,
  PAYMENT_METHOD,
  SELECT_ADDRESS_ERROR_MSG,
} from "../utils/constants";

import "./checkout-page.css";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userData = useAuthStore((state) => state.userData);

  const [checkoutData, setCheckoutData] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("payNow");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isAnyProductNotCodAvailable, setIsAnyProductNotCodAvailable] =
    useState(false);

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
        coupon_code: checkoutData?.coupon_info?.code || "",
      });
      sessionStorage.setItem("order_id", data?.order_id);
      await loadRazorpayScript();
      initiateRazorpayPayment({ order: data, customer: userData });
    } catch (error) {
      const MSG = getErrorMessage(error);
      const responseStatus = error?.response?.status;
      if (responseStatus === 401) {
        sessionStorage.setItem("postLoginRedirect", "/checkout");
        router.push("/login");
        return;
      }
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  const handleCheckoutList = async () => {
    loader(true);
    try {
      const data = await getCheckoutList();
      setCheckoutData(data || []);

      const products = data?.products_list || [];
      const hasNonCodProduct = products.some(
        (item) => item?.product?.is_cod_available === "0"
      );
      setIsAnyProductNotCodAvailable(hasNonCodProduct);

      if (selectedPayment === "payLater") {
        if (!data?.delivery_fee?.isCodAvailable) {
          setSelectedPayment("");
        }
      }
      if (data?.coupon_info?.code) {
        setIsCouponApplied(true);
      }
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
      setIsPageLoading(false);
    }
  };

  const handleNavigateHome = () => {
    router.push("/");
  };

  const handleApplyCoupon = async () => {
    loader(true);
    try {
      const data = await applyCoupon({
        checkout_id: checkoutData?.checkout_id,
        coupon_code: couponCode,
      });
      if (couponCode === "") {
        setIsCouponApplied(false);
      } else {
        toast.success(data.message);
        setIsCouponApplied(true);
        setCouponCode("");
      }
      handleCheckoutList();
    } catch (error) {
      if (error?.status === 422 && error?.response?.data) {
        toast.error(error?.response?.data?.error?.[0]?.message);
        return;
      }
      const MSG = getErrorMessage(error);
      toast.error(MSG);
      setIsCouponApplied(false);
    } finally {
      loader(false);
    }
  };

  useEffect(() => {
    handleCheckoutList();
  }, []);

  useEffect(() => {
    if (status === "loading") return;

    const token = localStorage.getItem("accessToken");
    const sessionToken = session?.user?.accessToken;
    if ((!token || token === "undefined") && !sessionToken) {
      toast.error(LOGIN_MSG);
      router.replace("/login");
    } else {
      setIsCheckingAuth(false);
    }
  }, [router, status, session]);

  if (isCheckingAuth || isPageLoading) {
    return <LoaderComponent />;
  }

  return (
    <div className="aq-checkout-page">
      <div className="aq-checkout-brand">
        <Image
          src={"/images/home/KCLogo.png"}
          height={80}
          width={260}
          alt="Kavya Creation"
          onClick={handleNavigateHome}
          style={{ width: 260, height: "auto" }}
        />
      </div>

      <div className="aq-breadcrumb-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-12">
              <div className="aq-breadcrumb-wrap text-center">
                <div className="pd-breadcrumb-list">
                  <span>
                    <Link href="/">home</Link>
                  </span>
                  <span>/</span>
                  <span>checkout</span>
                </div>
                <div className="aq-breadcrumb-content">
                  <h1 className="aq-breadcrumb-title">Checkout Page</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="aq-checkout-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <CheckoutForm
                checkoutData={checkoutData}
                handleCheckoutList={handleCheckoutList}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                isCouponApplied={isCouponApplied}
                handleApplyCoupon={handleApplyCoupon}
              />
            </div>
            <div className="col-lg-5">
              <OrderSummary
                checkoutData={checkoutData}
                handlePayment={handlePayment}
                selectedPayment={selectedPayment}
                setSelectedPayment={setSelectedPayment}
                isAnyProductNotCodAvailable={isAnyProductNotCodAvailable}
                isCouponApplied={isCouponApplied}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
