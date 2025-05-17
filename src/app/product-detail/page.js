"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-bootstrap";

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
  { title: "Shipping", content: "Shipping details go here." },
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

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 1));
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

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

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col md:flex-row">
              <div className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2 mb-3 md:mb-0">
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
              </div>

              <div className="relative flex flex-col items-center w-full max-w-lg md:max-w-xl lg:max-w-2xl ml-md-3">
                <Carousel
                  activeIndex={selectedIndex}
                  onSelect={(selected) => setSelectedIndex(selected)}
                  interval={null}
                  className="w-full"
                  slide={false} // Fix white screen issue by disabling default slide animation
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
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black">
              Maroon Colour Kalyani Cotton Saree
            </h2>
            <div className="text-lg text-green-600 font-semibold mt-2">
              Rs. 1,250.00{" "}
              <span className="text-gray-500 line-through text-sm">
                Rs. 2,048.00
              </span>
            </div>

            <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
              {sections.map((section, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={index}
                    style={{
                      borderBottom: "1px solid #ddd",
                      padding: "10px 0",
                    }}
                  >
                    <button
                      style={{
                        width: "100%",
                        textAlign: "left",
                        fontSize: "16px",
                        fontWeight: "600",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "transparent",
                        border: "none",
                        padding: ".5rem",
                        cursor: "pointer",
                        color: "#000",
                      }}
                      onClick={() => toggleAccordion(index)}
                    >
                      {section.title}
                      <span style={{ fontSize: "18px" }}>
                        {isOpen ? "➖" : "➕"}
                      </span>
                    </button>

                    <div
                      style={{
                        maxHeight: isOpen ? "200px" : "0px",
                        overflow: "hidden",
                        opacity: isOpen ? "1" : "0",
                        padding: isOpen ? "10px" : "0px 10px",
                        transition:
                          "max-height 0.4s ease, opacity 0.3s ease, padding 0.3s ease",
                        fontSize: "14px",
                        color: "#01279",
                        fontWeight: "500",
                      }}
                    >
                      <div
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center space-x-2 mt-4 text-gray-700">
              <span className="text-sm">
                🚚 <strong>Estimated Delivery:</strong> Mar 28 - Apr 01
              </span>
            </div>

            {/* <div className="mt-5 flex items-center space-x-4">
              <div className="flex items-center border rounded">
                <button
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded-l"
                  onClick={handleDecrease}
                >
                  -
                </button>
                <input
                  type="text"
                  className="w-12 text-center border-t border-b border-gray-300"
                  value={quantity}
                  readOnly
                />
                <button
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded-r"
                  onClick={handleIncrease}
                >
                  +
                </button>
              </div>

              <button className="bg-black text-white px-6 py-2 rounded text-sm mr-3">
                Add To Cart
              </button>
              <button className="bg-green-800 text-white px-6 py-2 rounded text-sm">
                Buy Now
              </button>
            </div> */}

            <div className="mt-5 flex flex-col md:flex-row items-center md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full">
              {/* Quantity Selector */}
              <div className="flex items-center border rounded">
                <button
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded-l"
                  onClick={handleDecrease}
                >
                  -
                </button>
                <input
                  type="text"
                  className="w-12 text-center border-t border-b border-gray-300"
                  value={quantity}
                  readOnly
                />
                <button
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded-r"
                  onClick={handleIncrease}
                >
                  +
                </button>
              </div>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row items-center justify-center w-full space-y-3 md:space-y-0 md:space-x-3 gap-3">
                <button className="bg-black text-white px-6 py-2 rounded text-sm w-full md:w-auto">
                  Add To Cart
                </button>
                <button className="bg-green-800 text-white px-6 py-2 rounded text-sm w-full md:w-auto">
                  Buy Now
                </button>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600 cursor-pointer">
              ❤️ Add to wishlist
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
