import React from "react";
import { RefreshCw, Shield, Clock, CheckCircle } from "lucide-react";

import CustomBreadCrumb from "../components/CustomBreadCrumb";
import { REPLACEMENT_POLICY_MODEL } from "../utils/constants";

const ReturnPolicy = () => {
  return (
    <>
      <CustomBreadCrumb
        model={REPLACEMENT_POLICY_MODEL}
        title={"Replacement Policy"}
      />
      <main className="p-6 sm:p-8  max-w-7xl mx-auto">
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-6">
              Our Commitment to You
            </h2>
            <p className="text-black leading-relaxed mb-4">
              We want you to love your saree! If for any reason you&apos;re not
              completely satisfied with your purchase, we offer hassle-free
              replacements to ensure your complete satisfaction. Please note
              that we offer replacements only - no refunds.
            </p>
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg border-l-4 border-pink-500">
              <div className="flex items-center mb-2">
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                  <RefreshCw className="w-5 h-5 text-pink-600" />
                </div>
                <span className="text-pink-800 font-semibold flex items-center h-5">
                  Replacement Only Policy
                </span>
              </div>
              <p className="text-black">
                We provide product replacements instead of monetary refunds to
                ensure you get the perfect saree for your needs.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-6">
              Replacement Timeframe
            </h2>
            <div className="bg-pink-50 p-6 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <Clock className="w-6 h-6 text-pink-600" />
                </div>
                <span className="text-black font-semibold text-lg flex items-center h-6">
                  1-Day Replacement Window
                </span>
              </div>
              <p className="text-black">
                You may request a replacement within 1 day of delivery, provided
                the saree meets our replacement conditions.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-6">
              Replacement Conditions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 flex items-center justify-center mr-2">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-lg font-semibold text-green-800 flex items-center h-6">
                    Eligible for Replacement
                  </span>
                </div>

                <ul className="text-black space-y-2 list-disc pl-5">
                  <li>Saree is in original condition</li>
                  <li>All tags and labels attached</li>
                  <li>No signs of wear or alteration</li>
                  <li>Original packaging included</li>
                  <li>No odors (perfume, smoke, etc.)</li>
                  <li>Manufacturing defects or damage</li>
                  <li>Wrong item sent</li>
                  <li>Size or color discrepancy</li>
                </ul>
              </div>
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 flex items-center justify-center mr-2">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <span className="text-lg font-semibold text-red-800 flex items-center h-6">
                    Not Eligible for Replacement
                  </span>
                </div>

                <ul className="text-black space-y-2 list-disc pl-5">
                  <li>Customized or altered sarees</li>
                  <li>Items worn or washed</li>
                  <li>Sarees with missing tags</li>
                  <li>Items damaged by misuse</li>
                  <li>Sale or clearance items</li>
                  <li>Requests after 15 days</li>
                  <li>Change of mind without defect</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-1xl font-bold text-black mb-4">
              How to Request a Replacement
            </h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((step, idx) => {
                const steps = [
                  {
                    title: "Contact Our Team",
                    desc: "Email us at dhuragaranitex@gmail.com or call +91 98765 43210 to initiate your replacement request. Please have your order number ready.",
                  },
                  {
                    title: "Quality Check & Approval",
                    desc: "Our team will review your request and may ask for photos. Once approved, we'll send you replacement instructions and a prepaid return label.",
                  },
                  {
                    title: "Send Back the Item",
                    desc: "Pack your saree securely in the original packaging and ship it back using our prepaid return label.",
                  },
                  {
                    title: "Receive Your Replacement",
                    desc: "Once we receive and inspect your return, we'll ship your replacement within 3-5 business days.",
                  },
                ];
                const stepData = steps[idx];
                return (
                  <div
                    key={idx}
                    className="flex items-start bg-white px-4 py-3 rounded-md border shadow-sm"
                  >
                    <div className="bg-gradient-to-r from-green-800 to-green-800 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3 mt-1">
                      {step}
                    </div>
                    <div>
                      <h3 className="font-medium text-black mb-1">
                        {stepData.title}
                      </h3>
                      <p className="text-medium text-black">{stepData.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-6">
              Replacement Options
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg">
                <RefreshCw className="w-12 h-12 text-pink-600 mx-auto mb-3" />
                <h3 className="font-semibold text-black mb-2">Same Product</h3>
                <p className="text-black text-sm">
                  Replace with the exact same saree if available in stock
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                <Shield className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-black mb-2">Similar Style</h3>
                <p className="text-black text-sm">
                  Choose a similar saree of equal or higher value
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg">
                <CheckCircle className="w-12 h-12 text-pink-600 mx-auto mb-3" />
                <h3 className="font-semibold text-black mb-2">Store Credit</h3>
                <p className="text-black text-sm">
                  Receive store credit to use on any future purchase
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-6">
              Processing Timeline
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
              <ul className="text-gray-700 space-y-2 list-disc pl-5">
                <li>
                  <span className="inline font-bold text-black">
                    Request Review:
                  </span>{" "}
                  1–2 business days
                </li>
                <li>
                  <span className="inline font-bold text-black">
                    Return Processing:
                  </span>{" "}
                  2–3 business days after we receive the item
                </li>
                <li>
                  <span className="inline font-bold text-black">
                    Replacement Shipping:
                  </span>{" "}
                  3–5 business days
                </li>
                <li>
                  <span className="inline font-bold text-black">
                    Total Time:
                  </span>{" "}
                  7–10 business days from request approval
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-6">Need Help?</h2>
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-lg">
              <p className="text-black leading-relaxed mb-4">
                Our customer service team is here to help with your replacement
                needs! We&apos;re committed to ensuring you get the perfect
                saree.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-800">Email:</span>
                  <span className="ml-2 text-pink-600">
                    dhuragaranitex@gmail.com
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-800">Phone:</span>
                  <span className="ml-2 text-pink-600">+91 8838137113</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default ReturnPolicy;
