"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, ShoppingBag, Home } from "lucide-react";
import "./style.css";

const colors = [
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
];
const glitterColors = ["#ffd700", "#ffeb3b", "#fff59d", "#f0f4c3"];

const OrderSuccess = ({ payment_id }) => {
  const router = useRouter();
  const [showPartyBurst, setShowPartyBurst] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    setShowPartyBurst(true);
    const id = sessionStorage.getItem("order_id");
    setOrderId(id);
    const timer = setTimeout(() => setShowPartyBurst(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleViewOrders = () => {
    sessionStorage.setItem("tab", "orders");
    router.push("/account");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showPartyBurst && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {[...Array(30)].map((_, i) => (
            <div
              key={`confetti-${i}`}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                backgroundColor:
                  colors[Math.floor(Math.random() * colors.length)],
                animationDelay: `${Math.random() * 2}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              }}
            />
          ))}
          {[...Array(40)].map((_, i) => (
            <div
              key={`glitter-${i}`}
              className="glitter"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-5px`,
                backgroundColor:
                  glitterColors[
                    Math.floor(Math.random() * glitterColors.length)
                  ],
                animationDelay: `${Math.random() * 1.5}s`,
              }}
            />
          ))}
          {[...Array(15)].map((_, i) => (
            <div
              key={`ribbon-${i}`}
              className="ribbon"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                backgroundColor:
                  colors[Math.floor(Math.random() * colors.length)],
                animationDelay: `${Math.random() * 1.2}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
          <div className="confetti-line line-1"></div>
          <div className="confetti-line line-2"></div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        <div className="max-w-sm sm:max-w-md lg:max-w-lg mx-auto text-center">
          <div className="mb-6 sm:mb-8">
            <div className="relative mb-4 sm:mb-6">
              <CheckCircle
                size={60}
                className="mx-auto text-[var(--primary-main)] animate-checkmark sm:w-20 sm:h-20"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold dark-color mb-3 sm:mb-4 animate-fade-in">
              Order Confirmed!
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-2 animate-fade-in">
              Thank you for your purchase! Your order has been successfully
              placed and is being processed.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6 animate-fade-in">
              <div className="space-y-2 sm:space-y-3">
                <div>
                  <p className="text-xs sm:text-sm text-[var(--primary-main)] mb-1">
                    Order Number
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-[var(--primary-main)]">
                    {orderId}
                  </p>
                </div>
                <div className="border-t border-green-200 pt-2 sm:pt-3">
                  <p className="text-xs sm:text-sm text-[var(--primary-main)] mb-1">
                    Payment ID
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-[var(--primary-main)]">
                    {payment_id}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8 animate-fade-in">
              <h3 className="text-xs sm:text-sm font-semibold dark-color mb-2">
                What happens next?
              </h3>
              <ul className="text-xs text-blue-700 text-left space-y-1">
                <li>• You&apos;ll receive a confirmation email shortly</li>
                <li>• Your order will be processed within 24 hours</li>
                <li>• You&apos;ll get tracking information once shipped</li>
                <li>• Estimated delivery: 3-5 business days</li>
              </ul>
            </div>
          </div>

          <div className="d-flex flex-column flex-lg-row align-items-lg-center w-full lg:gap-2">
            <button
              onClick={handleViewOrders}
              className="flex-grow-1 flex items-center justify-center bg-[var(--primary-main)] 
              text-white py-2 gap-2 rounded hover:bg-[var(--primary-dark)] transition-all duration-200 hover:scale-105"
            >
              <ShoppingBag size={20} />
              View My Orders
            </button>

            <button
              onClick={() => router.push("/shop")}
              className="flex-grow-1 py-2 border rounded hover:bg-[var(--primary-light)] 
              transition-all duration-200 hover:scale-105 text-[var(--primary-main)]"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => router.push("/")}
              className="flex-grow-1 flex items-center rounded justify-center  py-2 gap-2 
              hover:bg-[var(--primary-light)] transition-all duration-200 hover:scale-105 text-[var(--primary-main)]"
            >
              <Home size={20} />
              Back to Home
            </button>
          </div>

          <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-lg animate-fade-in">
            <p className="text-xs sm:text-sm text-amber-800">
              Need help with your order? Contact us at{" "}
              <a
                href="tel:9952252964"
                className="font-semibold underline hover:text-amber-900 break-all"
              >
                +91 9952252964
              </a>{" "}
              or{" "}
              <a
                href="dhuragaranitex@gmail.com"
                className="font-semibold underline hover:text-amber-900 break-all"
              >
                dhuragaranitex@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
