"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Section from "@/app/components/Section";
import ProductCardMobile from "@/app/components/ProductCardMobile";
import ProductCard from "@/app/components/ProductCard";

import { getErrorMessage } from "@/app/utils/helperFn";
import { LOGIN_ERROR_MSG } from "@/app/utils/constants";
import { loader } from "@/app/components/loader/loaderManager";
import { modifyCart, modifyWishlist } from "@/app/api/services/authService";

import "swiper/css";
import "swiper/css/navigation";
import useCartPanelStore from "@/store/useCartPanelStore";

const SimilarProducts = ({ products, handleGetProductDetails }) => {
  const router = useRouter();
  const { handleGetCartDetail, wishlistDetails } = useCartPanelStore();

  const addToWishlist = async (id) => {
    loader(true);
    try {
      const data = await modifyWishlist({ product_id: id });
      handleGetProductDetails();
      wishlistDetails();
      toast.success(data?.message);
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        sessionStorage.setItem("postLoginRedirect", "/shop");
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
      handleGetCartDetail();
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
          modules={[Navigation, Pagination]}
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
            onClick={() =>
              router.push(`/shop?id=${products?.[0]?.category_id}`)
            }
          >
            View More
          </button>
        </div>
      </div>
    </>
  );
};

const SimilarProduct = ({ data, handleGetProductDetails }) => {
  return (
    <div className="md:px-20 feature-product-card">
      <Section
        title={"Similar Products"}
        section={
          <SimilarProducts
            products={data}
            handleGetProductDetails={handleGetProductDetails}
          />
        }
      />
    </div>
  );
};

export default SimilarProduct;
