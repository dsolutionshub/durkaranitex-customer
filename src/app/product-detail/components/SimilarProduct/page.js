"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Section from "@/app/components/Section";
import ProductCardMobile from "@/app/components/ProductCardMobile";
import ProductCard from "@/app/components/ProductCard";
import products from "./products.json";

import "swiper/css";
import "swiper/css/navigation";
import { modifyCart, modifyWishlist } from "@/app/api/services/authService";
import { loader } from "@/app/components/loader/loaderManager";
import { getErrorMessage } from "@/app/utils/helperFn";
import { LOGIN_ERROR_MSG } from "@/app/utils/constants";

const SimilarProducts = ({ products }) => {
  const router = useRouter();
  const [quantities, setQuantities] = useState({});

  const addToWishlist = async (id) => {
    loader(true);
    try {
      const data = await modifyWishlist({ product_id: id });
      toast.success(data?.message);
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        sessionStorage.setItem("postLoginRedirect", "/shop");
        router.push("/login");
        toast.error(LOGIN_ERROR_MSG);
      }
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  };

  const addToCart = async (id) => {
    const currentQty = quantities[id] || 0;
    const newQty = currentQty + 1;

    setQuantities((prev) => ({ ...prev, [id]: newQty }));
    loader(true);
    try {
      const data = await modifyCart({ product_id: id, quantity: newQty });
      toast.success(data?.message);
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        sessionStorage.setItem("postLoginRedirect", "/shop");
        router.push("/login");
        toast.error(LOGIN_ERROR_MSG);
      }
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  };

  return (
    <>
      <ProductCardMobile products={products} wishBtn={addToWishlist} cartBtn={addToCart} />

      <div className="relative d-none d-md-block">
        <button className="custom-prev custom-prev-home">
          {<FaChevronLeft />}
        </button>
        <button className="custom-next custom-next-home">
          {<FaChevronRight />}
        </button>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          spaceBetween={20}
          breakpoints={{
            480: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="product-card featured-swiper"
        >
          {products?.map((item, i) => (
            <SwiperSlide key={i} className="h-full">
              <ProductCard
                type={"heart"}
                title={item?.title}
                price={item?.price}
                oldPrice={item?.product_price}
                btn1={() => addToWishlist(item?.id)}
                btn2={() => addToCart(item?.id)}
                image={item?.images?.[0]?.image}
                image1={item?.images?.[1]?.image}
                discount={item?.discount}
                isInWishlist={item?.wishList}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="text-center mt-10">
          <button
            className="px-6 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition"
            onClick={() => router.push("/shop")}
          >
            View More
          </button>
        </div>
      </div>
    </>
  );
};

const SimilarProduct = ({ data }) => {
  return (
    <div className="md:px-20 feature-product-card">
      <Section title={"Similar Products"} section={<SimilarProducts products={data} />} />
    </div>
  );
};

export default SimilarProduct;
