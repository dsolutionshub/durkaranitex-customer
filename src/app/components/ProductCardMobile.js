import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

import "swiper/css";
import "swiper/css/navigation";
import "./productCardStyle.css";

const ProductCardMobile = ({ type, products, wishBtn, cartBtn }) => {
  const router = useRouter();

  const navigateToProductDetail = (id) => {
    router.push(`/product-detail?id=${id}`);
  };

  const handleOpenCart = (id) => {
    cartBtn(id);
  };

  return (
    <div className="d-block d-md-none  mb-4">
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={13}
          slidesPerView={2}
          style={{
            minHeight: "20rem",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            480: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {products
            ?.filter(item => item?.is_published === "1")
            ?.map((item, i) => (
              <SwiperSlide key={i} className="">
                <div
                  className="flex flex-col items-center relative lg:hidden"
                  onClick={() => navigateToProductDetail(item?.id)}
                >
                  {Math.round(item?.discount) !== 0 && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md z-10">
                      {Math.round(item?.discount)}% OFF
                    </div>
                  )}

                  {parseFloat(item?.quantity) <= 0 && (
                    <div className="absolute bg-opacity-60 h-56 inset-0 flex items-center justify-center rounded bottom-16">
                      <div className="text-white text-sm font-semibold bg-red-600 px-3 py-1 z-30 rounded shadow-md">
                        Out of Stock
                      </div>
                    </div>
                  )}

                  <Image
                    src={item?.images?.[0]?.image || item?.images?.[1]?.image}
                    alt={item?.title}
                    className={`w-full h-60 object-cover rounded-2xl ${parseFloat(item?.quantity) <= 0 ? 'opacity-80' : ''}`}
                    width={100}
                    height={100}
                  />

                  <div className="flex items-center gap-2 absolute top-44">
                    <button
                      className={`feature-product-btn-mbl ${item?.wishList ? "wishlist-active-mbl" : ""
                        }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        wishBtn(item?.id);
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
                        handleOpenCart(item?.id);
                      }}
                    >
                      <FiShoppingCart className="font-bold" />
                    </button>
                  </div>

                  <div className="py-3 flex flex-col self-start">
                    <h6
                      className="text-black font-semibold mb-0 self-start"
                      title={item?.title}
                    >
                      {item?.title?.length > 16
                        ? `${item?.title.slice(0, 16)}...`
                        : item?.title}
                    </h6>
                    <div className="self-start">
                      <span className="primary-color font-semibold">
                        Rs. {item?.price}
                      </span>
                      <br className="md:hidden" />
                      {item?.product_price && (
                        <span className="text-muted text-decoration-line-through">
                          Rs. {item?.product_price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

        </Swiper>

        <div className="text-center">
          <button
            className="px-6 py-2 bg-[var(--primary-main)] text-white rounded-md hover:bg-[var(--primary-dark)] transition"
            onClick={() => router.push("/shop")}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardMobile;
