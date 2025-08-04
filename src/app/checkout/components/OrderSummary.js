import { CircleCheckBig, Tag } from "lucide-react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";

const OrderSummary = ({
  checkoutData,
  handlePayment,
  removeFromCart,
  selectedPayment,
  handleApplyCoupon,
  setCouponCode,
  couponCode,
  isCouponApplied,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h4 className="font-semibold text-black mb-4">Order Details</h4>
        <h5 className="font-semibold text-black mb-4">Product Summary</h5>
        <div className="space-y-3 text-sm max-h-[20rem] overflow-y-auto scrollbar-hide-on-idle">
          {checkoutData?.products_list?.length > 0 ? (
            checkoutData?.products_list.map((item) => (
              <div
                className="flex items-center space-x-3 border-b border-gray-300 pb-3"
                key={item.id}
              >
                <div className="h-14 w-14 flex-shrink-0 bg-neutral-light rounded-md overflow-hidden">
                  <Image
                    alt="image"
                    src={item?.product?.images[0]?.image}
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
                  <div className="flex items-center gap-1 cursor-pointer  d-none">
                    <RiDeleteBinLine className="text-red-600" />
                    <button
                      className="text-red-600 text-sm"
                      onClick={() => removeFromCart(item?.product_id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="dark-color">No Product found</p>
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
          {isCouponApplied ? (
            <div className="bg-green-50 border border-green-50 px-3 pt-3 rounded-md">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <CircleCheckBig size={17} />
                  <p className="mb-0 primary-color font-bold">
                    Coupon Applied!
                    <br />
                    <span className="font-medium text-green-600">
                      Code: {couponCode || checkoutData?.coupon_info?.code}
                    </span>
                  </p>
                </div>

                <IoClose
                  size={20}
                  className="cursor-pointer"
                  onClick={handleApplyCoupon}
                />
              </div>

              <p className="my-3 bg-green-100 p-2 text-center font-bold">
                You saved ₹{parseInt(checkoutData?.coupon_discount)}!
              </p>
            </div>
          ) : (
            <>
              <p className="flex items-center gap-1 text-black my-2 font-semibold">
                <Tag size={16} className="text-gray-500" />
                Have a coupon code?
              </p>

              <div className="flex items-center space-x-2 gap-2">
                <input
                  type="text"
                  className="flex-grow border rounded-md p-2 bg-white"
                  placeholder="Enter coupon code"
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button
                  disabled={couponCode === ""}
                  className={`bg-[var(--primary-dark)] text-white py-2 px-3 rounded ${
                    couponCode === "" && "opacity-70"
                  }`}
                  onClick={handleApplyCoupon}
                >
                  Apply
                </button>
              </div>
            </>
          )}
          <div className="flex justify-between text-black font-medium">
            <span>Shipping Charges</span>
            <span>
              ₹
              {checkoutData?.delivery_fee?.isCodAvailable === true &&
              selectedPayment === "payLater"
                ? checkoutData?.delivery_fee?.cod_fee
                : checkoutData?.delivery_fee?.normal_delivery}
            </span>
          </div>

          {isCouponApplied && (
            <div className="flex items-center justify-between mt-3 bg-green-50 p-2">
              <p className="flex items-center gap-1 text-green-600 mb-0">
                <Tag size={16} />
                Coupon Discount
              </p>
              <p className="mb-0 primary-color font-bold">
                - ₹{parseInt(checkoutData?.coupon_discount)}
              </p>
            </div>
          )}

          <hr />
          <div className="flex justify-between font-bold text-xl text-black font-semibold">
            <span>Total</span>
            <span>
              ₹
              {selectedPayment === "payLater"
                ? checkoutData?.total_cod_payment
                : checkoutData?.total_full_payment}
            </span>
          </div>
          <button
            className="w-full mt-3 bg-[var(--primary-dark)] text-white py-2 rounded"
            onClick={handlePayment}
          >
            {selectedPayment === "payLater"
              ? `Pay Shipping ₹ ${checkoutData?.delivery_fee?.cod_fee}`
              : `Pay Now ₹ ${checkoutData?.total_full_payment || 0}`}
          </button>

          {selectedPayment === "payLater" && (
            <span className="mx-15 pt-2 h-10 block text-black">
              You will pay ₹ {checkoutData?.sub_total} upon delivery
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
