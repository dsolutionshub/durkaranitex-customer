"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ImageCarousel from "./components/ProductDetailCarousel/page";
import ProductAccordion from "./components/ProductAccordion/page";
import SimilarProduct from "./components/SimilarProduct/page";

const images = [
  "/images/produce_detail_1.jpg",
  "/images/produce_detail_5.webp",
  "/images/produce_detail_3.jpg",
  "/images/produce_detail_4.webp",
];

const sections = [
  {
    title: "Product Description",
    content: `<div style='border-top: 1px solid #ddd; padding-top: 10px; font-size: 14px; color: #01279;'>
      <p><strong>Fabric:</strong> Pure Cotton</p>
      <p><strong>Weaving Style:</strong> Handloom weaving with tie-and-dye technique.</p>
      <p><strong>Pattern:</strong> Printed</p>
      <p><strong>Care Instructions:</strong> Handwash separately in cold water. Dry in shade to maintain color vibrancy.
      Avoid harsh detergents and machine wash to preserve fabric quality.</p>
      <p><em>Disclaimer:</em> Product color may slightly vary due to photographic lighting sources or your monitor settings.</p>
    </div>`,
  },
  // { title: "Shipping", content: "Shipping details go here." },
  {
    title: "Replacements & Exchanges",
    content: `Return & Replacements within 5 days of purchase for product damages only .
(Offer product / Innerwear/ Imitation Jewellery / Discount products are not Eligible to Return/Exchange*)`,
  },
];

const ProductDetail = () => {
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

  return (
    <div>
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <div className="text-sm">
            <Link href="/" className="text-blue-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <strong className="text-black">Cotton Sarees</strong>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-10 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col md:flex-row">
              {/* <div className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2 mb-3 md:mb-0">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg overflow-hidden cursor-pointer ${
                      index === selectedIndex ? "border-blue-500" : ""
                    }`}
                    onClick={() => setSelectedIndex(index)}
                  >
                    <Image
                      src={img}
                      alt="Thumbnail"
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div> */}

              <div className="relative flex flex-col items-center w-full max-w-lg md:max-w-xl lg:max-w-2xl ml-md-3">
                {/* <Carousel
                  activeIndex={selectedIndex}
                  onSelect={(selected) => setSelectedIndex(selected)}
                  interval={null}
                  className="w-full"
                  slide={false}
                >
                  {images.map((img, index) => (
                    <Carousel.Item key={index}>
                      <div className="relative w-full overflow-hidden rounded-lg">
                        <Image
                          src={img}
                          alt="Product Image"
                          width={500 * zoom}
                          height={500 * zoom}
                          className="object-cover transition-transform w-full h-full"
                          style={{ transform: `scale(${zoom})` }}
                          priority
                        />
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={zoomIn}
                    className="p-2 bg-gray-200 rounded-full"
                  >
                    ➕
                  </button>
                  <button
                    onClick={zoomOut}
                    className="p-2 bg-gray-200 rounded-full"
                  >
                    ➖
                  </button>
                </div> */}

                <ImageCarousel
                  images={images || []}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                  handleZoomToggle={handleZoomToggle}
                  zoom={zoom}
                />
              </div>
            </div>
          </div>

          <ProductAccordion
            sections={sections}
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

export default ProductDetail;
