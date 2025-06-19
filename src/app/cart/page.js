"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import CartProducts from "./components/CartProducts";
import CustomBreadCrumb from "../components/CustomBreadCrumb";

import useCartStore from "@/store/useCartStore";
import { CART_MODEL } from "../utils/constants";

const Cart = () => {
  const router = useRouter();
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Silk Saree",
      price: "2,500",
      oldPrice: "4000",
      imgSrc: "/images/15.jpeg",
      quantity: 2,
    },
    {
      id: 2,
      title: "Cotton Saree",
      price: "1,800",
      oldPrice: "3000",
      imgSrc: "/images/16.jpeg",
      quantity: 1,
    },
    {
      id: 3,
      title: "Designer Saree",
      price: "1,200",
      oldPrice: "3000",
      imgSrc: "/images/17.jpeg",
      quantity: 3,
    },
    ,
  ]);

  const items = useCartStore((state) => state.items);

  const increaseCount = async (id, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity: newQuantity } : product
      )
    );

    // Send API in background
    try {
      await updateQuantity({ product_id: id, quantity: newQuantity });
    } catch (err) {
      console.error("Failed to increase quantity:", err);
    }
  };

  const decreaseCount = async (id, currentQuantity) => {
    if (currentQuantity <= 1) return;
    const newQuantity = currentQuantity - 1;

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity: newQuantity } : product
      )
    );

    try {
      await deleteQuantity({ product_id: id, quantity: newQuantity });
    } catch (err) {
      console.error("Failed to decrease quantity:", err);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await getCart();
      const formattedProducts = response?.cart?.map((item) => ({
        id: item.id,
        productId: item.product_id,
        quantity: item.quantity,
        total: item.total,
        title: item.product.title,
        price: parseFloat(item.product.product_price),
        imgSrc: item.product.images?.[0]?.image || "",
      }));
      setProducts(formattedProducts);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
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
                <button className="shop btn btn-outline-primary btn-sm btn-block primary-color">
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
                    <strong className="text-black">Rs. 2300.0</strong>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <span className="">Shipping calculated at checkout.</span>
                  </div>
                  {/* <div className="col-md-6 text-right">
                                    <strong className="text-black">$2300.0</strong>
                                </div> */}
                </div>
                <div className="row">
                  <div className="col-12">
                    <button
                      className="btn btn-primary btn-lg py-3 btn-block"
                      onClick={() => router.push("/checkout")}
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
