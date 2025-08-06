"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import ShareProductBox from "../ShareProductBox/page";
import useCartPanelStore from "@/store/useCartPanelStore";
import {
  buyNow,
  modifyCart,
  modifyWishlist,
} from "@/app/api/services/authService";
import { getErrorMessage } from "@/app/utils/helperFn";
import { loader } from "@/app/components/loader/loaderManager";
import { LOGIN_ERROR_MSG } from "@/app/utils/constants";

import "../../style.css";

export default function ProductAccordion({
  sections,
  openIndex,
  toggleAccordion,
  quantity,
  handleGetProductDetails,
  decreaseCount,
  increaseCount,
}) {
  const router = useRouter();
  const { handleGetCartDetail, wishlistDetails, isCartOpen } =
    useCartPanelStore();
  const [showButtons, setShowButtons] = useState(true);
  const [description, setDescription] = useState([]);

  async function handleLike() {
    loader(true);
    try {
      const data = await modifyWishlist({ product_id: sections?.id });
      wishlistDetails();
      toast.success(data?.message);
      handleGetProductDetails();
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        sessionStorage.setItem("postLoginRedirect", "/wishlist");
        router.push("/login");
        toast.error(LOGIN_ERROR_MSG);
        return;
      }
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  }

  const des = [
    {
      title: "Product Description",
      content: `
      <div style='border-top: 1px solid #ddd; padding-top: 10px; font-size: 14px; color: #01279;'>
        ${description
          ?.map(
            (item) =>
              `<p><strong>${item?.title || ""}</strong> ${
                item?.description || ""
              }</p>`
          )
          .join("")}
          <p><strong>Disclaimer: </strong> Product color may slightly vary due to photographic lighting sources or your monitor settings</p>
      </div>`,
    },
    {
      title: "Replacements & Exchanges",
      content: `
      <p>Replacement & Exchange within 1 Day of Delivery for Damaged Products Only.</p>
      <p>(Saree must be in original condition with all tags and labels attached. No signs of wear or alteration will be accepted.)</p>
      <p>Please refer to our Replacement Policy for more details.</p>
    `,
    },
  ];

  const addToCart = async () => {
    loader(true);
    try {
      await modifyCart({
        product_id: sections?.id,
        quantity: quantity,
        type: "list",
      });
      handleGetCartDetail();
      handleGetProductDetails();
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        sessionStorage.setItem(
          "postLoginRedirect",
          `product-detail?id=${sections?.id}`
        );
        router.push("/login");
        toast.error("Please log in to add this product to your cart.");
        return;
      }
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  const handleByeNow = async () => {
    loader(true);
    try {
      const data = await buyNow({
        product_id: sections?.id,
        quantity: quantity,
      });
      if (data.status == "success") {
        router.push("/checkout");
      }
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        sessionStorage.setItem(
          "postLoginRedirect",
          `product-detail?id=${sections?.id}`
        );
        router.push("/login");
        toast.error("Please log in to purchase this product.");
        return;
      }
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  useEffect(() => {
    setDescription(sections?.description || []);
  }, [sections]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledPast100vh = window.scrollY > window.innerHeight *2;
      setShowButtons(!scrolledPast100vh);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-black">{sections?.title}</h2>
      <div className="flex justify-between items-center">
        <div className="text-lg primary-color font-semibold mt-2">
          Rs. {sections?.price}{" "}
          <span className="text-gray-500 line-through text-sm">
            Rs. {sections?.product_price}
          </span>
        </div>
        <div className="flex gap-3 items-center">
          <button onClick={handleLike} className="fs-5">
            {sections?.wishList ? (
              <FaHeart className="primary-color" />
            ) : (
              <FaRegHeart className="primary-color" />
            )}
          </button>

          <ShareProductBox />
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: "600px" }}>
        {des?.map((section, index) => {
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
      {sections?.quantity && parseInt(sections.quantity) <= 10 && (
        <div className="mt-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-full w-fit">
            <span>Only {parseInt(sections.quantity)} left in stock!</span>
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-col lg:flex-row items-center md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full">
        <div className="mb-4 self-start md:self-center">
          <p className="product-detail-quantity-label">Quantity:</p>
          <div className="d-flex align-items-center	justify-content-evenly bg-gray-100 w-[9rem] h-[2.5rem] border">
            <button
              className="text-black "
              disabled={quantity === 1}
              onClick={decreaseCount}
            >
              <FaMinus />
            </button>
            <p
              className="mb-0 text-black px-2"
              style={{
                fontSize: "1.2rem",
                fontWeight: "500",
              }}
            >
              {quantity || 1}
            </p>
            <button
              className="text-black"
              onClick={() => increaseCount(quantity)}
            >
              <FaPlus />
            </button>
          </div>
        </div>

        <div
          className={`flex flex-col md:flex-row items-center justify-center space-y-3
        md:space-y-0 md:space-x-3 gap-3 product-detail-cart-btn
        ${
          showButtons
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
        `}
        >
          <button
            className="bg-black text-white px-6 py-2 rounded text-sm w-full md:w-auto font-bold"
            onClick={addToCart}
          >
            Add To Cart
          </button>
          <button
            className="bg-green-800 text-white px-6 py-2 rounded text-sm w-full md:w-auto font-bold"
            onClick={handleByeNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
