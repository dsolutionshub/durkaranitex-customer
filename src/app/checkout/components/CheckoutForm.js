"use client";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { FiCreditCard } from "react-icons/fi";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Edit, Home, MapPin, Package, Plus, Trash2 } from "lucide-react";

import AddAdressModel from "./AddAdressModel";
import { getErrorMessage } from "@/app/utils/helperFn";
import {
  deleteAddress,
  getCustomerAddressList,
  updateCheckoutAddress,
} from "@/app/api/services/authService";
import { loader } from "@/app/components/loader/loaderManager";

export default function CheckoutForm({ checkoutData }) {
  const [addressList, setAddressList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("payNow");
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
    } catch (error) {
      getErrorMessage(error);
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
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  };

  useEffect(() => {
    getAddressList();
  }, []);

  return (
    <div className="md:col-span-2 space-y-6">
      <div className="shadow-lg border-0 rounded-lg overflow-hidden bg-white">
        <div className="bg-gradient-to-r from-green-50 to-green-50  p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <Package className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-0">
                  Delivery Address
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 font-normal mb-0">
                  Choose where you want your order delivered
                </p>
              </div>
            </div>
            <button
              onClick={() => handleOpenModel("add")}
              className="bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700 
              text-white shadow-md hover:shadow-lg transition-all duration-200 w-full 
              sm:w-auto text-sm sm:text-base px-4 py-2 rounded-md flex items-center justify-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Address
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {addressList?.length === 0 ? (
            <div className="text-center py-8 sm:py-12 flex flex-column items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Home className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                No delivery address yet
              </h3>
              <p className="text-gray-500 mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base">
                Add your first delivery address to continue with your order.
                We&apos;ll save it for future purchases too!
              </p>
              <button
                onClick={() => handleOpenModel("add")}
                className="bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700
              hover:to-green-700 text-white px-6 sm:px-8 py-2 sm:py-3 
              rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base flex items-center justify-center"
              >
                <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Add New Address
              </button>
            </div>
          ) : (
            <div className="space-y-3 max-h-[22rem] overflow-y-auto custom-scroll">
              {addressList?.map((address) => {
                const isSelected = checkoutData?.address?.id === address.id;
                return (
                  <div key={address.id} className="flex items-start gap-3 ml-1">
                    <RadioButton
                      inputId={`address-${address.id}`}
                      value={address.id}
                      checked={isSelected}
                      onChange={handleSelectAddress}
                      className="mt-3"
                      style={{
                        outline: "none",
                        transform: "scale(1.5)",
                      }}
                    />

                    <div
                      className={`flex-1 px-4 py-3 rounded-md relative transition-all duration-300 border-l-5
                        border-b-1 border-r-1 border-t-1 border-green-600 ${
                          isSelected
                            ? "border-green-600 bg-green-50 shadow"
                            : "border-gray-200 bg-white "
                        }`}
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex gap-3 items-start">
                          <div
                            className={`p-2 rounded-full ${
                              isSelected ? "bg-green-100" : "bg-gray-100"
                            }`}
                          >
                            <Home
                              className={`h-5 w-5 ${
                                isSelected ? "text-green-600" : "text-gray-600"
                              }`}
                            />
                          </div>
                          <div>
                            <div className="flex gap-2 items-center mb-1">
                              <h5 className="text-gray-900 text-base mb-0">
                                {address.name}
                              </h5>
                            </div>

                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-gray-400 mt-[.3rem]" />
                              <div>
                                <p className="mb-0 fw-medium">
                                  {address.address}
                                </p>
                                <p className="text-sm text-gray-600 mb-0 ">
                                  {address.city}, {address?.state?.name} -{" "}
                                  <span className="font-medium">
                                    {address.pincode}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button
                            icon={<Edit className="h-4 w-4" />}
                            className="p-button-text p-button-sm text-gray-600"
                            onClick={() => {
                              handleOpenModel("edit");
                              setSelectedAddressId(address.id);
                            }}
                          />
                          <Button
                            icon={<Trash2 className="h-4 w-4" />}
                            className="p-button-text p-button-sm text-red-600"
                            onClick={() => handleDeleteAddress(address.id)}
                          />
                        </div>
                      </div>

                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

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
              className="accent-green-800 mr-3 scale-115 cursor-pointer"
            />
            <FiCreditCard className="mr-2 ml-1" size={25} />
            <div>
              <p className="font-semibold m-0 text-dark h-5">Pay Now</p>
              <p className="text-gray-500 m-0">
                Pay securely online with credit/debit card
              </p>
            </div>
          </div>

          <div
            className={`flex items-center border rounded-md px-3 py-2 cursor-pointer hover:bg-gray-100
              ${
                checkoutData?.delivery_fee?.isCodAvailable === false
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
              className="accent-green-800 mr-3 scale-115 cursor-pointer"
            />
            <LiaRupeeSignSolid className="mr-2" size={25} />
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
      />
    </div>
  );
}
