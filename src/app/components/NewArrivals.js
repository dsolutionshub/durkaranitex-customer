"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "./ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Section from "./Section";
import { useRouter } from "next/navigation";
import ProductCardMobile from "./ProductCardMobile";

const tabData = [
  { id: 1, label: "Silk Cotton" },
  { id: 2, label: "Printed Cotton " },
  { id: 3, label: "Printed Silk Cotton " },
];

const imagePaths = [
  "/images/combo_1.jpeg",
  "/images/combo_2.jpeg",
  "/images/combo_3.jpeg",
  "/images/combo_4.jpeg",
  "/images/combo_5.jpeg",
  "/images/combo_6.jpeg",
  "/images/combo_7.jpeg",
  "/images/combo_8.jpeg",
];

const collections = [
  {
    id: 1,
    title: "Semi-silk",
    imgSrc: "/images/2.jpeg",
    price: 620,
    oldPrice: 930,
  },
  {
    id: 2,
    title: "Kubera Pattu",
    imgSrc: "/images/3.jpeg",
    price: 850,
    oldPrice: 1200,
  },
  {
    id: 3,
    title: "Silk Cotton",
    imgSrc: "/images/4.jpeg",
    price: 999,
    oldPrice: 1500,
  },
  {
    id: 4,
    title: "Banarasi Sarees",
    imgSrc: "/images/1.jpeg",
    price: 1450,
    oldPrice: 2000,
  },
  {
    id: 5,
    title: "Tissue Silk",
    imgSrc: "/images/5.jpeg",
    price: 780,
    oldPrice: 1100,
  },
  {
    id: 6,
    title: "Jamdani Sarees",
    imgSrc: "/images/7.jpeg",
    price: 1350,
    oldPrice: 1800,
  },
  {
    id: 7,
    title: "Kanjeevaram Silk",
    imgSrc: "/images/2.jpeg",
    price: 1699,
    oldPrice: 2500,
  },
  {
    id: 8,
    title: "Chanderi Saree",
    imgSrc: "/images/3.jpeg",
    price: 940,
    oldPrice: 1300,
  },
  {
    id: 9,
    title: "Patola Silk",
    imgSrc: "/images/4.jpeg",
    price: 1999,
    oldPrice: 2800,
  },
  {
    id: 10,
    title: "Gadwal Sarees",
    imgSrc: "/images/1.jpeg",
    price: 1120,
    oldPrice: 1500,
  },
  {
    id: 11,
    title: "Mysore Silk",
    imgSrc: "/images/5.jpeg",
    price: 980,
    oldPrice: 1350,
  },
  {
    id: 12,
    title: "Cotton Silk",
    imgSrc: "/images/7.jpeg",
    price: 670,
    oldPrice: 900,
  },
  {
    id: 13,
    title: "Bandhani Saree",
    imgSrc: "/images/2.jpeg",
    price: 1450,
    oldPrice: 2000,
  },
  {
    id: 14,
    title: "Ikat Saree",
    imgSrc: "/images/3.jpeg",
    price: 800,
    oldPrice: 1050,
  },
  {
    id: 15,
    title: "Pochampally Silk",
    imgSrc: "/images/4.jpeg",
    price: 1550,
    oldPrice: 2100,
  },
  {
    id: 16,
    title: "Banarasi Brocade",
    imgSrc: "/images/1.jpeg",
    price: 1700,
    oldPrice: 2200,
  },
  {
    id: 17,
    title: "Bengal Cotton",
    imgSrc: "/images/5.jpeg",
    price: 690,
    oldPrice: 950,
  },
  {
    id: 18,
    title: "Tussar Silk",
    imgSrc: "/images/7.jpeg",
    price: 1270,
    oldPrice: 1600,
  },
  {
    id: 19,
    title: "Baluchari Saree",
    imgSrc: "/images/2.jpeg",
    price: 1390,
    oldPrice: 1900,
  },
  {
    id: 20,
    title: "Patiala Saree",
    imgSrc: "/images/3.jpeg",
    price: 900,
    oldPrice: 1200,
  },
  {
    id: 21,
    title: "Georgette Saree",
    imgSrc: "/images/4.jpeg",
    price: 720,
    oldPrice: 1000,
  },
  {
    id: 22,
    title: "Kalamkari Silk",
    imgSrc: "/images/1.jpeg",
    price: 860,
    oldPrice: 1150,
  },
  {
    id: 23,
    title: "Raw Silk",
    imgSrc: "/images/5.jpeg",
    price: 1550,
    oldPrice: 2100,
  },
  {
    id: 24,
    title: "Zardozi Saree",
    imgSrc: "/images/7.jpeg",
    price: 1820,
    oldPrice: 2500,
  },
  {
    id: 25,
    title: "Tanjore Silk",
    imgSrc: "/images/2.jpeg",
    price: 1990,
    oldPrice: 2700,
  },
];

const CollectionTab = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);

  const filteredCollections = collections.filter((item) => {
    if (activeTab === 1) return item.title.includes("Silk");
    if (activeTab === 2) return item.title.includes("Cotton");
    if (activeTab === 3) return item.title.includes("Printed");
    return true;
  });

  return (
    <div className="md:px-20 feature-product-card">
      <div className="overflow-x-auto sm:overflow-visible">
        <div className="flex justify-start sm:justify-center items-center gap-4 sm:gap-x-10 mb-6 sm:mb-8 px-4 min-w-max">
          {tabData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative transition-all duration-200 font-medium text-sm sm:text-base whitespace-nowrap new-arrival-btn ${
                activeTab === tab.id
                  ? 'text-green-800 after:content-[""] after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full after:bg-green-800'
                  : "text-gray-400 hover:text-green-800"
              } tab-button`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <ProductCardMobile products={filteredCollections} />

      <div className="relative d-none d-md-block">
        <button className="custom-prev custom-prev-home">
          {<FaChevronLeft />}
        </button>
        <button className="custom-next custom-next-home">
          {<FaChevronRight />}
        </button>

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          spaceBetween={20}
          breakpoints={{
            480: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="product-card"
        >
          {filteredCollections.map((item, i) => (
            <SwiperSlide key={i} className="h-full">
              <ProductCard
                title={item.title}
                price={item.price}
                oldPrice={item.oldPrice}
                image={item.imgSrc}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="text-center mt-10">
          <button
            className="px-6 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition"
            onClick={() => router.push("/shop")}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Collections() {
  return <Section title={"NEW COLLECTIONS"} section={<CollectionTab />} />;
}
