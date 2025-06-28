"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import ImageCarousel from "../ProductDetailCarousel/page";
import ProductAccordion from "../ProductAccordion/page";
import SimilarProduct from "../SimilarProduct/page";
import CustomBreadCrumb from "../../../components/CustomBreadCrumb";

import { getProductDetails } from "../../../api/services/authService";
import { getErrorMessage } from "@/app/utils/helperFn";

const images = [
  "/images/produce_detail_4.webp",
  "/images/produce_detail_5.webp",
  "/images/produce_detail_3.jpg",
  "/images/produce_detail_1.jpg",
];

const ProductDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [productInfo, setProductInfo] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const [openIndex, setOpenIndex] = useState(null);

  const handleZoomToggle = (index) => {
    setZoom(zoom === index ? null : index);
  };

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 1));
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  useEffect(() => {
    setOpenIndex(0);
  }, []);

  const getDetails = async () => {
    if (!id) return;
    try {
      const data = await getProductDetails(id);
      setProductInfo(data);
    } catch (error) {
      getErrorMessage(error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      <CustomBreadCrumb
        model={[
          { label: "Shop", url: "/" },
          { label: productInfo?.product?.title },
        ]}
      />

      <div className="container mx-auto px-4 lg:pt-3 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-5 xl:gap-0">
          <div className="relative flex flex-col items-center w-full max-w-lg md:max-w-xl lg:max-w-2xl ml-md-3">
            <ImageCarousel
              images={images || []}
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
            handleIncrease={handleIncrease}
            quantity={quantity}
          />
        </div>
      </div>

      <SimilarProduct />
    </div>
  );
};

export default ProductDetails;
