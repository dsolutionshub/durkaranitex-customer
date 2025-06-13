"use client";
import React, { useState } from "react";
import ToggleSwitch from "./components/ToggleSwitch";
import { FiCreditCard } from "react-icons/fi";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { RiDeleteBinLine } from "react-icons/ri";
import Image from "next/image";

export default function CheckoutPage() {
  const [showContactAddress, setShowContactAddress] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("payNow");

  return (
    <div className="min-h-screen  py-10 px-4">
      <h2 className="text-2xl text-center pb-4 text-black font-semibold checkout-text">
        Checkout
      </h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="font-semibold text-black mb-4">
              Customer Information
            </h4>
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
              <div className="w-[21.5rem]">
                <label className="block text-medium text-black font-medium">
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded-md px-2 py-1 text-black placeholder-black"
                  placeholder="Enter your Name"
                />
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
                  <div className="w-[21.5rem]">
                    <label className="block text-medium text-black font-medium">
                      Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-md px-2 py-1 text-black placeholder-black"
                      placeholder="Enter your Name"
                    />
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
                    For Cash on Delivery (COD) orders, shipping charges of ₹225
                    must be paid upfront through our payment gateway. The
                    remaining product amount will be collected in cash at the
                    time of delivery
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="font-semibold text-black mb-4">Order Details</h4>
            <h5 className="font-semibold text-black mb-4">Product Summary</h5>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3 border-b border-gray-300 pb-3">
                <div className="h-14 w-14 flex-shrink-0 bg-neutral-light rounded-md overflow-hidden">
                  <Image
                    alt="image"
                    src={"/images/1.jpeg"}
                    width={50}
                    height={50}
                    className="h-14 w-14 flex-shrink-0 bg-neutral-light rounded-md overflow-hidden"
                  />
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-black m-0">
                    Premium Wireless Headphones
                  </p>
                  <div className="flex justify-between">
                    <p className="text-gray-500 m-0">Qty: 1</p>
                    <p className="text-gray-500 m-0">₹2,499</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-black font-semibold">₹2,499</p>
                  <div className="flex items-center gap-1">
                    <RiDeleteBinLine className="text-red-600" />
                    <button className="text-red-600 text-sm">Remove</button>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 border-b border-gray-300 pb-3">
                <div className="h-14 w-14 flex-shrink-0 bg-neutral-light rounded-md overflow-hidden">
                  <Image
                    alt="image"
                    src={"/images/1.jpeg"}
                    width={50}
                    height={50}
                    className="h-14 w-14 flex-shrink-0 bg-neutral-light rounded-md overflow-hidden"
                  />
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-black m-0">
                    Premium Wireless Headphones
                  </p>
                  <div className="flex justify-between">
                    <p className="text-gray-500 m-0">Qty: 1</p>
                    <p className="text-gray-500 m-0">₹2,499</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-black font-semibold">₹2,499</p>
                  <div className="flex items-center gap-1">
                    <RiDeleteBinLine className="text-red-600" />
                    <button className="text-red-600 text-sm">Remove</button>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 border-b border-gray-300 pb-3">
                <div className="h-14 w-14 flex-shrink-0 bg-neutral-light rounded-md overflow-hidden">
                  <Image
                    alt="image"
                    src={"/images/1.jpeg"}
                    width={50}
                    height={50}
                    className="h-14 w-14 flex-shrink-0 bg-neutral-light rounded-md overflow-hidden"
                  />
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-black m-0">
                    Premium Wireless Headphones
                  </p>
                  <div className="flex justify-between">
                    <p className="text-gray-500 m-0">Qty: 1</p>
                    <p className="text-gray-500 m-0">₹2,499</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-black font-semibold">₹2,499</p>
                  <div className="flex items-center gap-1 cursor-pointer">
                    <RiDeleteBinLine className="text-red-600" />
                    <button className="text-red-600 text-sm">Remove</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5 bg-muted p-6 rounded-lg shadow-sm">
            <h5 className="font-semibold text-black mb-4">Payment Summary</h5>
            <div className="text-sm space-y-3">
              <div className="flex justify-between text-black font-medium">
                <span>Subtotal (4 items)</span>
                <span>₹7,296</span>
              </div>
              <div className="flex items-center space-x-2 gap-2">
                <input
                  type="text"
                  className="flex-grow border rounded-md p-2 bg-white"
                  placeholder="Enter coupon code"
                />
                <button className="bg-green-800 text-white py-2 px-3 rounded ">
                  Apply
                </button>
              </div>
              <div className="flex justify-between text-black font-medium">
                <span>Shipping Charges</span>
                <span>₹225</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-xl text-black font-semibold">
                <span>Total</span>
                <span>₹7,521</span>
              </div>
              <button className="w-full mt-3 bg-green-800 text-white py-2 rounded">
                Pay Now ₹7,521
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
