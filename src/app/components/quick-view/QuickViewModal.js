"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import useQuickViewStore from "@/store/useQuickViewStore";
import useCartPanelStore from "@/store/useCartPanelStore";
import { useAuthStore } from "@/store/useAuthStore";
import {
  buyNow,
  getProductDetails,
  modifyCart,
  modifyWishlist,
} from "@/app/api/services/authService";
import { getErrorMessage } from "@/app/utils/helperFn";
import { loader } from "@/app/components/loader/loaderManager";
import { LOGIN_ERROR_MSG } from "@/app/utils/constants";
import { toastCom } from "@/app/components/toast/ToastManager";

import "swiper/css";
import "./quick-view.css";

function formatPrice(value) {
  const amount = Number(value);
  if (Number.isNaN(amount)) {
    return value || "0";
  }
  return amount.toLocaleString("en-IN");
}

function getSizes(product) {
  const raw = product?.sizes || product?.size || product?.available_sizes;
  if (Array.isArray(raw)) {
    return raw.map((entry) => (typeof entry === "string" ? entry : entry?.name || entry?.title || "")).filter(Boolean);
  }
  if (typeof raw === "string" && raw.trim()) {
    return raw.split(/[,|/]/).map((entry) => entry.trim()).filter(Boolean);
  }
  return [];
}

function StarRating() {
  return (
    <div className="aq-product-details-rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
            <path
              d="M6.6574 0L8.50892 4.4516L13.3148 4.83688L9.65322 7.9734L10.7719 12.6631L6.6574 10.15L2.5429 12.6631L3.66157 7.9734L0 4.83688L4.80587 4.4516L6.6574 0Z"
              fill="currentColor"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}

export default function QuickViewModal() {
  const router = useRouter();
  const pathname = usePathname();
  const productId = useQuickViewStore((state) => state.productId);
  const closeQuickView = useQuickViewStore((state) => state.closeQuickView);
  const { handleGetCartDetail, wishlistDetails } = useCartPanelStore();
  const { isLoggedIn } = useAuthStore();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const images = (product?.images || []).filter((entry) => entry?.image);
  const sizes = getSizes(product);
  const outOfStock =
    product?.quantity != null &&
    product?.quantity !== "" &&
    parseFloat(product.quantity) <= 0;
  const showOldPrice =
    product?.product_price && Number(product.product_price) > Number(product.price);
  const categoryName =
    product?.category?.name ||
    product?.category_name ||
    (typeof product?.category === "string" ? product.category : "");
  const selectedColor =
    images[selectedIndex]?.color || images[selectedIndex]?.title || "";
  const reviewCount = Number(
    product?.review_count ?? product?.reviews_count ?? product?.total_reviews ?? 0
  );
  const stockLeft = parseInt(product?.quantity, 10);
  const showLowStock = Number.isFinite(stockLeft) && stockLeft > 0 && stockLeft <= 10;
  const detailHref = product?.id ? `/product-detail?id=${product.id}` : "/shop";

  const loadProduct = useCallback(async (id, { reset = true } = {}) => {
    if (reset) {
      setLoading(true);
      setProduct(null);
      setQuantity(1);
      setSelectedIndex(0);
      setSelectedSize("");
    }
    try {
      const data = await getProductDetails(id);
      const nextProduct = data?.product || data;
      setProduct(nextProduct || null);
      if (reset) {
        const nextSizes = getSizes(nextProduct);
        if (nextSizes.length) {
          setSelectedSize(nextSizes[0]);
        }
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
      if (reset) {
        closeQuickView();
      }
    } finally {
      setLoading(false);
    }
  }, [closeQuickView]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!productId) {
      setProduct(null);
      return undefined;
    }
    loadProduct(productId);
    return undefined;
  }, [productId, loadProduct]);

  useEffect(() => {
    if (!productId) {
      document.body.classList.remove("aq-qv-open");
      return undefined;
    }
    document.body.classList.add("aq-qv-open");
    const onKey = (event) => {
      if (event.key === "Escape") {
        closeQuickView();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("aq-qv-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [productId, closeQuickView]);

  const goToSlide = (index) => {
    setSelectedIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const requireLogin = (message) => {
    sessionStorage.setItem("postLoginRedirect", pathname || detailHref);
    closeQuickView();
    router.push("/login");
    toast.error(message || LOGIN_ERROR_MSG);
  };

  const increaseCount = () => {
    if (!isLoggedIn) {
      requireLogin("Please login to change quantity.");
      return;
    }
    if (quantity === parseInt(product?.quantity, 10)) {
      toastCom("You've reached the maximum quantity allowed.", true, "error", 2000);
      return;
    }
    setQuantity((prev) => prev + 1);
  };

  const decreaseCount = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const addToCart = async () => {
    loader(true);
    try {
      const data = await modifyCart({
        product_id: product?.id,
        quantity,
        type: "list",
      });
      toast.success(data?.message || "Added to cart");
      handleGetCartDetail();
      loadProduct(product?.id, { reset: false });
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        requireLogin("Please log in to add this product to your cart.");
        return;
      }
      const message = getErrorMessage(error);
      toast.error(message.startsWith("Only") ? `Max quantity reached. ${message}` : message);
    } finally {
      loader(false);
    }
  };

  const handleBuyNow = async () => {
    loader(true);
    try {
      const data = await buyNow({
        product_id: product?.id,
        quantity,
      });
      if (data?.status === "success") {
        closeQuickView();
        router.push("/checkout");
      }
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        requireLogin("Please log in to purchase this product.");
        return;
      }
      toast.error(getErrorMessage(error));
    } finally {
      loader(false);
    }
  };

  const handleWishlist = async () => {
    loader(true);
    try {
      const data = await modifyWishlist({ product_id: product?.id });
      wishlistDetails();
      toast.success(data?.message);
      loadProduct(product?.id, { reset: false });
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        requireLogin(LOGIN_ERROR_MSG);
        return;
      }
      toast.error(getErrorMessage(error));
    } finally {
      loader(false);
    }
  };

  const openFullDetails = () => {
    closeQuickView();
    router.push(detailHref);
  };

  if (!mounted || !productId) {
    return null;
  }

  return createPortal(
    <div className="aq-product-modal" role="presentation">
      <div className="aq-product-modal-backdrop" onClick={closeQuickView} />
      <div
        className="aq-product-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="aq-quick-view-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="aq-product-modal-content">
          <button
            type="button"
            className="aq-product-modal-close-btn"
            aria-label="Close quick view"
            onClick={closeQuickView}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M10.75 0.75L0.75 10.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M0.75 0.75L10.75 10.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {loading && !product ? (
            <div className="aq-qv-skeleton" aria-hidden>
              <div className="aq-qv-skeleton-block is-image" />
              <div>
                <div className="aq-qv-skeleton-line" />
                <div className="aq-qv-skeleton-line is-title" />
                <div className="aq-qv-skeleton-line is-price" />
                <div className="aq-qv-skeleton-line" />
                <div className="aq-qv-skeleton-line" />
              </div>
            </div>
          ) : (
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-10">
                <div className="aq-modal-slider-wrap">
                  <div className="aq-modal-slider-active">
                    {images.length > 1 ? (
                      <div className="aq-modal-slider-arrow">
                        <button ref={prevRef} type="button" className="aq-modal-prev" aria-label="Previous image">
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M10.75 5.75H0.75M0.75 5.75L5.75 10.75M0.75 5.75L5.75 0.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </button>
                        <button ref={nextRef} type="button" className="aq-modal-next" aria-label="Next image">
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M0.75 5.75H10.75M10.75 5.75L5.75 0.75M10.75 5.75L5.75 10.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </button>
                      </div>
                    ) : null}
                    {images.length ? (
                      <Swiper
                        modules={[Navigation]}
                        slidesPerView={1}
                        spaceBetween={0}
                        speed={500}
                        onSwiper={(swiper) => {
                          swiperRef.current = swiper;
                        }}
                        onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
                        onBeforeInit={(swiper) => {
                          if (typeof swiper.params.navigation !== "boolean") {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                          }
                        }}
                        navigation={{
                          prevEl: prevRef.current,
                          nextEl: nextRef.current,
                        }}
                      >
                        {images.map((entry, index) => (
                          <SwiperSlide key={entry?.id || entry?.image || index}>
                            <div className="aq-modal-slider">
                              <Image
                                className="w-100"
                                src={entry.image}
                                alt={product?.title || "Product"}
                                width={500}
                                height={670}
                                sizes="(max-width: 991px) 100vw, 500px"
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      <div className="aq-modal-slider-placeholder" />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="aq-product-details-wrap">
                  {categoryName ? (
                    <div className="aq-product-details-category">
                      <span>{categoryName}</span>
                    </div>
                  ) : null}

                  <h3 className="aq-product-details-title" id="aq-quick-view-title">
                    {product?.title}
                  </h3>

                  <div className="tp-product-details-inventory">
                    <div className="aq-product-details-rating-wrapper">
                      <div className="aq-product-details-rating-box">
                        <StarRating />
                        <div className="aq-product-details-reviews">
                          <span>
                            ({" "}
                            {reviewCount} review{reviewCount === 1 ? "" : "s"}{" "}
                            )
                          </span>
                        </div>
                      </div>
                      {showLowStock ? (
                        <div className="aq-product-details-fomo-mesg">
                          <span>Only {stockLeft} left in stock!</span>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="aq-product-details-price-wrap">
                    <ins>
                      <span className="aq-product-details-price new-price">
                        Rs. {formatPrice(product?.price)}
                      </span>
                    </ins>
                    {showOldPrice ? (
                      <del>
                        <span className="aq-product-details-price old-price">
                          Rs. {formatPrice(product.product_price)}
                        </span>
                      </del>
                    ) : null}
                  </div>

                  {sizes.length ? (
                    <div className="aq-product-details-size">
                      <h4 className="aq-product-details-title-sm">
                        <label>Size:</label> {selectedSize}
                      </h4>
                      <div className="aq-product-details-size-list">
                        {sizes.map((size) => (
                          <button
                            type="button"
                            key={size}
                            className={size === selectedSize ? "is-active" : ""}
                            onClick={() => setSelectedSize(size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {images.length > 1 ? (
                    <div className="aq-product-details-variation">
                      <h4 className="aq-product-details-title-sm">
                        <label>Color:</label>
                        {selectedColor ? ` ${selectedColor}` : ""}
                      </h4>
                      <div className="aq-product-details-variation-wrap">
                        {images.map((entry, index) => (
                          <button
                            type="button"
                            key={entry?.id || entry?.image || index}
                            className={`aq-product-details-variation-item${
                              index === selectedIndex ? " active" : ""
                            }`}
                            onClick={() => goToSlide(index)}
                          >
                            <Image src={entry.image} alt="" width={60} height={80} />
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="aq-product-details-action-wrapper">
                    <div className="aq-product-details-action-item-wrapper">
                      <div className="aq-product-details-quantity">
                        <div className="aq-product-quantity">
                          <button
                            type="button"
                            className="aq-cart-minus"
                            disabled={quantity === 1}
                            onClick={decreaseCount}
                          >
                            <svg width="11" height="2" viewBox="0 0 11 2" fill="none">
                              <path d="M1 1H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </button>
                          <input className="aq-cart-input" type="text" value={quantity || 1} readOnly />
                          <button type="button" className="aq-cart-plus" onClick={increaseCount}>
                            <svg width="11" height="12" viewBox="0 0 11 12" fill="none">
                              <path d="M1 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              <path d="M5.5 10.5V1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="aq-product-details-add-to-cart">
                        <button
                          type="button"
                          className="aq-product-details-add-to-cart-btn aq-btn-black radius-30 w-100"
                          disabled={outOfStock}
                          onClick={addToCart}
                        >
                          Add To Cart
                        </button>
                        <button
                          type="button"
                          className={`aq-product-action-btn aq-wishlist-btn aq-tooltip-top${
                            product?.wishList ? " aq-wishlist-active" : ""
                          }`}
                          onClick={handleWishlist}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                            <path d="M14.7197 1.52347C12.5744 0.244089 10.7019 0.759666 9.57712 1.58092C9.11591 1.91766 8.88531 2.08602 8.74963 2.08602C8.61396 2.08602 8.38336 1.91766 7.92215 1.58092C6.79733 0.759666 4.9249 0.244089 2.77958 1.52347C-0.0359114 3.20253 -0.67299 8.7418 5.82126 13.4151C7.05821 14.3052 7.67668 14.7502 8.74963 14.7502C9.82258 14.7502 10.4411 14.3052 11.678 13.4151C18.1723 8.7418 17.5352 3.20253 14.7197 1.52347Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                          <span className="aq-tooltip-item">Wishlist</span>
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="aq-product-details-buy-now-btn aq-btn-black btn-red-bg radius-30 w-100"
                      disabled={outOfStock}
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </button>
                  </div>

                  <button type="button" className="product-view-details-btn aq-line-anim" onClick={openFullDetails}>
                    View Full Details
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M0.75 5.75H10.75M10.75 5.75L5.75 0.75M10.75 5.75L5.75 10.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
