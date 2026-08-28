"use client";

export default function EmptyPanel({ title, message }) {
  return (
    <div className="aq-dashboard-wrapper aq-dash-pt-30">
      <h3 className="aq-dashboard-title">{title}</h3>
      <div className="aq-dashboard-content-layout aq-dash-mb-40">
        <div className="aq-dashboard-box">
          <div className="aq-dashboard-empty">
            <h4>{title}</h4>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
