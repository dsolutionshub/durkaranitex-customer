"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { BiFilterAlt } from "react-icons/bi";
import { useRouter } from "next/navigation";

import ProductCard from "../components/ProductCard";
import SortProduct from "./components/SortProduct.js/page";
import CustomBreadCrumb from "../components/CustomBreadCrumb";
import ProductPagination from "./components/ProductPagination/page";
import ProductFilter from "./components/ProductFilter/page";
import { loader } from "../components/loader/loaderManager";

import useCartPanelStore from "@/store/useCartPanelStore";
import { getErrorMessage, getFilteredProducts } from "../utils/helperFn";
import { LOGIN_ERROR_MSG, SHOP_MODEL } from "../utils/constants";
import {
  getCategoryList,
  getProductList,
  modifyCart,
  modifyWishlist,
} from "../api/services/authService";

const items = [{ label: "Shop" }];

function Shop() {
  const itemsPerPage = 10;
  const router = useRouter();
  const { handleGetCartDetail } = useCartPanelStore();

  const [priceRange, setPriceRange] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("Sort by All");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchProduct, setSearchProduct] = useState("");
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [totalPage, setTotalPage] = useState(0);

  const filtered = getFilteredProducts({
    products: [],
    search: searchProduct,
    priceRange,
    selectedCategories,
    sortOption,
  });

  const startIndex = (currentPage - 1) * itemsPerPage;

  const handlePriceChange = (range) => {
    setPriceRange(range);
  };

  const productDetails = async (filter = null, min = 0, max = 0) => {
    loader(true);
    try {
      let { products, total_products } = await getProductList(
        currentPage,
        filter,
        selectedCategories,
        priceRange.min !== 0 ? priceRange.min : undefined,
        priceRange.max !== 0 ? priceRange.max : undefined
      );
      setProductList(products || []);
      setSortedProducts(products || []);
      const totalPages = Math.ceil(total_products / itemsPerPage);
      setTotalPage(totalPages);
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
    setSearchProduct(value);
    const data = sortedProducts.filter((item) =>
      (item.title ?? "").toLowerCase().includes(value.toLowerCase())
    );
    setSortedProducts(data);
  };

  const handleOpenFilter = () => {
    setOpenFilter((prev) => !prev);
  };

  useEffect(() => {
    productDetails();
  }, [currentPage, priceRange]);

  useEffect(() => {
    categoryDetails();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchProduct, selectedCategories, priceRange]);

  useEffect(() => {
    switch (sortOption) {
      case "Name A to Z":
        productDetails("a-z");
        break;
      case "Name Z to A":
        productDetails("z-a");
        break;
      case "Price low to high":
        productDetails("min-max");
        break;
      case "Price high to low":
        productDetails("max-min");
        break;
      case "Sort by All":
        productDetails();
        break;
    }
  }, [sortOption]);

  const navigateToProductDetail = (product_id) => {
    router.push(`/product-detail?id=${product_id}`);
  };

  const addToWishlist = async (id) => {
    loader(true);
    try {
      const data = await modifyWishlist({ product_id: id });
      toast.success(data?.message);
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        sessionStorage.setItem("postLoginRedirect", "/shop");
        router.push("/login");
        toast.error(LOGIN_ERROR_MSG);
      }
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  };

  const addToCart = async (id) => {
    const currentQty = quantities[id] || 0;
    const newQty = currentQty + 1;

    setQuantities((prev) => ({ ...prev, [id]: newQty }));
    loader(true);
    try {
      const data = await modifyCart({ product_id: id, quantity: newQty });
      toast.success(data?.message);
      handleGetCartDetail();
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        sessionStorage.setItem("postLoginRedirect", "/shop");
        router.push("/login");
        toast.error(LOGIN_ERROR_MSG);
      }
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  };

  const handleCheckbox = (arr) => {
    setSelectedCategories(arr);
    productDetails();
  };

  return (
    <>
      <CustomBreadCrumb model={SHOP_MODEL} />
      <div className="py-0 md:py-4 pt-1">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-9 order-2">
              <div className="row p-1">
                <div className="col-xl-12">
                  <div className="d-flex flex-column flex-xl-row justify-content-between align-items-center">
                    <h2 className="text-black h5">Our Saree Collection</h2>
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
                        btn1={() => addToWishlist(item.id)}
                        btn2={() => addToCart(item.id)}
                        title={item?.title}
                        price={item?.price}
                        oldPrice={item?.product_price}
                        image={item?.images[0]?.["image"]}
                        image1={item?.images[1]?.["image"]}
                        discount={item?.discount || 0}
                        isInWishlist={item?.wishList}
                      />
                    </div>
                  ))
                )}
              </div>

              {totalPage > 1 && (
                <ProductPagination
                  totalPages={totalPage}
                  currentPage={currentPage}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              )}
            </div>

            <ProductFilter
              categoryList={categoryList}
              categories={categoryList.categories}
              selectedCategories={selectedCategories}
              filterProducts={setSortedProducts}
              onChange={handleCheckbox}
              onPriceChange={handlePriceChange}
              priceRange={categoryList?.product_amount}
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
