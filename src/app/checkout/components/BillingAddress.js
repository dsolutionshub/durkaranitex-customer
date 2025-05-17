import { useState } from 'react';

export default function BillingAddress() {
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  const handlePayment = () => {
    alert("Redirecting to payment gateway...");
  };

  return (
    <div  className="mt-3">
      <h2 className="text-black fs-5 fw-semibold">Billing Address</h2>
    
      <div className="card p-3 mt-3">
        <div className="form-check">
          <input 
            className="form-check-input" 
            type="radio" 
            checked={billingSameAsShipping} 
            onChange={() => setBillingSameAsShipping(true)} 
          />
          <label className="form-check-label">
            Same as shipping address
          </label>
        </div>
        <div className="form-check">
          <input 
            className="form-check-input" 
            type="radio" 
            checked={!billingSameAsShipping} 
            onChange={() => setBillingSameAsShipping(false)} 
          />
          <label className="form-check-label">
            Use a different billing address
          </label>
        </div>
      </div>

      <button className="btn btn-primary w-100 mt-3" onClick={handlePayment}>
        Pay Now
      </button>

      <div className="text-center mt-4 ">
        <a href="#" className="me-3 policy-text">Refund policy</a>
        <a href="#" className="me-3 policy-text">Shipping policy</a>
        <a href="#" className="me-3 policy-text">Privacy policy</a>
        <a href="#" className="me-3 policy-text">Terms of service</a>
      </div>
    </div>
  );
}
