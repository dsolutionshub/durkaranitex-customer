"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { FiCreditCard } from "react-icons/fi";
import { LiaRupeeSignSolid } from "react-icons/lia";

import { useAuthStore } from "@/store/useAuthStore";
import ToggleSwitch from "./ToggleSwitch";

export default function CheckoutForm() {
  const { data: session, status } = useSession();
  const { syncAccessToken } = useAuthStore();

  const [showContactAddress, setShowContactAddress] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("payNow");

  useEffect(() => {
    if (status === "authenticated") {
      syncAccessToken(session);
    }
  }, [status, session, syncAccessToken]);

  return (
    <div className="md:col-span-2 space-y-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h4 className="font-semibold text-black mb-4">Customer Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-medium text-black font-medium">
              Email Address <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              className="w-full border rounded-md px-2 py-1 text-black placeholder-black"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-medium text-black font-medium">
              Phone Number <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-2 py-1 text-black placeholder-black"
              placeholder="10-digit mobile number"
            />
          </div>
        </div>

        <h4 className="font-semibold text-black my-4">Shipping Address</h4>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <label className="block text-medium text-black font-medium">
                Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="w-full border rounded-md px-2 py-1 text-black placeholder-black"
                placeholder="Enter your Name"
              />
            </div>
          </div>
          <div>
            <label className="block text-medium text-black font-medium">
              Street Address <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-2 py-1 text-black placeholder-black"
              placeholder="Enter your street address"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-medium text-black font-medium">
                City <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="w-full border rounded-md px-2 py-1 text-black placeholder-black"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-medium text-black font-medium">
                State <span className="text-red-600">*</span>
              </label>
              <select className="w-full border rounded-md px-2 py-1 text-black">
                <option>Select state</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-medium text-black font-medium">
              PIN Code <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-2 py-1 mb-3 text-black placeholder-black"
              placeholder="6-digit PIN code"
            />
          </div>
          <ToggleSwitch
            enabled={showContactAddress}
            setEnabled={setShowContactAddress}
          />
        </div>
        {!showContactAddress && (
          <div>
            <h4 className="font-semibold text-black mb-4 mt-3">
              Contact Address
            </h4>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label className="block text-medium text-black font-medium">
                    Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-2 py-1 text-black placeholder-black"
                    placeholder="Enter your Name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-medium text-black font-medium">
                  Street Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded-md px-2 py-1 text-black placeholder-black"
                  placeholder="Enter your street address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-medium text-black font-medium">
                    City <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-2 py-1 text-black placeholder-black"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-medium text-black font-medium">
                    State <span className="text-red-600">*</span>
                  </label>
                  <select className="w-full border rounded-md px-2 py-1 text-black placeholder-black">
                    <option>Select state</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-medium text-black font-medium">
                  PIN Code <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded-md px-2 py-1 text-black placeholder-black"
                  placeholder="6-digit PIN code"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-medium text-black font-medium mb-4">
          Payment Method
        </h3>
        <div className="space-y-4">
          <div
            className={
              "flex items-center border rounded-md px-3 py-2 cursor-pointer hover:bg-gray-100 "
            }
            onClick={() => setSelectedPayment("payNow")}
          >
            <input
              type="radio"
              name="payment"
              checked={selectedPayment === "payNow"}
              onChange={() => setSelectedPayment("payNow")}
              className="accent-green-800 mr-3 scale-115 cursor-pointer"
            />
            <FiCreditCard className="mr-2 ml-1" size={25} />
            <div>
              <p className="font-semibold m-0 text-dark h-5">Pay Now</p>
              <p className="text-gray-500 m-0">
                Pay securely online with credit/debit card
              </p>
            </div>
          </div>

          <div
            className={
              "flex items-center border rounded-md px-3 py-2 cursor-pointer hover:bg-gray-100 "
            }
            onClick={() => setSelectedPayment("payLater")}
          >
            <input
              type="radio"
              name="payment"
              checked={selectedPayment === "payLater"}
              onChange={() => setSelectedPayment("payLater")}
              className="accent-green-800 mr-3 scale-115 cursor-pointer"
            />
            <LiaRupeeSignSolid className="mr-2" size={25} />
            <div>
              <p className="font-semibold m-0 text-dark h-5">
                Pay Later (Cash on Delivery)
              </p>
              <p className="text-gray-500 m-0">
                Pay only for products at delivery time
              </p>
            </div>
          </div>

          {selectedPayment === "payLater" && (
            <div
              className={
                "flex items-center border rounded-md px-3 py-2.5 cursor-pointer bg-gray-100 "
              }
            >
              <p className="text-black text-sm m-0">
                For Cash on Delivery (COD) orders, shipping charges of ₹225 must
                be paid upfront through our payment gateway. The remaining
                product amount will be collected in cash at the time of delivery
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
