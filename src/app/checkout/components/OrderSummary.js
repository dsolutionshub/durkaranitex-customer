import Image from "next/image";
import { RiDeleteBinLine } from "react-icons/ri";

const OrderSummary = ({ checkoutData, handlePayment }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h4 className="font-semibold text-black mb-4">Order Details</h4>
        <h5 className="font-semibold text-black mb-4">Product Summary</h5>
        <div className="space-y-3 text-sm">
          {checkoutData?.products_list?.length > 0 ? (
            checkoutData?.products_list.map((item) => (
              <div
                className="flex items-center space-x-3 border-b border-gray-300 pb-3"
                key={item.id}
              >
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
                    {item?.product?.title}
                  </p>
                  <div className="flex justify-between">
                    <p className="text-gray-500 m-0">Qty: {item?.quantity}</p>
                    <p className="text-gray-500 m-0">₹{item?.price}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-black font-semibold mb-0">
                    ₹{item?.total_amount}
                  </p>
                  <div className="flex items-center gap-1 cursor-pointer">
                    <RiDeleteBinLine className="text-red-600" />
                    <button className="text-red-600 text-sm">Remove</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No Product found</p>
          )}
        </div>
      </div>

      <div className="space-y-5 bg-muted p-6 rounded-lg shadow-sm">
        <h5 className="font-semibold text-black mb-4">Payment Summary</h5>
        <div className="text-sm space-y-3">
          <div className="flex justify-between text-black font-medium">
            <span>Subtotal ({checkoutData?.total_products} items)</span>
            <span>₹{checkoutData?.sub_total}</span>
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
            <span>₹{checkoutData?.total_full_payment}</span>
          </div>
          <button
            className="w-full mt-3 bg-green-800 text-white py-2 rounded"
            onClick={handlePayment}
          >
            Pay Now ₹{checkoutData?.total_full_payment}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
