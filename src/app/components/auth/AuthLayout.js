"use client";

import Image from "next/image";

const FEATURES = [
  {
    title: "Affordable Shipping",
    text: "Affordable shipping on orders across India",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="26" viewBox="0 0 32 26" fill="none">
        <path d="M1 1H19.5V11.25H31.5V21.75C31.5 23.82 29.82 25.5 27.75 25.5H23.25M23.25 25.5C21.18 25.5 19.5 23.82 19.5 21.75M23.25 25.5C25.32 25.5 27 23.82 27 21.75M8.25 25.5C6.18 25.5 4.5 23.82 4.5 21.75C4.5 19.68 6.18 18 8.25 18C10.32 18 12 19.68 12 21.75C12 23.82 10.32 25.5 8.25 25.5ZM1 1V17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Easy Returns",
    text: "1-day replacement on eligible orders",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="36" viewBox="0 0 30 36" fill="none">
        <path d="M15.5402 1.107C14.9282 0.631 14.0783 0.631 13.4663 1.107C10.2363 3.572 0.699204 11.613 0.750204 20.98C0.750204 28.562 6.92127 34.75 14.5203 34.75C22.1193 34.75 28.2902 28.579 28.2902 20.997C28.3072 11.766 18.7532 3.589 15.5402 1.107Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
      </svg>
    ),
  },
  {
    title: "Secure Payment",
    text: "Pay safely with Razorpay",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M3.15226 13.1081L13.1137 3.14665C16.2942 -0.0338114 17.8844 -0.0488136 21.0349 3.10165L28.401 10.4677C31.5514 13.6182 31.5364 15.2084 28.3559 18.3889L18.3945 28.3503C15.214 31.5308 13.6238 31.5458 10.4733 28.3954L3.10725 21.0293C-0.0432111 17.8788 -0.0432115 16.3036 3.15226 13.1081Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M0.75 30.75H30.7544" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Support Online",
    text: "24 hours a day, 7 days a week",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M17.2491 20.5941C17.2491 22.379 16.5891 24.029 15.4792 25.334C14.8929 26.0447 14.171 26.6548 13.3494 27.133C10.7737 28.6322 7.64721 29.092 5.08476 30.6138C4.4248 31.0188 3.58484 30.4638 3.67484 29.6988C3.90529 27.8829 2.98483 26.1589 1.97352 24.633C1.19654 23.4607 0.75 22.0767 0.75 20.5941C0.75 17.9541 2.15993 15.6292 4.31981 14.2493C5.65474 13.3793 7.25965 12.8843 8.99955 12.8843C13.5593 12.8843 17.2491 16.3342 17.2491 20.5941Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function AuthLayout({ children, tallThumb = false }) {
  return (
    <div className="aq-auth-page">
      <div className="aq-login-ptb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="aq-login-box">
                <div className="row gx-0 aq-login-box-row">
                  <div className="col-lg-6 order-2 order-lg-1 aq-login-thumb-col">
                    <div
                      className={`aq-login-thumb-wrap${tallThumb ? " custom-hight" : ""}`}
                    >
                      <Image
                        src="/images/auth/login-welcome.jpg"
                        alt="Welcome to Kavya Creation"
                        fill
                        sizes="436px"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 order-1 order-lg-2 aq-login-form-col">
                    <div className="aq-login-wrapper">{children}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="aq-login-feature">
        <div className="aq-login-feature-wrap">
          {FEATURES.map((item) => (
            <div className="aq-login-feature-item" key={item.title}>
              <div className="aq-login-feature-icon">{item.icon}</div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
