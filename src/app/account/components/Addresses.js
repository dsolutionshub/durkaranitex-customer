"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddressForm from "../components/AddressForm";
import { MapPin, User, Mail, Phone, Home, Edit, Trash } from "lucide-react";
import {
  deleteAddress,
  getCustomerAddressList,
  getSelectAddress,
} from "@/app/api/services/authService";
import { getErrorMessage } from "@/app/utils/helperFn";
import { loader } from "@/app/components/loader/loaderManager";

export default function AddressPage() {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [addressDetail, setAddressDetail] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = async (address) => {
    loader(true);
    try {
      const data = await getSelectAddress(address?.id);
      setAddressDetail(data?.addresss);
      setShowForm(true);
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
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

  const handleDelete = async (id) => {
    loader(true);
    try {
      const data = await deleteAddress(addresses, id);
      getAddressList();
      toast.success(data?.message);
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
    <div className="mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-4">
        <h3 className="text-xl sm:text-2xl font-semibold text-black">
          My Addresses
        </h3>
        <button
          onClick={() => {
            setShowForm(true);
            setIsEdit(false);
          }}
          className="bg-green-800 text-white w-38 py-2 rounded hover:bg-green-700 text-sm"
        >
          Add New Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-10 text-lg text-gray-700">
          <MapPin className="mx-auto text-4xl mb-2 text-green-800" />
          Your address list is empty.
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
                    {address.address}, {address.pincode}, {address.city} ,{" "}
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
                        setIsEdit(true);
                        handleEdit(address);
                      }}
                      className="text-green-800 hover:text-black"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
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
                    setIsEdit(true);
                    handleEdit(address);
                  }}
                  className="text-green-800 hover:text-black"
                  title="Edit"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
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

      <AddressForm
        visible={showForm}
        onCancel={handleCancel}
        addressDetail={addressDetail}
        isEdit={isEdit}
        setShowForm={setShowForm}
        showForm={showForm}
        getAddressList={getAddressList}
      />
    </div>
  );
}
