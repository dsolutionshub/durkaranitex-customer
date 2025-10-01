import React from "react";
import {
  Shield,
  FileText,
  CreditCard,
  Truck,
  RefreshCw,
  Users,
  Scale,
  AlertTriangle,
} from "lucide-react";
import CustomBreadCrumb from "../components/CustomBreadCrumb";
import { TERMS_AND_CONDITIONS_MODEL } from "../utils/constants";

const TermsAndConditions = () => {
  return (
    <>
      <CustomBreadCrumb
        model={TERMS_AND_CONDITIONS_MODEL}
        title={"Terms and Conditions"}
      />

      <main className="p-6 sm:p-8 max-w-7xl mx-auto">
        <div className="prose max-w-none">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg mb-8 border border-green-200">
            <div className="flex items-center mb-3">
              <div className="w-6 h-6 flex items-center justify-center mr-3">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-green-800 font-semibold text-lg flex items-center h-6">
                Agreement Terms
              </span>
            </div>

            <p className="text-black mb-2">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>
            <p className="text-black">
              By using our saree e-commerce website, you agree to these terms
              and conditions. Please read them carefully.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-6">
              1. Acceptance of Terms
            </h2>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <div className="flex items-center mb-3">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-lg font-semibold text-blue-800 flex items-center h-6">
                  Service Agreement
                </span>
              </div>

              <p className="text-black leading-relaxed">
                By accessing and using our saree e-commerce website, you accept
                and agree to be bound by the terms and provision of this
                agreement. If you do not agree to abide by the above, please do
                not use this service.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-6">
              2. Product Information
            </h2>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-lg font-semibold text-purple-800 flex items-center h-6">
                  Saree Specifications
                </span>
              </div>

              <ul className="text-black space-y-2">
                <li>
                  • All saree descriptions, images, and specifications are
                  provided for informational purposes
                </li>
                <li>
                  • Colors may vary slightly due to screen settings and
                  photography
                </li>
                <li>
                  • Handwoven sarees may have minor variations as they are
                  artisan-made
                </li>
                <li>• Weight and measurements are approximate</li>
                <li>
                  • We reserve the right to update product information without
                  prior notice
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="ttext-2xl font-bold text-black mb-6">
              3. Pricing and Payment
            </h2>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-lg font-semibold text-green-800 flex items-center h-6">
                  Payment Terms
                </span>
              </div>

              <ul className="text-black space-y-3">
                <li>
                  • All prices are listed in Indian Rupees (INR) and are
                  inclusive of applicable taxes
                </li>
                <li>• Prices are subject to change without prior notice</li>
                <li>• Payment must be completed before order processing</li>
                <li>
                  • We accept credit cards, debit cards, UPI, and net banking
                </li>
                <li>• Cash on delivery available for select locations</li>
                <li>• Failed payments will result in order cancellation</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-6">
              4. Order Processing and Fulfillment
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 flex items-center justify-center mr-2">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="font-semibold text-gray-800 flex items-center h-6">
                    Order Confirmation
                  </span>
                </div>

                <p className="text-black text-sm">
                  Receipt of an order number does not constitute acceptance of
                  an order. We reserve the right to accept or decline orders for
                  any reason.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 flex items-center justify-center mr-2">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="font-semibold text-gray-800 flex items-center h-6">
                    Stock Availability
                  </span>
                </div>

                <p className="text-black text-sm">
                  All items are subject to availability. In case of stock
                  unavailability, we will notify you within 24 hours and offer
                  alternatives or full refund.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-6">
              5. Shipping and Delivery
            </h2>
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <Truck className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-lg font-semibold text-orange-800 flex items-center h-6">
                  Delivery Terms
                </span>
              </div>

              <ul className="text-black space-y-2">
                <li>• Delivery timeframes are estimates and not guaranteed</li>
                <li>
                  • Risk of loss and title pass to you upon delivery to the
                  carrier
                </li>
                <li>
                  • You must inspect packages upon delivery and report damage
                  immediately
                </li>
                <li>
                  • Redelivery charges may apply for failed delivery attempts
                </li>
                <li>
                  • Address changes after order confirmation may incur
                  additional charges
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="ttext-2xl font-bold text-black mb-6">
              6. Returns and Refunds
            </h2>
            <div className="bg-pink-50 p-6 rounded-lg border border-pink-200">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <RefreshCw className="w-6 h-6 text-pink-600" />
                </div>
                <span className="text-lg font-semibold text-pink-800 flex items-center h-6">
                  Return Policy
                </span>
              </div>

              <p className="text-black leading-relaxed mb-4">
                Returns and refunds are governed by our Return Policy. Key
                points include:
              </p>
              <ul className="text-black space-y-2">
                <li>• 15-day return window for eligible items</li>
                <li>
                  • Items must be in original condition with tags attached
                </li>
                <li>• Customized sarees are not eligible for return</li>
                <li>• Return shipping costs may apply</li>
                <li>• Refunds processed within 5-7 business days</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="ttext-2xl font-bold text-black mb-6">
              7. User Responsibilities
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 flex items-center justify-center mr-2">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-lg font-semibold text-green-800 flex items-center h-6">
                    You Agree To
                  </span>
                </div>

                <ul className="text-black space-y-2">
                  <li>• Provide accurate information</li>
                  <li>• Maintain account security</li>
                  <li>• Use the website lawfully</li>
                  <li>• Respect intellectual property</li>
                  <li>• Pay for orders promptly</li>
                </ul>
              </div>
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 flex items-center justify-center mr-2">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <span className="text-lg font-semibold text-red-800 flex items-center h-6">
                    You Will Not
                  </span>
                </div>

                <ul className="text-black space-y-2">
                  <li>• Use false information</li>
                  <li>• Violate any laws</li>
                  <li>• Interfere with website operation</li>
                  <li>• Copy or distribute content</li>
                  <li>• Create multiple accounts</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-6">
              8. Intellectual Property
            </h2>
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <Shield className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="text-lg font-semibold text-indigo-800 flex items-center h-6">
                  Copyright Protection
                </span>
              </div>

              <p className="text-black leading-relaxed">
                All content on this website, including but not limited to text,
                graphics, logos, images, and software, is the property of our
                company or our content suppliers and is protected by Indian and
                international copyright laws.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="ttext-2xl font-bold text-black mb-6">
              9. Limitation of Liability
            </h2>
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-lg font-semibold text-yellow-800 flex items-center h-6">
                  Liability Limits
                </span>
              </div>

              <p className="text-black leading-relaxed mb-4">
                Our liability is limited to the maximum extent permitted by law.
                We shall not be liable for:
              </p>
              <ul className="text-black space-y-2">
                <li>• Indirect, incidental, or consequential damages</li>
                <li>• Loss of profits, data, or business opportunities</li>
                <li>• Damages exceeding the order value</li>
                <li>• Issues arising from misuse of products</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-6">
              10. Governing Law
            </h2>
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <Scale className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-lg font-semibold text-purple-800 flex items-center h-6">
                  Legal Jurisdiction
                </span>
              </div>

              <p className="text-black leading-relaxed">
                These terms shall be governed by and construed in accordance
                with the laws of India. Any disputes arising under these terms
                shall be subject to the exclusive jurisdiction of the courts in
                Salem, Tamil Nadu.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-6">
              11. Contact Information
            </h2>
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg border">
              <p className="text-gray-700 leading-relaxed mb-4">
                For any questions regarding these Terms and Conditions, please
                don&apos;t hesitate to contact us:
              </p>
              <div className="grid md:grid-cols-2 gap-1">
                <div>
                  <p className="font-semibold text-gray-800">Email:</p>
                  <p className="text-pink-600">dhuragaranitex@gmail.com</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Phone:</p>
                  <p className="text-pink-600">+91 9952252964</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default TermsAndConditions;
