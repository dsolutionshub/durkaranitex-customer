"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { Check, CircleCheckBig, Clock2, Copy, Tag } from "lucide-react";
import Section from "./Section";
import { useState } from "react";
import { useRouter } from "next/navigation";

const convertToLocalDateString = (dateStr) => {
  const localDate = new Date(dateStr);

  return localDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const OfferCard = ({ data }) => {
  const router = useRouter();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Code Copied");

    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-5 mb-5">
      {data?.map((offer) => (
        <div
          key={offer.name}
          className="flex flex-col rounded-xl overflow-hidden shadow min-w-80 lg:min-w-99"
        >
          <div className="w-full relative h-55">
            <Image
              src={offer?.image}
              alt={offer?.name}
              fill
              className="transition-transform duration-300 group-hover:scale-105 w-full h-full"
            />
          </div>

          <div className="w-full p-4 flex flex-col justify-center gap-2">
            <div className="flex items-center justify-between mb-0">
              <h4
                className="text-xl font-bold text-black mb-0"
                style={{
                  fontWeight: "600",
                }}
              >
                {offer?.name}
              </h4>
              <p className="mb-0 px-3 py-1 bg-green-100 primary-color rounded-full text-sm font-normal">
                {offer?.type === "fixed"
                  ? `₹${parseInt(offer.value)}`
                  : `${parseInt(offer.value)}%`}{" "}
                Off
              </p>
            </div>

            <p className="text-left text-gray-600 text-md font-normal mb-0">
              Get{" "}
              {offer?.type === "fixed"
                ? `₹${parseInt(offer.value)}`
                : `${parseInt(offer.value)}%`}{" "}
              Off for {offer?.name}
            </p>

            <p className="text-left text-gray-600 text-md font-normal flex  gap-1 mb-0">
              <Clock2 size={20} className="mt-1" />
              Expires {convertToLocalDateString(offer?.expires_at)}
            </p>

            <p className="text-left text-gray-600 text-md font-normal flex  gap-1 mb-0">
              <Tag size={20} className="mt-1" />
              Min. order ₹{parseInt(offer?.min_amount)}
            </p>

            <p className="text-left text-gray-600 text-md font-normal flex  gap-1 mb-0">
              <CircleCheckBig size={20} className="mt-1" /> Applicable for all
              products
            </p>

            <div className=" flex items-center font-normal mb-3 border bg-gray-50 rounded p-3 justify-between">
              <p className="text-black mb-0">Code </p>
              <span className="bg-gray-100 px-2 py-1 mx-2 text-black">
                {offer?.code}
              </span>

              <button
                onClick={() => handleCopy(offer?.code)}
                className="text-md font-normal text-black flex items-center gap-1 w-6"
              >
                {copiedCode === offer?.code ? (
                  <Check
                    className="primary-color bg-green-100 p-1 rounded-md"
                    size={27}
                  />
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>

            <button
              className="bg-[var(--primary-main)] text-white px-5 py-2 rounded-md text-center shadow-md"
              onClick={() => router.push("/shop")}
            >
              Shop Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const SaleSection = ({ data }) => {
  return (
    <Section
      title={"Special Offers"}
      desc={"Exclusive deals and discounts for our valued customers"}
      section={<OfferCard data={data} />}
    />
  );
};
export default SaleSection;
