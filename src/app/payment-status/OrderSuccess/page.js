"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import "../payment-status.css";

const OrderSuccess = ({ payment_id }) => {
  const router = useRouter();
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const id = sessionStorage.getItem("order_id");
    setOrderId(id);
  }, []);

  const handleViewOrders = () => {
    sessionStorage.setItem("tab", "orders");
    router.push("/account");
  };

  return (
    <div className="aq-payment-status is-success">
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
                  <span>order confirmed</span>
                </div>
                <div className="aq-breadcrumb-content">
                  <h1 className="aq-breadcrumb-title">Order Confirmed</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="aq-payment-area">
        <div className="container">
          <div className="aq-payment-card">
            <div className="aq-payment-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14.5" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M9.5 16.4L13.8 20.6L22.5 11.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="aq-payment-title">Thank you for your order</h2>
            <p className="aq-payment-lead">
              Your payment was successful. We have received your order and will
              start preparing it right away.
            </p>

            <div className="aq-payment-meta">
              <div className="aq-payment-meta-row">
                <span>Order Number</span>
                <strong>{orderId || "-"}</strong>
              </div>
              <div className="aq-payment-meta-row">
                <span>Payment ID</span>
                <strong>{payment_id || "-"}</strong>
              </div>
            </div>

            <div className="aq-payment-box">
              <h3>What happens next?</h3>
              <ul>
                <li>You will receive a confirmation email shortly.</li>
                <li>Your order is typically delivered in 1 day.</li>
                <li>Replacement only. No refunds.</li>
                <li>Need help? Support is available Mon–Sat, 10am–7pm.</li>
              </ul>
            </div>

            <div className="aq-payment-actions">
              <button type="button" className="aq-btn-black" onClick={handleViewOrders}>
                View My Orders
              </button>
              <button
                type="button"
                className="aq-btn-outline"
                onClick={() => router.push("/shop")}
              >
                Continue Shopping
              </button>
              <button type="button" className="aq-btn-outline" onClick={() => router.push("/")}>
                Back to Home
              </button>
            </div>

            <p className="aq-payment-help">
              Need help with your order? Contact us at{" "}
              <a href="tel:+917904749251">+91 7904749251</a> or{" "}
              <a href="mailto:kavyacreation1471@gmail.com">
                kavyacreation1471@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderSuccess;
