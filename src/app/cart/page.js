"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/useCartStore";
import { deleteQuantity, getCart, updateQuantity } from "../api/services/authService";

const Cart = () => {
  const router = useRouter();
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const [products, setProducts] = useState([]);

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
    fetchCart()
  }, []);

  // const removeProduct = (id) => {
  //   setProducts((prevProducts) =>
  //     prevProducts.filter((product) => product.id !== id)
  //   );
  // };

  return (
    <div className="container mt-5 mb-5">
      <div className="row mb-5">
        <table className="table table-bordered" style={{ width: "100%" }}>
          <thead style={{ fontSize: "20px" }}>
            <tr style={{ textAlign: "center", verticalAlign: "middle" }}>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                style={{
                  textAlign: "center",
                  verticalAlign: "middle",
                  alignContent: "center",
                }}
              >
                <td style={{ display: "flex" }}>
                  <Image
                    width={70}
                    height={50}
                    src={product.imgSrc}
                    alt={product.title}
                  />
                  <div
                    style={{
                      display: "flex",
                      marginLeft: "10px",
                      flexDirection: "column",
                    }}
                  >
                    <p style={{ marginBottom: "0" }}>{product.title}</p>

                    <span
                      onClick={() => removeFromCart(product.id)}
                      style={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        alignSelf: "start",
                      }}
                    >
                      Remove
                    </span>
                  </div>
                </td>
                <td className="py-4">Rs. {product.price.toFixed(2)}</td>
                <td className="p-4 ">
                  <div
                    className="input-group mb-3"
                    style={{ maxWidth: "120px", margin: "auto" }}
                  >
                    <div className="input-group-prepend">
                      <button
                        className="btn btn-outline-primary js-btn-minus"
                        onClick={() => decreaseCount(product.id, product.quantity)}
                      >
                        -
                      </button>
                    </div>
                    <input
                      type="text"
                      className="form-control text-center"
                      value={product.quantity}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-primary js-btn-plus"
                        onClick={() => increaseCount(product.id, product.quantity)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  Rs. {(product.quantity * product.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="row mb-5">
            <div className="col-md-6">
              <button className="shop btn btn-outline-primary btn-sm btn-block">
                Continue Shopping
              </button>
            </div>
          </div>
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
            <div className="col-md-4">
              <button className="btn btn-primary btn-sm">Apply Coupon</button>
            </div>
          </div>
        </div>
        <div className="col-md-6 pl-5">
          <div className="row justify-content-end">
            <div className="col-md-7">
              <div className="row">
                <div className="col-md-12 text-right border-bottom mb-5">
                  <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
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
  );
};

export default Cart;
