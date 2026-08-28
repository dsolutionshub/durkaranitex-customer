"use client";

import Link from "next/link";

const MinusIcon = () => (
  <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlusIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M6.75 2.25H11.25M2.25 4.5H15.75M14.25 4.5L13.724 13.409C13.645 14.581 12.67 15.5 11.496 15.5H6.504C5.33 15.5 4.355 14.581 4.276 13.409L3.75 4.5M7.5 8.25V12M10.5 8.25V12"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CartProducts = ({
  products,
  decreaseCount,
  increaseCount,
  removeFromCart,
}) => {
  return (
    <div className="aq-cart-list">
      <table className="table">
        <thead>
          <tr>
            <th className="aq-cart-header-product">Product</th>
            <th className="aq-cart-header-price">Price</th>
            <th className="aq-cart-header-quantity">Quantity</th>
            <th className="aq-cart-header-action" />
          </tr>
        </thead>
        <tbody>
          {products?.map((item) => {
            const outOfStock = parseFloat(item?.totalQuantity) <= 0;
            const href = `/product-detail?id=${item?.productId}`;

            return (
              <tr key={item.id} className={`aq-cart-row${outOfStock ? " is-oos" : ""}`}>
                <td className="aq-cart-product">
                  <div className="aq-cart-product-info">
                    <Link href={href} className="aq-cart-img">
                      <img src={item?.imgSrc || "/images/home/KCLogo.png"} alt={item.title || "Product"} />
                      {outOfStock ? <span className="aq-cart-oos">Out of Stock</span> : null}
                    </Link>
                    <Link href={href} className="aq-cart-title">
                      {item?.title}
                    </Link>
                  </div>
                </td>
                <td className="aq-cart-price">
                  <span>Rs. {item?.price}</span>
                </td>
                <td className="aq-cart-quantity aq-product-details-quantity">
                  <div className="aq-product-quantity">
                    <button
                      type="button"
                      className="aq-cart-minus"
                      disabled={item?.quantity === 1 || outOfStock}
                      onClick={() => decreaseCount(item?.productId, item?.quantity)}
                      aria-label="Decrease quantity"
                    >
                      <MinusIcon />
                    </button>
                    <input
                      className="aq-cart-input"
                      type="text"
                      value={item?.quantity || 1}
                      readOnly
                    />
                    <button
                      type="button"
                      className="aq-cart-plus"
                      disabled={outOfStock}
                      onClick={() =>
                        increaseCount(
                          item?.productId,
                          item?.quantity,
                          item?.totalQuantity
                        )
                      }
                      aria-label="Increase quantity"
                    >
                      <PlusIcon />
                    </button>
                  </div>
                </td>
                <td className="aq-cart-action">
                  <button
                    type="button"
                    className="aq-cart-action-btn aq-tooltip aq-tooltip-top"
                    onClick={(event) => removeFromCart(event, item?.id)}
                    aria-label="Remove product"
                  >
                    <span className="aq-tooltip-item">Remove product</span>
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CartProducts;
