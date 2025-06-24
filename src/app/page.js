"use client";
import { useEffect, useState } from "react";

import { BannerCarousel } from "./components/HeroSection";
import CollectionsSection from "./components/CollectionsSection";
import FeaturedProducts from "./components/FeaturedProducts";
import SaleSection from "./components/SaleSection";
import NewCollections from "./components/NewArrivals";
import CategorySection from "./components/CategoryCard";

import { getHome } from "./api/services/authService";
import { getErrorMessage } from "./utils/helperFn";
import { loader } from "./components/loader/loaderManager";

export default function Home() {
  const [homeDetails, setHomeDetails] = useState([]);

  const fetchData = async () => {
    loader(true);
    try {
      const data = await getHome();
      setHomeDetails(data);
    } catch (error) {
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <BannerCarousel />
      <CollectionsSection />
      <FeaturedProducts collection={homeDetails?.shop_collection} />
      <NewCollections />
      <SaleSection />
      <CategorySection />
    </div>
  );
}
