"use client";

import Image from "next/image";
import { Carousel } from "primereact/carousel";

export function BannerCarousel() {
  const images = [
    { id: 1, src: "/images/banner/banner1.webp" },
    { id: 2, src: "/images/banner/banner2.webp" },
    { id: 3, src: "/images/banner/banner3.webp" },
  ];

  const imageTemplate = (item) => {
    return (
      <div className="w-full">
        <Image
          height={100}
          width={100}
          src={item.src}
          alt="Banner"
          className="w-full object-cover md:h-[60vh] lg:h-[80vh] lg:h-[90vh]"
        />
      </div>
    );
  };

  return (
    <div>
      <Carousel
        value={images}
        itemTemplate={imageTemplate}
        numVisible={1}
        numScroll={1}
        autoplayInterval={4000}
        circular
        showIndicators={true}
        showNavigators={false}
        className="custom-carousel"
      />
    </div>
  );
}
