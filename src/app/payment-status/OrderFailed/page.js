"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import "../payment-status.css";

const OrderFailure = ({ payment_id }) => {
  const router = useRouter();

  return (
    <div className="aq-payment-status is-failed">
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
                  <span>payment failed</span>
                </div>
                <div className="aq-breadcrumb-content">
                  <h1 className="aq-breadcrumb-title">Payment Failed</h1>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 14 14" fill="none">
                <path
                  d="M12.75 0.75L0.75 12.75M0.75 0.75L12.75 12.75"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h2 className="aq-payment-title">Something went wrong</h2>
            <p className="aq-payment-lead">
              We couldn&apos;t process your payment. Please check your payment
              details and try again.
            </p>

            {payment_id ? (
              <div className="aq-payment-meta d-none">
                <div className="aq-payment-meta-row">
                  <span>Payment ID</span>
                  <strong>{payment_id}</strong>
                </div>
              </div>
            ) : null}

            <div className="aq-payment-box">
              <h3>Reasons for payment failure</h3>
              <ul>
                <li>Insufficient funds in your account</li>
                <li>Incorrect card details or expired card</li>
                <li>Network connectivity issues</li>
                <li>Card blocked by your bank</li>
              </ul>
            </div>

            <div className="aq-payment-actions">
              <button
                type="button"
                className="aq-btn-black"
                onClick={() => router.push("/checkout")}
              >
                Back to Checkout
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
              Need help? Contact our support team at{" "}
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

export default OrderFailure;
