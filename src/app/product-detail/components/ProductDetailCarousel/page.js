"use client";
import Carousel from "react-bootstrap/Carousel";
import Image from "next/image";
import { FaSearchMinus, FaSearchPlus } from "react-icons/fa";

import "../../style.css";

export default function ImageCarousel({
  images,
  selectedIndex,
  setSelectedIndex,
  handleZoomToggle,
  zoom,
}) {
  return (
    <>
      <div className="carousel-wrapper">
        <Carousel
          activeIndex={selectedIndex}
          onSelect={(selected) => setSelectedIndex(selected)}
          interval={null}
          slide={false}
          className="carousel"
        >
          {images?.map((img, index) => (
            <Carousel.Item key={index}>
              <div
                className="image-container"
                onDoubleClick={() => handleZoomToggle(index)}
              >
                <Image
                  src={img?.image}
                  alt={`Image ${img.id}`}
                  width={500}
                  height={500}
                  className={`carousel-image ${zoom === index ? "zoomed" : ""}`}
                />

                <div className="zoom-icon-wrapper">
                  {zoom === index ? (
                    <FaSearchMinus className="zoom-icon" />
                  ) : (
                    <FaSearchPlus className="zoom-icon" />
                  )}
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="flex md:flex-row md:gap-2 lg:gap-12 mt-4 space-x-2 md:space-x-0 md:space-y-2 mb-3 md:mb-0">
        {images?.map((img, index) => (
          <div
            key={index}
            className={`border rounded-lg overflow-hidden cursor-pointer ${
              index === selectedIndex ? "border-blue-500" : ""
            }`}
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              src={img.image}
              alt="Thumbnail"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
}
