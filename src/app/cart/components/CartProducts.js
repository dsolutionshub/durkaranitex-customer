import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

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
        {products?.length > 0 ? (
          <>
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
                      className="d-flex gap-2 max-w-[80%] sm:max-w-[100%]"
                      onClick={() => navigateToProductDetail(item?.productId)}
                    >
                      <Image
                        src={item?.imgSrc}
                        alt={item.title}
                        height={80}
                        width={80}
                        className="h-[6rem] w-[5rem]"
                      />
                      <div className="leading-snug">
                        <p className="mb-0 text-black">
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
                    <p className="mb-0 text-black min-w-[5rem] text-end">
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
                  <div className="d-flex align-items-center justify-content-evenly bg-gray-100 w-[7rem] h-[2.5rem] border">
                    <button
                      disabled={item?.quantity === 1}
                      className="text-black fs-1"
                      onClick={() =>
                        decreaseCount(item?.productId, item?.quantity)
                      }
                    >
                      -
                    </button>
                    <p className="mb-0 text-black">{item?.quantity}</p>
                    <button
                      className="text-black"
                      onClick={() =>
                        increaseCount(item?.productId, item?.quantity)
                      }
                    >
                      +
                    </button>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="mb-5 text-center text-dark fs-5">
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
      </div>

      {/* Desktop */}
      <div className="d-none d-md-block row mb-5">
        {products?.length > 0 ? (
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
                    <Image
                      width={70}
                      height={50}
                      src={product?.imgSrc}
                      alt={product?.title}
                    />
                    <div
                      style={{
                        display: "flex",
                        marginLeft: "10px",
                        flexDirection: "column",
                      }}
                    >
                      <p style={{ marginBottom: "0" }}>{product?.title}</p>

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
                  <td className="py-4">Rs. {product?.price}</td>

                  <td className="p-4">
                    <div
                      className="d-flex align-items-center justify-content-evenly bg-gray-100 w-[7rem] h-[2.5rem] border"
                      style={{ margin: "auto" }}
                    >
                      <button
                        className="text-black fs-1"
                        disabled={product?.quantity === 1}
                        onClick={() =>
                          decreaseCount(product?.productId, product?.quantity)
                        }
                      >
                        -
                      </button>
                      <p className="mb-0 text-black">{product?.quantity}</p>
                      <button
                        className="text-black"
                        onClick={() =>
                          increaseCount(product?.productId, product?.quantity)
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
                  <td className="py-4">Rs. {product?.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mb-5 text-center text-dark fs-5">
            <ShoppingBag size={66} className="mx-auto text-gray-300 mb-3" />
            <span className="d-block fw-bold text-xl">Your Cart is empty</span>
            <br />
            <Link href="/shop" className="">
              <button className="bg-[var(--primary-main)] text-white py-2 px-3 rounded">
                Explore Sarees
              </button>
            </Link>
          </p>
        )}
      </div>
    </>
  );
};

export default CartProducts;
