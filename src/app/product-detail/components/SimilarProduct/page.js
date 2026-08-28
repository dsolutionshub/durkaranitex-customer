"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import BazaroProductCard from "@/app/shop/components/BazaroProductCard";
import { getErrorMessage } from "@/app/utils/helperFn";
import { LOGIN_ERROR_MSG } from "@/app/utils/constants";
import { loader } from "@/app/components/loader/loaderManager";
import { modifyCart, modifyWishlist } from "@/app/api/services/authService";
import useCartPanelStore from "@/store/useCartPanelStore";

import "swiper/css";

const SimilarProducts = ({ products, handleGetProductDetails, productId }) => {
  const router = useRouter();
  const { handleGetCartDetail, wishlistDetails } = useCartPanelStore();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const published = (products || []).filter((item) => item?.is_published === "1");
  const redirectTo = productId
    ? `/product-detail?id=${productId}`
    : "/shop";

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
        sessionStorage.setItem("postLoginRedirect", redirectTo);
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
      await modifyCart({
        product_id: id,
        quantity: 1,
        type: "list",
      });
      toast.success("Added to cart");
      handleGetCartDetail();
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        sessionStorage.setItem("postLoginRedirect", redirectTo);
        router.push("/login");
        toast.error(LOGIN_ERROR_MSG);
        return;
      }
      const MSG = getErrorMessage(error);
      if (MSG.startsWith("Only")) {
        toast.error(`Max quantity reached. ${MSG}`);
      } else {
        toast.error(MSG);
      }
    } finally {
      loader(false);
    }
  };

  if (!published.length) {
    return null;
  }

  return (
    <div className="aqf-seller-area aq-pd-related pb-40 fix">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="aqf-seller-title-box text-center mb-50">
              <h4 className="aq-section-title fs-38 ff-satoshi-med mb-15">
                Related Product
              </h4>
            </div>
          </div>
        </div>
        <div className="aq-product-slide-wrap p-relative">
          <div className="aq-product-arrow">
            <button ref={prevRef} type="button" className="aq-product-prev">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
                  <path d="M5.75 10.75L0.75 5.75L5.75 0.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            <button ref={nextRef} type="button" className="aq-product-next">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
                  <path d="M0.75 10.75L5.75 5.75L0.75 0.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>
          <Swiper
            className="aq-product-active"
            modules={[Autoplay, Navigation]}
            slidesPerView={4}
            spaceBetween={25}
            speed={1000}
            loop={published.length > 4}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              if (typeof swiper.params.navigation !== "boolean") {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 12 },
              576: { slidesPerView: 2, spaceBetween: 12 },
              768: { slidesPerView: 2, spaceBetween: 25 },
              992: { slidesPerView: 3, spaceBetween: 25 },
              1200: { slidesPerView: 3, spaceBetween: 25 },
              1400: { slidesPerView: 4, spaceBetween: 25 },
            }}
          >
            {published.map((item) => (
              <SwiperSlide key={item.id}>
                <BazaroProductCard
                  item={item}
                  isInWishlist={item?.wishList}
                  onAddToCart={addToCart}
                  onAddToWishlist={addToWishlist}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

const SimilarProduct = ({ data, handleGetProductDetails, productId }) => {
  const isAnyProductPublished = data?.some(
    (product) => product?.is_published === "1"
  );

  if (!isAnyProductPublished) {
    return null;
  }

  return (
    <SimilarProducts
      products={data}
      handleGetProductDetails={handleGetProductDetails}
      productId={productId}
    />
  );
};

export default SimilarProduct;
