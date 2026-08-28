"use client";

import Link from "next/link";
import { ArrowIcon, getInitials } from "./DashboardIcons";

export default function DashboardHome({ profile, orderCount = 0, onNavigate }) {
  const name = profile?.name || "";

  return (
    <div className="aq-dashboard-wrapper aq-dash-pt-30">
      <h3 className="aq-dashboard-title">Dashboard</h3>
      <div className="aq-dashboard-content-layout">
        <div className="aq-dashboard-box aq-dashboard-welcome-card">
          <div className="aq-dashboard-avatar-text avatar avatar-lg">{getInitials(name)}</div>
          <div className="welcome-text">
            <h2>Welcome back {name}</h2>
            <p>
              Manage your account, view orders, and update your preferences from your personal dashboard.
            </p>
          </div>
        </div>

        <div className="aq-dashboard-grid">
          <div className="aq-dashboard-grid-card aq-dashboard-box">
            {orderCount > 0 && (
              <span className="aq-dashboard-grid-card-badge">{orderCount}</span>
            )}
            <span className="aq-dashboard-grid-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="33" height="28" viewBox="0 0 33 28" fill="none">
                <path d="M5.8 7.25H27.1L26.9 18.4C26.2 20.82 25.9 22.03 25.3 23C24.3 24.67 22.73 25.89 20.92 26.43C19.87 26.75 18.66 26.75 16.25 26.75C13.84 26.75 12.63 26.75 11.58 26.43C9.77 25.89 8.21 24.67 7.19 23C6.6 22.03 6.26 20.82 5.57 18.4L4.05 13.01" stroke="#37383A" strokeWidth="1.5" />
              </svg>
            </span>
            <h3 className="aq-dashboard-grid-card-title">View Orders</h3>
            <p>Track your recent orders and <br /> order history</p>
            <button type="button" className="aq-dashboard-grid-card-btn" onClick={() => onNavigate("orders")}>
              View Orders <span><ArrowIcon /></span>
            </button>
          </div>

          <div className="aq-dashboard-grid-card aq-dashboard-box">
            <span className="aq-dashboard-grid-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 28 32" fill="none">
                <path d="M7.37 2.4C11.47 0.16 16.5 0.2 20.56 2.51C24.58 4.86 27.02 9.05 27 13.56C26.91 18.05 24.29 22.26 21.01 25.52C19.12 27.41 17 29.08 14.72 30.5C13.22 30.74 3.3 22.52 0.75 13.34C0.93 8.52 3.42 4.56 7.37 2.4Z" stroke="#37383A" strokeWidth="1.5" />
              </svg>
            </span>
            <h3 className="aq-dashboard-grid-card-title">Manage Address</h3>
            <p>Update your shipping and <br /> billing addresses</p>
            <button type="button" className="aq-dashboard-grid-card-btn" onClick={() => onNavigate("addresses")}>
              Manage Address <span><ArrowIcon /></span>
            </button>
          </div>

          <div className="aq-dashboard-grid-card aq-dashboard-box">
            <span className="aq-dashboard-grid-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" viewBox="0 0 24 28" fill="none">
                <path d="M23.08 26.75C23.08 21.72 18.08 17.65 11.92 17.65C5.76 17.65 0.75 21.72 0.75 26.75M18.41 7.25C18.41 10.84 15.5 13.75 11.91 13.75C8.32 13.75 5.41 10.84 5.41 7.25C5.41 3.66 8.32 0.75 11.91 0.75C15.5 0.75 18.41 3.66 18.41 7.25Z" stroke="#37383A" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <h3 className="aq-dashboard-grid-card-title">My Profile</h3>
            <p>View your name, email, and <br /> mobile number</p>
            <button type="button" className="aq-dashboard-grid-card-btn" onClick={() => onNavigate("profile")}>
              View Profile <span><ArrowIcon /></span>
            </button>
          </div>
        </div>

        <div className="aq-dashboard-box aq-dashboard-cta-bar">
          <div className="cta-left">
            <div className="icon-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="28" viewBox="0 0 33 28" fill="none">
                <path d="M5.8 7.25H27.1L25.3 23C24.3 24.67 22.73 25.89 20.92 26.43C16.25 26.75 16.25 26.75 11.58 26.43C9.77 25.89 8.21 24.67 7.19 23L4.05 13" stroke="#37383A" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="cta-text">
              <h3>Ready to start shopping?</h3>
              <p>No orders yet. Explore our products and find something you love.</p>
            </div>
          </div>
          <Link href="/shop" className="aq-dashboard-cta-bar-btn">
            Browse Products <span><ArrowIcon /></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
