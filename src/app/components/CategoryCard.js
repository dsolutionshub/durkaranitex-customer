// "use client";

// import Image from "next/image";
// import Section from "./Section";

// const Categorycard = ({ data }) => {
//   return (
//     <div className="flex flex-wrap justify-between">
//       {data?.map((cat, index) => (
//         <div
//           key={index}
//           className={`relative rounded-lg overflow-hidden shadow-lg category-card ${
//             index == 0
//               ? "w-full h-96 mb-3 md:mb-10"
//               : "w-full sm:w-[100%] md:w-[48%] lg:w-[31%] h-96 mb-3 md:mb-0"
//           }`}
//         >
//           {/* {cat?.image && <Image
//             src={cat?.image}
//             alt={cat?.name}
//             width={index==0 ? 1200 : 400}
//             height={index==0 ? 400 : 400}
//             className="object-cover w-full h-full category-card"
//           />} */}
//           {cat?.image && (
//             <Image
//               src={
//                 typeof cat?.image === "string" && cat.image.trim() !== ""
//                   ? cat.image
//                   : "/images/banner/banner1.webp"
//               }
//               alt={cat?.name || "Category Image"}
//               width={index === 0 ? 1200 : 400}
//               height={400}
//               className="object-cover w-full h-full m-0 category-card"
//             />
//           )}
//           <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent opacity-80 transition duration-300" />
//           <div className="absolute bottom-6 left-6 text-white category-content-card">
//             <h3 className="text-2xl font-bold mb-0 md:mb-2">{cat?.name}</h3>
//             <button className="px-5 py-2 border border-white rounded-md hover:bg-white hover:text-gray-900 transition">
//               Explore Collection
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default function CategorySection({ collection }) {
//   return (
//     <Section
//       title={"Explore Categories"}
//       desc={"Find the perfect saree for every occasion"}
//       section={<Categorycard data={collection} />}
//     />
//   );
// }

import { Award, Truck, Shield, Star } from "lucide-react";

import Image from "next/image";

const CompanyInfo = () => {
  const features = [
    {
      icon: Award,

      title: "Premium Quality",

      description: "Finest fabrics and craftsmanship",
    },
    {
      icon: Truck,

      title: "Fast Delivery",

      description: "Real time tracking and quick shipping",
    },
    {
      icon: Shield,

      title: "Secure Shopping",

      description: "100% secure payment gateway",
    },
    {
      icon: Star,

      title: "Customer First",

      description: "24/7 customer support",
    },
  ];

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-2">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Image
              height={200}
              width={200}
              src="/images/home/logo.svg"
              alt="logo"
              style={{
                width: "13rem",

                marginLeft: "-1rem",
              }}
            />

            <p className="font-medium text-gray-800">
              For over two decades, Dhurgarani Tex has been crafting exquisite
              traditional Indian wear that celebrates our rich heritage while
              embracing contemporary style. From handpicked fabrics to intricate
              embroidery, every piece tells a story of artisanal excellence..
            </p>

            <h3 className="text-lg text-black font-semibold mb-4">
              Our Promise to You
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                      <Icon className="w-7 h-7 primary-color mt-0" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-black text-foreground mb-0">
                        {feature.title}
                      </h3>

                      <p className="text-sm text-gray-800 text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex space-x-4">
              <a href="/about">
                <button className="text-white bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg">
                  Our Story
                </button>
              </a>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/images/home/banner_about.png"
              alt="Company Banner"
              width={1200}
              height={500}
              className="w-full h-96 object-cover rounded-2xl shadow-card"
              layout="responsive"
            />

            <div className="absolute -bottom-6 -left-1 bg-primary text-primary-foreground p-2 rounded-xl shadow-glow">
              <div className="text-2xl font-bold text-white">25+</div>

              <div className="text-sm text-white">Years of Excellence</div>
            </div>

            <div className="absolute -top-6 -right-1 bg-[#FCD975] text-primary-foreground p-2 rounded-xl shadow-lg shadow-yellow-300">
              <div className="text-2xl font-bold text-black">50k+</div>

              <div className="text-sm text-black">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;
