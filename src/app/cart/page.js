"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import CartProducts from "./components/CartProducts";
import CustomBreadCrumb from "../components/CustomBreadCrumb";
import { loader } from "../components/loader/loaderManager";

import {
  deleteQuantity,
  getCart,
  handleCheckout,
  updateQuantity,
} from "../api/services/authService";
import { CART_MODEL } from "../utils/constants";
import { getErrorMessage } from "../utils/helperFn";
import useCartPanelStore from "@/store/useCartPanelStore";

const Cart = () => {
  const router = useRouter();
  const { setCartOpen } = useCartPanelStore();
  const [totalCost, setTotalCost] = useState(0);
  const [products, setProducts] = useState([]);

  const fetchCart = async () => {
    loader(true);
    try {
      const response = await getCart();
      setTotalCost(response.total_amount);

      const formattedProducts = response?.cart?.map((item) => ({
        id: item?.id,
        productId: item?.product_id,
        quantity: item?.quantity,
        total: item?.total,
        title: item?.product?.title,
        price: parseFloat(item?.product?.price),
        imgSrc: item?.product?.images?.[0]?.image || "",
      }));

      setProducts(formattedProducts);
    } catch (err) {
      getErrorMessage(err);
    } finally {
      loader(false);
    }
  };

  const increaseCount = async (id, currentQuantity) => {
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
      }
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token || token === "undefined") {
      router.replace("/login");
    }
  }, []);

  // const removeProduct = (id) => {
  //   setProducts((prevProducts) =>
  //     prevProducts.filter((product) => product.id !== id)
  //   );
  // };

  return (
    <>
      <CustomBreadCrumb model={CART_MODEL} title={"Shopping Cart"} />
      <div className="container mt-4 mb-5">
        <CartProducts
          products={products}
          decreaseCount={decreaseCount}
          increaseCount={increaseCount}
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

            <div className="row">
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
                <button className="btn btn-primary btn-sm">Apply Coupon</button>
              </div>
            </div>
          </div>

          <div className="col-md-6 pl-5 order-0 order-md-1">
            <div className="row justify-content-end">
              <div className="col-md-7">
                <div className="row">
                  <div className="col-md-12 text-right border-bottom mb-5">
                    <h3 className="text-black h4 text-uppercase">
                      Cart Totals
                    </h3>
                  </div>
                </div>
                <div className="row" style={{ fontSize: "18px" }}>
                  <div className="col-md-6">
                    <span className="text-black ">Subtotal</span>
                  </div>
                  <div className="col-md-6 text-right">
                    <strong className="text-black">Rs. {totalCost}</strong>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <span className="">Shipping calculated at checkout.</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <button
                      className="btn btn-primary btn-lg py-3 btn-block"
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
    </>
  );
};

export default Cart;
