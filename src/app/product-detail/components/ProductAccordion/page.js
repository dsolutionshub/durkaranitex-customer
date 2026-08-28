"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import useCartPanelStore from "@/store/useCartPanelStore";
import {
  buyNow,
  modifyCart,
  modifyWishlist,
} from "@/app/api/services/authService";
import { getErrorMessage } from "@/app/utils/helperFn";
import { loader } from "@/app/components/loader/loaderManager";
import { LOGIN_ERROR_MSG } from "@/app/utils/constants";
import { formatPrice } from "../../utils";

export default function ProductAccordion({
  sections,
  quantity,
  handleGetProductDetails,
  decreaseCount,
  increaseCount,
  selectedIndex,
  setSelectedIndex,
  onOpenDelivery,
  onOpenShare,
}) {
  const router = useRouter();
  const { handleGetCartDetail, wishlistDetails } = useCartPanelStore();
  const images = (sections?.images || []).filter((img) => img?.image);
  const outOfStock =
    sections?.quantity != null &&
    sections?.quantity !== "" &&
    parseFloat(sections.quantity) <= 0;
  const showOldPrice =
    sections?.product_price &&
    Number(sections.product_price) > Number(sections.price);
  const categoryName =
    sections?.category?.name ||
    sections?.category_name ||
    (typeof sections?.category === "string" ? sections.category : "");
  async function handleLike() {
    loader(true);
    try {
      const data = await modifyWishlist({ product_id: sections?.id });
      wishlistDetails();
      toast.success(data?.message);
      handleGetProductDetails();
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        sessionStorage.setItem(
          "postLoginRedirect",
          `/product-detail?id=${sections?.id}`
        );
        router.push("/login");
        toast.error(LOGIN_ERROR_MSG);
        return;
      }
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  }

  const addToCart = async () => {
    loader(true);
    try {
      await modifyCart({
        product_id: sections?.id,
        quantity,
        type: "list",
      });
      handleGetCartDetail();
      handleGetProductDetails();
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        sessionStorage.setItem(
          "postLoginRedirect",
          `/product-detail?id=${sections?.id}`
        );
        router.push("/login");
        toast.error("Please log in to add this product to your cart.");
        return;
      }
      toast.error(getErrorMessage(error));
    } finally {
      loader(false);
    }
  };

  const handleByeNow = async () => {
    loader(true);
    try {
      const data = await buyNow({
        product_id: sections?.id,
        quantity,
      });
      if (data.status == "success") {
        router.push("/checkout");
      }
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        sessionStorage.setItem(
          "postLoginRedirect",
          `/product-detail?id=${sections?.id}`
        );
        router.push("/login");
        toast.error("Please log in to purchase this product.");
        return;
      }
      toast.error(getErrorMessage(error));
    } finally {
      loader(false);
    }
  };

  return (
    <div className="aq-product-details-wrap">
      <div className="aq-product-details-radius-style d-flex">
        <div className="aq-product-sucess">
          <span className={outOfStock ? "is-oos" : "clr-sale"}>
            {outOfStock ? "Out of Stock" : "In Stock"}
          </span>
        </div>
      </div>

      {categoryName ? (
        <div className="aq-product-details-category">
          <span>{categoryName}</span>
        </div>
      ) : null}

      <h3 className="aq-product-details-title">{sections?.title}</h3>

      <div className="tp-product-details-inventory">
        <div className="aq-product-details-rating-wrapper d-flex align-items-center">
          {sections?.sku ? (
            <div className="aq-product-details-sku">
              <span>
                <label>SKU:</label> {sections.sku}
              </span>
            </div>
          ) : null}
          {sections?.quantity &&
          parseInt(sections.quantity, 10) <= 10 &&
          !outOfStock ? (
            <div className="aq-product-details-fomo-mesg">
              <span>Only {parseInt(sections.quantity, 10)} left in stock!</span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="aq-product-details-price-wrap">
        <ins>
          <span className="aq-product-details-price new-price">
            Rs. {formatPrice(sections?.price)}
          </span>
        </ins>
        {showOldPrice ? (
          <del>
            <span className="aq-product-details-price old-price">
              Rs. {formatPrice(sections.product_price)}
            </span>
          </del>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="aq-product-details-variation">
          <h4 className="aq-product-details-title-sm">
            <label>Colour:</label>
          </h4>
          <div className="aq-product-details-variation-wrap d-flex align-items-center">
            {images.map((img, index) => (
              <button
                type="button"
                key={img?.id || img?.image || index}
                className={`aq-product-details-variation-item${
                  index === selectedIndex ? " active" : ""
                }`}
                onClick={() => setSelectedIndex(index)}
              >
                <Image src={img.image} alt="" width={60} height={80} />
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="aq-product-details-action-wrapper">
        <div className="aq-product-details-action-item-wrapper d-sm-flex align-items-center">
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
              <button
                type="button"
                className="aq-cart-plus"
                onClick={() => increaseCount(quantity)}
              >
                <svg width="11" height="12" viewBox="0 0 11 12" fill="none">
                  <path d="M1 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M5.5 10.5V1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
          <div className="aq-product-details-add-to-cart d-flex align-items-center w-100">
            <div className="aq-product-details-add-to-cart-btn w-100">
              <button
                type="button"
                className="aq-btn-black btn-square w-100"
                disabled={outOfStock}
                onClick={addToCart}
              >
                Add To Cart
              </button>
            </div>
            <button
              type="button"
              className={`aq-product-action-btn action-btn-2 aq-wishlist-btn aq-tooltip-top${
                sections?.wishList ? " aq-wishlist-active" : ""
              }`}
              onClick={handleLike}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path d="M14.7197 1.52347C12.5744 0.244089 10.7019 0.759666 9.57712 1.58092C9.11591 1.91766 8.88531 2.08602 8.74963 2.08602C8.61396 2.08602 8.38336 1.91766 7.92215 1.58092C6.79733 0.759666 4.9249 0.244089 2.77958 1.52347C-0.0359114 3.20253 -0.67299 8.7418 5.82126 13.4151C7.05821 14.3052 7.67668 14.7502 8.74963 14.7502C9.82258 14.7502 10.4411 14.3052 11.678 13.4151C18.1723 8.7418 17.5352 3.20253 14.7197 1.52347Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="aq-tooltip-item">Wishlist</span>
            </button>
            <button type="button" className="aq-product-action-btn action-btn-2 aq-compare-btn aq-tooltip-top">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                <path d="M11.6755 5.91828L14.2612 3.33412M14.2612 3.33412L11.6755 0.75M14.2612 3.33412L1.74999 3.33374M3.33562 8.07153L0.75 10.6557L3.33562 13.2398M13.7724 10.75H1.26122" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="aq-tooltip-item">Compare</span>
            </button>
          </div>
        </div>
        <div className="aq-product-details-buy-now-btn">
          <button
            type="button"
            className="aq-btn-black btn-red-bg btn-square w-100"
            disabled={outOfStock}
            onClick={handleByeNow}
          >
            Buy Now
          </button>
        </div>
      </div>

      <div className="aq-product-details-action-sm">
        <button type="button" className="aq-product-details-action-sm-btn" onClick={onOpenDelivery}>
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" fill="none">
            <path d="M1.2 11.2V4.2C1.2 3.3 1.95 2.55 2.85 2.55H11.7C12.6 2.55 13.35 3.3 13.35 4.2V11.2M13.35 11.2H16.05C16.7 11.2 17.25 10.75 17.4 10.12L18.15 6.78C18.3 6.15 17.82 5.55 17.17 5.55H13.35V11.2ZM4.2 13.55C5.015 13.55 5.675 12.89 5.675 12.075C5.675 11.26 5.015 10.6 4.2 10.6C3.385 10.6 2.725 11.26 2.725 12.075C2.725 12.89 3.385 13.55 4.2 13.55ZM14.1 13.55C14.915 13.55 15.575 12.89 15.575 12.075C15.575 11.26 14.915 10.6 14.1 10.6C13.285 10.6 12.625 11.26 12.625 12.075C12.625 12.89 13.285 13.55 14.1 13.55Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Delivery & Return
        </button>
        <button type="button" className="aq-product-details-action-sm-btn" onClick={onOpenShare}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
            <path d="M11.2504 4.95C12.4102 4.95 13.3504 4.0098 13.3504 2.85C13.3504 1.6902 12.4102 0.75 11.2504 0.75C10.0906 0.75 9.15039 1.6902 9.15039 2.85C9.15039 4.0098 10.0906 4.95 11.2504 4.95Z" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.85 9.85039C4.0098 9.85039 4.95 8.91019 4.95 7.75039C4.95 6.59059 4.0098 5.65039 2.85 5.65039C1.6902 5.65039 0.75 6.59059 0.75 7.75039C0.75 8.91019 1.6902 9.85039 2.85 9.85039Z" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.2504 14.7498C12.4102 14.7498 13.3504 13.8096 13.3504 12.6498C13.3504 11.49 12.4102 10.5498 11.2504 10.5498C10.0906 10.5498 9.15039 11.49 9.15039 12.6498C9.15039 13.8096 10.0906 14.7498 11.2504 14.7498Z" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.66309 8.80664L9.44409 11.5926" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.43709 3.90723L4.66309 6.69323" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Share
        </button>
      </div>

      <div className="aq-product-details-mesg-wrap">
        <ul>
          <li>
            <div className="aq-product-details-mesg d-flex align-items-center">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                  <path d="M22.2581 20.2907C22.0349 20.0702 21.5886 20.0702 21.3655 20.2907C20.8077 20.8421 19.8035 20.8421 19.2457 20.2907C19.0226 20.0702 18.7994 19.9599 18.4647 19.7393L21.1423 12.6817C21.4771 11.9098 21.1423 11.0276 20.473 10.5865L16.7912 7.93987V4.0802C16.7912 3.6391 16.568 3.19799 16.2333 2.86716C15.8986 2.53634 15.4524 2.31579 15.0061 2.31579H14.1135V1.76441C14.1135 0.771929 13.3325 0 12.3284 0H10.3202C9.31604 0 8.53508 0.771929 8.53508 1.76441V2.31579H7.64253C7.19622 2.31579 6.74993 2.53634 6.41523 2.86716C5.85739 3.19799 5.74581 3.6391 5.74581 4.0802V7.93987L1.84089 10.5865C1.17148 11.0276 0.948342 11.9098 1.17148 12.6817L3.84914 19.8496C3.626 19.9599 3.40286 20.1805 3.17972 20.2907C2.62187 20.8421 1.61775 20.8421 1.05991 20.2907C0.83677 20.0702 0.390492 20.0702 0.167354 20.2907C-0.0557846 20.5113 -0.0557846 20.9524 0.167354 21.1729C1.28304 22.2757 3.06815 22.2757 4.18385 21.1729C4.74169 20.6215 5.74581 20.6215 6.30366 21.1729C7.41935 22.2757 9.20445 22.2757 10.3202 21.1729C10.878 20.6215 11.8821 20.6215 12.44 21.1729C13.5557 22.2757 15.3408 22.2757 16.4565 21.1729C17.0143 20.6215 18.0184 20.6215 18.5763 21.1729C19.1341 21.7243 19.8035 21.9449 20.5846 21.9449C21.3655 21.9449 22.0349 21.614 22.5927 21.1729C22.5927 20.9524 22.5927 20.6216 22.2581 20.2907ZM9.76231 1.76441C9.76231 1.54386 9.98541 1.32331 10.2086 1.32331H12.2169C12.44 1.32331 12.6631 1.54386 12.6631 1.76441V2.31579H9.65072V1.76441H9.76231ZM7.08464 4.0802C7.08464 3.96992 7.08464 3.85965 7.19622 3.74937C7.30778 3.6391 7.41935 3.6391 7.53094 3.6391H15.0061C15.1176 3.6391 15.2292 3.6391 15.3408 3.74937C15.4524 3.85965 15.4524 3.96992 15.4524 4.0802V6.94736L11.659 4.41103C11.4358 4.30075 11.1011 4.30075 10.878 4.41103L7.08464 7.05764V4.0802ZM2.62187 11.6892L11.2127 5.84461L19.8035 11.7995C19.9151 11.9098 20.0267 12.1304 19.9151 12.3509L19.0226 14.777L11.659 9.70427C11.4358 9.59398 11.1011 9.59398 10.878 9.70427L3.40286 14.6667L2.51031 12.1304C2.39874 12.0201 2.39874 11.7995 2.62187 11.6892ZM15.2292 20.2907C14.6713 20.8421 13.6673 20.8421 13.1094 20.2907C11.9937 19.188 10.2086 19.188 9.09286 20.2907C8.53508 20.8421 7.53094 20.8421 6.97308 20.2907C6.41523 19.7394 5.74581 19.5188 4.96483 19.5188L3.626 15.99L11.2127 11.0276L18.5763 16.1003L17.2375 19.6291C16.4564 19.5188 15.787 19.7394 15.2292 20.2907Z" fill="currentColor" />
                </svg>
              </span>
              <span>
                <label>Estimate delivery times:</label> 5-7 days.
              </span>
            </div>
          </li>
          <li>
            <div className="aq-product-details-mesg d-flex align-items-center">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                  <path d="M12.7023 7.23009L4.63379 2.57715M0.84082 5.04395L8.66728 9.57137L16.4937 5.04395M8.66797 18.5996V9.56268M16.7366 13.1491V5.97689C16.7363 5.66246 16.6533 5.35364 16.496 5.08142C16.3386 4.80919 16.1124 4.58313 15.8401 4.42591L9.56463 0.839831C9.29205 0.682459 8.98286 0.599609 8.66812 0.599609C8.35339 0.599609 8.04419 0.682459 7.77162 0.839831L1.49611 4.42591C1.22381 4.58313 0.997638 4.80919 0.840286 5.08142C0.682933 5.35364 0.599932 5.66246 0.599609 5.97689V13.1491C0.599932 13.4635 0.682933 13.7723 0.840286 14.0445C0.997638 14.3168 1.22381 14.5428 1.49611 14.7L7.77162 18.2861C8.04419 18.4435 8.35339 18.5263 8.66812 18.5263C8.98286 18.5263 9.29205 18.4435 9.56463 18.2861L15.8401 14.7C16.1124 14.5428 16.3386 14.3168 16.496 14.0445C16.6533 13.7723 16.7363 13.4635 16.7366 13.1491Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>
                <label>Shipping &amp; replacements:</label> Replacement within 1
                day of delivery for damaged products.
              </span>
            </div>
          </li>
        </ul>
      </div>

      <div className="aq-product-details-payment d-flex align-items-center justify-content-between">
        <p>
          Guaranteed safe <br /> and secure checkout
        </p>
        <Image
          className="aq-product-details-payment-img"
          src="/images/payment/payment.png"
          alt="PayPal, Visa, Mastercard, Pay, Apple Pay, AMEX"
          width={280}
          height={32}
        />
      </div>

      {sections?.is_cod_available === "0" ? (
        <div className="aq-pd-cod d-flex align-items-center">
          <span className="aq-pd-cod-icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7.4" stroke="currentColor" strokeWidth="1.4" />
              <path d="M4.2 13.8L13.8 4.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </span>
          <span className="aq-pd-cod-text">
            Cash on Delivery is not available for this product.
          </span>
        </div>
      ) : null}
    </div>
  );
}
