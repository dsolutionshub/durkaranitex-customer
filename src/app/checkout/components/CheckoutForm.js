"use client";
import { useEffect, useState } from "react";
import { FiCreditCard } from "react-icons/fi";
import { LiaRupeeSignSolid } from "react-icons/lia";

import AddAdressModel from "./AddAdressModel";
import { getErrorMessage } from "@/app/utils/helperFn";
import {
  deleteAddress,
  getCustomerAddressList,
  updateCheckoutAddress,
} from "@/app/api/services/authService";
import AddressCard from "./AddressCard";
import { loader } from "@/app/components/loader/loaderManager";
import toast from "react-hot-toast";

export default function CheckoutForm({
  checkoutData,
  selectedPayment,
  setSelectedPayment,
  handleCheckoutList
}) {
  const [addressList, setAddressList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const getAddressList = async () => {
    loader(true);
    try {
      const { data } = await getCustomerAddressList();
      setAddressList(data || []);
    } catch (error) {
      getErrorMessage(error);
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

  const handleSelectAddress = async (e) => {
    const selectedAddressId = e.value;
    const checkoutId = checkoutData?.checkout_id;
    const formData = new FormData();
    formData.append("checkout_id", checkoutId);
    formData.append("address_id", selectedAddressId);

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
      await deleteAddress("", id);
      getAddressList();
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
    <div className="md:col-span-2 space-y-6">
      <AddressCard
        addressList={addressList}
        handleDeleteAddress={handleDeleteAddress}
        handleSelectAddress={handleSelectAddress}
        handleOpenModel={handleOpenModel}
        setSelectedAddressId={setSelectedAddressId}
        checkoutData={checkoutData}
      />
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
              className="accent-[var(--primary-main)] mr-3 scale-115 cursor-pointer"
            />
            <FiCreditCard className="mr-2 ml-1 text-gray-500" size={25} />
            <div>
              <p className="font-semibold m-0 text-dark h-5">Pay Now</p>
              <p className="text-gray-500 m-0">
                Pay securely online with credit/debit card
              </p>
            </div>
          </div>

          <div
            className={`flex items-center border rounded-md px-3 py-2 cursor-pointer hover:bg-gray-100
              ${checkoutData?.delivery_fee?.isCodAvailable === false
                ? "bg-gray-200 pointer-events-none opacity-60"
                : ""
              }`}
            onClick={() => setSelectedPayment("payLater")}
          >
            <input
              type="radio"
              name="payment"
              checked={selectedPayment === "payLater"}
              onChange={() => setSelectedPayment("payLater")}
              className="accent-[var(--primary-main)] mr-3 scale-115 cursor-pointer"
            />
            <LiaRupeeSignSolid className="mr-2 text-gray-500" size={25} />
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
                For Cash on Delivery (COD) orders, shipping charges of ₹225 must
                be paid upfront through our payment gateway. The remaining
                product amount will be collected in cash at the time of delivery
              </p>
            </div>
          )}
        </div>
      </div>
      <AddAdressModel
        isModalOpen={isModalOpen}
        handleCloseModel={handleCloseModel}
        isEdit={isEdit}
        selectedAddressId={selectedAddressId}
        getAddressList={getAddressList}
      />{" "}
    </div>
  );
}
