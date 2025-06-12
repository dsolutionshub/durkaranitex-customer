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
import { getCategoryList, getProductList } from "../api/services/authService";

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

  const [priceRange, setPriceRange] = useState({ min: 50, max: 900 });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("Sort by All");
  const [sortedProducts, setSortedProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [searchProduct, setSearchProduct] = useState("");
  const [productList, setProductList] = useState([])
  const [categoryList, setCategoryList] = useState([])

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

  const productDetails = async (filter) => {
    let details = await getProductList(currentPage, filter)
    let product = details.products
    setProductList(product)
    setSortedProducts(product);
  }

  const categoryDetails = async () => {
    let details = await getCategoryList()
    let category_list = details
    setCategoryList(category_list)
  }

  useEffect(() => {
    productDetails()
  }, [currentPage])

  useEffect(()=>{
   categoryDetails()
  },[])

  const handleSearch = (value) => {
    const data = sortedProducts.filter(item =>
      (item.title ?? '').toLowerCase().includes(value.toLowerCase())
    );
    setSortedProducts(data);
  };

  useEffect(() => {
    // let sorted = [...productList];

    switch (sortOption) {
      case "Name A to Z":
        // sorted.sort((a, b) => (a.title ?? '').localeCompare(b.title ?? ''));
        productDetails('a-z')
        break;
      case "Name Z to A":
        // sorted.sort((a, b) => (b.title ?? '').localeCompare(a.title ?? ''));
        productDetails('z-a')
        break;
      case "Price low to high":
        // sorted.sort((a, b) => (a.price ?? '') - (b.price ?? ''));
        productDetails('min-max')
        break;
      case "Price high to low":
        // sorted.sort((a, b) => (b.price ?? '') - (a.price ?? ''));
        productDetails('max-min')
        break;
      case "Sort by All":
        productDetails()
        break;
    }
    // setSortedProducts(sorted);
  }, [sortOption])

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

      <div className="site-section bg-light" style={{ padding: "1rem" }}>
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
                        onChange={(e) => handleSearch(e.target.value)}
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
                {productList?.length === 0 ? (
                  <p className="text-center text-muted w-100">
                    No products found.
                  </p>
                ) : (
                  productList?.map((item) => (
                    <div
                      className="col-sm-6 col-md-4 col-lg-3 mb-4"
                      key={item.id}
                    >
                      <ProductCard
                        title={item?.title}
                        price={item?.price}
                        oldPrice={item?.product_price}
                        image={item?.images[0]?.['image']}
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
              categories={categoryList.categories}
              selectedCategories={selectedCategories}
              filterProducts={setSortedProducts}
              onChange={setSelectedCategories}
              onPriceChange={handlePriceChange}
              priceRange={categoryList.product_amount}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
