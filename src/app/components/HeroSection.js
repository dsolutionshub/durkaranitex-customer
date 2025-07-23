"use client";

import Image from "next/image";
import { Carousel } from "primereact/carousel";
import { useState } from "react";

export function BannerCarousel({ images }) {
  // const images = [
  //   { id: 1, src: "/images/banner/Acrylic Tumblerr.png" },
  //   { id: 2, src: "/images/banner/Orange Navy.png" },
  //   { id: 3, src: "/images/banner/Orange Navy 3.png" },
  // ];
  // const [imgData,setImgData] = useState([])
  // useEffect(()=>{
  //   setImgData(images)
  // },[images])

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
      {images?.length > 0 && <Carousel
        value={images}
        itemTemplate={imageTemplate}
        numVisible={1}
        numScroll={1}
        autoplayInterval={4000}
        circular
        showIndicators={true}
        showNavigators={false}
        className="custom-carousel"
      />}
    </div>
  );
}

// "use client";

// import Image from "next/image";
// import { Carousel } from "primereact/carousel";

// export function BannerCarousel() {
//   const images = [
//     {
//       id: 1,
//       // Desktop image from your Kalamandir example
//       srcDesktop:
//         "https://kalamandir.com/media/magiccart/magicslider/b/a/banners03_1_.jpg",
//       // Mobile image from your Kalamandir example (Ensure this image file is optimized for mobile aspect ratio)
//       srcMobile:
//         "https://kalamandir.com/media/magiccart/magicslider/mobile/b/a/banners03mobile.jpg",
//       // IMPORTANT: These should be the ACTUAL intrinsic (original) dimensions of your desktop image file.
//       desktopWidth: 1920,
//       desktopHeight: 800,
//       // IMPORTANT: These should be the ACTUAL intrinsic (original) dimensions of your mobile image file.
//       // Based on typical mobile banners from such sites, a wider mobile image that scales is common.
//       // If your 'banners03mobile.jpg' is designed to fill a mobile screen, use its actual width/height.
//       // Example: If your mobile image is 768px wide and its aspect ratio results in 614px height.
//       mobileWidth: 768, // Adjust to the actual intrinsic width of your mobile image file
//       mobileHeight: 614, // Adjust to the actual intrinsic height of your mobile image file
//     },
//     {
//       id: 2,
//       srcDesktop:
//         "https://kalamandir.com/media/magiccart/magicslider/k/m/km_wedding_banner_v3.jpg",
//       srcMobile:
//         "https://kalamandir.com/media/magiccart/magicslider/mobile/k/m/km_weddingresized_v1.jpg",
//       desktopWidth: 1920,
//       desktopHeight: 800,
//       mobileWidth: 768,
//       mobileHeight: 614,
//     },
//     {
//       id: 3,
//       srcDesktop:
//         "https://kalamandir.com/media/magiccart/magicslider/b/a/banners02.jpg",
//       srcMobile:
//         "https://kalamandir.com/media/magiccart/magicslider/mobile/b/a/banners02-mobile.jpg",
//       desktopWidth: 1920,
//       desktopHeight: 800,
//       mobileWidth: 768,
//       mobileHeight: 614,
//     },
//   ];

//   const imageTemplate = (item) => {
//     return (
//       // The parent container is `w-full`. Its height will be determined by the contained `Image` component.
//       // The desktop heights `md:h-[...]` will be applied here.
//       // We've removed the fixed `h-[204px]` from here to allow fluid mobile sizing.
//       <div className="w-full relative md:h-[60vh] lg:h-[80vh] xl:h-[90vh] flex justify-center items-center">
//         {/* Mobile Banner Image */}
//         {/* This image will take full width (`w-full`) and its height will scale proportionally based on `width`/`height` props */}
//         <Image
//           src={item.srcMobile}
//           alt="Mobile Banner"
//           // These props are crucial for Next.js to determine aspect ratio and optimize.
//           // They should be the ACTUAL intrinsic (original) width/height of the mobile image FILE.
//           width={item.mobileWidth}
//           height={item.mobileHeight}
//           // `w-full` makes it span the full width of its container.
//           // `object-contain` ensures the entire image is visible, introducing letterboxing/pillarboxing if aspect ratios mismatch.
//           // `md:hidden` hides this image on medium screens and up.
//           // No explicit height class on the image itself, allowing it to scale fluidly.
//           className="w-full object-contain md:hidden"
//           priority={true} // Add priority if this is "above the fold" for LCP
//         />

//         {/* Desktop Banner Image */}
//         {/* This image will take full width and height of its parent container, which has responsive height */}
//         <Image
//           src={item.srcDesktop}
//           alt="Desktop Banner"
//           // These props are crucial for Next.js to determine aspect ratio and optimize.
//           // They should be the ACTUAL intrinsic (original) width/height of the desktop image FILE.
//           width={item.desktopWidth}
//           height={item.desktopHeight}
//           // `hidden md:block` makes this image visible only on medium screens and up.
//           // `w-full h-full` makes it fill the parent container's dimensions.
//           // `object-contain` ensures the entire image is visible within that space.
//           className="w-full h-full object-contain hidden md:block"
//           priority={true} // Add priority if this is "above the fold" for LCP
//         />
//       </div>
//     );
//   };

//   return (
//     <div>
//       <Carousel
//         value={images}
//         itemTemplate={imageTemplate}
//         numVisible={1}
//         numScroll={1}
//         autoplayInterval={4000}
//         circular
//         showIndicators={true}
//         showNavigators={false}
//         className="custom-carousel"
//       />
//     </div>
//   );
// }
