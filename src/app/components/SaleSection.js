"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { Clock2, Tag } from "lucide-react";
import Section from "./Section";

const Offers = [
  {
    id: 1,
    imgsrc: "/images/home/aadi Sale.png",
    title: "Big Sale 1",
    link: "/",
  },
  { id: 2, imgsrc: "/images/big_sale.png", title: "Big Sale 2", link: "/" },
];

const OfferCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sale-section-card min-h-50">
      {Offers.map((offer) => (
        <section className="py-16 relative overflow-hidden" key={offer.id}>
          <div className="max-w-3xl mx-auto px-4 relative">
            <div className="mb-12">
              <div className="flex flex-row flex-nowrap rounded-xl overflow-hidden shadow">
                <div className="w-1/2 relative">
                  <Image
                    src={offer.imgsrc}
                    alt={offer.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="w-1/2 p-6 flex flex-col justify-center gap-4">
                  <h3 className="text-xl font-bold text-black text-left">
                    Diwali 25
                  </h3>
                  <div className="bg-gray-50 p-3 border border-gray-200 rounded-lg flex justify-between items-center">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Tag size={20} />
                      <span>Use code:</span>
                      <span className="font-mono font-bold text-lg text-gray-900">
                        FLASH70
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText("FLASH70");
                        toast.success("Code Copied");
                      }}
                      className="primary-color font-semibold hover:bg-green-100 p-1 px-2 rounded hover:shadow-md"
                    >
                      Copy
                    </button>
                  </div>

                  <p className="text-gray-600 text-base mb-0 text-left">
                    Minimum order: ₹999
                  </p>
                  <p
                    className="text-sm text-orange-600 bg-orange-100 w-32 py-2 font-bold rounded-full 
                  flex items-center justify-center gap-1"
                  >
                    <Clock2 size={20} />
                    12/25/2024
                  </p>

                  <button
                    //  onClick={}
                    className="bg-[var(--primary-main)] text-white  rounded
                     px-5 py-2 rounded-md text-center shadow-md"
                  >
                    Shop Now →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

const SaleSection = () => {
  return (
    <Section
      title={"Special Offers"}
      desc={"Exclusive deals and discounts for our valued customers"}
      section={<OfferCard />}
    />
  );
};
export default SaleSection;
