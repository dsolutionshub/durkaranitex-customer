import React from "react";
import Image from "next/image";

import { formatPrice } from "@/app/utils/helperFn";

const CartProducts = ({ products, decreaseCount, increaseCount }) => {
  return (
    <>
      {/* Mobile  */}
      <div className="d-block d-md-none w-100  px-2 mb-4">
        <div className="text-black d-flex justify-content-between ">
          <p className="mb-0">Product</p>
          <p className="mb-0">Price</p>
        </div>
        <hr className="m-0 pb-2" />
        {products.map((item) => (
          <div key={item.id}>
            <div className=" d-flex justify-content-between align-items-center my-3">
              <div className="d-flex gap-2">
                <Image
                  src={item?.imgSrc}
                  alt={item.title}
                  height={80}
                  width={80}
                  className="h-[6rem] w-[5rem]"
                />
                <div className="leading-snug">
                  <p className="mb-0 text-black">{item?.title}</p>
                  <button
                    className="text-gray-500 underline p-0 m-0"
                    onClick={() => removeFromCart(item?.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="mb-0 text-black">
                Rs. {item?.quantity * formatPrice(item?.price)}
              </p>
            </div>

            <div className="d-flex align-items-center	justify-content-evenly bg-gray-100 w-[7rem] h-[2.5rem] border">
              <button
                className="text-black fs-1"
                onClick={() => decreaseCount(item?.id)}
              >
                -
              </button>
              <p className="mb-0 text-black">{item?.quantity}</p>
              <button
                className="text-black "
                onClick={() => increaseCount(item?.id)}
              >
                +
              </button>
            </div>
            <hr />
          </div>
        ))}
      </div>

      <div className="d-none d-md-block row mb-5">
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
            {products?.map((product) => (
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
                <td className="py-4">Rs. {product.price}</td>

                <td className="p-4 ">
                  <div
                    className="input-group mb-3"
                    style={{ maxWidth: "120px", margin: "auto" }}
                  >
                    <div className="input-group-prepend">
                      <button
                        className="btn btn-outline-primary js-btn-minus"
                        onClick={() => decreaseCount(product.id)}
                      >
                        -
                      </button>
                    </div>
                    <input
                      type="text"
                      className="form-control text-center"
                      defaultValue={product.quantity}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-primary js-btn-plus"
                        onClick={() => increaseCount(product.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  Rs. {product.quantity * formatPrice(product.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CartProducts;
