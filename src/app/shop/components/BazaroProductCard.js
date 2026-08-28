"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import useQuickViewStore from "@/store/useQuickViewStore";

const STAR_PATH =
  "M5.21608 0.307961C5.38688 -0.102685 5.9686 -0.102684 6.1394 0.307962L7.34463 3.20568C7.41664 3.3788 7.57944 3.49709 7.76634 3.51207L10.8947 3.76287C11.338 3.79841 11.5178 4.35166 11.18 4.641L8.79653 6.68268C8.65414 6.80466 8.59195 6.99605 8.63546 7.17843L9.36364 10.2311C9.46684 10.6638 8.99621 11.0057 8.61666 10.7739L5.93837 9.13797C5.77836 9.04024 5.57712 9.04024 5.41711 9.13797L2.73882 10.7739C2.35927 11.0057 1.88865 10.6638 1.99184 10.2311L2.72003 7.17843C2.76353 6.99605 2.70135 6.80466 2.55895 6.68268L0.175492 4.641C-0.162276 4.35166 0.0174878 3.79841 0.460815 3.76287L3.58915 3.51207C3.77604 3.49709 3.93885 3.3788 4.01085 3.20568L5.21608 0.307961Z";

function formatPrice(value) {
  const amount = Number(value);
  if (Number.isNaN(amount)) {
    return value || "0";
  }
  return amount.toLocaleString("en-IN");
}

function stripHtml(value) {
  if (!value || typeof value !== "string") {
    return "";
  }
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function StarRating() {
  return (
    <div className="aq-product-ratting">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index}>
          <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={STAR_PATH} fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  );
}

function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M6.19751 0.75L3.30151 3.654M11.3015 0.75L14.1975 3.654M6.95776 10.3501V13.1901M10.6375 10.3501V13.1901M1.94997 7.14993L3.07797 14.0619C3.33397 15.6139 3.94997 16.7499 6.23796 16.7499H11.062C13.55 16.7499 13.918 15.6619 14.206 14.1579L15.55 7.14993M0.75 5.42996C0.75 3.94996 1.542 3.82996 2.526 3.82996H14.974C15.958 3.82996 16.75 3.94996 16.75 5.42996C16.75 7.14996 15.958 7.02996 14.974 7.02996H2.526C1.542 7.02996 0.75 7.14996 0.75 5.42996Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function QuickViewIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" fill="none">
      <path
        d="M12.0557 7.75429C12.0557 9.42922 10.7022 10.7827 9.0273 10.7827C7.35238 10.7827 5.99891 9.42922 5.99891 7.75429C5.99891 6.07937 7.35238 4.72589 9.0273 4.72589C10.7022 4.72589 12.0557 6.07937 12.0557 7.75429Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.02734 14.75C12.0134 14.75 14.7965 12.9905 16.7337 9.94517C17.495 8.75242 17.495 6.74758 16.7337 5.55483C14.7965 2.50952 12.0134 0.75 9.02734 0.75C6.04124 0.75 3.25816 2.50952 1.321 5.55483C0.559668 6.74758 0.559668 8.75242 1.321 9.94517C3.25816 12.9905 6.04124 14.75 9.02734 14.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WishlistIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
      <path
        d="M14.7197 1.52347C12.5744 0.244089 10.7019 0.759666 9.57712 1.58092C9.11591 1.91766 8.88531 2.08602 8.74963 2.08602C8.61396 2.08602 8.38336 1.91766 7.92215 1.58092C6.79733 0.759666 4.9249 0.244089 2.77958 1.52347C-0.0359114 3.20253 -0.67299 8.7418 5.82126 13.4151C7.05821 14.3052 7.67668 14.7502 8.74963 14.7502C9.82258 14.7502 10.4411 14.3052 11.678 13.4151C18.1723 8.7418 17.5352 3.20253 14.7197 1.52347Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CompareIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
      <path
        d="M11.6755 5.91828L14.2612 3.33412M14.2612 3.33412L11.6755 0.75M14.2612 3.33412L1.74999 3.33374M3.33562 8.07153L0.75 10.6557L3.33562 13.2398M13.7724 10.75H1.26122"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getProductImages(item) {
  return (item?.images || []).filter((entry) => entry?.image);
}

function getBadge(item) {
  const discount = Math.round(Number(item?.discount) || 0);
  const isNew =
    item?.is_new === true ||
    item?.is_new === 1 ||
    item?.is_new === "1" ||
    String(item?.badge || "").toLowerCase() === "new";

  if (discount > 0) {
    return { className: "clr-sale", label: `-${discount}%` };
  }
  if (isNew) {
    return { className: "clr-new", label: "New" };
  }
  return { className: "clr-hot", label: "Hot" };
}

function ColorSwatches({ images, activeIndex, setActiveIndex }) {
  if (!images.length) {
    return null;
  }

  return (
    <div className="aq-product-color">
      <ul>
        {images.map((entry, index) => (
          <li
            key={entry?.id || entry?.image || index}
            className={`aq-product-color-item aq-tooltip-top aq-color-swatch${
              index === activeIndex ? " active" : ""
            }`}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setActiveIndex(index);
            }}
          >
            <span className="aq-tooltip-item">
              {entry?.color || entry?.title || `Option ${index + 1}`}
            </span>
            <span
              className="aq-product-color-value"
              style={{
                backgroundColor: entry?.color_code || entry?.hex || "#c8b4a3",
                backgroundImage: entry?.image ? `url(${entry.image})` : undefined,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function BazaroProductCard({
  item,
  isInWishlist,
  onAddToCart,
  onAddToWishlist,
  variant = "grid",
}) {
  const images = getProductImages(item);
  const [activeIndex, setActiveIndex] = useState(0);
  const openQuickView = useQuickViewStore((state) => state.openQuickView);
  const href = `/product-detail?id=${item?.id}`;
  const outOfStock = parseFloat(item?.quantity) <= 0;
  const badge = getBadge(item);
  const currentImage = images[activeIndex]?.image || images[0]?.image;
  const hoverImage =
    images.find((_, index) => index !== activeIndex)?.image || null;
  const showOldPrice =
    item?.product_price && Number(item.product_price) > Number(item.price);
  const isList = variant === "list";
  const description = stripHtml(item?.description || item?.short_description || "");

  return (
    <div
      className={`aq-product-item aq-product-main mb-40${
        isList ? " aq-product-item-list d-flex align-items-start" : ""
      }`}
    >
      <div className="aq-product-thumb aq-img-hover-wrap p-relative mb-10">
        <div className="aq-product-badge">
          <span className={badge.className}>{badge.label}</span>
        </div>
        {!isList && (
          <div className="aq-product-action">
            <button
              type="button"
              className="aq-product-action-btn aq-tooltip"
              disabled={outOfStock}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onAddToCart(item?.id);
              }}
            >
              <CartIcon />
              <span className="aq-tooltip-item">Add to Cart</span>
            </button>
            <button
              type="button"
              className="aq-product-action-btn aq-tooltip"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                openQuickView(item?.id);
              }}
            >
              <QuickViewIcon />
              <span className="aq-tooltip-item">Quick View</span>
            </button>
            <button
              type="button"
              className={`aq-product-action-btn aq-wishlist-btn aq-tooltip${
                isInWishlist ? " aq-wishlist-active" : ""
              }`}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onAddToWishlist(item?.id);
              }}
            >
              <WishlistIcon />
              <span className="aq-tooltip-item">
                {isInWishlist ? "Remove From Wishlist" : "Add To Wishlist"}
              </span>
            </button>
            <button type="button" className="aq-product-action-btn aq-compare-btn aq-tooltip">
              <CompareIcon />
              <span className="aq-tooltip-item">Add To Compare</span>
            </button>
          </div>
        )}
        {outOfStock && (
          <div className="aq-product-oos">
            <span>Out of Stock</span>
          </div>
        )}
        <Link href={href}>
          {currentImage && (
            <Image
              className="aq-product-img"
              src={currentImage}
              alt={item?.title || "Product"}
              width={430}
              height={574}
              sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, (max-width: 1399px) 33vw, 25vw"
            />
          )}
          {hoverImage && hoverImage !== currentImage && (
            <Image
              className="aq-img-hover"
              src={hoverImage}
              alt=""
              width={430}
              height={574}
              sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, (max-width: 1399px) 33vw, 25vw"
            />
          )}
        </Link>
      </div>
      <div className={`aq-product-content${isList ? "" : " text-center text-md-start"}`}>
        <StarRating />
        {isList ? (
          <h3 className="aq-product-title mb-10">
            <Link href={href}>{item?.title}</Link>
          </h3>
        ) : (
          <h4 className="aq-product-title mb-10">
            <Link href={href}>{item?.title}</Link>
          </h4>
        )}
        <div className={`aq-product-price${isList ? " aq-list-price" : ""}`}>
          <ins>
            <span className="aq-product-new-price">
              Rs. {formatPrice(item?.price)}
            </span>
          </ins>
          {showOldPrice && (
            <del>
              <span className="aq-product-old-price">
                Rs. {formatPrice(item.product_price)}
              </span>
            </del>
          )}
        </div>
        {isList && description && (
          <p className="aq-list-desc">
            {description.length > 180 ? `${description.slice(0, 180)}…` : description}
          </p>
        )}
        <div className={isList ? "aq-list-swatches" : ""}>
          <ColorSwatches
            images={images}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>
        {isList && (
          <div className="aq-product-action action-list-view">
            <button
              type="button"
              className="aq-btn-border btn-border-gray"
              disabled={outOfStock}
              onClick={() => onAddToCart(item?.id)}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="aq-product-action-btn aq-tooltip-top"
              onClick={() => openQuickView(item?.id)}
            >
              <QuickViewIcon />
              <span className="aq-tooltip-item">Quick View</span>
            </button>
            <button
              type="button"
              className={`aq-product-action-btn aq-wishlist-btn aq-tooltip-top${
                isInWishlist ? " aq-wishlist-active" : ""
              }`}
              onClick={() => onAddToWishlist(item?.id)}
            >
              <WishlistIcon />
              <span className="aq-tooltip-item">
                {isInWishlist ? "Remove From Wishlist" : "Add To Wishlist"}
              </span>
            </button>
            <button type="button" className="aq-product-action-btn aq-compare-btn aq-tooltip-top">
              <CompareIcon />
              <span className="aq-tooltip-item">Add To Compare</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
