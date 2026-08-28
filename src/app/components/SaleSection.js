"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import "./sale-section.css";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatExpiry(dateStr) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return `${MONTHS[date.getMonth()]} ${String(date.getDate()).padStart(2, "0")}, ${date.getFullYear()}`;
}

function formatOff(offer) {
  if (offer?.type === "fixed") {
    return `Rs. ${parseInt(offer.value, 10) || 0} Off`;
  }
  return `${parseInt(offer.value, 10) || 0}% Off`;
}

function CopyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M10.5 5.5V4.2C10.5 3.53726 9.96274 3 9.3 3H4.2C3.53726 3 3 3.53726 3 4.2V9.3C3 9.96274 3.53726 10.5 4.2 10.5H5.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M3.5 8.2L6.4 11.1L12.5 4.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SaleSection({ data }) {
  const router = useRouter();
  const [copiedCode, setCopiedCode] = useState(null);
  const offers = data || [];

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      toast.success("Code Copied");
      setTimeout(() => setCopiedCode(null), 2000);
    } catch {
      toast.error("Unable to copy code");
    }
  };

  if (!offers.length) {
    return null;
  }

  return (
    <section className="aq-offer-area">
      <div className="container">
        <div className="row">
          {offers.map((offer) => {
            const offLabel = formatOff(offer);
            const expiry = formatExpiry(offer?.expires_at);
            const isCopied = copiedCode === offer?.code;

            return (
              <div className="col-lg-6" key={offer?.code || offer?.name}>
                <div className="aqf-banner-2-box">
                  <div className="aqf-banner-2-thumb">
                    <Image
                      src={offer?.image || "/images/home/KCLogo.png"}
                      alt={offer?.name || "Special offer"}
                      fill
                      sizes="(max-width: 767px) 100vw, 25vw"
                    />
                  </div>
                  <div className="aqf-banner-2-content">
                    <span className="aq-section-subtitle">
                      Special Offer · {offLabel}
                    </span>
                    <h4
                      className={`aq-section-title${
                        (offer?.name || "").length <= 17 ? " is-single-line" : ""
                      }`}
                    >
                      {offer?.name}
                    </h4>
                    <p className="aq-offer-banner-meta">
                      {expiry ? `Expires ${expiry}` : ""}
                      {offer?.min_amount
                        ? `${expiry ? " · " : ""}Min. order Rs. ${parseInt(offer.min_amount, 10) || 0}`
                        : ""}
                    </p>
                    <button
                      type="button"
                      className="aq-coupon-copy-btn"
                      onClick={() => handleCopy(offer?.code)}
                    >
                      <em>{isCopied ? "Copied" : "Copy Code"}</em>
                      <span>{offer?.code}</span>
                      {isCopied ? <CheckIcon /> : <CopyIcon />}
                    </button>
                    <button
                      type="button"
                      className="aq-btn-black"
                      onClick={() => router.push("/shop")}
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
