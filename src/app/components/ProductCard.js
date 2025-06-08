import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import "./productCardStyle.css";

export const ProductInfo = ({ title, price, oldPrice }) => (
  <div className="py-3 flex flex-col self-start">
    <h5 className="text-black font-semibold mb-0 self-start">{title}</h5>
    <div className="self-start">
      <span className="primary-color fw-bold">Rs. {price}</span>{" "}
      {oldPrice && (
        <span className="text-muted text-decoration-line-through">
          Rs. {oldPrice}
        </span>
      )}
    </div>
  </div>
);

export const FeatureButtons = () => (
  <>
    <button
      className="feature-product-btn"
      onClick={(e) => e.stopPropagation()}
    >
      <FiHeart className="font-bold" />
    </button>
    <button
      className="feature-product-btn"
      onClick={(e) => e.stopPropagation()}
    >
      <FiShoppingCart className="font-bold" />
    </button>
  </>
);

const ProductCard = ({ title, price, oldPrice, image, subImage }) => {
  const rounter = useRouter();

  const navigateToProductDetail = () => {
    rounter.push("/product-detail");
  };

  return (
    <>
      {/* Mobile View */}
      <div
        className="flex flex-col items-center relative lg:hidden"
        onClick={navigateToProductDetail}
      >
        <Image
          src={image}
          alt={title}
          className="w-full h-80 object-cover rounded-2xl"
          width={100}
          height={100}
        />
        <div className="flex items-center gap-2 absolute top-64">
          <FeatureButtons />
        </div>
        <ProductInfo title={title} price={price} oldPrice={oldPrice} />
      </div>

      {/* Desktop View */}
      <div
        className="product-card group relative flex flex-col items-center hidden lg:block"
        onClick={navigateToProductDetail}
      >
        <div className="image-wrapper">
          <Image
            src={image}
            alt={title}
            className="product-img main"
            width={100}
            height={100}
          />
          <Image
            src={subImage || image}
            alt={title}
            className="product-img hover"
            width={100}
            height={100}
          />
        </div>
        <div className="icon-wrapper">
          <FeatureButtons />
        </div>
        <ProductInfo title={title} price={price} oldPrice={oldPrice} />
      </div>
    </>
  );
};

export default ProductCard;
