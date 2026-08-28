import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  }, [isOpen, checkoutData]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="aq-cod-overlay" onClick={() => setIsOpen(false)}>
      <div className="aq-cod-dialog" onClick={(event) => event.stopPropagation()}>
        <div className="aq-cod-dialog-head">
          <h3>
            {nonCodProducts?.length} item(s) not eligible for Pay on Delivery
          </h3>
          <button type="button" aria-label="Close" onClick={() => setIsOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M12.75 0.75L0.75 12.75M0.75 0.75L12.75 12.75"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        {nonCodProducts?.map((product) => (
          <div
            key={product?.product?.id}
            className="aq-cod-item"
            onClick={() => navigateToProductDetail(product?.product_id)}
          >
            <Image
              height={90}
              width={72}
              src={product?.product?.images[0]?.image}
              alt={product?.product?.title}
            />
            <div>
              <h4>{product?.product?.title}</h4>
              <p>Rs. {product?.product?.price}</p>
            </div>
          </div>
        ))}
        <div className="aq-cod-actions">
          <button type="button" className="aq-checkout-btn w-100" onClick={() => router.push("/cart")}>
            Go to Cart
          </button>
          <button
            type="button"
            className="aq-checkout-add-btn"
            onClick={() => setIsOpen(false)}
          >
            Continue Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodItemCard;
