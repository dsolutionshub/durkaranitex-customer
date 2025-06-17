"use client";

import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Section from "./Section";
import ProductCard from "./ProductCard";
import ProductCardMobile from "./ProductCardMobile";

import "swiper/css";
import "swiper/css/navigation";

const products = [
  {
    id: 1,
    title: "Embossed Silk Set",
    imgsrc: "/images/combo_1.jpeg",
    subImage: "/images/combo_2.jpeg",
    description: "Finding perfect t-shirt",
    price: "1300.00",
  },
  {
    id: 2,
    title: "Semi Slik Combo Set",
    imgsrc: "/images/combo_2.jpeg",
    subImage: "/images/combo_1.jpeg",
    description: "Finding perfect products",
    price: "1500.00",
  },
  {
    id: 3,
    title: "Cotton blended combos",
    imgsrc: "/images/combo_9.jpeg",
    subImage: "/images/combo_2.jpeg",
    description: "Finding perfect products",
    price: "1000.00",
  },
  {
    id: 4,
    title: "Silk elegance couple set",
    imgsrc: "/images/combo_4.jpeg",
    subImage: "/images/combo_5.jpeg",
    description: "Finding perfect products",
    price: "1100.00",
  },
  {
    id: 5,
    title: "Soft cotton combo collections",
    imgsrc: "/images/combo_5.jpeg",
    subImage: "/images/combo_4.jpeg",
    description: "Finding perfect products",
    price: "2000.00",
  },
  {
    id: 6,
    title: "Classic semi silk combo",
    imgsrc: "/images/combo_7.jpeg",
    subImage: "/images/combo_2.jpeg",
    description: "Finding perfect products",
    price: "1800.00",
  },
];

const FeaturedCard = () => {
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
          modules={[Autoplay, Navigation, Pagination]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
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
          {products.map((item, i) => (
            <SwiperSlide key={i} className="h-full">
              <ProductCard
                title={item.title}
                price={item.price}
                image={item.imgsrc}
                subImage={item.subImage}
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

export default function FeaturedProducts({collection}) {
  return (
    <div className="md:px-20 feature-product-card">
      <Section
        title={"Featured Products"}
        desc={"Our hand-picked selection of the finest sarees for any occasion"}
        section={<FeaturedCard data={collection}/>}
      />
    </div>
  );
}
