import { useRouter } from "next/navigation";
import Image from "next/image";

const CartProducts = ({
  products,
  decreaseCount,
  increaseCount,
  removeFromCart,
}) => {
  const router = useRouter();
  const navigateToProductDetail = (product_id) => {
    router.push(`/product-detail?id=${product_id}`);
  };

  return (
    <>
      {/* Mobile */}
      <div className="d-block d-md-none w-100 px-2 mb-4">
        <div className="text-black d-flex justify-content-between">
          <p className="mb-0">Product</p>
          <p className="mb-0">Price</p>
        </div>
        <hr className="m-0 pb-2" />
        <div className="max-h-[60vh] overflow-y-auto">
          {products?.map((item) => (
            <div key={item.id}>
              <div className="d-flex justify-content-between align-items-start my-3">
                <div
                  className="d-flex gap-2 max-w-[80%] sm:max-w-[100%] relative "
                  onClick={() => navigateToProductDetail(item?.productId)}
                >
                  <div className="relative w-[5rem] h-[6rem] flex-shrink-0">
                    <Image
                      src={item?.imgSrc}
                      alt={item.title}
                      height={80}
                      width={80}
                      className={`w-full h-full object-cover ${
                        parseFloat(item?.totalQuantity) <= 0
                          ? "opacity-40 md:opacity-70 pointer-events-none"
                          : ""
                      }`}
                    />
                    {parseFloat(item?.totalQuantity) <= 0 && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-[.7rem] font-semibold px-2 py-1 rounded shadow-md z-10 whitespace-nowrap pointer-events-none">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  <div className="leading-snug">
                    <p
                      className={`mb-0 text-black ${
                        parseFloat(item?.totalQuantity) <= 0
                          ? "opacity-40 md:opacity-70 pointer-events-none"
                          : ""
                      }`}
                    >
                      {item.title.length > 35
                        ? `${item.title.slice(0, 35)}...`
                        : item?.title}
                    </p>

                    <button
                      className="text-gray-500 underline p-0 m-0"
                      onClick={(e) => removeFromCart(e, item?.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <p
                  className={`mb-0 text-black min-w-[5rem] text-end ${
                    parseFloat(item?.totalQuantity) <= 0 ? "opacity-40" : ""
                  }`}
                >
                  Rs. {item?.price}
                </p>
                <div className=" d-none">
                  <p className="mb-0 text-black">
                    Rs. {item?.price} * {item?.quantity}
                  </p>
                  <br />
                  <p className="mb-0 text-black">Rs. {item?.price}</p>
                </div>
              </div>

              {/* Quantity Buttons */}
              <div
                className={`d-flex align-items-center justify-content-evenly  w-[7rem] h-[2.5rem] border ${
                  parseFloat(item?.totalQuantity) <= 0
                    ? "bg-gray-50 pointer-events-none text-gray-400"
                    : "bg-gray-200 text-black"
                }`}
              >
                <button
                  disabled={
                    item?.quantity === 1 || parseFloat(item?.totalQuantity) <= 0
                  }
                  className="fs-1"
                  onClick={() => decreaseCount(item?.productId, item?.quantity)}
                >
                  -
                </button>
                <p className="mb-0 k">{item?.quantity}</p>
                <button
                  className=""
                  // disabled={parseInt(item?.totalQuantity) <= item?.quantity}
                  onClick={() =>
                    increaseCount(
                      item?.productId,
                      item?.quantity,
                      item?.totalQuantity
                    )
                  }
                >
                  +
                </button>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop */}
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
                key={product?.id}
                style={{
                  textAlign: "center",
                  verticalAlign: "middle",
                  alignContent: "center",
                }}
              >
                <td
                  style={{ display: "flex", cursor: "pointer" }}
                  onClick={() => navigateToProductDetail(product?.productId)}
                >
                  <div className="relative w-[5rem] h-[6rem] flex-shrink-0">
                    <Image
                      src={product?.imgSrc}
                      alt={product.title}
                      height={80}
                      width={80}
                      className={`w-full h-full object-cover ${
                        parseFloat(product?.totalQuantity) <= 0
                          ? "opacity-40"
                          : ""
                      }`}
                    />
                    {parseFloat(product?.totalQuantity) <= 0 && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-[.7rem] font-semibold px-2 py-1 rounded shadow-md z-10 whitespace-nowrap pointer-events-none">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginLeft: "10px",
                      flexDirection: "column",
                    }}
                  >
                    <p
                      style={{ marginBottom: "0" }}
                      className={`${
                        parseFloat(product?.totalQuantity) <= 0
                          ? "opacity-40"
                          : ""
                      }`}
                    >
                      {product?.title}
                    </p>
                    <span
                      onClick={(e) => removeFromCart(e, product?.id)}
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
                <td
                  className={`py-4 ${
                    parseFloat(product?.totalQuantity) <= 0 ? "opacity-40" : ""
                  }`}
                >
                  Rs. {product?.price}
                </td>

                <td className="p-4">
                  <div
                    className={`d-flex align-items-center justify-content-evenly bg-gray-100 w-[7rem] h-[2.5rem] border
                      ${
                        parseFloat(product?.totalQuantity) <= 0
                          ? "opacity-40 pointer-events-none"
                          : "text-black "
                      }
                      `}
                    style={{ margin: "auto" }}
                  >
                    <button
                      className="fs-1"
                      disabled={product?.quantity === 1}
                      onClick={() =>
                        decreaseCount(product?.productId, product?.quantity)
                      }
                    >
                      -
                    </button>
                    <p className="mb-0 ">{product?.quantity}</p>
                    <button
                      className=""
                      // disabled={parseInt(product?.totalQuantity) <= product?.quantity}
                      onClick={() =>
                        increaseCount(
                          product?.productId,
                          product?.quantity,
                          product?.totalQuantity
                        )
                      }
                      style={{
                        fontWeight: "600",
                        fontSize: "1.2rem",
                      }}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td
                  className={`py-4 ${
                    parseFloat(product?.totalQuantity) <= 0
                      ? "opacity-40 pointer-events-none"
                      : "text-black"
                  }`}
                >
                  Rs. {product?.total}
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
