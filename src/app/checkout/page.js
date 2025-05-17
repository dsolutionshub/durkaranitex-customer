'use client';

import Link from "next/link";
import { useState } from "react";
import DeliveryForm from "./components/DeliveryForm";
import CheckoutOptions from "./components/Checkout";
import BillingAddress from "./components/BillingAddress";
import TotalAmount from "./components/TotalAmount";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(true);

  return (
    <div className="container mt-5 checkout-container">
      <div className="row mt-5">
        <div className="col-md-6 ">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="text-black fs-5 fw-semibold">Contact</h2>
            <Link href="#" className="text-primary text-decoration-underline">
              Log in
            </Link>
          </div>
          <input
            type="text"
            className="form-control mt-2 custom-input"
            placeholder="Email or mobile phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="form-check mt-3">
            <input
              type="checkbox"
              className="form-check-input"
              checked={checked}
              onChange={() => setChecked(!checked)}
              id="newsOffers"
            />
            <label className="text-black form-check-label" htmlFor="newsOffers">
              Email me with news and offers
            </label>
          </div>
          <DeliveryForm/>
          <CheckoutOptions/>
          <BillingAddress />
        </div>

        <div className="col-md-6">
          <TotalAmount />
        </div>
      </div>
    </div>
  );
}
