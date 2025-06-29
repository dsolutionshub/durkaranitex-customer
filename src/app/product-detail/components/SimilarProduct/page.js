"use client";
import React from "react";
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

const SimilarProducts = () => {
  const router = useRouter();
  return (
    <>
      <ProductCardMobile products={products} />

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
                image={item?.imgsrc}
                image1={item?.imgsrc}
                subImage={item?.subImage}
                discount={item?.discount || 0}
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

const SimilarProduct = () => {
  return (
    <div className="md:px-20 feature-product-card">
      <Section title={"Similar Products"} section={<SimilarProducts />} />
    </div>
  );
};

export default SimilarProduct;
