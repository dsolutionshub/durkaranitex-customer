import { useRouter } from "next/navigation";
import Image from "next/image";
import { Sidebar } from "primereact/sidebar";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import useCartPanelStore from "@/store/useCartPanelStore";
import "./style.css";
import { ShoppingCart,

} from "lucide-react";
function RenderQuantity({
  decrementQty,
  incrementQty,
  removeFromCart,
  product,
}) {
  return (
    <div className="flex items-center mt-2 gap-3">
      <div className="flex items-center border rounded dark-color">
        <button
          onClick={() => decrementQty(product.id)}
          className="px-2 py-1 text-sm"
        >
          −
        </button>
        <span className="px-4">{product.quantity || 0}</span>
        <button
          onClick={() => incrementQty(product.id)}
          className="px-2 py-1 text-sm"
        >
          +
        </button>
      </div>

      <button
        className="ml-4 text-sm underline text-gray-600 hover:text-red-600"
        onClick={() => removeFromCart(product.id)}
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
    incrementQty,
    decrementQty,
    removeFromCart,
  } = useCartPanelStore();
  const subtotal = cartProducts.reduce(
    (acc, item) => acc + parseFloat(item.price) * (item.quantity || 0),
    0
  );

  function handleNavigate(page) {
    router.push(page);
    setCartOpen(false);
  }

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
              <div className="cart-sidepanel-container">
                {cartProducts.map((product) => (
                  <div key={product?.id} className="mb-4 ">
                    <div className="flex gap-3 md:gap-4 items-start">
                      <Image
                        height={150}
                        width={150}
                        src={product?.imgsrc}
                        alt={product?.title}
                        className="h-24 w-24 md:w-30 md:h-30 object-cover rounded-md"
                      />
                      <div className="flex-1 ">
                        <h6
                          className="text-xlg dark-color mb-1  product-title"
                          title={product.title}
                        >
                          {product.title}
                        </h6>

                        <p className=" text-md dark-color mb-1">
                          <span className="text-gray-500 line-through">
                            Rs. {product.oldPrice || 100000.0}
                          </span>{" "}
                          <br /> Rs. {product.price}
                        </p>
                        <div className="d-none d-md-block">
                          <RenderQuantity
                            incrementQty={incrementQty}
                            decrementQty={decrementQty}
                            removeFromCart={removeFromCart}
                            product={product}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-md-none">
                      <RenderQuantity
                        incrementQty={incrementQty}
                        decrementQty={decrementQty}
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
                  <span>Rs. {subtotal.toFixed(2)}</span>
                </div>
                <button
                  className="w-full  primary-border py-2 font-semibold mb-2 primary-color"
                  onClick={() => handleNavigate("/cart")}
                >
                  VIEW CART
                </button>
                <button
                  className="w-full primary-bg text-white py-2 rounded-full font-semibold"
                  onClick={() => handleNavigate("/checkout")}
                >
                  CHECK OUT
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-full px-4">
  <ShoppingCart size={66} className="text-gray-300 mb-4" />
  <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
  <p className="text-gray-600 mb-4">Add some beautiful sarees to get started!</p>
  <button
    onClick={() => {
      setCartOpen(false);
      router.push("/shop");
    }}
    className="bg-green-800 text-white py-2 px-4 rounded"
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
