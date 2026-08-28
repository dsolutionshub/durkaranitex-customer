"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import "./fashion-hero.css";

const SLIDE_PHRASES = [
  "Affordable shipping on orders across India",
  "Replacements only — request within 1 day of delivery",
  "We do not offer refunds",
  "Support available Mon–Sat, 10am to 7pm",
  "Affordable shipping on orders across India",
  "Replacements only — request within 1 day of delivery",
  "We do not offer refunds",
  "Support available Mon–Sat, 10am to 7pm",
  "Affordable shipping on orders across India",
  "Replacements only — request within 1 day of delivery",
  "We do not offer refunds",
  "Support available Mon–Sat, 10am to 7pm",
];

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

const BoltIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="17" viewBox="0 0 15 17" fill="none">
    <path
      d="M8.27778 0.5L0.5 10.1H7.5L6.72222 16.5L14.5 6.9H7.5L8.27778 0.5Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function TextSlideItems({ prefix }) {
  return SLIDE_PHRASES.map((phrase, index) => (
    <div className="aqf-text-slide-item" key={`${prefix}-${index}`}>
      <p>{phrase}</p>
      <span>
        <BoltIcon />
      </span>
    </div>
  ));
}

function asList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (Array.isArray(value?.data)) return value.data.filter(Boolean);
  if (value && typeof value === "object") return [value];
  return [];
}

function pickHeroSlides(home, banners) {
  const fromProp = asList(banners);
  if (fromProp.length) return fromProp;
  if (!home || typeof home !== "object") return [];

  const nested =
    home.data && typeof home.data === "object" && !Array.isArray(home.data)
      ? home.data
      : null;
  const roots = nested ? [home, nested] : [home];

  for (const root of roots) {
    for (const key of ["sliders", "banners", "slider", "banner", "home_sliders"]) {
      const list = asList(root?.[key]);
      if (list.length) return list;
    }
  }

  return [];
}

function firstString(...values) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function resolveSlideImage(item) {
  if (!item) return "";
  if (typeof item === "string") return item;

  const nested = item.image && typeof item.image === "object" ? item.image : null;
  const media = Array.isArray(item.media) ? item.media[0] : item.media;
  const images = Array.isArray(item.images) ? item.images[0] : null;

  return firstString(
    item.image,
    item.image_url,
    item.desktop_image,
    item.mobile_image,
    item.banner_image,
    item.slider_image,
    item.photo,
    item.src,
    item.path,
    item.file,
    item.file_path,
    item.image_path,
    item.original_url,
    nested?.url,
    nested?.path,
    nested?.src,
    nested?.original_url,
    media?.original_url,
    media?.url,
    media?.image,
    images?.image,
    images?.url
  );
}

function toAbsoluteImageUrl(src) {
  if (!src) return "";
  if (/^(https?:|data:|blob:)/i.test(src)) return src;
  if (src.startsWith("//")) return `https:${src}`;
  if (!API_BASE) return src;
  if (src.startsWith("/")) return `${API_BASE}${src}`;
  return `${API_BASE}/storage/${src}`;
}

const FashionHero = ({ home, banners = [] }) => {
  const router = useRouter();
  const slides = useMemo(
    () =>
      pickHeroSlides(home, banners)
        .map((item) => {
          const src = toAbsoluteImageUrl(resolveSlideImage(item));
          return src ? { ...item, src } : null;
        })
        .filter(Boolean),
    [home, banners]
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length < 2) {
      return undefined;
    }

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const current = slides[activeIndex] || slides[0];

  return (
    <>
      <div className="aqf-hero-wrap p-relative">
        <div
          className={`aqf-hero-thumb${slides.length > 1 ? " has-multiple" : ""}`}
          onClick={() => {
            if (current?.button_link) {
              router.push(current.button_link);
            }
          }}
          style={{
            cursor: current?.button_link ? "pointer" : "default",
          }}
        >
          {slides.map((item, index) => (
            <img
              key={item?.id || item.src || index}
              src={item.src}
              alt={item?.title || "Banner"}
              className={index === activeIndex ? "is-active" : undefined}
            />
          ))}
        </div>
      </div>

      <div className="aqf-text-slide-area aqf-text-slide-bdr fix">
        <div className="aqf-text-slide-wrap pt-20 pb-20">
          <TextSlideItems prefix="a" />
          <TextSlideItems prefix="b" />
        </div>
      </div>
    </>
  );
};

export default FashionHero;
