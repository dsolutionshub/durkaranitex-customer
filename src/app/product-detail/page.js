import { Suspense } from "react";
import ProductDetails from "./components/ProductDetails/Page";

const ProductDetail = () => {
  return (
    <Suspense fallback={<div>Loading product details...</div>}>
      <ProductDetails />
    </Suspense>
  );
};

export default ProductDetail;
