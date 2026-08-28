import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CodItemCard from "./CodItemCard";

const OrderSummary = ({
  checkoutData,
  handlePayment,
  selectedPayment,
  setSelectedPayment,
  isAnyProductNotCodAvailable,
  isCouponApplied,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const products = checkoutData?.products_list || [];
  const shipping =
    checkoutData?.delivery_fee?.isCodAvailable === true &&
    selectedPayment === "payLater"
      ? checkoutData?.delivery_fee?.cod_fee
      : checkoutData?.delivery_fee?.normal_delivery;
  const total =
    selectedPayment === "payLater"
      ? checkoutData?.total_cod_payment
      : checkoutData?.total_full_payment;
  const payLabel =
    selectedPayment === "payLater"
      ? `Pay Shipping Rs. ${checkoutData?.delivery_fee?.cod_fee}`
      : `Pay Now Rs. ${checkoutData?.total_full_payment || 0}`;
  const codDisabled =
    isAnyProductNotCodAvailable ||
    checkoutData?.delivery_fee?.isCodAvailable === false;

  const openProduct = (productId) => {
    if (productId) {
      router.push(`/product-detail?id=${productId}`);
    }
  };

  return (
    <div className="aq-checkout-place" id="aq-checkout-payment">
      <h3 className="aq-checkout-place-title">Your Order</h3>
      <div className="aq-order-info-list">
        <ul>
          <li className="aq-order-info-list-header">
            <h4>Product</h4>
            <h4>Total</h4>
          </li>
        </ul>
        <div className="aq-order-product-scroll">
          <ul>
            {products.length > 0 ? (
              products.map((item) => (
                <li className="aq-order-info-list-desc" key={item.id}>
                  <div className="aq-order-product">
                    <button
                      type="button"
                      className="aq-order-product-thumb"
                      onClick={() =>
                        openProduct(item?.product_id || item?.product?.id)
                      }
                    >
                      <Image
                        src={
                          item?.product?.images?.[0]?.image ||
                          "/images/home/KCLogo.png"
                        }
                        alt={item?.product?.title || "Product"}
                        width={64}
                        height={80}
                      />
                    </button>
                    <p>
                      {item?.product?.title} <span> x {item?.quantity}</span>
                    </p>
                  </div>
                  <span>Rs. {item?.total_amount}</span>
                </li>
              ))
            ) : (
              <li className="aq-order-info-list-desc">
                <p>No product found</p>
                <span />
              </li>
            )}
          </ul>
        </div>
        <ul>
          <li className="aq-order-info-list-subtotal">
            <span>Subtotal ({checkoutData?.total_products || 0} items)</span>
            <span>Rs. {checkoutData?.sub_total}</span>
          </li>
          {isCouponApplied ? (
            <li className="aq-order-info-list-discount">
              <span>Coupon Discount</span>
              <span>- Rs. {parseInt(checkoutData?.coupon_discount, 10) || 0}</span>
            </li>
          ) : null}
          <li className="aq-order-info-list-shipping">
            <span>Shipping</span>
            <span>Rs. {shipping}</span>
          </li>
          <li className="aq-order-info-list-total">
            <span>Total</span>
            <span>Rs. {total}</span>
          </li>
        </ul>
      </div>

      <div className="aq-checkout-payment">
        <div
          className="aq-checkout-payment-item"
          onClick={() => setSelectedPayment("payNow")}
        >
          <input
            type="radio"
            id="pay_now"
            name="payment"
            checked={selectedPayment === "payNow"}
            onChange={() => setSelectedPayment("payNow")}
          />
          <label htmlFor="pay_now">Pay Now (UPI, Cards, Wallets, NetBanking)</label>
          {selectedPayment === "payNow" ? (
            <div className="aq-checkout-payment-desc">
              <p>
                After clicking Pay Now, you will be redirected to Razorpay to complete
                your purchase securely.
              </p>
            </div>
          ) : null}
        </div>

        {isAnyProductNotCodAvailable ? (
          <div className="aq-checkout-payment-item is-disabled">
            <input
              type="radio"
              id="pay_later_off"
              name="payment"
              checked={false}
              readOnly
            />
            <label htmlFor="pay_later_off">Cash on Delivery</label>
            <div className="aq-checkout-payment-desc is-visible">
              <p>
                Not available for a few or all items.{" "}
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsOpen(true);
                  }}
                >
                  View items
                </button>
              </p>
            </div>
          </div>
        ) : (
          <div
            className={`aq-checkout-payment-item${codDisabled ? " is-disabled" : ""}`}
            onClick={() => {
              if (!codDisabled) {
                setSelectedPayment("payLater");
              }
            }}
          >
            <input
              type="radio"
              id="pay_later"
              name="payment"
              checked={selectedPayment === "payLater"}
              disabled={codDisabled}
              onChange={() => setSelectedPayment("payLater")}
            />
            <label htmlFor="pay_later">Cash on Delivery</label>
            {selectedPayment === "payLater" || codDisabled ? (
              <div className="aq-checkout-payment-desc is-visible">
                <p>
                  {codDisabled
                    ? "Cash on Delivery is not available for this order."
                    : "COD available only for orders ≤ Rs. 5000 (incl. shipping). Shipping charges must be paid upfront. The remaining product amount will be collected in cash at delivery."}
                </p>
              </div>
            ) : null}
          </div>
        )}
      </div>

      <div className="aq-checkout-btn-wrapper">
        <button type="button" className="aq-checkout-btn w-100" onClick={handlePayment}>
          {payLabel}
        </button>
      </div>
      {selectedPayment === "payLater" ? (
        <p className="aq-checkout-cod-note">
          You will pay Rs.{" "}
          {isCouponApplied ? checkoutData?.total_full_payment : checkoutData?.sub_total}{" "}
          upon delivery
        </p>
      ) : null}

      <CodItemCard
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        checkoutData={checkoutData}
      />
    </div>
  );
};

export default OrderSummary;
