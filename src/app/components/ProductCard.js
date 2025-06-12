import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import "./productCardStyle.css";
import { RiDeleteBinLine } from "react-icons/ri";

const FeatureButtons = ({ type, btn1_func, btn2_func }) => (
  <>
    <button
      className="feature-product-btn"
      onClick={(e) => {
        e.stopPropagation();
        btn1_func();       
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
        btn2_func();      
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
      <span className="text-primary fw-bold">Rs. {price}</span>{" "}
      {oldPrice && (
        <span className="text-muted text-decoration-line-through">
          Rs. {oldPrice}
        </span>
      )}
    </div>
  </div>
);

const ProductCard = ({ title, price, oldPrice, image, subImage , type, btn1, btn2}) => {
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
          className="w-full h-80 object-cover  rounded-2xl"
          width={100}
          height={100}
        />
        <div className="flex items-center gap-2 absolute top-64">
          <FeatureButtons type={type} btn1_func={btn1} btn2_func={btn2}/>
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
          <FeatureButtons type={type} btn1_func={btn1} btn2_func={btn2}/>
        </div>
        <ProductInfo title={title} price={price} oldPrice={oldPrice} />
      </div>
    </>
  );
};

export default ProductCard;
