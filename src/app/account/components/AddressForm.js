import { useState, useEffect } from "react";

export default function AddressForm({ visible, initialData, onSave, onCancel }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    isDefault: false,
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        fullName: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        isDefault: false,
      });
    }
  }, [initialData]);

  if (!visible) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white text-black p-6 rounded-md mt-6 shadow-inner">
      <h3 className="font-semibold text-lg text-gray-800 mb-4">Address Form</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="9876543210"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Street</label>
          <input
            name="street"
            value={form.street}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="Street address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">City</label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="City"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">State</label>
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="State"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            name="isDefault"
            checked={form.isDefault}
            onChange={handleChange}
          />
          <span>Make this my default address</span>
        </label>
      </div>

      <div className="flex justify-end text-white gap-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-green-800 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-800 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
}
