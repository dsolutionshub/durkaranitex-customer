import { Suspense } from "react";
import ProductDetails from "./components/ProductDetails/Page";
import Loader from "../components/loader/loader";

const ProductDetail = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ProductDetails />
    </Suspense>
  );
};

export default ProductDetail;
