"use client";

import Image from "next/image";
import { Carousel } from "primereact/carousel";

export function BannerCarousel({ images }) {
  const imageTemplate = (item) => {
    return (
      <div className="w-full">
        <Image
          height={100}
          width={100}
          src={item?.image}
          alt="Banner"
          className="w-full object-cover md:h-[60vh] lg:h-[80vh] lg:h-[90vh]"
        />
      </div>
    );
  };

  return (
    <div>
      {images?.length > 0 && (
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
      )}
    </div>
  );
}
