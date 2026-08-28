"use client";

import { useEffect, useState } from "react";
import { getInitials } from "./DashboardIcons";

export default function AccountDetails({ data }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    setForm({
      name: data?.name || "",
      email: data?.email || "",
      mobile: data?.mobile || "",
    });
  }, [data]);

  return (
    <div className="aq-dashboard-wrapper aq-dash-pt-30">
      <h3 className="aq-dashboard-title">My Profile</h3>
      <div className="aq-dashboard-content-layout aq-dash-mb-40">
        <div className="aq-dashboard-box aq-dash-mb-20">
          <div className="aq-dashboard-profile-box">
            <div className="aq-dashboard-profile-avatar-wrap text-center aq-dash-mb-45">
              <div className="aq-dashboard-profile-avatar p-relative">
                <div className="aq-dashboard-avatar-text">{getInitials(form.name)}</div>
              </div>
            </div>
            <div className="aq-dashboard-profile-from-wrap">
              <div className="row">
                <div className="col-lg-12">
                  <div className="aq-dashboard-from-input">
                    <label className="aq-form-label">Full Name</label>
                    <input
                      className="aq-form-control"
                      type="text"
                      name="name"
                      value={form.name}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="aq-dashboard-from-input">
                    <label className="aq-form-label">Your Email</label>
                    <input
                      className="aq-form-control"
                      type="text"
                      name="email"
                      value={form.email}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="aq-dashboard-from-input">
                    <label className="aq-form-label">Mobile No</label>
                    <input
                      className="aq-form-control"
                      type="text"
                      name="mobile"
                      value={form.mobile}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
