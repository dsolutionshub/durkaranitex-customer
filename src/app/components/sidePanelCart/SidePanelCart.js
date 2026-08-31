"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

import useCartPanelStore from "@/store/useCartPanelStore";
import { loader } from "../loader/loaderManager";
import { toastCom } from "../toast/ToastManager";
import {
  handleCheckout,
  modifyCart,
  removeCart,
} from "@/app/api/services/authService";
import { getErrorMessage } from "@/app/utils/helperFn";
import { LOGIN_ERROR_MSG } from "@/app/utils/constants";

import "./style.css";

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M12.75 0.75L0.75 12.75M0.75 0.75L12.75 12.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MinusIcon = () => (
  <svg width="11" height="2" viewBox="0 0 11 2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1 1H10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlusIcon = () => (
  <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1 6H10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.5 10.5V1.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ProgressTruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" fill="none">
    <path
      d="M18.1509 6.77558H18.8009C18.8009 6.668 18.7742 6.5621 18.7232 6.46738L18.1509 6.77558ZM9.77434 0.778871L9.9752 0.160685L9.9752 0.160684L9.77434 0.778871ZM11.4597 2.46428L10.8416 2.66514L10.8416 2.66514L11.4597 2.46428ZM11.6739 5.56632L11.0557 5.76718L11.0557 5.76718L11.6739 5.56632ZM12.7975 6.68992L12.5966 7.30811L12.5966 7.30811L12.7975 6.68992ZM3.24311 13.5259C3.60165 13.5437 3.90679 13.2676 3.92466 12.909C3.94254 12.5505 3.66637 12.2453 3.30783 12.2275L3.27547 12.8767L3.24311 13.5259ZM1.29111 12.26L0.831495 12.7197L0.831495 12.7197L1.29111 12.26ZM6.77553 12.2508C6.41654 12.2508 6.12555 12.5418 6.12558 12.9008C6.12561 13.2598 6.41664 13.5508 6.77563 13.5508L6.77558 12.9008L6.77553 12.2508ZM15.4935 12.2275C15.1349 12.2453 14.8588 12.5505 14.8767 12.909C14.8945 13.2676 15.1997 13.5437 15.5582 13.5259L15.5258 12.8767L15.4935 12.2275ZM0.650391 0.000390649C0.291406 0.000390649 0.000390649 0.291406 0.000390649 0.650391C0.000390649 1.00938 0.291406 1.30039 0.650391 1.30039V0.650391V0.000390649ZM1.32369 10.2433C1.30582 9.88478 1.00068 9.60862 0.642138 9.62649C0.283598 9.64436 0.00743206 9.9495 0.0253041 10.308L0.674498 10.2757L1.32369 10.2433ZM0.650569 3.5004C0.291584 3.5004 0.000568669 3.79142 0.000568669 4.1504C0.000568669 4.50939 0.291584 4.8004 0.650569 4.8004V4.1504V3.5004ZM5.90073 4.8004C6.25971 4.8004 6.55073 4.50939 6.55073 4.1504C6.55073 3.79142 6.25971 3.5004 5.90073 3.5004V4.1504V4.8004ZM0.650569 6.12516C0.291584 6.12516 0.000568669 6.41618 0.000568669 6.77516C0.000568669 7.13415 0.291584 7.42516 0.650569 7.42516V6.77516V6.12516ZM4.15068 7.42516C4.50966 7.42516 4.80068 7.13415 4.80068 6.77516C4.80068 6.41618 4.50966 6.12516 4.15068 6.12516V6.77516V7.42516ZM11.5881 1.7504C11.2291 1.7504 10.9381 2.04142 10.9381 2.4004C10.9381 2.75939 11.2291 3.0504 11.5881 3.0504V2.4004V1.7504ZM17.0339 4.70128L16.4616 5.00945L16.4616 5.00948L17.0339 4.70128ZM15.6101 2.70991L15.9434 2.15187L15.9434 2.15187L15.6101 2.70991ZM15.5265 12.9003H14.8765C14.8765 13.5079 14.3839 14.0004 13.7764 14.0004V14.6504V15.3004C15.1019 15.3004 16.1765 14.2259 16.1765 12.9003H15.5265ZM13.7764 14.6504V14.0004C13.1689 14.0004 12.6763 13.5079 12.6763 12.9003H12.0263H11.3763C11.3763 14.2259 12.4509 15.3004 13.7764 15.3004V14.6504ZM12.0263 12.9003H12.6763C12.6763 12.2928 13.1689 11.8003 13.7764 11.8003V11.1503V10.5003C12.4509 10.5003 11.3763 11.5748 11.3763 12.9003H12.0263ZM13.7764 11.1503V11.8003C14.3839 11.8003 14.8765 12.2928 14.8765 12.9003H15.5265H16.1765C16.1765 11.5748 15.1019 10.5003 13.7764 10.5003V11.1503ZM6.77665 12.9005H6.12665C6.12665 13.508 5.63414 14.0005 5.0266 14.0005V14.6505V15.3005C6.35211 15.3005 7.42665 14.226 7.42665 12.9005H6.77665ZM5.0266 14.6505V14.0005C4.41906 14.0005 3.92655 13.508 3.92655 12.9005H3.27655H2.62655C2.62655 14.226 3.70109 15.3005 5.0266 15.3005V14.6505ZM3.27655 12.9005H3.92655C3.92655 12.2929 4.41906 11.8004 5.0266 11.8004V11.1504V10.5004C3.70109 10.5004 2.62655 11.5749 2.62655 12.9005H3.27655ZM5.0266 11.1504V11.8004C5.63414 11.8004 6.12665 12.2929 6.12665 12.9005H6.77665H7.42665C7.42665 11.5749 6.35211 10.5004 5.0266 10.5004V11.1504ZM18.1509 6.77558H17.5009V8.52563H18.1509H18.8009V6.77558H18.1509ZM14.0383 6.77558V7.42558H18.1509V6.77558V6.12558H14.0383V6.77558ZM18.1509 8.52563H17.5009C17.5009 9.57523 17.4995 10.297 17.4266 10.8394C17.3562 11.363 17.23 11.621 17.0506 11.8004L17.5102 12.26L17.9698 12.7197C18.4311 12.2584 18.6253 11.6804 18.715 11.0126C18.8023 10.3635 18.8009 9.53848 18.8009 8.52563H18.1509ZM7.91311 0.650391V1.30039C8.94091 1.30039 9.30065 1.30841 9.57348 1.39706L9.77434 0.778871L9.9752 0.160684C9.45718 -0.00762862 8.83972 0.000390649 7.91311 0.000390649V0.650391ZM11.5882 4.3255H12.2382C12.2382 3.39889 12.2462 2.78143 12.0779 2.26341L11.4597 2.46428L10.8416 2.66514C10.9302 2.93797 10.9382 3.29771 10.9382 4.3255H11.5882ZM9.77434 0.778871L9.57348 1.39706C10.1748 1.59243 10.6462 2.06385 10.8416 2.66514L11.4597 2.46428L12.0779 2.26342C11.754 1.26636 10.9723 0.484649 9.9752 0.160685L9.77434 0.778871ZM11.5882 4.3255H10.9382C10.9382 4.92638 10.9302 5.38097 11.0557 5.76718L11.6739 5.56632L12.2921 5.36546C12.2462 5.22444 12.2382 5.02756 12.2382 4.3255H11.5882ZM14.0383 6.77558V6.12558C13.3362 6.12558 13.1394 6.11756 12.9983 6.07174L12.7975 6.68992L12.5966 7.30811C12.9828 7.4336 13.4374 7.42558 14.0383 7.42558V6.77558ZM11.6739 5.56632L11.0557 5.76718C11.2931 6.49785 11.866 7.0707 12.5966 7.30811L12.7975 6.68992L12.9983 6.07174C12.6634 5.96292 12.4009 5.70036 12.2921 5.36546L11.6739 5.56632ZM3.27547 12.8767L3.30783 12.2275C2.36654 12.1805 1.9913 12.041 1.75073 11.8004L1.29111 12.26L0.831495 12.7197C1.44298 13.3311 2.26508 13.4771 3.24311 13.5259L3.27547 12.8767ZM12.0263 12.9003L12.0263 12.2503L6.77553 12.2508L6.77558 12.9008L6.77563 13.5508L12.0264 13.5503L12.0263 12.9003ZM15.5258 12.8767L15.5582 13.5259C16.5362 13.4771 17.3583 13.3311 17.9698 12.7197L17.5102 12.26L17.0506 11.8004C16.81 12.041 16.4348 12.1805 15.4935 12.2275L15.5258 12.8767ZM0.650391 0.650391V1.30039H7.91311V0.650391V0.000390649H0.650391V0.650391ZM0.674498 10.2757L0.0253041 10.308C0.0740557 11.2861 0.220013 12.1082 0.831495 12.7197L1.29111 12.26L1.75073 11.8004C1.51017 11.5599 1.37061 11.1846 1.32369 10.2433L0.674498 10.2757ZM0.650569 4.1504V4.8004H5.90073V4.1504V3.5004H0.650569V4.1504ZM0.650569 6.77516V7.42516H4.15068V6.77516V6.12516H0.650569V6.77516ZM11.5881 2.4004V3.0504H13.1817V2.4004V1.7504H11.5881V2.4004ZM17.0339 4.70128L16.4616 5.00948L17.5786 7.08377L18.1509 6.77558L18.7232 6.46738L17.6062 4.39309L17.0339 4.70128ZM13.1817 2.4004V3.0504C13.8314 3.0504 14.2708 3.05116 14.6138 3.0858C14.9422 3.11896 15.1281 3.17913 15.2768 3.26794L15.6101 2.70991L15.9434 2.15187C15.5739 1.93117 15.1823 1.83659 14.7444 1.79238C14.3211 1.74964 13.8054 1.7504 13.1817 1.7504V2.4004ZM17.0339 4.70128L17.6062 4.39312C17.3105 3.84393 17.0666 3.3895 16.8283 3.03709C16.5818 2.67251 16.3129 2.37257 15.9434 2.15187L15.6101 2.70991L15.2768 3.26794C15.4254 3.35675 15.5665 3.49187 15.7514 3.7653C15.9445 4.05088 16.1535 4.43739 16.4616 5.00945L17.0339 4.70128Z"
      fill="currentColor"
      fillOpacity="0.8"
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

function CartQuantity({ decreaseCount, increaseCount, removeFromCart, product }) {
  const outOfStock = parseFloat(product?.product?.quantity) <= 0;
  const atMin = product?.quantity === 1;

  return (
    <div className="aq-product-details-quantity d-flex align-items-center">
      <div className={`aq-product-quantity${outOfStock ? " aq-cartmini-qty-disabled" : ""}`}>
        <button
          type="button"
          className="aq-cart-minus"
          disabled={atMin || outOfStock}
          aria-label="Decrease quantity"
          onClick={(e) => decreaseCount(e, product?.product_id, product?.quantity)}
        >
          <MinusIcon />
        </button>
        <input
          className="aq-cart-input"
          type="text"
          readOnly
          value={product?.quantity || 0}
        />
        <button
          type="button"
          className="aq-cart-plus"
          disabled={outOfStock}
          aria-label="Increase quantity"
          onClick={(e) =>
            increaseCount(
              e,
              product?.product_id,
              product?.quantity,
              product?.product?.quantity
            )
          }
        >
          <PlusIcon />
        </button>
      </div>
      <button
        type="button"
        className="aq-line-anim aq-cartmini-remove aq-remove"
        onClick={(e) => removeFromCart(e, product?.id)}
      >
        Remove
      </button>
    </div>
  );
}

const SidePanelCart = () => {
  const router = useRouter();
  const {
    isCartOpen,
    setCartOpen,
    cartProducts,
    cartTotalAmount,
    cardDetails,
  } = useCartPanelStore();

  const hasItems = cartProducts?.length > 0;
  const progressWidth = hasItems ? "100%" : "8%";

  function handleNavigate(page) {
    router.push(page);
    setCartOpen(false);
  }

  const increaseCount = async (e, id, currentQuantity, totalQuantities) => {
    e.stopPropagation();
    if (currentQuantity >= totalQuantities) {
      toastCom(
        "You've reached the maximum quantity allowed.",
        true,
        "error",
        2000
      );
      return;
    }
    loader(true);
    try {
      await modifyCart({
        product_id: id,
        quantity: currentQuantity + 1,
        type: "cart",
      });
      cardDetails();
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  const decreaseCount = async (e, id, currentQuantity) => {
    e.stopPropagation();
    loader(true);
    try {
      await modifyCart({
        product_id: id,
        quantity: currentQuantity - 1,
        type: "cart",
      });
      cardDetails();
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  async function handleNavigateToCheckout() {
    loader(true);
    try {
      await handleCheckout();
      handleNavigate("/checkout");
    } catch (error) {
      const status = error.response.status;
      if (status === 401) {
        sessionStorage.setItem("postLoginRedirect", "/checkout");
        router.push("/login");
        toast.error(LOGIN_ERROR_MSG);
        return;
      }
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  }

  const removeFromCart = async (e, id) => {
    e.stopPropagation();
    loader(true);
    try {
      const data = await removeCart({
        cart_id: id,
      });
      cardDetails();
      toast.success(data?.message);
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  const navigateToProductDetail = (product_id) => {
    router.push(`/product-detail?id=${product_id}`);
    setCartOpen(false);
  };

  useEffect(() => {
    if (!isCartOpen) {
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <>
      <div
        className={`aq-cartmini-overlay${isCartOpen ? " opened" : ""}`}
        onClick={() => setCartOpen(false)}
      />
      <div
        className={`aq-cartmini-area aq-cartmini-active d-flex flex-column justify-content-between${
          isCartOpen ? " opened" : ""
        }`}
      >
        <div className="aq-cartmini-header">
          <button
            type="button"
            className="aq-cartmini-close aq-cartmini-close-icon"
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
          >
            <CloseIcon />
          </button>
          <h4 className="aq-cartmini-title">Shopping Cart</h4>
          <div className="aq-cartmini-shiping">
            <div className="aq-cartmini-shiping-message">
              <p>
                {hasItems ? (
                  <>
                    Shipping will be calculated at <b>checkout</b>
                  </>
                ) : (
                  <>
                    Add items to your cart to checkout
                  </>
                )}
              </p>
            </div>
            <div className="aq-progress-bar">
              <div style={{ width: progressWidth }}>
                <div className="progress-car">
                  <ProgressTruckIcon />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="aq-cartmini-body">
          {hasItems ? (
            cartProducts.map((product) => {
              const outOfStock = parseFloat(product?.product?.quantity) <= 0;
              const imageSrc = product?.product?.images?.[0]?.image || "/images/home/KCLogo.png";
              const variantLabel =
                product?.product?.size ||
                product?.size ||
                product?.product?.color ||
                product?.color;

              return (
                <div
                  key={product?.id || product?.product?.id}
                  className="aq-cartmini-product-item mb-15 item-delete d-flex align-items-center"
                >
                  <div
                    className="aq-cartmini-product-thumbnail"
                    onClick={() => navigateToProductDetail(product?.product_id)}
                  >
                    <Image
                      src={imageSrc}
                      alt={product?.product?.title || "Product"}
                      width={110}
                      height={146}
                      className={outOfStock ? "aq-cartmini-oos-dim" : undefined}
                    />
                    {outOfStock && <span className="aq-cartmini-oos">Out of Stock</span>}
                  </div>
                  <div className="aq-cartmini-product-summary">
                    <h4 className={`aq-product-title${outOfStock ? " aq-cartmini-oos-dim" : ""}`}>
                      <button
                        type="button"
                        onClick={() => navigateToProductDetail(product?.product_id)}
                      >
                        {product?.product?.title}
                      </button>
                    </h4>
                    {variantLabel ? (
                      <span className="aq-cartmini-product-size">
                        <label>Size:</label> {variantLabel}
                      </span>
                    ) : null}
                    <span className="aq-cartmini-product-price">
                      Rs. {formatPrice(product?.product?.price)}
                    </span>
                    <CartQuantity
                      increaseCount={increaseCount}
                      decreaseCount={decreaseCount}
                      removeFromCart={removeFromCart}
                      product={product}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="cartmini-empty text-center">
              <p>Your Cart is empty</p>
              <button
                type="button"
                className="aq-btn-black border-btn"
                onClick={() => {
                  setCartOpen(false);
                  router.push("/shop");
                }}
              >
                Go to Shop
              </button>
            </div>
          )}
        </div>

        <div className="aq-cartmini-footer">
          <div className="aq-cartmini-total d-flex justify-content-between align-items-center">
            <span className="aq-cartmini-total-title">Subtotal</span>
            <span className="aq-cartmini-total-value">
              Rs. {formatPrice(cartTotalAmount)} INR
            </span>
          </div>
          <div className="aq-cartmini-main-btn d-flex justify-content-between">
            <button
              type="button"
              className="aq-btn-black btn-red-bg text-center w-100"
              onClick={() => handleNavigate("/cart")}
            >
              View Cart
            </button>
            <button
              type="button"
              className={`aq-btn-black text-center border-btn w-100${
                hasItems ? "" : " disable-btn"
              }`}
              disabled={!hasItems}
              onClick={handleNavigateToCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidePanelCart;
