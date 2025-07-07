"use client";
import { useRouter } from "next/navigation";
import { XCircle, RefreshCw, Home } from "lucide-react";
import "./style.css";

const OrderFailure = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <div className="relative mb-6">
              <XCircle
                size={80}
                className="mx-auto text-red-600 animate-checkmark"
              />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in dark-color">
              Payment Failed
            </h1>
            <p className="text-gray-600 mb-6 animate-fade-in delay-200">
              We couldn&apos;t process your payment. Please check your payment
              details and try again.
            </p>

            <div className="bg-red-50 border border-red-200 rounded-lg shadow-sm p-4 mb-6 animate-fade-in delay-400">
              <p className="text-sm text-red-600 mb-1">Transaction ID</p>
              <p className="text-lg font-semibold text-red-900">TXN123456789</p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 animate-fade-in delay-500">
              <h3 className="text-sm font-semibold text-rose-700 mb-2">
                Reasons for payment failure:
              </h3>

              <ul className="text-sm text-amber-700 text-left space-y-1">
                <li>• Insufficient funds in your account</li>
                <li>• Incorrect card details or expired card</li>
                <li>• Network connectivity issues</li>
                <li>• Card blocked by your bank</li>
              </ul>
            </div>
          </div>

          <div className="d-flex flex-column flex-lg-row align-items-lg-center w-full lg:gap-2">
            <button
              onClick={() => router.push("/checkout")}
              className="flex-grow-1 flex items-center justify-center bg-red-600 
              text-white py-2 gap-2 rounded hover:bg-red-700 transition-all duration-200 hover:scale-105"
            >
              <RefreshCw size={20} />
              Back to Checkout
            </button>

            <button
              onClick={() => router.push("/shop")}
              className="flex-grow-1 py-2 border rounded hover:bg-red-100 dark-color
              transition-all duration-200 hover:scale-105"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => router.push("/")}
              className="flex-grow-1 flex items-center rounded justify-center  py-2 gap-2 dark-color 
              hover:bg-red-100 transition-all duration-200 hover:scale-105"
            >
              <Home size={20} />
              Back to Home
            </button>
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg animate-fade-in delay-800">
            <p className="text-sm text-blue-800">
              Need help? Contact our support team at{" "}
              <a
                href="tel:+1234567890"
                className="font-semibold underline hover:text-blue-900"
              >
                +91-1234567890
              </a>{" "}
              or{" "}
              <a
                href="mailto:support@yoursareeshop.com"
                className="font-semibold underline hover:text-blue-900"
              >
                support@yoursareeshop.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFailure;
