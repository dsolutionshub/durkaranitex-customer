"use client";

import "./shop-features.css";

const FEATURES = [
  {
    title: "Affordable Shipping",
    text: "Affordable shipping on orders across India",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
        <path
          d="M7.60001 13.6001V0.600098H22.5999V13.6001H7.60001ZM7.60001 13.6001L0.599976 13.6001V8.60011L3.59996 5.6001H7.59995L7.60001 13.6001ZM15.6 16.1001C15.6 17.4808 16.7193 18.6001 18.1 18.6001C19.4807 18.6001 20.5999 17.4808 20.5999 16.1001C20.5999 14.7194 19.4807 13.6001 18.1 13.6001C16.7193 13.6001 15.6 14.7194 15.6 16.1001ZM2.59997 16.1001C2.59997 17.4808 3.71925 18.6001 5.09996 18.6001C6.48066 18.6001 7.59995 17.4808 7.59995 16.1001C7.59995 14.7194 6.48066 13.6001 5.09996 13.6001C3.71925 13.6001 2.59997 14.7194 2.59997 16.1001Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Easy Replacement",
    text: "Request within 1 day of delivery — no refunds",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 8.5H8.5A4.5 4.5 0 0 0 4 13M4 15.5h11.5A4.5 4.5 0 0 0 20 11"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 5 20 8.5 16.5 12M7.5 19 4 15.5 7.5 12"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Flexible Payment",
    text: "Pay with UPI, cards, and net banking",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M2.52966 14.4778L14.4797 2.52783M9.70154 16.8772L10.9015 15.6772M12.3929 14.1874L14.7829 11.7974M0.599976 20.5972H20.6M2.20125 8.83763L8.84125 2.19763C10.9612 0.0776333 12.0212 0.0676333 14.1212 2.16763L19.0312 7.07763C21.1312 9.17763 21.1212 10.2376 19.0012 12.3576L12.3612 18.9976C10.2412 21.1176 9.18124 21.1276 7.08124 19.0276L2.17125 14.1176C0.0712457 12.0176 0.0712454 10.9676 2.20125 8.83763Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Support Online",
    text: "Available Mon–Sat, 10am to 7pm",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M0.599976 15.6V9.60003C0.599976 7.2131 1.54817 4.92393 3.23597 3.23612C4.92378 1.5483 7.21293 0.600098 9.59984 0.600098C11.9868 0.600098 14.2759 1.5483 15.9637 3.23612C17.6515 4.92393 18.5997 7.2131 18.5997 9.60003V15.6M18.5997 16.6001C18.5997 17.1305 18.389 17.6392 18.0139 18.0143C17.6389 18.3893 17.1302 18.6 16.5997 18.6H15.5997C15.0693 18.6 14.5606 18.3893 14.1856 18.0143C13.8105 17.6392 13.5998 17.1305 13.5998 16.6001V13.6001C13.5998 13.0697 13.8105 12.5609 14.1856 12.1859C14.5606 11.8108 15.0693 11.6001 15.5997 11.6001H18.5997V16.6001ZM0.599976 16.6001C0.599976 17.1305 0.810686 17.6392 1.18575 18.0143C1.56082 18.3893 2.06952 18.6 2.59995 18.6H3.59993C4.13035 18.6 4.63905 18.3893 5.01412 18.0143C5.38919 17.6392 5.5999 17.1305 5.5999 16.6001V13.6001C5.5999 13.0697 5.38919 12.5609 5.01412 12.1859C4.63905 11.8108 4.13035 11.6001 3.59993 11.6001H0.599976V16.6001Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function ShopFeatures() {
  return (
    <div className="aqf-shop-feature-ptb aqf-shop-feature-style">
      <div className="container container-1830">
        <div className="aqf-shop-feature-wrap">
          {FEATURES.map((feature) => (
            <div className="aqf-shop-feature-item" key={feature.title}>
              <div className="aqf-shop-feature-icon">
                <span>{feature.icon}</span>
              </div>
              <div className="aqf-shop-feature-content">
                <h4>{feature.title}</h4>
                <p>{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
