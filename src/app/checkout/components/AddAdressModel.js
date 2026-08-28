"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";

import { loader } from "@/app/components/loader/loaderManager";
import { getErrorMessage } from "@/app/utils/helperFn";
import {
  addAddress,
  getStateList,
  updateAddress,
} from "@/app/api/services/authService";
import { addressValidationSchema } from "@/app/utils/validationSchema";

import "./address-modal.css";

function FieldError({ formik, name }) {
  if (!formik.touched[name] || !formik.errors[name]) return null;
  return <p className="aq-address-field-error">{formik.errors[name]}</p>;
}

function TextField({ formik, name, label, placeholder, type = "text", required, maxLength }) {
  const invalid = formik.touched[name] && formik.errors[name];

  return (
    <div className="aq-checkout-input">
      {label ? (
        <label htmlFor={name}>
          {label}
          {required ? <span> *</span> : null}
        </label>
      ) : null}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        className={invalid ? "is-invalid" : undefined}
      />
      <FieldError formik={formik} name={name} />
    </div>
  );
}

export default function AddAdressModel({
  isModalOpen,
  handleCloseModel,
  isEdit,
  getAddressList,
  addressDetail,
  handleCheckoutList = () => {},
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
  }, [isEdit, isModalOpen, addressDetail]);

  useEffect(() => {
    if (!isModalOpen) return undefined;

    document.body.classList.add("aq-address-modal-open");

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCloseModel();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("aq-address-modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isModalOpen, handleCloseModel]);

  if (!isModalOpen) return null;

  const stateInvalid = formik.touched.state_id && formik.errors.state_id;

  return (
    <div className="aq-address-modal">
      <div
        className="aq-address-modal-overlay"
        onClick={handleCloseModel}
        role="presentation"
      >
        <div
          className="aq-address-modal-dialog"
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={isEdit ? "Edit Address" : "Add New Address"}
        >
          <div className="aq-address-modal-content">
            <button
              type="button"
              className="aq-address-modal-close"
              aria-label="Close"
              onClick={handleCloseModel}
            />
            <h3 className="aq-address-modal-title">
              {isEdit ? "Edit Address" : "Add New Address"}
            </h3>

            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <TextField
                    formik={formik}
                    name="name"
                    label="Full Name"
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <TextField
                    formik={formik}
                    name="email"
                    label="Email address"
                    placeholder="Email address"
                    type="email"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <TextField
                    formik={formik}
                    name="mobile"
                    label="Phone"
                    placeholder="Phone"
                    required
                  />
                </div>
                <div className="col-md-12">
                  <TextField
                    formik={formik}
                    name="address"
                    label="Street address"
                    placeholder="House number and street name"
                    required
                  />
                  <TextField
                    formik={formik}
                    name="address1"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                  />
                </div>
                <div className="col-md-12">
                  <TextField
                    formik={formik}
                    name="city"
                    label="Town / City"
                    placeholder="Town / City"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <div className="aq-checkout-input">
                    <label htmlFor="state_id">
                      State / County <span>*</span>
                    </label>
                    <select
                      id="state_id"
                      name="state_id"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.state_id}
                      className={stateInvalid ? "is-invalid" : undefined}
                    >
                      <option value="">Select state</option>
                      {stateList.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    <FieldError formik={formik} name="state_id" />
                  </div>
                </div>
                <div className="col-md-6">
                  <TextField
                    formik={formik}
                    name="pincode"
                    label="Postcode ZIP"
                    placeholder="6-digit PIN code"
                    required
                    maxLength={6}
                  />
                </div>
              </div>

              <div className="aq-address-modal-actions">
                <button
                  type="button"
                  className="aq-checkout-btn border-style"
                  onClick={handleCloseModel}
                >
                  Cancel
                </button>
                <button type="submit" className="aq-checkout-btn">
                  {isEdit ? "Update Address" : "Add Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
