"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ShoppingBag } from "lucide-react";

import CartProducts from "./components/CartProducts";
import CustomBreadCrumb from "../components/CustomBreadCrumb";
import { loader } from "../components/loader/loaderManager";

import {
  deleteQuantity,
  getCart,
  handleCheckout,
  removeCart,
  updateQuantity,
} from "../api/services/authService";
import { CART_MODEL, LOGIN_MSG } from "../utils/constants";
import { getErrorMessage } from "../utils/helperFn";
import useCartPanelStore from "@/store/useCartPanelStore";
import Loader from "../components/loader/loader";

const Cart = () => {
  const router = useRouter();
  const { setCartOpen, cardDetails } = useCartPanelStore();
  const [totalCost, setTotalCost] = useState(0);
  const [products, setProducts] = useState([]);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [totalQuantities, setTotalQuantities] = useState(0)

  const fetchCart = async () => {
    loader(true);
    try {
      const response = await getCart();
      setTotalCost(response?.total_amount);
      setTotalQuantities(response?.total_quantity)
      const formattedProducts = response?.cart?.map((item) => ({
        id: item?.id,
        productId: item?.product_id,
        quantity: item?.quantity,
        total: item?.total,
        title: item?.product?.title,
        price: parseFloat(item?.product?.price),
        imgSrc: item?.product?.images?.[0]?.image || "",
        totalQuantity : item?.product?.quantity
      }));

      setProducts(formattedProducts);
    } catch (err) {
      getErrorMessage(err);
    } finally {
      loader(false);
    }
  };

  const increaseCount = async (id, currentQuantity, totalQuantities) => {
    if (currentQuantity >= totalQuantities) {
      toast.error("You've reached the maximum quantity allowed.");
      return;
    }
    const newQuantity = currentQuantity + 1;
    loader(true);
    try {
      await updateQuantity({ product_id: id, quantity: newQuantity });
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
      await deleteQuantity({ product_id: id, quantity: newQuantity });
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
      const status = error.response.status;
      if (status === 401) {
        sessionStorage.setItem("postLoginRedirect", "/checkout");
        router.push("/login");
        toast.error(LOGIN_MSG);
      }
      getErrorMessage(error);
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
    const token = sessionStorage.getItem("accessToken");

    if (!token || token === "undefined") {
      toast.error(LOGIN_MSG);
      router.replace("/login");
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  if (isCheckingAuth) {
    return (
      <div className="h-[60vh]">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <CustomBreadCrumb model={CART_MODEL} title={"Shopping Cart"} />
      {products?.length > 0 ? (
        <div className="container mt-4 mb-5">
          <CartProducts
            products={products}
            decreaseCount={decreaseCount}
            increaseCount={increaseCount}
            removeFromCart={removeFromCart}
          />

          <div className="row">
            <div className="col-md-6 order-1 order-md-0">
              <div className="row mt-3 mt-md-0 mb-3  mb-md-5">
                <div className="col-md-6">
                  <button
                    className="shop btn btn-outline-primary btn-sm btn-block primary-color"
                    onClick={() => router.push("/shop")}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>

              <hr className="d-block d-md-none" />

              <div className="row d-none">
                <div className="col-md-12">
                  <label className="text-black h4">Coupon</label>
                  <p>Enter your Coupon code if you have one.</p>
                </div>
                <div className="col-md-8 mb-md-0">
                  <input
                    type="text"
                    className="form-control py-3"
                    id="coupon"
                    placeholder="Coupon Code"
                  />
                </div>
                <div className="col-md-4 mt-3 mt-md-0">
                  <button className="btn btn-primary btn-sm">
                    Apply Coupon
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-6 pl-5 order-0 order-md-1">
              <div className="row justify-content-end">
                <div className="col-md-7">
                  <div className="row">
                    <div className="col-md-12 text-right border-bottom mb-5">
                      <h3 className="text-black h4">Cart Totals</h3>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="dark-color mb-0 text-[1.2rem]">Subtotal</p>
                    <p className="dark-color mb-0 text-[1.2rem] fw-semibold">
                      Rs. {totalCost}
                    </p>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <span className="">Shipping calculated at checkout.</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <button
                        className="btn-sm bg-[var(--primary-main)] text-white border border-white rounded px-4 py-2"
                        onClick={handleNavigateToCheckout}
                      >
                        Proceed to checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="mb-5 text-center text-dark fs-5 mt-4">
          <ShoppingBag size={66} className="mx-auto text-gray-300 mb-3" />
          <span className="d-block fw-bold text-xl mb-0">
            Your Cart is empty
          </span>
          <br />
          <Link href="/shop" className="">
            <button className="bg-[var(--primary-main)] text-white py-2 px-3 rounded">
              Explore Sarees
            </button>
          </Link>
        </p>
      )}
    </>
  );
};

export default Cart;
