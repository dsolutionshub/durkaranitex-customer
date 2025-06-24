import { Suspense } from "react";
import ProductDetails from "./components/ProductDetails/Page";

const ProductDetail = () => {

  return (
    <div>
      <Suspense fallback={<div>Loading product details...</div>}>
        <ProductDetails />
      </Suspense>
    </div>
  );
};

export default ProductDetail;
