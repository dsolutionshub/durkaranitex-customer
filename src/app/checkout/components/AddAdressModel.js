import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { IoClose } from "react-icons/io5";
import { loader } from "@/app/components/loader/loaderManager";
import { getErrorMessage } from "@/app/utils/helperFn";
import { addAddress, getStateList } from "@/app/api/services/authService";
import toast from "react-hot-toast";

const formFields = {
  name: { label: "Full Name", placeholder: "Enter full name" },
  email: { label: "Email", placeholder: "Enter Email" },
  mobile: { label: "Mobile Number", placeholder: "Enter mobile number" },
  address: { label: "Address", placeholder: "Enter address" },
  address1: { label: "Address Line 2", placeholder: "Optional" },
  city: { label: "City", placeholder: "Enter city" },
  state_id: { label: "State", placeholder: "Select state", type: "select" },
  pincode: { label: "PIN Code", placeholder: "6-digit PIN" },
};

export default function AddAdressModel({
  isModalOpen,
  handleCloseModel,
  isEdit,
  selectedAddressId,
  getAddressList,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    address1: "",
    city: "",
    state_id: "",
    pincode: "",
  });
  const [stateList, setStateList] = useState([]);

  const handleGetStateList = async () => {
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

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      mobile: "",
      address: "",
      address1: "",
      city: "",
      state_id: "",
      pincode: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const key in form) {
      formData.append(key, form[key]);
    }

    loader(true);
    try {
      if (isEdit) {
        await updateAddress(formData, selectedAddressId);
      } else {
        await addAddress(formData);
      }
      resetForm();
      handleCloseModel();
      getAddressList();
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  useEffect(() => {
    handleGetStateList();
  }, []);

  useEffect(() => {
    if (isEdit) {
      setForm(isEdit);
    } else {
      resetForm();
    }
  }, [isEdit, isModalOpen]);

  return (
    <Dialog
      visible={isModalOpen}
      style={{
        width: "95vw",
        maxWidth: "500px",
        backgroundColor: "#fff",
        padding: "1.2rem 1rem",
      }}
      className="shadow-2xl rounded-md"
      onHide={handleCloseModel}
      breakpoints={{ "960px": "75vw", "640px": "100vw" }}
      showHeader={false}
    >
      <div className="flex items-center justify-between px-2">
        <h5 className="mb-0">{isEdit ? "Edit Address" : "Add New Address"}</h5>
        <IoClose
          onClick={handleCloseModel}
          size={21}
          className="cursor-pointer"
        />
      </div>
      <form className="space-y-2 p-2" onSubmit={handleSubmit}>
        {Object.entries(formFields).map(([key, config]) => {
          if (["address1", "city", "state_id", "pincode"].includes(key))
            return null;
          return (
            <div key={key}>
              <label htmlFor={key} className="block font-medium mb-0">
                {config.label} *
              </label>
              <input
                required
                id={key}
                type="text"
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className={`w-full border rounded px-3 py-2 border-gray-300`}
                placeholder={config.placeholder}
              />
            </div>
          );
        })}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["address1", "city"].map((key) => {
            const config = formFields[key];
            return (
              <div key={key}>
                <label htmlFor={key} className="block font-medium mb-0">
                  {config.label} {key === "address1" ? "" : "*"}
                </label>
                <input
                  required={key !== "address1"}
                  id={key}
                  type="text"
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className={`w-full border rounded px-3 py-2 border-gray-300`}
                  placeholder={config.placeholder}
                />
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="state_id" className="block font-medium mb-0">
              {formFields.state_id.label} *
            </label>
            <select
              required
              id="state_id"
              value={form.state_id}
              onChange={(e) => setForm({ ...form, state_id: e.target.value })}
              className={`w-full border rounded px-3 py-2 border-gray-300`}
            >
              <option value="">Select state</option>
              {stateList.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="pincode" className="block font-medium mb-0">
              {formFields.pincode.label} *
            </label>
            <input
              required
              id="pincode"
              type="text"
              value={form.pincode}
              onChange={(e) => setForm({ ...form, pincode: e.target.value })}
              className={`w-full border rounded px-3 py-2 border-gray-300`}
              placeholder={formFields.pincode.placeholder}
              maxLength={6}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleCloseModel}
            className="border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {isEdit ? "Update Address" : "Add Address"}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
