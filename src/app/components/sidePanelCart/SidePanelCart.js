import { useRouter } from "next/navigation";
import Image from "next/image";
import { Sidebar } from "primereact/sidebar";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { ShoppingCart } from "lucide-react";

import useCartPanelStore from "@/store/useCartPanelStore";
import { loader } from "../loader/loaderManager";
import { getErrorMessage } from "@/app/utils/helperFn";
import {
  deleteQuantity,
  handleCheckout,
  modifyCart,
  removeCart,
  updateQuantity,
} from "@/app/api/services/authService";

import "./style.css";
import { LOGIN_ERROR_MSG } from "@/app/utils/constants";

function RenderQuantity({
  decreaseCount,
  increaseCount,
  removeFromCart,
  product,
}) {
  return (
    <div className={`flex items-center mt-2 gap-3`}>
      <div
        className={`flex items-center border rounded dark-color  ${
          parseFloat(product?.product?.quantity) <= 0
            ? "opacity-40 md:opacity-70 pointer-events-none"
            : ""
        }`}
      >
        <button
          disabled={product?.quantity === 1}
          onClick={(e) =>
            decreaseCount(e, product?.product_id, product?.quantity)
          }
          className="px-2 py-1 text-sm"
        >
          −
        </button>
        <span className="px-4">{product?.quantity || 0}</span>
        <button
          onClick={(e) =>
            increaseCount(
              e,
              product?.product_id,
              product?.quantity,
              product?.product?.quantity
            )
          }
          className="px-2 py-1 text-sm"
        >
          +
        </button>
      </div>

      <button
        className="ml-4 text-sm underline text-gray-600 hover:text-red-600"
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

  function handleNavigate(page) {
    router.push(page);
    setCartOpen(false);
  }

  const increaseCount = async (e, id, currentQuantity, totalQuantities) => {
    e.stopPropagation();
    if (currentQuantity >= totalQuantities) {
      toast.error("You've reached the maximum quantity allowed.");
      return;
    }
    loader(true);
    try {
      // await updateQuantity({ product_id: id, quantity: currentQuantity + 1 });
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
      // await deleteQuantity({ product_id: id, quantity: currentQuantity - 1 });
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

  return (
    <Sidebar
      visible={isCartOpen}
      position="right"
      onHide={() => setCartOpen(false)}
      showCloseIcon={false}
      className="cart-sidebar"
    >
      <div className="bg-white h-full w-full max-w-md right-0 ">
        <div className="pt-4 flex items-center justify-between">
          <h4 className="dark-color">Shopping Cart ({cartProducts?.length})</h4>
          <IoClose
            onClick={() => setCartOpen(false)}
            className="dark-color cursor-pointer"
          />
        </div>

        <div className="flex-grow overflow-y-auto mt-2">
          {cartProducts?.length > 0 ? (
            <>
              <div className="cart-sidepanel-container product-filter-scroll">
                {cartProducts.map((product) => (
                  <div
                    key={product?.product?.id}
                    className="mb-4"
                    onClick={() => navigateToProductDetail(product?.product_id)}
                  >
                    <div className="flex gap-3 md:gap-4 items-start cursor-pointer">
                      <div className="relative">
                        <Image
                          height={150}
                          width={150}
                          src={product?.product?.images[0]?.image}
                          alt={product?.product?.title}
                          className={`h-24 w-24 md:w-30 md:h-30 object-cover rounded-md ${
                            parseFloat(product?.product?.quantity) <= 0
                              ? "opacity-40"
                              : ""
                          }`}
                        />

                        {parseFloat(product?.product?.quantity) <= 0 && (
                          <div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white 
    text-xs font-semibold px-2 py-1 rounded shadow-md z-10 whitespace-nowrap pointer-events-none"
                          >
                            Out of Stock
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div
                          className={`${
                            parseFloat(product?.product?.quantity) <= 0
                              ? "opacity-40"
                              : ""
                          }`}
                        >
                          <h6
                            className="text-xlg dark-color mb-1 product-title"
                            title={product?.product?.title}
                          >
                            {product?.product?.title}
                          </h6>

                          <p className="text-md primary-color mb-1 fw-bold">
                            Rs. {product?.product?.price}
                            <br />
                            <span className="text-gray-500 line-through fw-normal">
                              Rs. {product?.product?.product_price}
                            </span>
                          </p>
                        </div>

                        <div className="d-none d-md-block">
                          <RenderQuantity
                            increaseCount={increaseCount}
                            decreaseCount={decreaseCount}
                            removeFromCart={removeFromCart}
                            product={product}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-md-none">
                      <RenderQuantity
                        increaseCount={increaseCount}
                        decreaseCount={decreaseCount}
                        removeFromCart={removeFromCart}
                        product={product}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2 total-cost-card">
                <div className="flex justify-between dark-color mb-4">
                  <span>Subtotal</span>
                  <span>Rs. {cartTotalAmount}</span>
                </div>
                <button
                  className="w-full  primary-border py-2 font-semibold mb-2 primary-color"
                  onClick={() => handleNavigate("/cart")}
                >
                  VIEW CART
                </button>
                <button
                  className="w-full primary-bg text-white py-2 rounded-full font-semibold"
                  onClick={handleNavigateToCheckout}
                >
                  CHECK OUT
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-full px-4">
              <ShoppingCart size={66} className="text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold mb-2 dark-color">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-4 dark-color">
                Add some beautiful sarees to get started!
              </p>
              <button
                onClick={() => {
                  setCartOpen(false);
                  router.push("/shop");
                }}
                className="bg-[var(--primary-main)] text-white py-2 px-4 rounded"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </Sidebar>
  );
};

export default SidePanelCart;
