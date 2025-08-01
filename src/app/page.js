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
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <div className="visually-hidden">
        <h1>Welcome to Dhurgarani Tex</h1>
        <p>
          We offer a premium selection of <strong>Ilampillai sarees</strong>{" "}
          from Salem, Tamil Nadu. Explore our semi-silk, handloom, and
          traditional sarees — shipped across India.
        </p>
      </div>
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
    </main>
  );
}
