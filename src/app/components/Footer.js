"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useCategoryList } from "@/app/hooks/useCategoryList";

import "./footer/footer.css";

const SHOPPING_LINKS = [
  { label: "Wishlist", path: "/wishlist" },
  { label: "Shop", path: "/shop" },
  { label: "Cart", path: "/cart" },
  { label: "My account", path: "/account" },
  { label: "Home", path: "/" },
];

const LEGAL_LINKS = [
  { label: "Terms & Conditions", path: "/terms-and-conditions" },
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Replacement Policy", path: "/replacement-policy" },
  { label: "Shipping Policy", path: "/shipping-policy" },
];

const SERVICE_LINKS = [
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "FAQ", path: "/contact" },
  { label: "My orders", path: "/account" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/18uH7anG1X/?mibextid=wwXIfr",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#1877F2" />
        <path
          fill="#fff"
          d="M16.67 15.3 17.2 12h-3.13v-2.14c0-.9.44-1.78 1.86-1.78h1.44V5.18S16.06 5 14.8 5c-2.64 0-4.36 1.6-4.36 4.5V12H7.8v3.3h2.64V22h3.63v-6.7h2.6z"
        />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/kav_ya_creations?igsh=eGh2NzU5MHQzMGE0",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <radialGradient id="kc-ig-gradient" cx="0.3" cy="1.1" r="1.2">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="45%" stopColor="#fd5949" />
            <stop offset="60%" stopColor="#d6249f" />
            <stop offset="90%" stopColor="#285AEB" />
          </radialGradient>
        </defs>
        <rect width="24" height="24" rx="6" fill="url(#kc-ig-gradient)" />
        <rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="#fff" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.8" fill="none" stroke="#fff" strokeWidth="1.8" />
        <circle cx="17.1" cy="6.9" r="1.1" fill="#fff" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@kavya_creations_?si=GeKOQc_qlkPi5gVd",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 24 17" aria-hidden="true">
        <path
          fill="#FF0000"
          d="M23.5 2.7A3 3 0 0 0 21.4.6C19.5.1 12 .1 12 .1s-7.5 0-9.4.5A3 3 0 0 0 .5 2.7 31 31 0 0 0 0 8.5a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-5.8 31 31 0 0 0-.5-5.8z"
        />
        <path fill="#fff" d="M9.75 12.1V4.9L16.2 8.5 9.75 12.1z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://api.whatsapp.com/send?phone=917904749251&text=Hi%2C%20I'm%20interested%20in%20your%20products",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill="#25D366" />
        <path
          fill="#fff"
          d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17 0-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z"
        />
      </svg>
    ),
  },
];

function useIsMobileFooter() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  return isMobile;
}

function FooterMenu({ title, items, extraClass = "" }) {
  const isMobile = useIsMobileFooter();
  const [open, setOpen] = useState(false);

  return (
    <details
      className={`aq-footer-widget aq-footer-accordion ${extraClass}`.trim()}
      open={isMobile ? open : true}
      onToggle={(event) => {
        if (isMobile) setOpen(event.currentTarget.open);
      }}
    >
      <summary className="aq-footer-widget-title aq-footer-accordion-toggle">
        {title}
        <span className="aq-footer-accordion-icon" aria-hidden="true" />
      </summary>
      <div className="aq-footer-widget-menu">
        <ul>
          {items.map((item) => (
            <li key={`${title}-${item.label}`}>
              <Link href={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

export default function Footer() {
  const { data: categoryData } = useCategoryList();
  const categoryList = useMemo(
    () =>
      (categoryData?.categories || [])
        .filter((category) => category?.id && category?.name)
        .slice(0, 6)
        .map((category) => ({
          label: category.name,
          path: `/shop?id=${category.id}`,
        })),
    [categoryData]
  );

  const categoryItems =
    categoryList.length > 0
      ? categoryList
      : [{ label: "All products", path: "/shop" }];

  return (
    <footer id="footer">
      <div className="aq-footer-area aq-footer-style-2">
        <div className="container container-1830">
          <div className="aq-footer-widget-wrap">
            <div className="aq-footer-columns">
              <div className="aq-footer-col aq-footer-col-brand">
                <div className="aq-footer-widget">
                  <h4 className="aq-footer-widget-title aq-foot-mb-5">Kavya Creation</h4>
                  <div className="aq-footer-widget-input-box aq-foot-mb-25">
                    <p className="aq-foot-mb-15">
                      A trusted home for authentic silk and cotton sarees from Elampilai —
                      traditional weaves and contemporary Indian wear, crafted with care.
                    </p>
                  </div>
                  <div className="aq-footer-widget-social-box">
                    <h4 className="aq-footer-widget-social-title aq-foot-mb-10">
                      Follow Us On
                    </h4>
                    <div className="aq-footer-widget-social">
                      {SOCIAL_LINKS.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={item.label}
                        >
                          <i>{item.icon}</i>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="aq-footer-col aq-footer-col-menu">
                <FooterMenu title="Shop by Category" items={categoryItems} />
              </div>
              <div className="aq-footer-col aq-footer-col-menu">
                <FooterMenu title="Shopping" items={SHOPPING_LINKS} />
              </div>
              <div className="aq-footer-col aq-footer-col-menu">
                <FooterMenu title="Legal" items={LEGAL_LINKS} />
              </div>
              <div className="aq-footer-col aq-footer-col-menu">
                <FooterMenu title="Customer Services" items={SERVICE_LINKS} />
              </div>
            </div>
          </div>
        </div>
        <div className="aq-copyright-area">
          <div className="container container-1830">
            <div className="aq-copyright-border aq-foot-pt-15 aq-foot-pb-20">
              <div className="row align-items-center">
                <div className="col-xl-4 col-lg-5 col-md-6">
                  <div className="aq-copyright-text text-center text-md-start">
                    <p className="aq-foot-mb-15">
                      © {new Date().getFullYear()} All Rights Reserved | Kavya Creation
                    </p>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-7 col-md-6">
                  <div className="aq-copyright-payment text-center text-md-end aq-foot-mb-15">
                    <Image
                      src="/images/payment/payment.png"
                      alt="Accepted payment methods"
                      width={280}
                      height={32}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
