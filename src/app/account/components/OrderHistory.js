"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { getOrderDetails, getOrderList } from "@/app/api/services/authService";
import { loader } from "@/app/components/loader/loaderManager";
import { getErrorMessage } from "@/app/utils/helperFn";
import TabLoader from "./TabLoader";

const blankTokens = new Set(["", "-", "—", "null", "undefined"]);

function asText(value) {
  if (value == null || typeof value === "object") return "";
  const text = String(value).trim();
  return blankTokens.has(text.toLowerCase()) ? "" : text;
}

function nestedAddress(order) {
  if (!order || typeof order !== "object") return null;
  const candidates = [
    order.shipping_address,
    order.shippingAddress,
    order.billing_address,
    order.billingAddress,
    order.customer_address,
    order.customerAddress,
    order.delivery_address,
    order.deliveryAddress,
    order.addresss,
    typeof order.address === "object" ? order.address : null,
  ];
  return candidates.find((item) => item && typeof item === "object") || null;
}

function stateName(source) {
  if (!source) return "";
  if (typeof source.state === "string") return asText(source.state);
  return asText(source.state?.name);
}

function getOrderPhone(order, profile) {
  const record = nestedAddress(order) || {};
  return (
    asText(order?.mobile) ||
    asText(order?.phone) ||
    asText(order?.contact) ||
    asText(order?.phone_number) ||
    asText(record.mobile) ||
    asText(record.phone) ||
    asText(profile?.mobile) ||
    asText(profile?.phone)
  );
}

function getOrderAddress(order) {
  const shippingLine =
    asText(order?.shipping_address) ||
    asText(order?.full_address) ||
    asText(order?.delivery_address);
  if (shippingLine) return shippingLine;

  const record = nestedAddress(order) || order || {};
  return [
    asText(record.address) || asText(order?.address),
    asText(record.address1) || asText(order?.address1),
    asText(record.city) || asText(order?.city),
    stateName(record) || stateName(order),
    asText(record.pincode) || asText(order?.pincode),
  ]
    .filter(Boolean)
    .join(", ");
}

function getOrderName(order, profile) {
  const record = nestedAddress(order) || {};
  return (
    asText(order?.name) ||
    asText(record.name) ||
    asText(profile?.name)
  );
}

const statusBadge = (status) => {
  const value = String(status || "").toLowerCase();
  if (["delivered", "completed", "success", "paid"].includes(value)) {
    return "badge--success";
  }
  if (["pending", "processing", "placed"].includes(value)) {
    return "badge--pending";
  }
  return "badge--draft";
};

export default function OrderHistory({ profile, variant = "orders" }) {
  const isInvoice = variant === "invoices";
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      loader(true);
      try {
        const data = await getOrderList();
        const list = data?.cartOrderProducts || [];
        const formattedOrders = await Promise.all(
          list.map(async (order) => {
            const formatted = {
              ...order,
              formattedDate: new Date(order.created_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
            };
            if (getOrderPhone(formatted) && getOrderAddress(formatted)) {
              return formatted;
            }
            try {
              const detail = await getOrderDetails(order.id);
              const full = detail?.cartOrderProduct || detail || {};
              return { ...formatted, ...full, formattedDate: formatted.formattedDate };
            } catch {
              return formatted;
            }
          })
        );
        setOrderDetails(formattedOrders);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setIsLoading(false);
        loader(false);
      }
    };
    load();
  }, []);

  return (
    <div className="aq-dashboard-wrapper aq-dash-pt-30">
      <h3 className="aq-dashboard-title">{isInvoice ? "Invoices" : "My Orders"}</h3>
      <div className="aq-dashboard-content-layout aq-dash-mb-40">
        {isLoading ? (
          <div className="aq-dashboard-box">
            <TabLoader />
          </div>
        ) : orderDetails.length === 0 ? (
          <div className="aq-dashboard-box">
            <div className="aq-dashboard-empty">
              <h4>{isInvoice ? "No invoices yet" : "No orders yet"}</h4>
              <p>
                {isInvoice
                  ? "Invoices will appear here after you place an order."
                  : "Start shopping to see your order history here."}
              </p>
              <Link href="/shop" className="aq-dashboard-cta-bar-btn">
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          orderDetails.map((order) => {
            const paid = String(order?.payment_status || order?.status || "").toLowerCase();
            const isPaid = ["paid", "success", "completed", "delivered"].includes(paid);
            const name = getOrderName(order, profile);
            const phone = getOrderPhone(order, profile);
            const address = getOrderAddress(order);

            return (
              <div className="aq-dashboard-order-card-box aq-dashboard-box aq-dash-mb-25" key={order.id}>
                <div className="aq-dashboard-order-card">
                  <div className="aq-dashboard-order-card__header">
                    <span className="aq-dashboard-order-card__id">
                      {isInvoice
                        ? `Invoices: ${order?.order_number}`
                        : `Order ID: #${order?.order_number}`}
                    </span>
                    <span className="aq-dashboard-order-card__date">
                      <i>Date:</i> {order?.formattedDate}
                    </span>
                  </div>
                  <div className="aq-dashboard-order-card__body">
                    <div className="aq-dashboard-order-card__customer">
                      <div className="aq-dashboard-order-card__icon">
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                            <path d="M1 8L10 1L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8Z" stroke="#141414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7 21V11H13V21" stroke="#141414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                      <div className="aq-dashboard-order-card__info">
                        <p className="aq-dashboard-order-card__name">{name}</p>
                        {phone ? (
                          <p className="aq-dashboard-order-card__contact">{phone}</p>
                        ) : null}
                        {address ? (
                          <p className="aq-dashboard-order-card__address">{address}</p>
                        ) : null}
                        {!phone && !address ? (
                          <p className="aq-dashboard-order-card__address">—</p>
                        ) : null}
                      </div>
                    </div>
                    <div className="aq-dashboard-order-card__stats">
                      <div className="stat-item">
                        Amount: <i>Rs. {order?.final_amount}</i>{" "}
                        {isPaid && <span className="status-paid">(Paid)</span>}
                      </div>
                      <div className="stat-item">
                        Items: <i>{parseInt(order?.total_products, 10) || 0}</i>
                      </div>
                      <div className="stat-item">
                        Payment: <i>{order?.payment_type || "Razorpay"}</i>
                      </div>
                    </div>
                  </div>
                  <div className="aq-dashboard-order-card__footer">
                    <div className="aq-dashboard-order-card__status-wrap">
                      Status:{" "}
                      <span className={`badge ${statusBadge(order?.status)}`}>
                        {order?.status || "Pending"}
                      </span>
                    </div>
                    <div className="aq-dashboard-order-card__actions">
                      <button
                        type="button"
                        className="aq-dashboard-order-card-btn"
                        onClick={() => router.push(`/order-details?id=${order.id}`)}
                      >
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
                            <path d="M0.75 5.75C0.75 5.75 3.25 0.75 7.625 0.75C12 0.75 14.5 5.75 14.5 5.75C14.5 5.75 12 10.75 7.625 10.75C3.25 10.75 0.75 5.75 0.75 5.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M7.625 7.625C8.66 7.625 9.5 6.786 9.5 5.75C9.5 4.714 8.66 3.875 7.625 3.875C6.589 3.875 5.75 4.714 5.75 5.75C5.75 6.786 6.589 7.625 7.625 7.625Z" stroke="currentColor" strokeWidth="1.5" />
                          </svg>
                        </span>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
