"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import ImageCarousel from "../ProductDetailCarousel/page";
import ProductAccordion from "../ProductAccordion/page";
import SimilarProduct from "../SimilarProduct/page";
import CustomBreadCrumb from "../../../components/CustomBreadCrumb";

import {
  deleteQuantity,
  getProductDetails,
  updateQuantity,
} from "../../../api/services/authService";
import { getErrorMessage } from "@/app/utils/helperFn";
import { loader } from "@/app/components/loader/loaderManager";

const ProductDetails = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

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

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

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
      setQuantity(data?.product?.cart?.quantity || 1);
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  }, [id]);

  useEffect(() => {
    handleGetProductDetails();
  }, []);

  const increaseCount = async (id, currentQuantity) => {
    if (currentQuantity >= totalQuantities) {
      toast.error("You've reached the maximum quantity allowed.");
      return;
    }
    // const newQuantity = currentQuantity + 1;
    loader(true);
    try {
      await updateQuantity({
        product_id: productInfo?.product?.id,
        quantity: 1,
      });
      handleGetProductDetails();
    } catch (error) {
      const MSG = getErrorMessage(error);
      const status = error.response.status;
      if (status === 401) {
        sessionStorage.setItem(
          "postLoginRedirect",
          `/product-detail?id=${productInfo?.product?.id}`
        );
        router.push("/login");
        toast.error("Login required to change the quantity.");
        return;
      }
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  const decreaseCount = async (id, currentQuantity) => {
    // const newQuantity = currentQuantity - 1;
    // if (newQuantity < 1) {
    //   return;
    // }
    loader(true);
    try {
      await deleteQuantity({
        product_id: productInfo?.product?.id,
        quantity: 1,
      });
      handleGetProductDetails();
    } catch (error) {
      const MSG = getErrorMessage(error);
      const status = error.response.status;
      if (status === 401) {
        sessionStorage.setItem(
          "postLoginRedirect",
          `/product-detail?id=${productInfo?.product?.id}`
        );

        router.push("/login");
        toast.error("Login required to change the quantity.");
        return;
      }
      toast.error(MSG);
    } finally {
      loader(false);
    }
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
            handleDecrease={handleDecrease}
            // handleIncrease={handleIncrease}
            handleIncrease={increaseCount}
            quantity={quantity}
            handleGetProductDetails={handleGetProductDetails}
            decreaseCount={decreaseCount}
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
