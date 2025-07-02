import { Suspense } from "react";
import Loader from "../components/loader/loader";
import Product from "./components/Product/Page";

const Shop = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Product />
    </Suspense>
  );
};

export default Shop;
