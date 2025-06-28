"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "./ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCardMobile from "./ProductCardMobile";
import Section from "./Section";
import { getProductList } from "../api/services/authService";

// const filteredCollections = collections.filter((item) => {
//   if (activeTab === 1) return item.title.includes("Silk");
//   if (activeTab === 2) return item.title.includes("Cotton");
//   if (activeTab === 3) return item.title.includes("Printed");
//   return true;
// });

const CollectionTab = ({ data }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(null);
  const [collectionsData, setCollectionsData] = useState({});

  const fetchCollectionsData = async (tabs) => {
    try {
      const results = await Promise.all(
        tabs.map(async (item) => {
          const res = await getProductList(null, null, item.id);
          return { id: item.id, products: res.products || [] };
        })
      );

      const mapped = {};
      results.forEach(({ id, products }) => {
        mapped[id] = products;
      });

      setCollectionsData(mapped);
    } catch (err) {
      console.error("Error fetching collections:", err);
    }
  };

  useEffect(() => {
    if (data?.length) {
      setActiveTab(data[0].id);
      fetchCollectionsData(data);
    }
  }, [data]);

  const filteredCollections = collectionsData[activeTab] || [];

  return (
    <div className="md:px-20 feature-product-card">
      <div className="overflow-x-auto sm:overflow-visible">
        <div className="flex justify-start sm:justify-center items-center gap-4 sm:gap-x-10 mb-6 sm:mb-8 px-4 min-w-max">
          {data?.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative transition-all duration-200 font-medium text-sm sm:text-base whitespace-nowrap new-arrival-btn ${
                activeTab === tab.id
                  ? 'text-green-800 after:content-[""] after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full after:bg-green-800'
                  : "text-gray-400 hover:text-green-800"
              } tab-button`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <ProductCardMobile products={filteredCollections} />

      <div className="relative d-none d-md-block">
        <button className="custom-prev custom-prev-home">
          <FaChevronLeft />
        </button>
        <button className="custom-next custom-next-home">
          <FaChevronRight />
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
            <SwiperSlide key={i}>
              <ProductCard
                type={"heart"}
                title={item.title}
                price={item.price}
                discount={item.discount}
                oldPrice={item.product_price}
                image={item?.images[0]?.image}
                image1={item?.images[1]?.image}
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

export default function Collections({ data }) {
  return (
    <Section
      title={"NEW COLLECTIONS"}
      section={<CollectionTab data={data} />}
      desc={"Discover our latest additions to keep you in style"}
    />
  );
}
