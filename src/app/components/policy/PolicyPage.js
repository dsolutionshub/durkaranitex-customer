import Link from "next/link";

import "./policy-page.css";

export const STORE_EMAIL = "kavyacreation1471@gmail.com";
export const STORE_PHONE = "+91 7904749251";
export const STORE_PHONE_HREF = "tel:7904749251";
export const STORE_ADDRESS =
  "6/329-4, Ashok Nagar, Near Sanjeeviraya Perumal kovil, Perumagoundampatty, Elampilai, Salem, Tamil Nadu 637502";
export const POLICY_UPDATED = "August 27, 2026";

export function PolicySection({ title, as = "h4", children }) {
  const Heading = as === "h3" ? "h3" : "h4";
  return (
    <div className="aq-privacy-content">
      <Heading className="aq-privacy-content-title">{title}</Heading>
      {children}
    </div>
  );
}

export default function PolicyPage({ title, crumb, subtitle, children }) {
  return (
    <main className="aq-policy-page">
      <div className="aq-breadcrumb-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-12">
              <div className="aq-breadcrumb-wrap text-center">
                <div className="pd-breadcrumb-list">
                  <span>
                    <Link href="/">home</Link>
                  </span>
                  <span>/</span>
                  <span>{crumb || title}</span>
                </div>
                <div className="aq-breadcrumb-content">
                  <h1 className="aq-breadcrumb-title">{title}</h1>
                  {subtitle ? <p>{subtitle}</p> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="aq-privacy-policy-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="aq-privacy-box">
                {children}
                <div className="aq-privacy-content-bottom">
                  <p>
                    Last updated on {POLICY_UPDATED}. Kavya Creation reserves
                    the right to change or modify the above contents at any time
                    without any prior notice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
