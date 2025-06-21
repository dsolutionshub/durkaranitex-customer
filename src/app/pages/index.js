import { BannerCarousel } from "../components/HeroSection";
import CollectionsSection from "../components/CollectionsSection";
import FeaturedProducts from "../components/FeaturedProducts";
import SaleSection from "../components/SaleSection";
import NewCollections from "../components/NewArrivals";
import CategorySection from "../components/CategoryCard";
import { getHome } from "../api/services/authService";

const Home = async () => {
  const data = await getHome();
  console.log("Home Page", data);
  return (
    <div>
      <BannerCarousel />
      <CollectionsSection />
      <FeaturedProducts collection={data?.shop_collection} />
      <NewCollections />
      <SaleSection />
      <CategorySection />
    </div>

  );
}
export default Home;