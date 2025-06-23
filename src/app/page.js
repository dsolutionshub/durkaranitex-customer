"use client";
import { useEffect, useState } from "react";

import { BannerCarousel } from "./components/HeroSection";
import CollectionsSection from "./components/CollectionsSection";
import FeaturedProducts from "./components/FeaturedProducts";
import SaleSection from "./components/SaleSection";
import NewCollections from "./components/NewArrivals";
import CategorySection from "./components/CategoryCard";

import { getHome } from "./api/services/authService";

export default function Home() {
  const [homeDetails, setHomeDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHome();
      setHomeDetails(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <BannerCarousel />
      <CollectionsSection />
      <FeaturedProducts collection={homeDetails.shop_collection} />
      <NewCollections />
      <SaleSection />
      <CategorySection />
    </div>
  );
}
