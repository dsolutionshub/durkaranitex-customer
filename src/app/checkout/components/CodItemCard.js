import Image from "next/image";
import { useRouter } from "next/navigation";
import { Sidebar } from "primereact/sidebar";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const CodItemCard = ({ isOpen, setIsOpen, checkoutData }) => {
  const router = useRouter();
  const [nonCodProducts, setNonCodProducts] = useState([]);

  const navigateToProductDetail = (product_id) => {
    router.push(`/product-detail?id=${product_id}`);
  };

  useEffect(() => {
    if (checkoutData?.products_list?.length > 0) {
      const nonCod = (checkoutData?.products_list || []).filter(
        (item) => item?.product?.is_cod_available === "0"
      );
      setNonCodProducts(nonCod);
    }
  }, [isOpen]);

  return (
    <Sidebar
      visible={isOpen}
      position="right"
      onHide={() => setIsOpen(false)}
      showCloseIcon={false}
      className="cart-sidebar"
    >
      <div className="bg-white h-full w-full max-w-md right-0 ">
        <div className="pt-4 flex items-center justify-between">
          <h4 className="dark-color d-none">Product</h4>
          <IoClose
            onClick={() => setIsOpen(false)}
            className="dark-color cursor-pointer"
          />
        </div>
        <p className="text-md text-black font-semibold">
          ⚠️ {nonCodProducts?.length} item(s) not eligible for Pay on Delivery
        </p>

        <div className="cart-sidepanel-container product-filter-scroll">
          {nonCodProducts?.map((product) => (
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
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="w-full bg-[var(--primary-main)] rounded py-2 text-white font-semibold"
          onClick={() => router.push("/cart")}
        >
          Go to Cart
        </button>
        <button
          className="w-full  rounded py-2 text-black border font-semibold mt-3"
          onClick={() => setIsOpen(false)}
        >
          Proceed to Checkout
        </button>
      </div>
    </Sidebar>
  );
};

export default CodItemCard;
