"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { User, Mail, Phone, Home, Edit, Trash, Plus } from "lucide-react";
import {
  deleteAddress,
  getCustomerAddressList,
  getSelectAddress,
} from "@/app/api/services/authService";
import { getErrorMessage } from "@/app/utils/helperFn";
import { loader } from "@/app/components/loader/loaderManager";
import AddAdressModel from "@/app/checkout/components/AddAdressModel";

export default function AddressPage() {
  const [addresses, setAddresses] = useState([]);
  const [addressDetail, setAddressDetail] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModel = () => {
    setIsModalOpen(false);
  };

  const handleOpenModel = (value) => {
    if (value === "edit") {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
    setIsModalOpen(true);
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

  const getAddressList = async () => {
    loader(true);
    try {
      const { data } = await getCustomerAddressList();
      setAddresses(data);
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
    <div className="mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-3">
        <h3
          className="text-xl sm:text-2xl font-semibold text-black"
          onClick={() => handleOpenModel("add")}
        >
          My Addresses
        </h3>

        <button
          onClick={() => handleOpenModel("add")}
          className="bg-gradient-to-r from-[var(--primary-main)] to-[var(--primary-main)] 
          hover:from-[var(--primary-dark)] hover:to-[var(--primary-dark)] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 
          text-sm sm:text-base flex items-center justify-center"
        >
          <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          Add New Address
        </button>
      </div>
      {addresses?.length === 0 ? (
        <div className="text-center py-10 text-lg text-gray-700">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[var(--primary-light)] to-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Home className="h-8 w-8 sm:h-10 sm:w-10 text-[var(--primary-main)]" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 dark-color">
            No delivery address yet
          </h3>
          <p className="text-gray-500 mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base">
            Add your first delivery address to continue with your order.
            We&apos;ll save it for future purchases too!
          </p>
          <button
            onClick={() => handleOpenModel("add")}
            className="bg-gradient-to-r from-[var(--primary-main)] to-[var(--primary-main)] hover:from-[var(--primary-dark)] hover:to-[var(--primary-dark)] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base flex items-center justify-center mx-auto"
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Add New Address
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address, index) => (
            <div
              key={address.id ?? index}
              className={`border rounded-md shadow-sm flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start ${
                address.isDefault ? "border-green-600" : "border-gray-300"
              } p-6 sm:p-4`}
            >
              {/* Address Info */}
              <div className="space-y-2 text-base text-black">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 shrink-0" />
                  <span className="font-semibold">{address.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 shrink-0" />
                  <span>{address.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 shrink-0" />
                  <span>{address.mobile}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Home className="w-5 h-5 mt-0.5 shrink-0" />
                  <span className="leading-snug">
                    {address.address}, {address.address1} {address.pincode}, {address.city} ,{" "}
                    {address.state.name}
                  </span>
                </div>

                <div className="flex items-center justify-between sm:justify-start sm:gap-2 mt-2">
                  {address.isDefault && (
                    <span className="inline-block bg-green-100 text-green-800 text-medium font-medium px-2 py-1 rounded-md">
                      Default Address
                    </span>
                  )}

                  {/* Icons on same line in mobile */}
                  <div className="flex gap-2 sm:hidden">
                    <button
                      onClick={() => {
                        handleEditAddress(address.id);
                      }}
                      className="text-green-800 hover:text-black"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="text-red-800 hover:text-black"
                      title="Delete"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop icons on right */}
              <div className="hidden sm:flex gap-2 mt-1 sm:mt-0">
                <button
                  onClick={() => {
                    handleEditAddress(address.id);
                  }}
                  className="text-green-800 hover:text-black"
                  title="Edit"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  className="text-green-800 hover:text-black"
                  title="Delete"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <AddAdressModel
        isModalOpen={isModalOpen}
        handleCloseModel={handleCloseModel}
        isEdit={isEdit}
        getAddressList={getAddressList}
        addressDetail={addressDetail}
      />{" "}
    </div>
  );
}
