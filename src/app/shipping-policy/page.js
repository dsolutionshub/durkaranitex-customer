import React from "react";
import CustomBreadCrumb from "../components/CustomBreadCrumb";
import { SHIPPING_POLICY_MODEL } from "../utils/constants";
import { Truck, Clock, MapPin, Package } from "lucide-react";

const ShippingPolicy = () => {
  return (
    <>
      <CustomBreadCrumb
        model={SHIPPING_POLICY_MODEL}
        title={"Shipping Policy"}
      />
      {/* Content  */}
      <main className="p-6 sm:p-8  max-w-7xl mx-auto">
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Shipping Information
            </h2>
            <p className="text-black leading-relaxed mb-6">
              We&apos;re committed to delivering your beautiful sarees safely
              and efficiently. Here&apos;s everything you need to know about our
              shipping process and policies.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-pink-50 rounded-lg">
                <Package className="w-12 h-12 text-pink-600 mx-auto mb-3" />
                <h3 className="font-semibold text-black mb-2">
                  Secure Packaging
                </h3>
                <p className="text-black text-sm">
                  Eco-friendly materials with care instructions
                </p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <Truck className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-black mb-2">Fast Delivery</h3>
                <p className="text-black text-sm">
                  Express shipping options available
                </p>
              </div>
              <div className="text-center p-6 bg-pink-50 rounded-lg">
                <MapPin className="w-12 h-12 text-pink-600 mx-auto mb-3" />
                <h3 className="font-semibold text-black mb-2">Pan India</h3>
                <p className="text-black text-sm">
                  Delivery across all major cities
                </p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <Clock className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-black mb-2">Tracking</h3>
                <p className="text-black text-sm">Real-time order tracking</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Processing Time
            </h2>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <p className="text-black mb-4">
                <strong>Order Processing:</strong> All orders are processed
                within 1-2 business days. Orders placed after 2 PM on Friday
                will be processed on the next Monday.
              </p>
              <ul className="text-black space-y-2">
                <li>
                  • <strong>Ready-to-ship sarees:</strong> 1 business day
                </li>
                <li>
                  • <strong>Custom alterations:</strong> 3-5 business days
                </li>
                <li>
                  • <strong>Pre-order items:</strong> As specified on product
                  page
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Delivery Locations
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: "#C2185B" }}
                >
                  We Deliver To
                </h3>

                <ul className="text-black space-y-2">
                  <li>• All major cities across India</li>
                  <li>• Tier 2 and Tier 3 cities</li>
                  <li>• Rural areas with postal service</li>
                  <li>• P.O. Box addresses</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: "#C2185B" }}
                >
                  Delivery Restrictions
                </h3>

                <ul className="text-black space-y-2">
                  <li>• Remote areas may take additional time</li>
                  <li>• Some pincodes require advance payment</li>
                  <li>• Military/security areas need verification</li>
                  <li>• International shipping not available</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Packaging
            </h2>
            <p className="text-black leading-relaxed mb-4">
              Your sarees are carefully packaged to ensure they arrive in
              perfect condition:
            </p>
            <ul className="text-black space-y-2">
              <li>• Acid-free tissue paper to protect delicate fabrics</li>
              <li>• Moisture-resistant packaging</li>
              <li>• Eco-friendly and recyclable materials</li>
              <li>• Care instructions included with each order</li>
              <li>• Gift wrapping available upon request</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Order Tracking
            </h2>
            <p className="text-black leading-relaxed mb-4">
              Once your order ships, you&apos;ll receive:
            </p>
            <ul className="text-black space-y-2">
              <li>• Shipping confirmation email with tracking number</li>
              <li>• SMS updates on delivery status</li>
              <li>• Real-time tracking through our website</li>
              <li>• Delivery confirmation upon receipt</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Shipping Issues
            </h2>
            <p className="text-black leading-relaxed mb-4">
              If you experience any shipping-related issues:
            </p>
            <ul className="text-black space-y-2">
              <li>• Contact us immediately at dhuragaranitex@gmail.com</li>
              <li>• Provide your order number and tracking details</li>
              <li>
                • We&apos;ll work with our courier partners to resolve issues
                quickly
              </li>
              <li>• Replacement shipping for damaged or lost packages</li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
};

export default ShippingPolicy;
