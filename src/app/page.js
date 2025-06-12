import { BannerCarousel } from "./components/HeroSection";
import CollectionsSection from "./components/CollectionsSection";
import FeaturedProducts from "./components/FeaturedProducts";
import SaleSection from "./components/SaleSection";
import NewCollections from "./components/NewArrivals";
import CategorySection from "./components/CategoryCard";
import LoginPage from "./login/page";

export default function Home() {
  return (
    <div>
          <BannerCarousel />
          <CollectionsSection />
          <FeaturedProducts />
          <NewCollections />
          <SaleSection />
          <CategorySection/>
    </div>
 
  );
}
