"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Carousel } from "primereact/carousel";

export function BannerCarousel({ images }) {
  const router = useRouter();
  const imageTemplate = (item) => {
    return (
      <div
        className="w-full md:h-110 banner-image-card"
        onClick={() => router.push(`/shop?id=${1}`)}
      >
        <Image
          height={100}
          width={100}
          src={item?.image}
          alt="Banner"
          // className="w-full object-cover md:h-[60vh] lg:h-[80vh] xl:h-[90vh] cursor-pointer"
          className="w-full object h-full  cursor-pointer"
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
