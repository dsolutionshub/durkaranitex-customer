import { FaMinus, FaPlus } from "react-icons/fa6";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";

import "../../style.css";
import { useState } from "react";
import ShareProductBox from "../ShareProductBox/page";

export default function ProductAccordion({
  sections,
  openIndex,
  toggleAccordion,
  handleDecrease,
  handleIncrease,
  quantity,
}) {
  const [isLiked, setIsLiked] = useState(false);

  function handleLike() {
    setIsLiked((prev) => !prev);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-black">
        {sections?.title}
      </h2>
      <div className="flex justify-between items-center">
        <div className="text-lg primary-color font-semibold mt-2">
          Rs. 1,250.00{" "}
          <span className="text-gray-500 line-through text-sm">
            Rs. 2,048.00
          </span>
        </div>
        <div className="flex gap-3 items-center">
          <button onClick={handleLike} className="fs-5">
            {isLiked ? (
              <FaHeart className="primary-color" />
            ) : (
              <FaRegHeart className="primary-color" />
            )}
          </button>

          <ShareProductBox />
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: "600px" }}>
        {sections?.map((section, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              style={{
                borderBottom: "1px solid #ddd",
                padding: ".6rem 0",
              }}
            >
              <button
                className="product-accordion-button"
                onClick={() => toggleAccordion(index)}
              >
                {section.title}
                <span style={{ fontSize: "18px" }}>{isOpen ? "➖" : "➕"}</span>
              </button>

              <div
                className={`product-accordion-content ${
                  isOpen ? "open" : "closed"
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-col lg:flex-row items-center md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full">
        <div className="mb-4">
          <p className="product-detail-quantity-label">Quantity:</p>
          <div className="d-flex align-items-center	justify-content-evenly bg-gray-100 w-[9rem] h-[2.5rem] border">
            <button className="text-black " onClick={handleDecrease}>
              <FaMinus />
            </button>
            <p
              className="mb-0 text-black px-2"
              style={{
                fontSize: "1.2rem",
                fontWeight: "500",
              }}
            >
              {quantity}
            </p>
            <button className="text-black" onClick={handleIncrease}>
              <FaPlus />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-3 gap-3 product-detail-cart-btn">
          <button className="bg-black text-white px-6 py-2 rounded text-sm w-full md:w-auto font-bold">
            Add To Cart
          </button>
          <button className="bg-green-800 text-white px-6 py-2 rounded text-sm w-full md:w-auto font-bold">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
