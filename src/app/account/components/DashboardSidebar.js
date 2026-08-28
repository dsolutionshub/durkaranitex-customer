"use client";

import { useEffect, useRef } from "react";
import { MENU_ICONS, getInitials } from "./DashboardIcons";

export const DASHBOARD_MENU = [
  { key: "dashboard", label: "Dashboard" },
  { key: "orders", label: "Orders" },
  { key: "downloads", label: "Downloads", hidden: true },
  { key: "invoices", label: "Invoices" },
  { key: "returns", label: "Order Return Request", hidden: true },
  { key: "reviews", label: "Reviews", hidden: true },
  { key: "wishlist", label: "Wishlist" },
  { key: "offers", label: "Special Offers", hidden: true },
  { key: "profile", label: "Profile" },
  { key: "security", label: "Security", hidden: true },
  { key: "addresses", label: "Address" },
  { key: "logout", label: "Logout" },
];

export default function DashboardSidebar({ profile, activeKey, onSelect }) {
  const name = profile?.name || "Guest";
  const email = profile?.email || "";
  const menuRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia("(max-width: 991px)").matches) {
      return;
    }
    const active = menuRef.current?.querySelector("button.active");
    active?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [activeKey]);

  return (
    <div className="aq-dashboard-sidebar-wrap">
      <aside className="aq-dashboard-sidebar">
        <div className="aq-dashboard-profile-info">
          <div className="aq-dashboard-profile-thumb">
            <div className="aq-dashboard-avatar-text avatar">{getInitials(name)}</div>
          </div>
          <div className="aq-dashboard-profile-copy">
            <h3>{name}</h3>
            <p>{email}</p>
          </div>
        </div>
        <nav className="aq-dashboard-sidebar-menu" ref={menuRef}>
          {DASHBOARD_MENU.filter((item) => !item.hidden).map((item) => (
            <button
              key={item.key}
              type="button"
              className={activeKey === item.key ? "active" : ""}
              onClick={() => onSelect(item.key)}
            >
              <span>{MENU_ICONS[item.key]}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
}
