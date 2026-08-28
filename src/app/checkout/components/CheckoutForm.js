"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AddressCard from "./AddressCard";
import { loader } from "@/app/components/loader/loaderManager";
import AddAdressModel from "./AddAdressModel";
import { getErrorMessage } from "@/app/utils/helperFn";
import {
  deleteAddress,
  getCustomerAddressList,
  getSelectAddress,
  updateCheckoutAddress,
} from "@/app/api/services/authService";

export default function CheckoutForm({
  checkoutData,
  handleCheckoutList,
  couponCode,
  setCouponCode,
  isCouponApplied,
  handleApplyCoupon,
}) {
  const [addressList, setAddressList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [addressDetail, setAddressDetail] = useState([]);
  const [showCoupon, setShowCoupon] = useState(false);

  const getAddressList = async () => {
    loader(true);
    try {
      const { data } = await getCustomerAddressList();
      setAddressList(data || []);
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  const handleOpenModel = (value) => {
    if (value === "edit") {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModel = () => {
    setIsModalOpen(false);
  };

  const handleSelectAddress = async (value) => {
    const checkoutId = checkoutData?.checkout_id;
    const formData = new FormData();
    formData.append("checkout_id", checkoutId);
    formData.append("address_id", value);

    loader(true);
    try {
      await updateCheckoutAddress(formData);
      handleCheckoutList();
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    loader(true);
    try {
      const data = await deleteAddress("", id);
      getAddressList();
      toast.success(data?.message);
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  const handleEditAddress = async (addressId) => {
    loader(true);
    try {
      const data = await getSelectAddress(addressId);
      handleOpenModel("edit");
      setAddressDetail(data?.addresss);
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  useEffect(() => {
    getAddressList();
  }, []);

  return (
    <div>
      <div className="aq-checkout-verify">
        <div className="aq-checkout-verify-item">
          {isCouponApplied ? (
            <div className="aq-coupon-applied-card">
              <div className="aq-coupon-applied-head">
                <span className="aq-coupon-applied-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="8.25" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M5.25 9.15L7.8 11.7L12.75 6.6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="aq-coupon-applied-copy">
                  <h4>Coupon Applied</h4>
                  <p>
                    Code:{" "}
                    <strong>
                      {couponCode || checkoutData?.coupon_info?.code}
                    </strong>
                  </p>
                </div>
                <button
                  type="button"
                  className="aq-coupon-applied-remove"
                  aria-label="Remove coupon"
                  onClick={handleApplyCoupon}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M12.75 0.75L0.75 12.75M0.75 0.75L12.75 12.75"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              <p className="aq-coupon-applied-save">
                You saved Rs. {parseInt(checkoutData?.coupon_discount, 10) || 0}
              </p>
            </div>
          ) : (
            <>
              <p className="aq-checkout-verify-reveal">
                Have a coupon?{" "}
                <button type="button" onClick={() => setShowCoupon((open) => !open)}>
                  Click here to enter your code
                </button>
              </p>
              {showCoupon ? (
                <div className="aq-return-customer">
                  <div className="aq-return-customer-input">
                    <label htmlFor="checkout-coupon">Coupon Code :</label>
                    <input
                      id="checkout-coupon"
                      type="text"
                      placeholder="Coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="aq-checkout-btn"
                    disabled={couponCode === ""}
                    onClick={handleApplyCoupon}
                  >
                    Apply
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>

      <AddressCard
        addressList={addressList}
        handleDeleteAddress={handleDeleteAddress}
        handleSelectAddress={handleSelectAddress}
        handleOpenModel={handleOpenModel}
        handleEditAddress={handleEditAddress}
        checkoutData={checkoutData}
      />

      <div className="aq-checkout-guide">
        {checkoutData?.address ? (
          <div className="aq-checkout-guide-card">
            <h4>Continue with this address</h4>
            <p>
              Your order will be delivered to{" "}
              <strong>{checkoutData.address.name}</strong>,{" "}
              {checkoutData.address.city}
              {checkoutData.address?.state?.name
                ? `, ${checkoutData.address.state.name}`
                : ""}{" "}
              - {checkoutData.address.pincode}.
            </p>
            <div className="aq-checkout-guide-actions">
              {/* <a href="#aq-checkout-payment" className="aq-checkout-btn">
                Continue to payment
              </a> */}
              <button
                type="button"
                className="aq-checkout-add-btn"
                onClick={() => handleOpenModel("add")}
              >
                Add New Address
              </button>
            </div>
          </div>
        ) : (
          <div className="aq-checkout-guide-card">
            <h4>Select a delivery address</h4>
            <p>Choose an address above or add a new one to continue checkout.</p>
            <div className="aq-checkout-guide-actions">
              <button
                type="button"
                className="aq-checkout-btn"
                onClick={() => handleOpenModel("add")}
              >
                Add New Address
              </button>
            </div>
          </div>
        )}

        <div className="aq-checkout-guide-card">
          <h4>Payment information</h4>
          <ul>
            <li>Pay Now is processed securely through Razorpay — UPI, cards, wallets, and net banking.</li>
            <li>
              For Cash on Delivery, shipping is paid now. The remaining product amount
              is collected in cash at delivery (orders ≤ Rs. 5000).
            </li>
            <li>Replacement only. Orders are typically delivered in 1 day. No refunds.</li>
            <li>Need help? Support is available Mon–Sat, 10am–7pm.</li>
          </ul>
        </div>
      </div>

      <AddAdressModel
        isModalOpen={isModalOpen}
        handleCloseModel={handleCloseModel}
        isEdit={isEdit}
        getAddressList={getAddressList}
        addressDetail={addressDetail}
        handleCheckoutList={handleCheckoutList}
      />
    </div>
  );
}
