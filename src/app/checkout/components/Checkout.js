import { useState } from "react";
import Image from "next/image";
import { FaRupeeSign } from "react-icons/fa";

export default function CheckoutOptions() {
    const [shippingMethod, setShippingMethod] = useState("prepaid");

    return (
        <div className="mt-3">
            <h4 className="text-black fs-5 fw-semibold">Shipping method</h4>
            <div className="card border-success-subtle mb-3 checkout-card">
                <div className="card-body d-flex justify-content-between align-items-center">
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="prepaid"
                            name="shippingMethod"
                            checked={shippingMethod === "prepaid"}
                            onChange={() => setShippingMethod("prepaid")}
                        />
                        <label className="form-check-label ms-2" htmlFor="prepaid">
                            <span className="fw-medium">Rs 50 for PrePaid</span>
                            <br />
                            <span className="text-muted">For Orders below Rs 500</span>
                        </label>
                    </div>
                    <span className="fw-medium d-flex align-items-center">
                        <FaRupeeSign className="me-1" />
                        50.00
                    </span>
                </div>
            </div>

            <h4 className="text-black fs-5 fw-semibold">Payment</h4>
            <p className="text-black">All transactions are secure and encrypted.</p>

            <div className="card border-success-subtle w-100 netbank-card">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between p-3 border w-100 gap-2">
                        <span className="net-para text-black">Razorpay Secure (UPI, Cards, Wallets, NetBanking)</span>

                        <div className="d-flex align-items-center gap-2">
                            <Image src="/images/upi.svg" alt="UPI" width={30} height={30} />
                            <Image src="/images/visa.svg" alt="Visa" width={30} height={30} />
                            <Image src="/images/master.svg" alt="MasterCard" width={30} height={30} />
                            <Image src="/images/netbanking.svg" alt="NetBanking" width={30} height={30} />
                        </div>
                    </div>

                    <div className="text-center p-3 bg-light rounded">
                        <div className="d-flex justify-content-center align-items-center">
                            <Image src="/images/pay_now.svg" alt="Pay Now" width={100} height={50} />
                        </div>
                        <p className="mt-2 text-black">
                            After clicking <strong>&quot;Pay now&quot;</strong>, you will be redirected to Razorpay Secure (UPI, Cards, Wallets, NetBanking) to complete your purchase securely.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}