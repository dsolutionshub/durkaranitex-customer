"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

import useCartPanelStore from "@/store/useCartPanelStore";
import { loader } from "../loader/loaderManager";
import {
  modifyCart,
  modifyWishlist,
} from "@/app/api/services/authService";
import { getErrorMessage } from "@/app/utils/helperFn";
import { LOGIN_ERROR_MSG } from "@/app/utils/constants";

import "./style.css";

const CloseIcon = ({ size = 14 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 14 14"
    fill="none"
  >
    <path
      d="M12.75 0.75L0.75 12.75M0.75 0.75L12.75 12.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
    <path
      d="M12.75 0.75L0.75 12.75M0.75 0.75L12.75 12.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18" fill="none">
    <path
      d="M6.19751 0.75L3.30151 3.654M11.3015 0.75L14.1975 3.654M6.95776 10.3501V13.1901M10.6375 10.3501V13.1901M1.94997 7.14993L3.07797 14.0619C3.33397 15.6139 3.94997 16.7499 6.23796 16.7499H11.062C13.55 16.7499 13.918 15.6619 14.206 14.1579L15.55 7.14993M0.75 5.42996C0.75 3.94996 1.542 3.82996 2.526 3.82996H14.974C15.958 3.82996 16.75 3.94996 16.75 5.42996C16.75 7.14996 15.958 7.02996 14.974 7.02996H2.526C1.542 7.02996 0.75 7.14996 0.75 5.42996Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

function formatPrice(value) {
  const amount = Number(value);
  if (Number.isNaN(amount)) {
    return value || "0";
  }
  return amount.toLocaleString("en-IN");
}

const WishlistModal = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState("");
  const noticeTimerRef = useRef(null);
  const {
    wishListData,
    wishListCount,
    wishlistDetails,
    handleGetCartDetail,
  } = useCartPanelStore();

  const items = wishListData || [];
  const count = wishListCount || items.length || 0;

  const handleNavigate = (page) => {
    router.push(page);
    onClose();
  };

  const navigateToProductDetail = (productId) => {
    if (!productId) {
      return;
    }
    handleNavigate(`/product-detail?id=${productId}`);
  };

  const removeFromWishlist = async (productId, productTitle) => {
    loader(true);
    try {
      await modifyWishlist({ product_id: productId });
      await wishlistDetails();
      setNoticeTitle(productTitle || "Product");
      if (noticeTimerRef.current) {
        clearTimeout(noticeTimerRef.current);
      }
      noticeTimerRef.current = setTimeout(() => {
        setNoticeTitle("");
        noticeTimerRef.current = null;
      }, 3000);
    } catch (error) {
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  };

  const addToCart = async (productId) => {
    loader(true);
    try {
      await modifyCart({
        product_id: productId,
        quantity: 1,
        type: "list",
      });
      toast.success("Added to cart");
      onClose();
      handleGetCartDetail();
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        sessionStorage.setItem("postLoginRedirect", "/shop");
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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      setNoticeTitle("");
      if (noticeTimerRef.current) {
        clearTimeout(noticeTimerRef.current);
        noticeTimerRef.current = null;
      }
      return undefined;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (noticeTimerRef.current) {
        clearTimeout(noticeTimerRef.current);
      }
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      className={`aq-wishlist-popup-wrap aq-wishlist-popup aq-wishlist-active${
        isOpen ? " opened" : ""
      }`}
    >
      <div className="aq-wishlist-popup-top d-flex justify-content-between align-items-center">
        <div>
          <span className="aq-wishlist-popup-name">Wishlist</span>{" "}
          <span className="aq-wishlist-popup-count">({count})</span>
        </div>
        <button
          type="button"
          className="aq-wishlist-popup-close aq-wishlist-close"
          aria-label="Close wishlist"
          onClick={onClose}
        >
          <CloseIcon size={14} />
        </button>
      </div>

      <div className="aq-wishlist-popup-middle">
        {items.length > 0 ? (
          items.map((item) => {
            const product = item?.product;
            const productId = product?.id || item?.product_id;
            const outOfStock = parseFloat(product?.quantity) <= 0;
            const imageSrc =
              product?.images?.[0]?.image || "/images/home/KCLogo.png";

            return (
              <div
                key={item?.id || productId}
                className="aq-wishlist-popup-item d-flex justify-content-between align-items-center"
              >
                <div className="aq-wishlist-popup-thumb-wrap d-flex align-items-center">
                  <button
                    type="button"
                    className="aq-wishlist-popup-remove aq-tooltip"
                    aria-label="Remove product"
                    onClick={() =>
                      removeFromWishlist(productId, product?.title)
                    }
                  >
                    <span className="aq-tooltip-item">Remove product</span>
                    <DeleteIcon />
                  </button>
                  <div className="aq-wishlist-popup-thumb d-flex align-items-center">
                    <button
                      type="button"
                      onClick={() =>
                        navigateToProductDetail(item?.product_id || productId)
                      }
                    >
                      <Image
                        src={imageSrc}
                        alt={product?.title || "Product"}
                        width={80}
                        height={95}
                        className={outOfStock ? "aq-wishlist-popup-oos" : undefined}
                      />
                    </button>
                    <div className="aq-wishlist-popup-thumb-info">
                      <h4 className="aq-wishlist-popup-title">
                        <button
                          type="button"
                          onClick={() =>
                            navigateToProductDetail(item?.product_id || productId)
                          }
                        >
                          {product?.title}
                        </button>
                      </h4>
                      <span className="aq-wishlist-popup-price">
                        Rs. {formatPrice(product?.price)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="aq-wishlist-popup-btn">
                  {outOfStock ? (
                    <span className="aq-wishlist-popup-stock">Out of stock</span>
                  ) : (
                    <button
                      type="button"
                      className="aq-wishlist-popup-cart-btn"
                      aria-label="Add to Cart"
                      onClick={() => addToCart(productId)}
                    >
                      <CartIcon />
                      <span>Add to Cart</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="aq-wishlist-popup-empty">Your Wishlist is empty</p>
        )}
      </div>

      <div className="aq-wishlist-popup-bottom d-flex justify-content-between align-items-center">
        <button
          type="button"
          className="aq-line-anim"
          onClick={() => handleNavigate("/wishlist")}
        >
          Open wishlist page
        </button>
        <button
          type="button"
          className="aq-line-anim"
          onClick={() => handleNavigate("/shop")}
        >
          Continue shopping
        </button>
      </div>

      {noticeTitle ? (
        <div className="aq-wishlist-popup-text">
          <p>
            <b>{noticeTitle}</b> has been removed from Wishlist.
          </p>
        </div>
      ) : null}
    </div>,
    document.body
  );
};

export default WishlistModal;
