import { useEffect, useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Dialog } from "primereact/dialog";
import { IoClose } from "react-icons/io5";

import { loader } from "@/app/components/loader/loaderManager";
import { getErrorMessage } from "@/app/utils/helperFn";
import {
  addAddress,
  getStateList,
  updateAddress,
} from "@/app/api/services/authService";
import { addressValidationSchema } from "@/app/utils/validationSchema";

export default function AddAdressModel({
  isModalOpen,
  handleCloseModel,
  isEdit,
  getAddressList,
  addressDetail,
  handleCheckoutList,
}) {
  const [stateList, setStateList] = useState([]);

  const fetchStates = async () => {
    loader(true);
    try {
      const { data } = await getStateList();
      setStateList(data?.states || []);
    } catch (error) {
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      address: "",
      address1: "",
      city: "",
      state_id: "",
      pincode: "",
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
        handleCloseModel();
        getAddressList();
        handleCheckoutList();
      } catch (error) {
        const msg = getErrorMessage(error);
        toast.error(msg);
      } finally {
        loader(false);
      }
    },
  });

  useEffect(() => {
    fetchStates();
  }, []);

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
      });
    } else {
      formik.resetForm();
    }
  }, [isEdit, isModalOpen]);

  return (
    <Dialog
      visible={isModalOpen}
      style={{
        width: "95vw",
        maxWidth: "500px",
        backgroundColor: "#fff",
      }}
      className="shadow-2xl rounded-md m-2 md:m-0 p-[.5rem] md:p-[1rem]"
      onHide={handleCloseModel}
      breakpoints={{ "960px": "75vw", "640px": "100vw" }}
      showHeader={false}
    >
      <div className="flex items-center justify-between px-2">
        <h5 className="mb-0 dark-color mt-1 md:mt-0">
          {isEdit ? "Edit Address" : "Add New Address"}
        </h5>
        <IoClose
          onClick={handleCloseModel}
          size={21}
          className="cursor-pointer dark-color"
        />
      </div>

      <form className="space-y-1 p-2" onSubmit={formik.handleSubmit}>
        {[
          { name: "name", label: "Full Name" },
          { name: "email", label: "Email" },
          { name: "mobile", label: "Mobile Number" },
          { name: "address", label: "Address" },
        ].map(({ name, label }) => (
          <div key={name}>
            <label htmlFor={name} className="block font-medium dark-color">
              {label} *
            </label>
            <input
              id={name}
              name={name}
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[name]}
              className={`w-full border rounded px-3 py-2 dark-color ${
                formik.touched[name] && formik.errors[name]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder={`Enter ${label.toLowerCase()}`}
            />
            {formik.touched[name] && formik.errors[name] && (
              <p className="text-red-500 text-sm mb-0">{formik.errors[name]}</p>
            )}
          </div>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          {["address1", "city"].map((name) => (
            <div key={name}>
              <label htmlFor={name} className="block font-medium dark-color">
                {name === "address1" ? "Address Line 2" : "City"}{" "}
                {name === "city" && "*"}
              </label>
              <input
                id={name}
                name={name}
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name]}
                className={`w-full border rounded px-3 py-2 dark-color ${
                  formik.touched[name] && formik.errors[name]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder={name === "address1" ? "Optional" : "Enter city"}
              />
              {formik.touched[name] && formik.errors[name] && (
                <p className="text-red-500 text-sm mb-0">
                  {formik.errors[name]}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="state_id" className="block font-medium dark-color">
              State *
            </label>
            <select
              id="state_id"
              name="state_id"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.state_id}
              className={`w-full border rounded px-3 py-2 dark-color ${
                formik.touched.state_id && formik.errors.state_id
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">Select state</option>
              {stateList.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
            {formik.touched.state_id && formik.errors.state_id && (
              <p className="text-red-500 text-sm mb-0">
                {formik.errors.state_id}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="pincode" className="block font-medium dark-color">
              PIN Code *
            </label>
            <input
              id="pincode"
              name="pincode"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pincode}
              maxLength={6}
              className={`w-full border rounded px-3 py-2 dark-color ${
                formik.touched.pincode && formik.errors.pincode
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="6-digit PIN code"
            />
            {formik.touched.pincode && formik.errors.pincode && (
              <p className="text-red-500 text-sm">{formik.errors.pincode}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleCloseModel}
            className="border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[var(--primary-main)] text-white px-4 py-2 rounded hover:bg-[var(--primary-dark)]"
          >
            {isEdit ? "Update Address" : "Add Address"}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
