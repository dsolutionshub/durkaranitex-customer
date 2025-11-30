// "use client";
// import { useEffect, useState } from "react";

// import { BannerCarousel } from "./components/HeroSection";
// import CollectionsSection from "./components/CollectionsSection";
// import FeaturedProducts from "./components/FeaturedProducts";
// import SaleSection from "./components/SaleSection";
// import NewCollections from "./components/NewArrivals";
// import CategorySection from "./components/CategoryCard";

// import { getHome } from "./api/services/authService";
// import { getErrorMessage } from "./utils/helperFn";
// import { loader } from "./components/loader/loaderManager";

// import "./globals.css";
// import "./styles/style.css";

// export default function Home() {
//   const [homeDetails, setHomeDetails] = useState([]);

//   const fetchData = async () => {
//     loader(true);
//     try {
//       const data = await getHome();
//       setHomeDetails(data || []);
//     } catch (error) {
//       getErrorMessage(error);
//     } finally {
//       loader(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <main>
//       <div className="visually-hidden">
//         <h1>Welcome to Dhurgarani Tex</h1>
//         <p>
//           We offer a premium selection of <strong>Elampillai sarees</strong>{" "}
//           from Salem, Tamil Nadu. Explore our semi-silk, handloom, and
//           traditional sarees — shipped across India.
//         </p>
//       </div>
//       <BannerCarousel images={homeDetails?.sliders} />
//       <CollectionsSection />
//       {homeDetails?.featured_products?.length > 0 && (
//         <FeaturedProducts
//           products={homeDetails?.featured_products}
//           fetchData={fetchData}
//         />
//       )}
//       {homeDetails?.new_collection_categories?.length > 0 && (
//         <NewCollections data={homeDetails?.new_collection_categories} />
//       )}
//       {homeDetails?.coupons?.length > 0 && (
//         <SaleSection data={homeDetails?.coupons} />
//       )}
//       {homeDetails?.shop_collection?.length > 0 && (
//         <CategorySection collection={homeDetails?.shop_collection} />
//       )}
//     </main>
//   );
// }

"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getHome } from "./api/services/authService";
import { getErrorMessage } from "./utils/helperFn";
import { loader } from "./components/loader/loaderManager";

import { BannerCarousel } from "./components/HeroSection";
import CollectionsSection from "./components/CollectionsSection";
import FeaturedProducts from "./components/FeaturedProducts";
import SaleSection from "./components/SaleSection";
import NewCollections from "./components/NewArrivals";
import CategorySection from "./components/CategoryCard";

import "./globals.css";
import "./styles/style.css";
import Loader from "./components/loader/loader";

export default function Home() {
  const {
    data: homeDetails = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["homeData"],
    queryFn: async () => {
      loader(true);
      try {
        const data = await getHome();
        return data || {};
      } catch (error) {
        getErrorMessage(error);
        throw error;
      } finally {
        loader(false);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Failed to load home data.</p>;

  return (
    <main>
      <div className="visually-hidden">
        <h1>Welcome to Dhurgarani Tex</h1>
        <p>
          We offer a premium selection of <strong>Ellampillai sarees</strong>{" "}
          from Salem, Tamil Nadu. Explore our semi-silk, handloom, and
          traditional sarees — shipped across India.
        </p>
      </div>

      <BannerCarousel images={homeDetails.banners} />
      <CollectionsSection />

      {homeDetails.featured_products?.length > 0 && (
        <FeaturedProducts
          products={homeDetails.featured_products}
          fetchData={refetch}
        />
      )}

      {homeDetails.new_collection_categories?.length > 0 && (
        <NewCollections data={homeDetails.new_collection_categories} />
      )}

      {homeDetails.coupons?.length > 0 && (
        <SaleSection data={homeDetails.coupons} />
      )}

      {homeDetails.shop_collection?.length > 0 && (
        <CategorySection collection={homeDetails.shop_collection} />
      )}
    </main>
  );
}
