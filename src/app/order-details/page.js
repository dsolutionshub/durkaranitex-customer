"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getOrderDetails } from "../api/services/authService";
import Image from "next/image";
import Loader from "../components/loader/loader";

function OrderDetailsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [order, setOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [products, setProducts] = useState([]);

  const OrderDetails = async () => {
    console.log(id);
    const data = await getOrderDetails(id);
    console.log(data);
    setOrderDetails(data?.cartOrderProduct);
    setProducts(data?.cartOrderProduct?.cart_order_products);
  };

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

    OrderDetails();
  }, [id]);

  if (!order) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      <h3 className="text-xl text-black font-bold mb-4">Order Details</h3>

      <div className="bg-white p-4 rounded border border-gray mb-6">
        <p className="text-sm text-black font-bold m-0">
          Order ID:{" "}
          <span className="font-light"># {orderDetails?.order_number}</span>
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded border border-gray">
            <div className="flex gap-4 flex-wrap">
              {products.map((prod, index) => (
                <div key={index} className="flex gap-4">
                  {/* <div className="w-24 h-24 bg-gray-100 rounded" /> */}
                  {/* <Image
                                        src={prod?.product?.image || 'images/logo.png'}
                                        alt={prod?.product?.title || 'Product Image'}
                                        className="w-24 h-24 object-cover rounded"
                                    /> */}
                  <div className="relative w-24 h-24">
                    <Image
                      src={prod?.product?.images[0]?.image}
                      alt={prod?.product?.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-black text-sm m-0">
                      {prod?.product?.title}
                    </p>
                    <p className="text-sm text-black m-0">
                      Category: {prod?.product?.category?.name}
                    </p>
                    <p className="text-sm text-black m-0">
                      Price: Rs. {prod?.price}
                    </p>
                    <p className="text-sm text-black m-0">
                      Qty: {prod?.quantity}
                    </p>
                    <p className="font-semibold mt-2 text-black">
                      Total: Rs. {prod?.total_amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2 text-sm text-gray-700 space-y-1 border-t">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {orderDetails?.total_amount}</span>
              </div>
              {/* <div className="flex justify-between text-red-600">
                                <span>Coupon Code (SAVE10)</span><span>- Rs. {orderDetails?.coupon_discount}</span>
                            </div> */}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Rs. {orderDetails?.delivery_fees}</span>
              </div>
              <div className="flex justify-between font-semibold text-black pt-4 border-t">
                <span>Total</span>
                <span>Rs. {orderDetails?.final_amount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded border border-gray text-black">
            <h5 className="font-bold">Customer Information</h5>
            <div>
              <p className="mt-3 text-sm font-bold">Customer:</p>
              <p className="mt-1 text-sm">{orderDetails?.name}</p>
            </div>
            <div>
              <p className="mt-1 text-sm font-bold">Email:</p>
              <p className="mt-1 text-sm">{orderDetails?.email}</p>
            </div>
            <div>
              <p className="mt-1 text-sm font-bold">Phone:</p>
              <p className="mt-1 text-sm">{orderDetails?.mobile}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded border border-gray text-black">
            <h5 className="font-bold">Shipping Address</h5>
            <p className="mt-3 text-sm">{orderDetails?.address}</p>
            <p className="mt-1 text-sm">
              {orderDetails?.city}, {order.address.state}{" "}
              {orderDetails?.pincode}
            </p>
            <p className="mt-1 text-sm font-bold">Payment Method:</p>
            <p className="mt-1 text-sm">{orderDetails?.payment_type}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WrappedOrderDetailsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <OrderDetailsPage />
    </Suspense>
  );
}
