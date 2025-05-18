"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

import useCartStore from "@/store/useCartStore";
import ProductCard from "../components/ProductCard";
import collections from "./productList.json";
import SortProduct from "./components/SortProduct.js/page";
import ProductPagination from "./components/ProductPagination/page";
import ProductFilter from "./components/ProductFilter/page";
import { getFilteredProducts } from "../utils/helperFn";

const categories = [
  { name: "Semi-silk", count: 2220 },
  { name: "Kubera Pattu Sarees", count: 2550 },
  { name: "Celebrity Collections", count: 2124 },
  { name: "Wedding Collections", count: 2124 },
  { name: "Silk Cotton Saree", count: 2124 },
  { name: "Tissue Silk", count: 2124 },
];

function Shop() {
  const itemsPerPage = 8;

  const addToCart = useCartStore((state) => state.addToCart);
  const wishToCart = useCartStore((state) => state.addToWishlist);

  const [priceRange, setPriceRange] = useState({ min: 500, max: 500000 });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("Sort by All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchProduct, setSearchProduct] = useState("");

  const filtered = getFilteredProducts({
    products: collections,
    search: searchProduct,
    priceRange,
    selectedCategories,
    sortOption,
  });

  const startIndex = (currentPage - 1) * itemsPerPage;

  const handlePriceChange = (range) => {
    setPriceRange(range);
  };

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedCollections = filtered?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchProduct, selectedCategories, priceRange]);
  return (
    <>
      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0">
              <Link href="/">Home</Link> <span className="mx-2 mb-0">/</span>{" "}
              <strong className="text-black">Shop</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section" style={{ padding: "1rem" }}>
        <div className="container-fluid">
          <div className="row mb-5">
            <div className="col-md-9 order-2">
              <div className="row">
                <div className="col-md-12 mb-5">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                    <h2 className="text-black h5">Shop All</h2>
                    <div className="input-group mb-3 mb-md-0 product-detail-search">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        value={searchProduct}
                        onChange={(e) => setSearchProduct(e.target.value)}
                      />
                      <span className="input-group-text">
                        <FaSearch />
                      </span>
                    </div>
                    <SortProduct
                      selected={sortOption}
                      onChange={setSortOption}
                    />
                  </div>
                </div>
              </div>

              <div className="row mb-5">
                {paginatedCollections?.length === 0 ? (
                  <p className="text-center text-muted w-100">
                    No products found.
                  </p>
                ) : (
                  paginatedCollections?.map((item) => (
                    <div
                      className="col-sm-6 col-md-4 col-lg-3 mb-4"
                      key={item.id}
                    >
                      <ProductCard
                        title={item.title}
                        price={item.price}
                        oldPrice={item.oldPrice}
                        image={item.imgSrc}
                      />
                    </div>
                  ))
                )}
              </div>

              {totalPages > 1 && (
                <ProductPagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              )}
            </div>

            <ProductFilter
              categories={categories}
              selectedCategories={selectedCategories}
              onChange={setSelectedCategories}
              onPriceChange={handlePriceChange}
              priceRange={priceRange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
