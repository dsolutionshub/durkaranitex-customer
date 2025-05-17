import { useState } from "react";

export default function DeliveryForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
    saveInfo: false,
  });

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman & Nicobar",
    "Chandigarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi",
    "Lakshadweep", "Puducherry"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="mt-3" >
      <h2 className="text-black fs-5 fw-semibold">Delivery</h2>
      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Last name (Optional)"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-3 position-relative">
        <input
          type="text"
          className="form-control"
          placeholder="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Apartment, suite, etc. (optional)"
          name="apartment"
          value={formData.apartment}
          onChange={handleChange}
        />
      </div>

      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <select
            className="form-select form-control"
            name="state"
            value={formData.state}
            onChange={handleChange}
          >
            <option value="">Select State</option>
            {indianStates.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="PIN code"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-3 position-relative">
        <input
          type="text"
          className="form-control"
          placeholder="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          name="saveInfo"
          checked={formData.saveInfo}
          onChange={handleChange}
          id="saveInfo"
        />
        <label className="text-black form-check-label" htmlFor="saveInfo">
          Save this information for next time
        </label>
      </div>
    </div>
  );
}
