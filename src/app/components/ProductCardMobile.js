import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SwiperSlide, Swiper } from "swiper/react";
import { FeatureButtons } from "./ProductCard";
import useCartPanelStore from "@/store/useCartPanelStore";

import "swiper/css";
import "swiper/css/navigation";

const ProductCardMobile = ({ products, wishBtn, cartBtn }) => {
  const router = useRouter();
  const { handleGetCartDetail } = useCartPanelStore();

  const navigateToProductDetail = (id) => {
    router.push(`/product-detail?id=${id}`);
  };

  const handleOpenCart = (id) => {
    handleGetCartDetail();
    cartBtn(id)
  };

  return (
    <div className="d-block d-md-none  mb-4">
      <div className="relative">
        <Swiper
          spaceBetween={13}
          slidesPerView={2}
          style={{
            minHeight: "20rem",
          }}
        >
          {products?.map((item, i) => (
            <SwiperSlide key={i} className="">
              <div
                className="flex flex-col items-center relative lg:hidden"
                onClick={()=>navigateToProductDetail(item?.id)}
              >
                {Math.round(item?.discount) !== 0 && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md z-10">
                    {Math.round(item?.discount)}% OFF
                  </div>
                )}

                <Image
                  src={item?.images?.[0]?.image || item?.images?.[1]?.image}
                  alt={item?.title}
                  className="w-full h-60 object-cover rounded-2xl"
                  width={100}
                  height={100}
                />

                <div className="flex items-center gap-2 absolute top-44">
                  <FeatureButtons
                    type={"heart"}
                    btn1Func={() => wishBtn(item?.id)}
                    btn2Func={() => handleOpenCart(item?.id)}
                  />
                </div>

                <div className="py-3 flex flex-col self-start">
                  <h6
                    className="text-black font-semibold mb-0 self-start"
                    title={item?.title}
                  >
                  {item?.title?.length > 18 ? `${item?.title.slice(0, 18)}...` : item?.title}
                  </h6>
                  <div className="self-start">
                    <span className="primary-color font-semibold">
                      Rs. {item?.price}
                    </span>{" "}
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
            className="px-6 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition"
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
