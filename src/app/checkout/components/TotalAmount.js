import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from "next-auth/react";


export default function TotalAmount() {
  const [discountCode, setDiscountCode] = useState('');
  const productPrice = 398.00;
  const shippingFee = 50.00;
  const taxAmount = 60.72;
  const totalAmount = productPrice + shippingFee;
  const router = useRouter()

  const { data: session, status } = useSession();

  const handlePayment = () => {
    if (!session) {
      router.push('/login')
    } else {
      router.push('/login')
    }
  };

  return (
    <div className="container total-summary-container">
      <div className="card p-3 mt-3">
        <div className="d-flex align-items-center">
          <Image 
            src="/images/1.jpeg" 
            alt="Sree Leela Celebrity Saree" 
            width={60} 
            height={60} 
            className="rounded"
          />
          <div className="ms-3 d-flex align-items-center justify-content-between w-100">
            <p className="text-black">Sree Leela Celebrity Saree</p>
            <p className="text-black">₹{productPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <input 
          type="text" 
          className="form-control d-inline w-75" 
          placeholder="Discount code" 
          value={discountCode} 
          onChange={(e) => setDiscountCode(e.target.value)}
        />
        <button className="btn btn-primary ms-2 p-2">Apply</button>
      </div>

      <div className="card p-3 mt-3">
        <div className="d-flex justify-content-between text-black">
          <span>Subtotal</span>
          <span>₹{productPrice.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mt-2 text-black">
          <span>Shipping <i className="bi bi-info-circle"></i></span>
          <span>₹{shippingFee.toFixed(2)}</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between fw-bold">
          <span>Total</span>
          <span>INR ₹{totalAmount.toFixed(2)}</span>
        </div>
        <span className="text-muted">Including ₹{taxAmount.toFixed(2)} in taxes</span>
      </div>

      <button className="btn btn-primary w-100 mt-3" onClick={handlePayment}>Proceed to Payment</button>
    </div>
  );
}
