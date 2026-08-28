"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

import CartProducts from "./components/CartProducts";
import { loader } from "../components/loader/loaderManager";
import { LoaderComponent } from "../components/loader/loader";
import { toastCom } from "../components/toast/ToastManager";

import {
  getCart,
  handleCheckout,
  modifyCart,
  removeCart,
} from "../api/services/authService";
import { LOGIN_MSG } from "../utils/constants";
import { getErrorMessage } from "../utils/helperFn";
import useCartPanelStore from "@/store/useCartPanelStore";

import "./cart-page.css";

const Cart = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { setCartOpen, cardDetails } = useCartPanelStore();
  const [totalCost, setTotalCost] = useState(0);
  const [products, setProducts] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [totalQuantities, setTotalQuantities] = useState(0);

  const fetchCart = async () => {
    loader(true);
    try {
      const response = await getCart();
      setTotalCost(response?.total_amount);
      setTotalQuantities(response?.total_quantity);
      const formattedProducts = response?.cart?.map((item) => ({
        id: item?.id,
        productId: item?.product_id,
        quantity: item?.quantity,
        total: item?.total,
        title: item?.product?.title,
        price: parseFloat(item?.product?.price),
        imgSrc: item?.product?.images?.[0]?.image || "",
        totalQuantity: item?.product?.quantity,
      }));

      setProducts(formattedProducts || []);
    } catch (err) {
      getErrorMessage(err);
      setProducts([]);
    } finally {
      loader(false);
      setIsPageLoading(false);
    }
  };

  const increaseCount = async (id, currentQuantity, totalQuantities) => {
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
      fetchCart();
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  const decreaseCount = async (id, currentQuantity) => {
    const newQuantity = currentQuantity - 1;
    if (newQuantity < 1) {
      return;
    }
    loader(true);
    try {
      await modifyCart({
        product_id: id,
        quantity: currentQuantity - 1,
        type: "cart",
      });
      fetchCart();
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  function handleNavigate(page) {
    router.push(page);
    setCartOpen(false);
  }

  async function handleNavigateToCheckout() {
    loader(true);
    try {
      await handleCheckout();
      handleNavigate("/checkout");
    } catch (error) {
      const MSG = getErrorMessage(error);
      const status = error.response.status;
      if (status === 401) {
        sessionStorage.setItem("postLoginRedirect", "/checkout");
        router.push("/login");
        toast.error(LOGIN_MSG);
        return;
      }
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
      fetchCart();
      cardDetails();
      toast.success(data?.message);
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (status === "loading") return;

    const token = localStorage.getItem("accessToken");
    const sessionToken = session?.user?.accessToken;
    if ((!token || token === "undefined") && !sessionToken) {
      toast.error(LOGIN_MSG);
      router.replace("/login");
    }
  }, [router, status, session]);

  if (isPageLoading) {
    return <LoaderComponent />;
  }

  return (
    <div className="aq-cart-page">
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
                  <span>cart</span>
                </div>
                <div className="aq-breadcrumb-content">
                  <h1 className="aq-breadcrumb-title">Cart Page</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="aq-cart-area">
        <div className="container">
          {products?.length > 0 ? (
            <div className="row">
              <div className="col-xl-9 col-lg-8">
                <CartProducts
                  products={products}
                  decreaseCount={decreaseCount}
                  increaseCount={increaseCount}
                  removeFromCart={removeFromCart}
                />
                <div className="aq-cart-bottom">
                  <div className="row align-items-end">
                    <div className="col-xl-6 col-md-8" />
                    <div className="col-xl-6 col-md-4">
                      <div className="aq-cart-update text-md-end">
                        <button
                          type="button"
                          className="aq-cart-update-btn"
                          onClick={() => router.push("/shop")}
                        >
                          Continue Shopping
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="aq-cart-checkout-wrapper">
                  <div className="aq-cart-checkout-top d-flex align-items-center justify-content-between">
                    <span className="aq-cart-checkout-top-title">Subtotal</span>
                    <span className="aq-cart-checkout-top-price">Rs. {totalCost}</span>
                  </div>
                  <div className="aq-cart-checkout-shipping">
                    <h2 className="aq-cart-checkout-shipping-title">Shipping</h2>
                    <div className="aq-cart-checkout-shipping-option-wrapper">
                      <div className="aq-cart-checkout-shipping-option is-active">
                        <label>Calculated at checkout</label>
                      </div>
                    </div>
                    <p className="aq-cart-checkout-shipping-note">
                      Shipping will be calculated at checkout.
                    </p>
                  </div>
                  <div className="aq-cart-checkout-total d-flex align-items-center justify-content-between">
                    <span>Total</span>
                    <span>Rs. {totalCost}</span>
                  </div>
                  <div className="aq-cart-checkout-proceed">
                    <button
                      type="button"
                      className="aq-cart-checkout-btn"
                      onClick={handleNavigateToCheckout}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="aq-cart-empty">
              <h2 className="aq-cart-empty-title">Your cart is empty</h2>
              <p className="aq-cart-empty-text">
                Browse our sarees and add pieces you love.
              </p>
              <Link href="/shop" className="aq-cart-checkout-btn">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cart;
