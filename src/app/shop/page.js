import { Suspense } from "react";
import Loader from "../components/loader/loader";
import Product from "./components/Product/Page";

export const metadata = {
  title: "Shop",
  description:
    "Premium Ilampillai sarees from Salem, Tamil Nadu. Shop semi-silk, handloom, and traditional sarees online.",
  keywords: [
    "ilampillai sarees",
    "salem sarees",
    "semi silk sarees",
    "dhurgarani tex",
  ],
};

const Shop = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Product />
    </Suspense>
  );
};

export default Shop;
