import { Suspense } from "react";
import Loader from "../components/loader/loader";
import Product from "./components/Product/Page";

export const metadata = {
  title: "Shop | Ellampillai sarees",
  description:
    "Premium Ellampillai sarees from Salem, Tamil Nadu. Shop semi-silk, handloom, and traditional sarees online.",
  keywords: [
    "Ellampillai sarees",
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
