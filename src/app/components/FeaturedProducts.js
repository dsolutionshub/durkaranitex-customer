"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Section from "./Section";
import ProductCard from "./ProductCard";
import ProductCardMobile from "./ProductCardMobile";

import useCartPanelStore from "@/store/useCartPanelStore";
import { loader } from "./loader/loaderManager";
import { modifyCart, modifyWishlist } from "../api/services/authService";
import { getErrorMessage } from "../utils/helperFn";
import { LOGIN_ERROR_MSG } from "../utils/constants";

import "swiper/css";
import "swiper/css/navigation";

const FeaturedCard = ({ products, fetchData }) => {
  const router = useRouter();
  const { handleGetCartDetail, wishlistDetails } = useCartPanelStore();

  const addToWishlist = async (id) => {
    loader(true);
    try {
      const data = await modifyWishlist({ product_id: id });
      fetchData();
      wishlistDetails();
      toast.success(data?.message);
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        sessionStorage.setItem("postLoginRedirect", "/");
        router.push("/login");
        toast.error(LOGIN_ERROR_MSG);
        return;
      }
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  const addToCart = async (id) => {
    loader(true);
    try {
      const data = await modifyCart({ product_id: id, quantity: 1 });
      toast.success(data?.message);
      handleGetCartDetail();
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        sessionStorage.setItem("postLoginRedirect", "/");
        router.push("/login");
        toast.error(LOGIN_ERROR_MSG);
        return;
      }
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  const navigateToProductDetail = (product_id) => {
    router.push(`/product-detail?id=${product_id}`);
  };

  return (
    <>
      <ProductCardMobile
        products={products}
        wishBtn={addToWishlist}
        cartBtn={addToCart}
        type={"heart"}
      />
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
          {products?.map((item, i) => (
            <SwiperSlide key={i} className="h-full">
              <ProductCard
                id={item?.id}
                type={"heart"}
                title={item.title}
                price={item.price}
                image={item.images?.[0]?.image}
                image1={item.images?.[1]?.image}
                discount={item?.discount || 0}
                isInWishlist={item?.wishList}
                btn1={() => addToWishlist(item?.id)}
                btn2={() => addToCart(item?.id)}
                onClick={() => navigateToProductDetail(item?.id)}
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

export default function FeaturedProducts({ products, fetchData }) {
  return (
    <div className="md:px-20 feature-product-card">
      <Section
        title={"Featured Products"}
        desc={"Our hand-picked selection of the finest sarees for any occasion"}
        section={<FeaturedCard products={products} fetchData={fetchData} />}
      />
    </div>
  );
}
