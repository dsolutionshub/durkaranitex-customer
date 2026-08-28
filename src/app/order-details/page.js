"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { signOut, useSession } from "next-auth/react";

import { getOrderDetails, getProfileInfo, logout } from "../api/services/authService";
import { getErrorMessage } from "../utils/helperFn";
import { LOGIN_MSG } from "../utils/constants";
import { loader } from "../components/loader/loaderManager";
import Loader from "../components/loader/loader";
import { useAuthStore } from "@/store/useAuthStore";
import useCartPanelStore from "@/store/useCartPanelStore";
import DashboardSidebar from "../account/components/DashboardSidebar";

import { printInvoice } from "../utils/printInvoice";

import "../account/account-page.css";
import "./order-details-page.css";

const TIMELINE_STEPS = [
  {
    title: "Order Placed",
    desc: (id) => `Your order was placed successfully. Order id #${id}`,
  },
  {
    title: "Processing",
    desc: () => "We have received your order and will confirm shortly.",
  },
  {
    title: "Packed",
    desc: () => "Your order is packed now.",
  },
  {
    title: "Shipped",
    desc: () => "Your order is on the way.",
  },
  {
    title: "Delivered",
    desc: () => "You have received your order.",
  },
];

function formatMoney(value) {
  const amount = Number(value);
  if (Number.isNaN(amount)) {
    return "0";
  }
  return amount.toLocaleString("en-IN");
}

function formatOrderWhen(value) {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatTimelineDate(value) {
  if (!value) {
    return { day: "—", hour: "" };
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return { day: "—", hour: "" };
  }
  return {
    day: date.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
    hour: date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  };
}

function completedStepCount(status) {
  const value = String(status || "").toLowerCase();
  if (["delivered", "completed", "success"].includes(value)) {
    return 5;
  }
  if (["out for delivery", "shipped", "delivering", "dispatched"].includes(value)) {
    return 4;
  }
  if (["packed", "packing"].includes(value)) {
    return 3;
  }
  if (["processing", "confirmed"].includes(value)) {
    return 2;
  }
  return 1;
}

function badgeClass(status) {
  const value = String(status || "").toLowerCase();
  if (["delivered", "completed", "success", "paid"].includes(value)) {
    return "";
  }
  if (["pending", "processing", "placed", "packing", "packed"].includes(value)) {
    return "is-pending";
  }
  return "is-draft";
}

function HouseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
      <path
        d="M1 8L10 1L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8Z"
        stroke="#141414"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 21V11H13V21"
        stroke="#141414"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M10.75 5.75L0.75 5.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.75 0.75L0.75 5.75L5.75 10.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
      <path
        d="M10 1L3.8125 7L1 4.27273"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AddressCard({ title, name, phone, address }) {
  return (
    <div className="aq-dashboard-box aq-dash-mb-20">
      <div className="aq-dashboard-product-header">
        <h3 className="aq-dashboard-product-title">{title}</h3>
      </div>
      <div className="aq-dashboard-order-card__body">
        <div className="aq-dashboard-order-card__customer m-0">
          <div className="aq-dashboard-order-card__icon">
            <span>
              <HouseIcon />
            </span>
          </div>
          <div className="aq-dashboard-order-card__info">
            <p className="aq-dashboard-order-card__name">{name || "—"}</p>
            <p className="aq-dashboard-order-card__contact">{phone || "—"}</p>
            <p className="aq-dashboard-order-card__address">{address || "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data: session, status: authStatus } = useSession();
  const { handleLogout, isLoggedIn, userData } = useAuthStore();
  const { resetCart } = useCartPanelStore();
  const [order, setOrder] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const isGoogleSession = Boolean(session?.user?.email);
  const displayProfile = isGoogleSession
    ? { name: session.user.name, email: session.user.email }
    : profile || userData;

  useEffect(() => {
    if (authStatus === "loading") {
      return;
    }
    const token = localStorage.getItem("accessToken");
    if (token && token !== "undefined") {
      setIsCheckingAuth(false);
      return;
    }
    if (session?.user?.accessToken || isLoggedIn === true) {
      setIsCheckingAuth(false);
      return;
    }
    if (authStatus === "authenticated" && isLoggedIn !== false) {
      return;
    }
    toast.error(LOGIN_MSG);
    router.replace("/login");
  }, [authStatus, session, router, isLoggedIn]);

  useEffect(() => {
    if (isCheckingAuth) {
      return;
    }
    const load = async () => {
      loader(true);
      try {
        if (!isGoogleSession) {
          try {
            const { customer } = await getProfileInfo();
            setProfile(customer || null);
          } catch {
            setProfile(userData || null);
          }
        }
        const data = await getOrderDetails(id);
        setOrder(data?.cartOrderProduct || data || null);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        loader(false);
      }
    };
    load();
  }, [id, isCheckingAuth, isGoogleSession, userData]);

  const handleSelect = async (key) => {
    if (key === "logout") {
      try {
        const data = await logout();
        toast.success(data?.message);
      } catch {
        // continue client logout
      }
      handleLogout();
      resetCart();
      await signOut({ callbackUrl: "/login" });
      return;
    }
    sessionStorage.setItem("tab", key);
    router.push("/account");
  };

  const goBackToOrders = () => {
    sessionStorage.setItem("tab", "orders");
    router.push("/account");
  };

  const handleInvoice = () => {
    printInvoice({
      order,
      profile: displayProfile,
    });
  };

  if (isCheckingAuth) {
    return (
      <div className="h-[60vh]">
        <Loader />
      </div>
    );
  }

  const products = Array.isArray(order?.cart_order_products)
    ? order.cart_order_products
    : [];
  const address = [order?.address, order?.address1, order?.city, order?.pincode]
    .filter(Boolean)
    .join(", ");
  const when = formatOrderWhen(order?.created_at);
  const timelineDate = formatTimelineDate(order?.created_at);
  const doneCount = completedStepCount(order?.status);
  const statusLabel = order?.status || "Pending";
  const shippingFee = Number(order?.delivery_fees) || 0;
  const discount = Number(order?.coupon_discount) || 0;
  const paymentLabel = order?.payment_type || "Razorpay";

  return (
    <div className="aq-dashboard-page" data-bg-color="#F9F9F9">
      <div className="aq-dashboard-ptb">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <DashboardSidebar
                profile={displayProfile}
                activeKey="orders"
                onSelect={handleSelect}
              />
            </div>
            <div className="col-lg-9">
              <div className="aq-dashboard-wrapper aq-dash-pt-30">
                <h3 className="aq-dashboard-title">Order Details</h3>
                {!order ? (
                  <div className="aq-dashboard-box">
                    <div className="aq-dashboard-empty">
                      <h4>Order not found</h4>
                      <p>We could not load this order. Please try again from My Orders.</p>
                      <Link href="/account" className="aq-dashboard-cta-bar-btn">
                        Back to Orders
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="aq-dashboard-content-layout aq-dash-mb-40">
                    <div className="aq-dashboard-order-banner aq-dashboard-box aq-dash-mb-20">
                      <div className="aq-dashboard-order-banner__content">
                        <button
                          type="button"
                          className="aq-dashboard-order-back"
                          onClick={goBackToOrders}
                          aria-label="Back to orders"
                        >
                          <BackIcon />
                        </button>
                        <div className="aq-dashboard-order-banner__text">
                          <h2 className="aq-dashboard-order-banner__id">
                            Order ID: #{order?.order_number}
                          </h2>
                          <p className="aq-dashboard-order-banner__meta">
                            {when ? `${when} from ` : "Payment: "}
                            <span>{paymentLabel}</span>
                          </p>
                        </div>
                      </div>
                      <div className="aq-dashboard-order-banner__status">
                        <span className={`aq-dashboard-badge ${badgeClass(order?.status)}`}>
                          {statusLabel}
                        </span>
                      </div>
                    </div>

                    <div className="aq-dashboard-product-card aq-dashboard-box aq-dash-mb-20">
                      <div className="aq-dashboard-product-header">
                        <h3 className="aq-dashboard-product-title">Products</h3>
                      </div>
                      <div className="aq-dashboard-product-body">
                        {products.length === 0 ? (
                          <p className="aq-dashboard-empty-text">No products in this order.</p>
                        ) : (
                          products.map((item, index) => {
                            const product = item?.product || {};
                            const image = product?.images?.[0]?.image;
                            const productId = product?.id || item?.product_id;
                            return (
                              <div className="aq-dashboard-product-item" key={item?.id || index}>
                                <div className="aq-dashboard-product-item-left">
                                  <div className="aq-dashboard-product-image">
                                    {image ? (
                                      <Image
                                        src={image}
                                        alt={product?.title || "Product"}
                                        width={90}
                                        height={90}
                                      />
                                    ) : null}
                                  </div>
                                  <div className="aq-dashboard-product-info">
                                    {product?.category?.name ? (
                                      <p className="aq-dashboard-product-vendor">
                                        Category: <span>{product.category.name}</span>
                                      </p>
                                    ) : null}
                                    <h4 className="aq-dashboard-product-name">
                                      {productId ? (
                                        <Link href={`/product-detail?id=${productId}`}>
                                          {product?.title || "Product"}
                                        </Link>
                                      ) : (
                                        product?.title || "Product"
                                      )}
                                    </h4>
                                    {product?.sku ? (
                                      <p className="aq-dashboard-product-meta">SKU: {product.sku}</p>
                                    ) : null}
                                  </div>
                                </div>
                                <div className="aq-dashboard-product-pricing">
                                  <div className="aq-dashboard-price-row">
                                    <span className="label">Price:</span>
                                    <span className="value">Rs. {formatMoney(item?.price)}</span>
                                  </div>
                                  <div className="aq-dashboard-price-row">
                                    <span className="label">Quantity:</span>
                                    <span className="value">{item?.quantity}</span>
                                  </div>
                                  <div className="aq-dashboard-price-row total-row">
                                    <span className="label">Total:</span>
                                    <span className="value">
                                      Rs. {formatMoney(item?.total_amount)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                      <div className="aq-dashboard-product-footer">
                        <span className="aq-dashboard-total-label">Total Amount (incl Shipping):</span>
                        <span className="aq-dashboard-total-value">
                          Rs. {formatMoney(order?.final_amount)}
                        </span>
                      </div>
                    </div>

                    <AddressCard
                      title="Shipping Address"
                      name={order?.name}
                      phone={order?.mobile}
                      address={address}
                    />
                    <AddressCard
                      title="Billing Address"
                      name={order?.name}
                      phone={order?.mobile}
                      address={address}
                    />

                    <div className="aq-dashboard-box aq-dash-mb-20">
                      <div className="aq-dashboard-product-header">
                        <h3 className="aq-dashboard-product-title">Timeline</h3>
                      </div>
                      <div className="aq-dashboard-timeline">
                        <div className="aq-dashboard-timeline-container">
                          {TIMELINE_STEPS.map((step, index) => {
                            const completed = index < doneCount;
                            return (
                              <div
                                className={`aq-dashboard-timeline-item${
                                  completed ? " aq-dashboard-timeline-item--completed" : ""
                                }`}
                                key={step.title}
                              >
                                <div className="aq-dashboard-timeline-date">
                                  <span className="aq-dashboard-timeline-day">
                                    {completed ? timelineDate.day : "—"}
                                  </span>
                                  <span className="aq-dashboard-timeline-hour">
                                    {completed ? timelineDate.hour : ""}
                                  </span>
                                </div>
                                <div className="aq-dashboard-timeline-status">
                                  <div className="aq-dashboard-timeline-node">
                                    {completed ? <CheckIcon /> : null}
                                  </div>
                                </div>
                                <div className="aq-dashboard-timeline-content">
                                  <h4 className="aq-dashboard-timeline-title">{step.title}</h4>
                                  <p className="aq-dashboard-timeline-desc">
                                    {step.desc(order?.order_number)}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="aq-dashboard-summary-card aq-dashboard-box aq-dash-mb-20">
                      <div className="aq-dashboard-summary-header">
                        <h3 className="aq-dashboard-summary-title">Order Summary</h3>
                        <div className="aq-dashboard-summary-status">
                          <span>Status:</span>
                          <span className={`aq-dashboard-badge ${badgeClass(order?.status)}`}>
                            {statusLabel}
                          </span>
                        </div>
                      </div>
                      <div className="aq-dashboard-summary-body">
                        <div className="aq-dashboard-summary-row">
                          <span className="aq-dashboard-label">Order ID:</span>
                          <span className="aq-dashboard-value">#{order?.order_number}</span>
                        </div>
                        <div className="aq-dashboard-summary-row">
                          <span className="aq-dashboard-label">Order At:</span>
                          <span className="aq-dashboard-value">
                            {when || "—"}
                          </span>
                        </div>
                        <div className="aq-dashboard-summary-row">
                          <span className="aq-dashboard-label">Subtotal (MRP):</span>
                          <span className="aq-dashboard-value">
                            Rs. {formatMoney(order?.total_amount)}
                          </span>
                        </div>
                        <div className="aq-dashboard-summary-row">
                          <span className="aq-dashboard-label">Discount applied:</span>
                          <span className="aq-dashboard-value aq-dashboard-text-red">
                            {discount > 0 ? `- Rs. ${formatMoney(discount)}` : "Rs. 0"}
                          </span>
                        </div>
                        <div className="aq-dashboard-summary-row">
                          <span className="aq-dashboard-label">Delivery Charge:</span>
                          <span className="aq-dashboard-value">
                            {shippingFee <= 0 ? "Rs. 0" : `Rs. ${formatMoney(shippingFee)}`}
                          </span>
                        </div>
                      </div>
                      <div className="aq-dashboard-summary-footer">
                        <span className="aq-dashboard-total-label">Amount Paid</span>
                        <span className="aq-dashboard-total-value">
                          Rs. {formatMoney(order?.final_amount)}
                        </span>
                      </div>
                    </div>

                    <div className="aq-dashboard-summary-btns">
                      <button
                        type="button"
                        className="aq-dashboard-order-card-btn btn-green-bg"
                        onClick={handleInvoice}
                      >
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M5.03317 13.5511C3.33467 13.5511 2.48542 13.5511 1.8808 13.1885C1.48562 12.9515 1.16727 12.6127 0.961802 12.2103C0.647434 11.5947 0.731938 10.7808 0.900944 9.15282C1.04203 7.79386 1.11257 7.11437 1.45947 6.61536C1.68723 6.28773 1.99527 6.0192 2.35638 5.8335C2.90638 5.55066 3.61531 5.55066 5.03317 5.55066H12.4668C13.8847 5.55066 14.5936 5.55066 15.1436 5.8335C15.5047 6.0192 15.8128 6.28773 16.0405 6.61536C16.3874 7.11437 16.458 7.79386 16.5991 9.15282C16.7681 10.7808 16.8526 11.5947 16.5382 12.2103C16.3327 12.6127 16.0144 12.9515 15.6192 13.1885C15.0146 13.5511 14.1653 13.5511 12.4668 13.5511" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M12.75 5.55024V3.95016C12.75 2.44159 12.75 1.6873 12.2814 1.21865C11.8127 0.75 11.0585 0.75 9.55 0.75H7.95C6.44151 0.75 5.68726 0.75 5.21863 1.21865C4.75 1.6873 4.75 2.44159 4.75 3.95016V5.55024" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M10.3409 11.9502L7.15906 11.9502C6.61082 11.9502 6.3367 11.9502 6.10346 12.0373C5.79249 12.1534 5.52621 12.379 5.34696 12.6782C5.21252 12.9026 5.14604 13.1911 5.01307 13.7682C4.8053 14.6699 4.70142 15.1208 4.77208 15.4823C4.86628 15.9643 5.15989 16.3723 5.56801 16.5884C5.8741 16.7504 6.30242 16.7504 7.15906 16.7504L10.3409 16.7504C11.1976 16.7504 11.6259 16.7504 11.932 16.5884C12.3401 16.3723 12.6337 15.9643 12.7279 15.4823C12.7986 15.1208 12.6947 14.6699 12.4869 13.7682C12.354 13.1911 12.2875 12.9026 12.153 12.6782C11.9738 12.379 11.7075 12.1534 11.3965 12.0373C11.1633 11.9502 10.8892 11.9502 10.3409 11.9502Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M13.5469 8.75H13.5541" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        Print Invoice
                      </button>
                      <button
                        type="button"
                        className="aq-dashboard-order-card-btn"
                        onClick={handleInvoice}
                      >
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M5.75 0.75V10.75M5.75 10.75L10.75 5.75M5.75 10.75L0.75 5.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        Download Invoice
                      </button>
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

export default function WrappedOrderDetailsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <OrderDetailsPage />
    </Suspense>
  );
}
