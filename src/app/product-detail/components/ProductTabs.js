"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { formatPrice, renderDescriptionHtml } from "../utils";

const TABS = [
  { id: "description", label: "Description" },
  { id: "addInfo", label: "Additional information" },
  // Hidden for now — uncomment to restore Reviews and Ask Question tabs
  // { id: "review", label: "Reviews (0)" },
  // { id: "question", label: "Ask & Question" },
  { id: "faq", label: "Faq" },
];

const STAR =
  "M9.55008 7.09107C9.3947 7.24165 9.32331 7.45942 9.3587 7.673L9.89203 10.6246C9.93703 10.8748 9.83144 11.1279 9.62207 11.2725C9.4169 11.4225 9.14393 11.4405 8.92016 11.3205L6.26311 9.9347C6.17072 9.88551 6.06813 9.85911 5.96315 9.85611H5.80057C5.74417 9.86451 5.68898 9.88251 5.63859 9.9101L2.98094 11.3025C2.84955 11.3685 2.70077 11.3919 2.55499 11.3685C2.19984 11.3013 1.96287 10.963 2.02106 10.606L2.55499 7.6544C2.59039 7.43903 2.519 7.22006 2.36362 7.06708L0.1973 4.96735C0.0161234 4.79157 -0.0468684 4.52761 0.0359208 4.28944C0.11631 4.05187 0.321483 3.87849 0.569251 3.8395L3.55086 3.40695C3.77763 3.38356 3.97681 3.24558 4.07879 3.0416L5.39262 0.347955C5.42382 0.287962 5.46401 0.23277 5.51261 0.185976L5.5666 0.143981C5.59479 0.112785 5.62719 0.0869886 5.66319 0.0659914L5.72858 0.0419945L5.83056 0H6.08313C6.3087 0.0233969 6.50728 0.158379 6.61106 0.359953L7.94229 3.0416C8.03828 3.23778 8.22485 3.37396 8.44022 3.40695L11.4218 3.8395C11.6738 3.87549 11.8844 4.04947 11.9678 4.28944C12.0464 4.53001 11.9786 4.79397 11.7938 4.96735L9.55008 7.09107Z";

const FAQ_ITEMS = [
  {
    q: "How long does shipping take?",
    a: "Orders are processed within 1–2 business days. Delivery typically takes 5–7 days across India. Orders placed after 2 PM on Friday are processed the following Monday.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer replacements only — no refunds. If a saree arrives damaged, you may request a replacement within 1 day of delivery.",
  },
  {
    q: "How do I request a replacement?",
    a: "Email kavyacreation1471@gmail.com or call +91 7904749251 within 1 day of delivery. Please keep your order number ready and share photos of the damaged product if asked.",
  },
  {
    q: "Is Cash on Delivery available?",
    a: "COD availability is shown on each product. If it is not available, please complete payment online with Razorpay (UPI, cards, or netbanking).",
  },
  {
    q: "How should I care for my saree?",
    a: "Dry clean is recommended for silk and embellished sarees. Do not bleach. Store in a dry place, preferably wrapped in muslin. Colour may vary slightly from photos due to lighting and screen settings.",
  },
  {
    q: "How can I contact Kavya Creation?",
    a: "Call +91 7904749251 or email kavyacreation1471@gmail.com. We are happy to help with orders, shipping, and replacements.",
  },
];

function WashingInstructions() {
  return (
    <div className="product-details-desc-icon-wrap">
      <h4 className="product-details-desc-list-title">Washing Instructions</h4>
      <div className="product-details-desc-icon" aria-hidden>
        <svg className="aq-wash-icon" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H32V28C32 30.2 30.2 32 28 32H8C5.8 32 4 30.2 4 28V6Z" stroke="currentColor" strokeWidth="1.7" />
          <path d="M10 4V6M26 4V6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M8 16C10.5 13.8 13.5 13.8 16 16C18.5 18.2 21.5 18.2 24 16C26.5 13.8 28 14.2 28 14.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="18" cy="22.5" r="1.6" fill="currentColor" />
          <path d="M8 35.5H28M8 38.5H28" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
        <svg className="aq-wash-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 5L32 31H4L18 5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M12 14L24 28M24 14L12 28" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
        <svg className="aq-wash-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="28" height="28" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="18" cy="18" r="8" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="18" cy="18" r="1.6" fill="currentColor" />
        </svg>
        <svg className="aq-wash-icon" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 24H28C32 24 34 20 34 16C34 11 31 8 26 8H6V24Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M6 18H22" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M10 6L30 28M30 6L10 28" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
        <svg className="aq-wash-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="18" r="13" stroke="currentColor" strokeWidth="1.7" />
          <path d="M10 10L26 26M26 10L10 26" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </div>
      <p>
        Machine wash, no ironing, don&apos;t dry clean, don&apos;t
        <br />
        tumble dry
      </p>
    </div>
  );
}
function StarIcons({ count = 5, filled = 0, onSelect }) {
  return Array.from({ length: count }).map((_, index) => {
    const value = index + 1;
    const isOn = value <= filled;
    if (onSelect) {
      return (
        <button
          type="button"
          key={value}
          className={isOn ? "is-on" : ""}
          onClick={() => onSelect(value)}
          aria-label={`${value} star`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d={STAR} fill="currentColor" />
          </svg>
        </button>
      );
    }
    return (
      <span key={value} style={{ opacity: isOn ? 1 : 0.25 }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d={STAR} fill="currentColor" />
        </svg>
      </span>
    );
  });
}

export default function ProductTabs({ product, onAskQuestion }) {
  const [tab, setTab] = useState("description");
  const [faqOpen, setFaqOpen] = useState(0);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState({ name: "", email: "", message: "", save: false });

  const descriptionHtml = renderDescriptionHtml(
    product?.description || product?.short_description
  );
  const hasDisclaimer = /disclaimer/i.test(descriptionHtml || "");
  const categoryName =
    product?.category?.name ||
    product?.category_name ||
    (typeof product?.category === "string" ? product.category : "—");
  const outOfStock = parseFloat(product?.quantity) <= 0;

  const submitReview = (event) => {
    event.preventDefault();
    toast.success(
      "Thank you. Reviews will appear here once this feature is enabled."
    );
    setReview({ name: "", email: "", message: "", save: false });
    setRating(5);
  };

  return (
    <div className="product-details-tab">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="product-details-tab-nav">
              <nav>
                <div className="product-details-nav nav nav-tab justify-content-center p-relative" role="tablist">
                  {TABS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`nav-links${tab === item.id ? " active" : ""}`}
                      onClick={() => setTab(item.id)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </nav>
              <div className="tab-content">
                {tab === "description" && (
                  <div className="product-details-tab-item">
                    <div className="product-details-desc-wrap">
                      <h3 className="product-details-desc-title">
                        {product?.title || "Product description"}
                      </h3>
                      {descriptionHtml ? (
                        <div
                          className="aq-pd-desc-html"
                          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                        />
                      ) : (
                        <p className="aq-pd-empty">
                          Product details will appear here.
                        </p>
                      )}
                      {!hasDisclaimer && (
                        <p>
                          Disclaimer: Product colour may slightly vary due to
                          photographic lighting or your screen settings. Dry
                          clean is recommended for silk and embellished sarees.
                        </p>
                      )}
                      <WashingInstructions />
                    </div>
                  </div>
                )}

                {tab === "addInfo" && (
                  <div className="product-details-tab-item">
                    <div className="product-details-additional-info">
                      <h4 className="product-details-additional-info-title">
                        Additional information
                      </h4>
                      <table>
                        <tbody>
                          <tr>
                            <td>SKU</td>
                            <td>{product?.sku || "—"}</td>
                          </tr>
                          <tr>
                            <td>Category</td>
                            <td>{categoryName}</td>
                          </tr>
                          <tr>
                            <td>Availability</td>
                            <td>
                              {outOfStock
                                ? "Out of Stock"
                                : `In Stock (${product?.quantity || 0})`}
                            </td>
                          </tr>
                          <tr>
                            <td>Price</td>
                            <td>Rs. {formatPrice(product?.price)}</td>
                          </tr>
                          {product?.product_price &&
                          Number(product.product_price) >
                            Number(product.price) ? (
                            <tr>
                              <td>MRP</td>
                              <td>Rs. {formatPrice(product.product_price)}</td>
                            </tr>
                          ) : null}
                          <tr>
                            <td>Cash on Delivery</td>
                            <td>
                              {product?.is_cod_available === "0"
                                ? "Not available"
                                : "Available"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Hidden for now — uncomment with the TABS entries above to restore Reviews */}
                {false && tab === "review" && (
                  <div className="product-details-tab-item">
                    <div className="product-details-review-wrapper">
                      <div className="row">
                        <div className="col-xl-6">
                          <div className="product-details-review-statics mb-30">
                            <div className="product-details-review-number d-inline-block mb-50">
                              <h3 className="product-details-review-number-title">
                                Customer reviews
                              </h3>
                              <div className="product-details-review-summery d-flex align-items-center">
                                <div className="product-details-review-summery-value">
                                  <span>0.0</span>
                                </div>
                                <div className="product-details-review-summery-rating d-flex align-items-center">
                                  <StarIcons filled={0} />
                                  <p>(0 Reviews)</p>
                                </div>
                              </div>
                              <div className="product-details-review-rating-list">
                                {[5, 4, 3, 2, 1].map((star) => (
                                  <div
                                    key={star}
                                    className="product-details-review-rating-item d-flex align-items-center"
                                  >
                                    <span>{star} Start</span>
                                    <div className="product-details-review-rating-bar">
                                      <span
                                        className="product-details-review-rating-bar-inner"
                                        style={{ width: "0%" }}
                                      />
                                    </div>
                                    <div className="product-details-review-rating-percent">
                                      <span>0%</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="product-details-review-list pr-110">
                              <h3 className="product-details-review-title">
                                Rating & Review
                              </h3>
                              <p className="aq-pd-empty">
                                There are no reviews yet for this product.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="product-details-review-form">
                            <h3 className="product-details-review-form-title">
                              Review this product
                            </h3>
                            <p>
                              Your email address will not be published. Required
                              fields are marked *
                            </p>
                            <form onSubmit={submitReview}>
                              <div className="product-details-review-form-rating d-flex align-items-center">
                                <p>Your Rating :</p>
                                <div className="product-details-review-form-rating-icon d-flex">
                                  <StarIcons
                                    filled={rating}
                                    onSelect={setRating}
                                  />
                                </div>
                              </div>
                              <div className="product-details-review-input-wrapper">
                                <div className="product-details-review-input-box">
                                  <label className="aq-form-label" htmlFor="pd-review-msg">
                                    Your Review *
                                  </label>
                                  <textarea
                                    className="aq-form-control brr-0"
                                    id="pd-review-msg"
                                    required
                                    value={review.message}
                                    onChange={(event) =>
                                      setReview((prev) => ({
                                        ...prev,
                                        message: event.target.value,
                                      }))
                                    }
                                    placeholder="Write your review here..."
                                  />
                                </div>
                                <div className="product-details-review-input-box">
                                  <label className="aq-form-label" htmlFor="pd-review-name">
                                    Your Name*
                                  </label>
                                  <input
                                    className="aq-form-control brr-0"
                                    id="pd-review-name"
                                    type="text"
                                    required
                                    value={review.name}
                                    onChange={(event) =>
                                      setReview((prev) => ({
                                        ...prev,
                                        name: event.target.value,
                                      }))
                                    }
                                    placeholder="Your name"
                                  />
                                </div>
                                <div className="product-details-review-input-box">
                                  <label className="aq-form-label" htmlFor="pd-review-email">
                                    Your Email*
                                  </label>
                                  <input
                                    className="aq-form-control brr-0"
                                    id="pd-review-email"
                                    type="email"
                                    required
                                    value={review.email}
                                    onChange={(event) =>
                                      setReview((prev) => ({
                                        ...prev,
                                        email: event.target.value,
                                      }))
                                    }
                                    placeholder="you@email.com"
                                  />
                                </div>
                              </div>
                              <div className="product-details-review-suggetions mb-20">
                                <div className="product-details-review-remeber">
                                  <input
                                    className="aq-form-checkbox"
                                    id="pd-review-remember"
                                    type="checkbox"
                                    checked={review.save}
                                    onChange={(event) =>
                                      setReview((prev) => ({
                                        ...prev,
                                        save: event.target.checked,
                                      }))
                                    }
                                  />
                                  <label
                                    className="aq-form-checkbox-label"
                                    htmlFor="pd-review-remember"
                                  >
                                    Save my name, email, and website in this
                                    browser for the next time I comment.
                                  </label>
                                </div>
                              </div>
                              <div className="product-details-review-btn-wrapper">
                                <button type="submit" className="aq-btn-black">
                                  Submit Review
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Hidden for now — uncomment with the TABS entries above to restore Ask Question */}
                {false && tab === "question" && (
                  <div className="product-details-tab-item">
                    <div className="product-details-question-container">
                      <div className="product-details-question-header">
                        <div className="product-details-question-header-left">
                          <h3 className="product-details-policy-title">
                            Questions (0)
                          </h3>
                          <p className="m-0">
                            Have a question about this product? Get specific
                            details from our team.
                          </p>
                        </div>
                        <div className="product-details-question-header-right">
                          <button
                            type="button"
                            className="aq-btn-black btn-red-bg btn-square"
                            onClick={onAskQuestion}
                          >
                            Ask Question
                          </button>
                        </div>
                      </div>
                      <p className="aq-pd-empty">
                        No questions have been asked about this product yet.
                      </p>
                    </div>
                  </div>
                )}

                {tab === "faq" && (
                  <div className="product-details-tab-item">
                    <div className="aq-faq-wrap">
                      <div className="accordion">
                        {FAQ_ITEMS.map((item, index) => {
                          const open = faqOpen === index;
                          return (
                            <div className="accordion-items" key={item.q}>
                              <div className="accordion-header">
                                <button
                                  className={`accordion-buttons${open ? "" : " collapsed"}`}
                                  type="button"
                                  onClick={() =>
                                    setFaqOpen(open ? -1 : index)
                                  }
                                >
                                  {item.q}
                                  <span className="aq-faq-icon" />
                                </button>
                              </div>
                              {open ? (
                                <div className="accordion-collapse">
                                  <div className="accordion-body">
                                    <p>{item.a}</p>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
