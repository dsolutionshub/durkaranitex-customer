"use client";

import { useState, useEffect } from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { FaSearch } from "react-icons/fa";
import { BiFilterAlt } from "react-icons/bi";

import useCartStore from "@/store/useCartStore";
import ProductCard from "../components/ProductCard";
import collections from "./productList.json";
import SortProduct from "./components/SortProduct.js/page";
import ProductPagination from "./components/ProductPagination/page";
import ProductFilter from "./components/ProductFilter/page";
import { getErrorMessage, getFilteredProducts } from "../utils/helperFn";
import { getCategoryList, getProductList } from "../api/services/authService";
import { loader } from "../components/loader/loaderManager";
import useCartPanelStore from "@/store/useCartPanelStore";
import { useRouter } from 'next/navigation';
import { BREAD_CRUMB_HOME } from "../utils/constants";

const items = [{ label: "Shop" }];

function Shop() {
  const itemsPerPage = 8;
  const { handleGetCartDetail } = useCartPanelStore();

  const addToCart = useCartStore((state) => state.addToCart);
  const wishToCart = useCartStore((state) => state.addToWishlist);

  const [priceRange, setPriceRange] = useState({ min: 50, max: 900 });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("Sort by All");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchProduct, setSearchProduct] = useState("");
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);

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

  const productDetails = async (filter) => {
    loader(true);
    try {
      let { products } = await getProductList(currentPage, filter);
      setProductList(products || []);
      setSortedProducts(products || []);
    } catch (error) {
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  };

  const categoryDetails = async () => {
    loader(true);
    try {
      const data = await getCategoryList();
      setCategoryList(data || []);
    } catch (error) {
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  };

  const handleSearch = (value) => {
    const data = sortedProducts.filter((item) =>
      (item.title ?? "").toLowerCase().includes(value.toLowerCase())
    );
    setSortedProducts(data);
  };

  const handleOpenFilter = () => {
    setOpenFilter((prev) => !prev);
  };

  const handleOpenCart = () => {
    handleGetCartDetail();
  };

  useEffect(() => {
    productDetails();
  }, [currentPage]);

  useEffect(() => {
    categoryDetails();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchProduct, selectedCategories, priceRange]);

  useEffect(() => {
    // let sorted = [...productList];

    switch (sortOption) {
      case "Name A to Z":
        // sorted.sort((a, b) => (a.title ?? '').localeCompare(b.title ?? ''));
        productDetails("a-z");
        break;
      case "Name Z to A":
        // sorted.sort((a, b) => (b.title ?? '').localeCompare(a.title ?? ''));
        productDetails("z-a");
        break;
      case "Price low to high":
        // sorted.sort((a, b) => (a.price ?? '') - (b.price ?? ''));
        productDetails("min-max");
        break;
      case "Price high to low":
        // sorted.sort((a, b) => (b.price ?? '') - (a.price ?? ''));
        productDetails("max-min");
        break;
      case "Sort by All":
        productDetails();
        break;
    }
    // setSortedProducts(sorted);
  }, [sortOption]);

  const router = useRouter();

  const navigateToProductDetail = (product_id) => {
    router.push(`/product-detail?id=${product_id}`);
  };

  return (
    <>
      <BreadCrumb
        model={items}
        home={BREAD_CRUMB_HOME}
        className="pt-4 pb-2 custom-breadcrumb"
      />
      <div className="py-0 md:py-4 pt-1">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-9 order-2">
              <div className="row p-1">
                <div className="col-xl-12">
                  <div className="d-flex flex-column flex-xl-row justify-content-between align-items-center">
                    <h2 className="text-black h5">Shop All</h2>
                    <div className="input-group mb-3 mb-xl-0 product-detail-search">
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

                    <div className="flex items-center gap-3">
                      <button
                        className="px-4 py-2 flex items-center gap-2 bg-green-900 text-light fs-6 xl:hidden"
                        onClick={handleOpenFilter}
                      >
                        <BiFilterAlt />
                        Filter
                      </button>

                      <SortProduct
                        selected={sortOption}
                        onChange={setSortOption}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row my-5 md:p-1 product-container-mobile">
                {productList?.length === 0 ? (
                  <p className="text-center text-muted w-100">
                    No products found.
                  </p>
                ) : (
                  productList?.map((item) => (
                    <div
                      className="col-md-4 col-lg-3 md:mb-4 product-list-card-mobile"
                      key={item.id}
                      onClick={() => navigateToProductDetail(item.id)}
                    >
                      <ProductCard
                        type={"heart"}
                        btn2={handleOpenCart}
                        title={item?.title}
                        price={item?.price}
                        oldPrice={item?.product_price}
                        image={item?.images[0]?.["image"]}
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
              openFilter={openFilter}
              handleOpenFilter={handleOpenFilter}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
