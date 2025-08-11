"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import ImageCarousel from "../ProductDetailCarousel/page";
import ProductAccordion from "../ProductAccordion/page";
import SimilarProduct from "../SimilarProduct/page";
import CustomBreadCrumb from "../../../components/CustomBreadCrumb";

import { getProductDetails } from "../../../api/services/authService";
import { getErrorMessage } from "@/app/utils/helperFn";
import { loader } from "@/app/components/loader/loaderManager";
import { useAuthStore } from "@/store/useAuthStore";

const ProductDetails = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const { isLoggedIn } = useAuthStore();

  const [productInfo, setProductInfo] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);

  const handleZoomToggle = (index) => {
    setZoom(zoom === index ? null : index);
  };

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    setOpenIndex(0);
  }, []);

  const handleGetProductDetails = useCallback(async () => {
    loader(true);
    if (!id) return;
    try {
      const data = await getProductDetails(id);
      setProductInfo(data);
      setTotalQuantities(data?.quantity || 0);
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  }, [id]);

  useEffect(() => {
    handleGetProductDetails();
  }, [id]);

  const increaseCount = async (currentQuantity) => {
    if (!isLoggedIn) {
      toast.error("Please login to change quantity.");
      sessionStorage.setItem(
        "postLoginRedirect",
        `product-detail?id=${productInfo?.product?.id}`
      );
      router.push("/login");
      return;
    }

    if (currentQuantity === parseInt(productInfo?.product?.quantity)) {
      toast.error("You've reached the maximum quantity allowed.");
      return;
    }
    setQuantity(quantity + 1);
  };

  const decreaseCount = async () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  };

  return (
    <div>
      <CustomBreadCrumb
        model={[
          { label: "Shop", url: "/shop" },
          { label: productInfo?.product?.title },
        ]}
      />

      <div className="container mx-auto px-4 lg:pt-3 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-5 xl:gap-0">
          <div className="relative flex flex-col items-center w-full max-w-lg md:max-w-xl lg:max-w-2xl ml-md-3">
            <ImageCarousel
              images={productInfo?.product?.images || []}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              handleZoomToggle={handleZoomToggle}
              zoom={zoom}
            />
          </div>
          <ProductAccordion
            sections={productInfo?.product}
            openIndex={openIndex}
            toggleAccordion={toggleAccordion}
            increaseCount={increaseCount}
            decreaseCount={decreaseCount}
            quantity={quantity}
            handleGetProductDetails={handleGetProductDetails}
          />
        </div>
      </div>
      {productInfo?.relatedProducts?.length > 0 &&
        !(
          productInfo?.relatedProducts?.length === 1 &&
          productInfo?.relatedProducts[0]?.is_published === "0"
        ) && (
          <SimilarProduct
            data={productInfo?.relatedProducts}
            handleGetProductDetails={handleGetProductDetails}
          />
        )}
    </div>
  );
};

export default ProductDetails;
