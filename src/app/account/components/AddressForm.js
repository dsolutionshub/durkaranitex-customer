"use client";

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
  addAddress,
  getStateList,
  updateAddress,
} from "@/app/api/services/authService";
import { loader } from "@/app/components/loader/loaderManager";
import { getErrorMessage } from "@/app/utils/helperFn";
import toast from "react-hot-toast";
import { addressValidationSchema } from "@/app/utils/validationSchema";

export default function AddressForm({
  visible,
  onCancel,
  addressDetail,
  isEdit,
  setShowForm,
  getAddressList,
  showForm,
}) {
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      loader(true);
      try {
        const { data } = await getStateList();
        setStates(data.states || []);
      } catch (error) {
        getErrorMessage(error);
      } finally {
        loader(false);
      }
    };

    fetchStates();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      address: "",
      city: "",
      state_id: 1,
      pincode: "",
      is_default: "0",
    },
    validationSchema: addressValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) =>
        formData.append(key, value)
      );
      loader(true);
      try {
        const data = isEdit
          ? await updateAddress(formData, addressDetail?.id)
          : await addAddress(formData);
        toast.success(data?.message);
        setShowForm(false);
        getAddressList();
      } catch (error) {
        const msg = getErrorMessage(error);
        toast.error(msg);
      } finally {
        loader(false);
      }
    },
  });

  useEffect(() => {
    if (isEdit && addressDetail) {
      formik.setValues({
        name: addressDetail.name || "",
        email: addressDetail.email || "",
        mobile: addressDetail.mobile || "",
        address: addressDetail.address || "",
        address1: addressDetail.address1 || "",
        city: addressDetail.city || "",
        state_id: addressDetail.state_id || "",
        pincode: addressDetail.pincode || "",
        is_default: addressDetail.is_default === "1",
      });
    } else {
      formik.resetForm();
    }
  }, [isEdit, showForm, addressDetail]);

  if (!visible) return null;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white text-black p-6 rounded-md mt-6 shadow-inner"
    >
      <h3 className="font-semibold text-lg text-gray-800 mb-4">Address Form</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "Full Name", name: "name", placeholder: "Your Name" },
          {
            label: "Email",
            name: "email",
            placeholder: "you@example.com",
            type: "email",
          },
          { label: "Phone", name: "mobile", placeholder: "Mobile Number" },
          { label: "Address", name: "address", placeholder: "Street address" },
          { label: "Address Line 2", name: "address", placeholder: "Street address" },
          { label: "City", name: "city", placeholder: "City" },
          { label: "Pincode", name: "pincode", placeholder: "Pincode" },
        ].map(({ label, name, placeholder, type = "text" }) => (
          <div key={name}>
            <label className="block text-sm font-medium">{label}</label>
            <input
              name={name}
              type={type}
              placeholder={placeholder}
              value={formik.values[name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border px-3 py-2 rounded"
              required
            />
            {formik.touched[name] && formik.errors[name] && (
              <p className="text-red-500 text-xs mt-1">{formik.errors[name]}</p>
            )}
          </div>
        ))}

        {/* State dropdown */}
        <div>
          <label className="block text-sm font-medium">State</label>
          <select
            name="state_id"
            value={formik.values.state_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border px-3 py-2 rounded"
          >
            {states.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          {formik.touched.state_id && formik.errors.state_id && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.state_id}
            </p>
          )}
        </div>
      </div>

      {/* Default address checkbox */}
      <div className="mt-4 d-none">
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            name="is_default"
            checked={formik.values.is_default === "1"}
            onChange={(e) => {
              const newValue = e.target.checked ? "1" : "0";
              formik.setFieldValue("is_default", newValue);
            }}
          />
          <span className="pl-2">Make this my default address</span>
        </label>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end text-white gap-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-green-800 rounded"
        >
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-green-800 rounded">
          Save
        </button>
      </div>
    </form>
  );
}
