"use client";

import Image from "next/image";
import Section from "./Section";

const categories = [
  {
    title: "Wedding collection silk saree",
    desc: "Stunning bridal collections",
    image: "/images/banner/banner1.webp",
    isTop: true,
  },
  {
    title: "Celebrity collection",
    desc: "Comfort with style",
    image: "/images/banner/banner2.webp",
    isTop: false,
  },
  {
    title: "Kanjivaram collections",
    desc: "Celebrate in elegance",
    image: "/images/banner/banner3.webp",
    isTop: false,
  },
  {
    title: "Couple collections",
    desc: "Elegant yet professional",
    image: "/images/banner/banner1.webp",
    isTop: false,
  },
];

const Categorycard = () => {
  return (
    <div className="flex flex-wrap justify-between">
      {categories.map((cat, index) => (
        <div
          key={index}
          className={`relative rounded-lg overflow-hidden shadow-lg category-card ${
            cat.isTop
              ? "w-full h-96 mb-3 md:mb-10"
              : "w-full sm:w-[90%] md:w-[48%] lg:w-[31%] h-96 mb-3 md:mb-0"
          }`}
        >
          <Image
            src={cat.image}
            alt={cat.title}
            width={cat.isTop ? 1200 : 400}
            height={cat.isTop ? 400 : 400}
            className="object-cover w-full h-full category-card"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent opacity-80 transition duration-300" />
          <div className="absolute bottom-6 left-6 text-white category-content-card">
            <h3 className="text-2xl font-bold">{cat.title}</h3>
            <p className="text-sm mt-1">{cat.desc}</p>
            <button className="mt-4 px-5 py-2 border border-white rounded-md hover:bg-white hover:text-gray-900 transition">
              Explore Collection
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function CategorySection() {
  return (
    <Section
      title={"Explore Categories"}
      desc={"Find the perfect saree for every occasion"}
      section={<Categorycard />}
    />
  );
}
