"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

import "./productCardStyle.css";

export const FeatureButtons = ({ type, btn1Func, btn2Func, isInWishlist }) => (
  <>
    <button
      className={`feature-product-btn-mbl ${
        isInWishlist ? "wishlist-active-mbl" : ""
      }`}
      onClick={(e) => {
        e.stopPropagation();
        btn1Func();
      }}
    >
      {type === "heart" ? (
        <FiHeart className="font-bold" />
      ) : (
        <RiDeleteBinLine className="font-bold" />
      )}
    </button>
    <button
      className="feature-product-btn"
      onClick={(e) => {
        e.stopPropagation();
        btn2Func();
      }}
    >
      <FiShoppingCart className="font-bold" />
    </button>
  </>
);

const ProductInfo = ({ title, price, oldPrice }) => (
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

const ProductCard = ({
  id,
  title,
  discount,
  price,
  oldPrice,
  isInWishlist,
  className,
  image,
  image1,
  type,
  btn1,
  btn2,
  onClick,
}) => {
  const router = useRouter();

  const navigateToProductDetail = (id) => {
    router.push(`/product-detail?id=${id}`);
  };

  return (
    <>
      <div
        className={`flex flex-col items-center relative lg:hidden cursor-pointer ${className}`}
        onClick={() => navigateToProductDetail(id)}
      >
        <div
          className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md z-10"
          style={{
            visibility: Math.round(discount) === 0 && "hidden",
          }}
        >
          {Math.round(discount)}% OFF
        </div>

        <Image
          src={image}
          alt={title}
          className="w-full h-60 object-cover rounded-2xl product-page-card-mobile"
          width={100}
          height={100}
        />
        <div className="flex items-center gap-2 absolute top-44">
          <FeatureButtons
            type={type}
            btn1Func={btn1}
            btn2Func={btn2}
            isInWishlist={isInWishlist}
          />
        </div>
        <div className="flex flex-col self-start">
          <h6
            className="text-black font-semibold mb-0 self-start mt-2"
            title={title}
          >
            {title?.length > 18 ? `${title.slice(0, 18)}...` : title}
          </h6>
          <div className="self-start">
            <span className="primary-color font-semibold">Rs. {price}</span>{" "}
            <br className="md:hidden" />
            {oldPrice && (
              <span className="text-muted text-decoration-line-through">
                Rs. {oldPrice}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div
        className="product-card group relative flex flex-col items-center hidden lg:block"
        onClick={() => navigateToProductDetail(id)}
      >
        {Math.round(discount) !== 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md z-10">
            {Math.round(discount)}% OFF
          </div>
        )}

        <div className="image-wrapper relative">
          <Image
            src={image}
            alt={title}
            className="product-img main"
            width={100}
            height={100}
          />
          <Image
            src={image1 || image}
            alt={title}
            className="product-img hover"
            width={100}
            height={100}
          />
        </div>
        <div className="icon-wrapper">
          <FeatureButtons
            type={type}
            btn1Func={btn1}
            btn2Func={btn2}
            isInWishlist={isInWishlist}
          />
        </div>
        <ProductInfo title={title} price={price} oldPrice={oldPrice} />
      </div>
    </>
  );
};

export default ProductCard;
