"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { BannerCarousel } from "./components/HeroSection";
import CollectionsSection from "./components/CollectionsSection";
import FeaturedProducts from "./components/FeaturedProducts";
import SaleSection from "./components/SaleSection";
import NewCollections from "./components/NewArrivals";
import CategorySection from "./components/CategoryCard";

import { getHome } from "./api/services/authService";
import { getErrorMessage } from "./utils/helperFn";
import { loader } from "./components/loader/loaderManager";

import "./globals.css";
import "./styles/style.css";

export default function Home() {
  const [homeDetails, setHomeDetails] = useState([]);

  const fetchData = async () => {
    loader(true);
    try {
      const data = await getHome();
      setHomeDetails(data || []);
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <BannerCarousel images={homeDetails?.sliders} />
      <CollectionsSection />
      {homeDetails?.featured_products?.length > 0 && (
        <FeaturedProducts
          products={homeDetails?.featured_products}
          fetchData={fetchData}
        />
      )}
      {homeDetails?.new_collection_categories?.length > 0 && (
        <NewCollections data={homeDetails?.new_collection_categories} />
      )}
      <SaleSection />
      {homeDetails?.shop_collection?.length > 0 && (
        <CategorySection collection={homeDetails?.shop_collection} />
      )}
    </div>
  );
}
