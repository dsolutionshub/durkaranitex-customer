"use client";

import { useEffect, useState } from "react";

export default function OrderDetailsPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const dummyData = {
      orderId: "123457",
      product: {
        name: "Product Name",
        category: "Clothing",
        price: 500,
        quantity: 2,
      },
      subtotal: 1000,
      discount: 10,
      shipping: 50,
      total: 1040,
      customer: {
        name: "Loosu Preethi",
        email: "MentalPreethi@gmail.com",
        phone: "1234567890",
      },
      address: {
        line1: "123 Main St",
        line2: "Mental Hospital",
        city: "Chattanooga",
        state: "TN",
        zip: "37408",
        country: "United States",
      },
      payment: "UPI",
    };

    setOrder(dummyData);
  }, []);

  if (!order) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <p className="text-sm font-medium">
          Order ID: <span className="font-normal">#{order.orderId}</span>
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left section: Product & Billing */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-gray-100 rounded" />
              <div>
                <h2 className="font-semibold">{order.product.name}</h2>
                <p className="text-sm text-gray-600">
                  Category: {order.product.category}
                </p>
                <p className="text-sm">Price: Rs. {order.product.price}</p>
                <p className="text-sm">Qty: {order.product.quantity}</p>
                <p className="font-semibold mt-2">
                  Total: Rs. {order.subtotal}
                </p>
              </div>
            </div>

            <div className="pt-4 text-sm text-gray-700 space-y-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {order.subtotal}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Coupon Code (SAVE10)</span>
                <span>- Rs. {order.discount}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Rs. {order.shipping}</span>
              </div>
              <div className="flex justify-between font-semibold text-black pt-2 border-t">
                <span>Total</span>
                <span>Rs. {order.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right section: Customer and Shipping Info */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-semibold mb-2">Customer Information</h4>
            <ul className="text-sm space-y-1">
              <li>
                <strong>Customer:</strong> {order.customer.name}
              </li>
              <li>
                <strong>Email:</strong> {order.customer.email}
              </li>
              <li>
                <strong>Phone:</strong> {order.customer.phone}
              </li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-semibold mb-2">Shipping Address</h4>
            <ul className="text-sm space-y-1">
              <li>
                {order.address.line1}, {order.address.line2}
              </li>
              <li>
                {order.address.city}, {order.address.state} {order.address.zip}
              </li>
              <li>{order.address.country}</li>
              <li>
                <strong>Payment Method:</strong> {order.payment}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
