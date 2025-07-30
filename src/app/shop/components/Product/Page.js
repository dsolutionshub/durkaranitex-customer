"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { BiFilterAlt } from "react-icons/bi";
import { useRouter, useSearchParams } from "next/navigation";

import ProductCard from "@/app/components/ProductCard";
import SortProduct from "../SortProduct.js/page";
import CustomBreadCrumb from "@/app/components/CustomBreadCrumb";
import ProductPagination from "../ProductPagination/page";
import ProductFilter from "../ProductFilter/page";

import { loader } from "@/app/components/loader/loaderManager";
import { getErrorMessage } from "@/app/utils/helperFn";
import { LOGIN_ERROR_MSG, SHOP_MODEL } from "@/app/utils/constants";
import useCartPanelStore from "@/store/useCartPanelStore";
import {
  getCategoryList,
  getProductList,
  modifyCart,
  modifyWishlist,
} from "@/app/api/services/authService";

function useDebounce(value, delay = 1000) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

function Product() {
  const itemsPerPage = 16;
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [selectedCategories, setSelectedCategories] = useState(
    id ? [Number(id)] : []
  );
  const { handleGetCartDetail, wishlistDetails } = useCartPanelStore();

  const [priceRange, setPriceRange] = useState({});
  const [sortOption, setSortOption] = useState("Sort by All");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productList, setProductList] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 1000);

  const handlePriceChange = (range) => {
    setPriceRange(range);
    setOpenFilter(false);
  };

  const productDetails = useCallback(
    async (filter = null, min = 0, max = 0) => {
      loader(true);
      try {
        let { products, total_products } = await getProductList(
          currentPage,
          filter,
          selectedCategories,
          priceRange.min !== 0 ? priceRange.min : null,
          priceRange.max !== 0 ? priceRange.max : null,
          debouncedSearch
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
    },
    [currentPage, selectedCategories, priceRange, debouncedSearch]
  );

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

  const handleOpenFilter = () => {
    setOpenFilter((prev) => !prev);
  };

  useEffect(() => {
    productDetails();
  }, [debouncedSearch, productDetails]);

  useEffect(() => {
    categoryDetails();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, priceRange]);

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
  }, [sortOption, productDetails]);

  const getCurrentQuantityInCart = (productId) => {
    const item = cartItems.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  };

  const addToWishlist = async (id) => {
    loader(true);
    try {
      const data = await modifyWishlist({ product_id: id });
      productDetails();
      wishlistDetails();
      toast.success(data?.message);
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        sessionStorage.setItem("postLoginRedirect", "/shop");
        router.push("/login");
        toast.error(LOGIN_ERROR_MSG);
        return;
      }
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  };

  const addToCart = async (id, total_quantity) => {
    const currentQty = getCurrentQuantityInCart(id);

    if (currentQty >= parseFloat(total_quantity)) {
      toast.error("Max quantity reached");
      return;
    }

    const updatedCart = cartItems.map((item) => {
      if (item.productId === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    if (!cartItems.find((item) => item.productId === id)) {
      updatedCart.push({ productId: id, quantity: 1 });
    }

    setCartItems(updatedCart);
    loader(true);
    try {
      await modifyCart({ product_id: id, quantity: 1 });
      toast.success("Added to cart");
      handleGetCartDetail();
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        sessionStorage.setItem("postLoginRedirect", "/shop");
        router.push("/login");
        toast.error(LOGIN_ERROR_MSG);
        return;
      }
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  };

  const handleCheckbox = (arr) => {
    setSelectedCategories(arr);
  };

  const navigateToProductDetail = (product_id) => {
    router.push(`/product-detail?id=${product_id}`);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <span className="input-group-text">
                        <FaSearch />
                      </span>
                    </div>

                    <div className="flex items-center gap-3 ">
                      <button
                        className={`px-4 py-2 flex items-center gap-2 bg-green-900 text-light fs-6 xl:hidden `}
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
                  productList
                    ?.filter((item) => item?.is_published === "1")
                    ?.map((item) => (
                      <div
                        className="col-md-4 col-lg-3 md:mb-4 product-list-card-mobile"
                        key={item.id}
                      >
                        <ProductCard
                          id={item?.id}
                          type="heart"
                          btn1={() => addToWishlist(item.id)}
                          btn2={() => addToCart(item.id, item?.quantity)}
                          title={item?.title}
                          price={item?.price}
                          oldPrice={item?.product_price}
                          image={item?.images?.[0]?.image}
                          image1={item?.images?.[1]?.image}
                          discount={item?.discount || 0}
                          isInWishlist={item?.wishList}
                          onClick={() => navigateToProductDetail(item?.id)}
                          quantity={item?.quantity}
                        />
                      </div>
                    ))
                )}
              </div>

              {totalPage > 1 && (
                <ProductPagination
                  totalPages={totalPage}
                  currentPage={currentPage}
                  onPageChange={(page) => {
                    scrollToTop();
                    setCurrentPage(page);
                  }}
                />
              )}
            </div>

            <ProductFilter
              categoryList={categoryList}
              categories={categoryList?.categories}
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

export default Product;
