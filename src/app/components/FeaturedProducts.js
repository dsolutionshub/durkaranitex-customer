"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import useCartPanelStore from "@/store/useCartPanelStore";
import useQuickViewStore from "@/store/useQuickViewStore";
import { loader } from "./loader/loaderManager";
import { modifyCart, modifyWishlist } from "../api/services/authService";
import { getErrorMessage } from "../utils/helperFn";
import { LOGIN_ERROR_MSG } from "../utils/constants";

import "swiper/css";
import "./home/featured-products.css";

function formatPrice(value) {
  const amount = Number(value);
  if (Number.isNaN(amount)) {
    return value || "0";
  }
  return amount.toLocaleString("en-IN");
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

function getProductImages(item) {
  return (item?.images || []).filter((entry) => entry?.image);
}

function getBadges(item) {
  const badges = [];
  const discount = Math.round(Number(item?.discount) || 0);
  const badgeLabel = String(item?.badge || "").toLowerCase();
  const isNew =
    item?.is_new === true ||
    item?.is_new === 1 ||
    item?.is_new === "1" ||
    badgeLabel === "new";
  const isHot =
    item?.is_hot === true ||
    item?.is_hot === 1 ||
    item?.is_hot === "1" ||
    badgeLabel === "hot";

  if (discount > 0) {
    badges.push({ className: "clr-sale", label: `-${discount}%` });
  }
  if (isNew) {
    badges.push({ className: "clr-new", label: "New" });
  } else if (isHot) {
    badges.push({ className: "clr-hot", label: "Hot" });
  }
  return badges;
}

export function TrendingProductCard({
  item,
  isInWishlist,
  onAddToCart,
  onAddToWishlist,
  showColors = false,
  contentClassName = "text-center",
}) {
  const images = getProductImages(item);
  const [activeIndex, setActiveIndex] = useState(0);
  const openQuickView = useQuickViewStore((state) => state.openQuickView);
  const href = `/product-detail?id=${item?.id}`;
  const outOfStock = parseFloat(item?.quantity) <= 0;
  const badges = getBadges(item);
  const currentImage = images[activeIndex]?.image || images[0]?.image;
  const hoverImage =
    images.find((_, index) => index !== activeIndex)?.image || null;
  const showOldPrice =
    item?.product_price &&
    Number(item.product_price) > Number(item.price);

  return (
    <div className="aq-product-item aq-product-main mb-60">
      <div className="aq-product-thumb aq-img-hover-wrap p-relative mb-10">
        {badges.length > 0 && (
          <div className="aq-product-badge">
            {badges.map((badge) => (
              <span key={badge.label} className={badge.className}>
                {badge.label}
              </span>
            ))}
          </div>
        )}
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
        </div>
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
      <div className={`aq-product-content ${contentClassName}`}>
        <h4 className="aq-product-title mb-10">
          <Link href={href}>{item?.title}</Link>
        </h4>
        <div className="aq-product-price">
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
        {showColors && images.length > 1 && (
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
                      backgroundColor:
                        entry?.color_code || entry?.hex || "#c8b4a3",
                      backgroundImage: entry?.image
                        ? `url(${entry.image})`
                        : undefined,
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FeaturedProducts({ products, fetchData }) {
  const router = useRouter();
  const published = (products || []).filter(
    (item) => item?.is_published === "1"
  );
  const [wishlistMap, setWishlistMap] = useState(() =>
    published.reduce((acc, item) => {
      acc[item.id] = item.wishList;
      return acc;
    }, {})
  );
  const { handleGetCartDetail, wishlistDetails } = useCartPanelStore();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    setWishlistMap(
      (products || [])
        .filter((item) => item?.is_published === "1")
        .reduce((acc, item) => {
          acc[item.id] = item.wishList;
          return acc;
        }, {})
    );
  }, [products]);

  const addToWishlist = async (id) => {
    loader(true);
    try {
      const data = await modifyWishlist({ product_id: id });
      setWishlistMap((prev) => ({
        ...prev,
        [id]: data?.wishlist,
      }));
      fetchData();
      wishlistDetails();
      toast.success(data?.message);
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        sessionStorage.setItem("postLoginRedirect", "/");
        router.push("/login");
        toast.error(LOGIN_ERROR_MSG);
        return;
      }
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  const addToCart = async (id) => {
    loader(true);
    try {
      const data = await modifyCart({
        product_id: id,
        quantity: 1,
        type: "list",
      });
      toast.success(data?.message);
      handleGetCartDetail();
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        sessionStorage.setItem("postLoginRedirect", "/");
        router.push("/login");
        toast.error(LOGIN_ERROR_MSG);
        return;
      }
      const MSG = getErrorMessage(error);
      if (MSG.startsWith("Only")) {
        toast.error(`Max quantity reached. ${MSG}`);
      } else {
        toast.error(MSG);
      }
    } finally {
      loader(false);
    }
  };

  if (!published.length) {
    return null;
  }

  return (
    <div className="aq-product-2-area pt-105 pb-40 fix">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="aqf-seller-title-box text-center mb-50">
              <h4 className="aq-section-title fs-38 ff-satoshi-bold mb-15">
                Trending Product
              </h4>
              <p className="mb-0">
                Here’s some of our most new arrivals products that people{" "}
                <br /> are in love with.
              </p>
            </div>
          </div>
        </div>
        <div className="aq-product-slide-wrap p-relative">
          <div className="aq-product-arrow">
            <button ref={prevRef} type="button" className="aq-product-prev">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
                  <path
                    d="M5.75 10.75L0.75 5.75L5.75 0.75"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            <button ref={nextRef} type="button" className="aq-product-next">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
                  <path
                    d="M0.75 10.75L5.75 5.75L0.75 0.75"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
          <Swiper
            className="aq-product-active"
            modules={[Autoplay, Navigation]}
            slidesPerView={4}
            spaceBetween={25}
            speed={1000}
            loop={published.length > 4}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              if (typeof swiper.params.navigation !== "boolean") {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 12 },
              576: { slidesPerView: 2, spaceBetween: 12 },
              768: { slidesPerView: 2, spaceBetween: 25 },
              992: { slidesPerView: 3, spaceBetween: 25 },
              1200: { slidesPerView: 3, spaceBetween: 25 },
              1400: { slidesPerView: 4, spaceBetween: 25 },
            }}
          >
            {published.map((item) => (
              <SwiperSlide key={item.id}>
                <TrendingProductCard
                  item={item}
                  isInWishlist={wishlistMap[item.id]}
                  onAddToCart={addToCart}
                  onAddToWishlist={addToWishlist}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
