import React from "react";
import { Image } from "primereact/image";
import Section from "./Section";

const collections = [
  { id: 1, title: "Kanjivaram Wedding Semi Silk Sarees", imgSrc: "/images/home/kanjivaram.png", isLarge: true },
  {
    id: 2,
    title: "Bridal Tissue Slik Sarees",
    imgSrc: "/images/home/Bridal Tissue.png",
    isLarge: false,
  },
  {
    id: 3,
    title: "Wedding Collection",
    imgSrc: "/images/home/Wedding Collection.png",
    isLarge: false,
  },
  {
    id: 4,
    title: "Celebrity Inspired Tissue Silk Sarees",
    imgSrc: "/images/home/Celebrity Collection.png",
    isLarge: true,
  },
];

// const CollectionCard = ({ imgSrc, title, isLarge }) => (
//   <div
//     className={`relative overflow-hidden rounded-lg shadow-2 ${
//       isLarge ? 'row-span-2' : ''
//     }`}
//   >
//     <Image
//       src={imgSrc}
//       alt={title}
//       imageClassName="w-full h-full object-cover"
//     />
//     <div className="absolute bottom-0 left-0 right-0 bg-black-alpha-60 p-4">
//       <h3
//         className={`text-white font-semibold ${
//           isLarge ? 'text-xl' : 'text-lg'
//         }`}
//       >
//         {title}
//       </h3>
//     </div>
//   </div>
// );

const CollectionsBox = () => {
  return (
    // <div className="grid grid-cols-3 grid-rows-2 gap-4" style={{ height: '75vh' }}>
    //   {collections.map((collection) => (
    //     <CollectionCard
    //       key={collection.id}
    //       imgSrc={collection.imgSrc}
    //       title={collection.title}
    //       isLarge={collection.isLarge}
    //     />
    //   ))}
    // </div>

    <div className="px-10 sm:px-0 mb-10 sm:mb-0">
      {/* Mobile view */}
      <div className="block lg:hidden space-y-4">
        {collections.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg shadow-2"
          >
            <Image
              src={item.imgSrc}
              alt={item.title}
              imageClassName="w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black-alpha-60 p-4">
              <h3 className="text-white text-lg font-semibold">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Tablet and desktop view */}
      <div
        className="hidden lg:grid grid-cols-3 grid-rows-2 gap-4"
        style={{ height: "75vh" }}
      >
        <div className="row-span-2 relative overflow-hidden rounded-lg shadow-2">
          <Image
            src={collections[0].imgSrc}
            alt={collections[0].title}
            imageClassName="w-full h-150 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black-alpha-60 p-4">
            <h3 className="text-white text-xl font-semibold">
              {collections[0].title}
            </h3>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg shadow-2">
          <Image
            src={collections[1].imgSrc}
            alt={collections[1].title}
            imageClassName="w-full h-120 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black-alpha-60 p-4">
            <h3 className="text-white text-lg font-semibold">
              {collections[1].title}
            </h3>
          </div>
        </div>

        <div className="row-span-2 relative overflow-hidden rounded-lg shadow-2">
          <Image
            src={collections[3].imgSrc}
            alt={collections[3].title}
            imageClassName="w-full h-150 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black-alpha-60 p-4">
            <h3 className="text-white text-xl font-semibold">
              {collections[3].title}
            </h3>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg shadow-2">
          <Image
            src={collections[2].imgSrc}
            alt={collections[2].title}
            imageClassName="w-full h-120 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black-alpha-60 p-4">
            <h3 className="text-white text-lg font-semibold">
              {collections[2].title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SilkCollections() {
  return (
    <Section
      title={"Shop By Silk Collections"}
      desc={
        "Explore our diverse collection of beautiful silk sarees for every occasion"
      }
      section={<CollectionsBox />}
    />
  );
}
