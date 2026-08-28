"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import BazaroProductCard from "../BazaroProductCard";
import ProductFilter from "../ProductFilter/page";
import ShopSortSelect from "../ShopSortSelect";

import { loader } from "@/app/components/loader/loaderManager";
import { getErrorMessage } from "@/app/utils/helperFn";
import { LOGIN_ERROR_MSG } from "@/app/utils/constants";
import useCartPanelStore from "@/store/useCartPanelStore";
import { useCategoryList } from "@/app/hooks/useCategoryList";
import {
  getProductList,
  modifyCart,
  modifyWishlist,
} from "@/app/api/services/authService";

import "swiper/css";
import "@/app/components/home/featured-products.css";
import "../../shop-page.css";

const SORT_OPTIONS = [
  { label: "Sort by All", value: "Sort by All" },
  { label: "Name A to Z", value: "Name A to Z" },
  { label: "Name Z to A", value: "Name Z to A" },
  { label: "Price, low to high", value: "Price low to high" },
  { label: "Price, high to low", value: "Price high to low" },
];

const LAYOUTS = ["list", "col-6", "col-4", "col-3", "col-2"];

function useDebounce(value, delay = 1000, setCurrentPage) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setCurrentPage(1);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay, setCurrentPage]);

  return debouncedValue;
}

function LayoutIcon({ layout }) {
  if (layout === "list") {
    return (
      <svg width="24" height="18" viewBox="0 0 24 18" fill="currentColor" aria-hidden>
        <circle cx="2.1" cy="3.6" r="2.1" />
        <rect x="6.4" y="2.5" width="17.2" height="2.2" rx="1.1" />
        <circle cx="2.1" cy="14.4" r="2.1" />
        <rect x="6.4" y="13.3" width="17.2" height="2.2" rx="1.1" />
      </svg>
    );
  }

  const cols =
    layout === "col-6" ? 2 : layout === "col-4" ? 3 : layout === "col-3" ? 4 : 5;
  const radius = 1.85;
  const step = 5.2;
  const width = (cols - 1) * step + radius * 2;
  const y1 = 3.6;
  const y2 = 14.4;

  return (
    <svg
      width={Math.ceil(width)}
      height="18"
      viewBox={`0 0 ${width} 18`}
      fill="currentColor"
      aria-hidden
    >
      {Array.from({ length: cols }).map((_, index) => {
        const cx = radius + index * step;
        return (
          <g key={index}>
            <circle cx={cx} cy={y1} r={radius} />
            <circle cx={cx} cy={y2} r={radius} />
          </g>
        );
      })}
    </svg>
  );
}

function Product() {
  const itemsPerPage = 16;
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const urlSearch = searchParams.get("search") || "";
  const [selectedCategories, setSelectedCategories] = useState(
    id ? [Number(id)] : []
  );

  const { handleGetCartDetail, wishlistDetails } = useCartPanelStore();
  const [priceRange, setPriceRange] = useState({});
  const [sortOption, setSortOption] = useState("Sort by All");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productList, setProductList] = useState(null);
  const { data: categoryList = {} } = useCategoryList();
  const [openFilter, setOpenFilter] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [search, setSearch] = useState(urlSearch);
  const [selectedCat, setSelectedCat] = useState("New Arrival");
  const [layout, setLayout] = useState("col-3");
  const [wishlistMap, setWishlistMap] = useState({});

  const debouncedSearch = useDebounce(search, 1000, setCurrentPage);
  const [filtersInitialized, setFiltersInitialized] = useState(false);

  useEffect(() => {
    if (urlSearch && urlSearch !== search) {
      setSearch(urlSearch);
    }
  }, [urlSearch]);

  const handlePriceChange = (range) => {
    setPriceRange(range);
    setOpenFilter(false);

    const params = new URLSearchParams(window.location.search);
    params.set("priceMin", range.min || 0);
    params.set("priceMax", range.max || 0);
    router.push(`?${params.toString()}`);
  };

  const productDetails = useCallback(
    async (filter = null) => {
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
        const list = products || [];
        setProductList(list);
        setSortedProducts(list);
        setTotalProducts(total_products || list.length || 0);
        const totalPages = Math.ceil((total_products || 0) / itemsPerPage);
        setTotalPage(totalPages);
        setWishlistMap(
          list.reduce((acc, item) => {
            acc[item.id] = item.wishList;
            return acc;
          }, {})
        );
      } catch (error) {
        getErrorMessage(error);
      } finally {
        loader(false);
      }
    },
    [currentPage, selectedCategories, priceRange, debouncedSearch]
  );

  const handleOpenFilter = () => {
    setOpenFilter((prev) => !prev);
  };

  useEffect(() => {
    if (!openFilter) {
      return undefined;
    }
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpenFilter(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, priceRange]);

  useEffect(() => {
    if (!filtersInitialized) return;

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
      default:
        productDetails();
    }
  }, [sortOption, productDetails, filtersInitialized]);

  const addToWishlist = async (productId) => {
    loader(true);
    try {
      const data = await modifyWishlist({ product_id: productId });
      setWishlistMap((prev) => ({
        ...prev,
        [productId]: data?.wishlist,
      }));
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

  const addToCart = async (productId) => {
    loader(true);
    try {
      await modifyCart({ product_id: productId, quantity: 1, type: "list" });
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

      const MSG = getErrorMessage(error);
      if (MSG.startsWith("Only")) {
        toast.error(`Max quantity reached. ${MSG}`);
      } else {
        toast.error(MSG);
      }
    } finally {
      loader(false);
    }
  };

  const handleCheckbox = (arr) => {
    setSelectedCategories(arr);

    const params = new URLSearchParams(window.location.search);
    if (arr.length) {
      params.set("categories", arr.join(","));
    } else {
      params.delete("categories");
    }
    router.push(`?${params.toString()}`);
  };

  const handleCategoryChip = (categoryId) => {
    const next = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((value) => value !== categoryId)
      : [categoryId];
    handleCheckbox(next);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const categories = params.get("categories");
    if (categories) {
      setSelectedCategories(categories.split(",").map(Number));
    }

    const min = parseInt(params.get("priceMin")) || 0;
    const max = parseInt(params.get("priceMax")) || 0;
    if (min || max) {
      setPriceRange({ min, max });
    }

    setFiltersInitialized(true);
  }, []);

  useEffect(() => {
    const queryString = searchParams.toString();
    if (queryString) {
      sessionStorage.setItem("shopQueryParams", queryString);
    }
  }, [searchParams]);

  useEffect(() => {
    if (
      Array.isArray(categoryList?.categories) &&
      selectedCategories?.length === 1
    ) {
      const matchedCategory = categoryList.categories.find(
        (cat) => String(cat.id).trim() === String(selectedCategories[0]).trim()
      );
      setSelectedCat(matchedCategory?.name || "New Arrival");
    } else {
      setSelectedCat("New Arrival");
    }
  }, [categoryList, selectedCategories]);

  const published = (productList || []).filter(
    (item) => item?.is_published === "1"
  );
  const categories = categoryList?.categories || [];
  const isList = layout === "list";
  const pageNumbers = Array.from({ length: totalPage }, (_, index) => index + 1);

  return (
    <div className="aq-shop-page">
      <div className="aq-breadcrumb-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-12">
              <div className="aq-breadcrumb-wrap text-center">
                <div className="pd-breadcrumb-list mb-10">
                  <span>
                    <Link href="/">home</Link>
                  </span>
                  <span>/</span>
                  <span>
                    <Link href="/shop">shop</Link>
                  </span>
                </div>
                <div className="aq-breadcrumb-content">
                  <h2 className="aq-breadcrumb-title fs-44">{selectedCat}</h2>
                  <p>Shop through our latest selection of Fashion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {categories.length > 0 && (
        <div className="aqf-categories-area inner-categories-style pt-80">
          <div className="container">
            <Swiper
              className="aqf-categories-active"
              modules={[Autoplay]}
              slidesPerView={8}
              spaceBetween={20}
              speed={1000}
              loop={categories.length > 8}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                0: { slidesPerView: 3, spaceBetween: 10 },
                576: { slidesPerView: 4, spaceBetween: 10 },
                768: { slidesPerView: 5, spaceBetween: 10 },
                992: { slidesPerView: 6, spaceBetween: 20 },
                1200: { slidesPerView: 8, spaceBetween: 20 },
              }}
            >
              {categories.map((category) => (
                <SwiperSlide key={category.id}>
                  <div
                    className={`aqf-categories-item text-center${
                      selectedCategories.includes(category.id) ? " is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleCategoryChip(category.id)}
                    >
                      <div className="aqf-categories-img">
                        {category?.image || category?.thumbnail || category?.banner ? (
                          <Image
                            src={
                              category.image ||
                              category.thumbnail ||
                              category.banner
                            }
                            alt={category.name || "Category"}
                            width={140}
                            height={140}
                          />
                        ) : (
                          <span className="aqf-categories-fallback">
                            {(category.name || "C").charAt(0)}
                          </span>
                        )}
                      </div>
                      <span>{category.name}</span>
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      <div className="aq-product-area pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="aq-product-wrap">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="aq-product-sidebar-top pb-10">
                      <div className="row align-items-center aq-shop-toolbar-row">
                        <div className="col-4">
                          <div className="aq-product-sidebar-left mb-20">
                            <button
                              type="button"
                              className="aq-product-filter-btn"
                              onClick={handleOpenFilter}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="13"
                                height="12"
                                viewBox="0 0 13 12"
                                fill="none"
                              >
                                <path
                                  d="M11.75 0.75H0.750015L5.15002 6.00556V9.63889L7.35002 10.75V6.00556L11.75 0.75Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>{" "}
                              Filter
                            </button>
                            <div className="aq-product-sidebar-text d-none d-lg-block">
                              <p className="mb-0">
                                There are {totalProducts} results in total
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="aq-layout-switcher mb-20">
                            <ul className="aq-layout-switcher-list d-flex justify-content-md-center">
                              {LAYOUTS.map((item) => (
                                <li
                                  key={item}
                                  data-layout={item}
                                  className={`aq-layout-switcher-item${
                                    layout === item ? " active" : ""
                                  }`}
                                  onClick={() => setLayout(item)}
                                >
                                  <div className="aq-layout-switcher-icon">
                                    <LayoutIcon layout={item} />
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="aq-product-sidebar-right justify-content-end mb-20">
                            <p>Sort by:</p>
                            <ShopSortSelect
                              options={SORT_OPTIONS}
                              value={sortOption}
                              onChange={setSortOption}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {published.length === 0 ? (
                      <p className="aq-shop-empty">No products found.</p>
                    ) : isList ? (
                      <div id="aq-listLayout" className="aq-list-layout-wrap aq-list-layout">
                        {published.map((item) => (
                          <BazaroProductCard
                            key={item.id}
                            item={item}
                            variant="list"
                            isInWishlist={wishlistMap[item.id]}
                            onAddToCart={addToCart}
                            onAddToWishlist={addToWishlist}
                          />
                        ))}
                      </div>
                    ) : (
                      <div
                        id="aq-gridLayout"
                        className={`aq-grid-layout aq-${layout}`}
                      >
                        {published.map((item) => (
                          <BazaroProductCard
                            key={item.id}
                            item={item}
                            variant="grid"
                            isInWishlist={wishlistMap[item.id]}
                            onAddToCart={addToCart}
                            onAddToWishlist={addToWishlist}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {totalPage > 1 && (
            <div className="aq-product-bottom">
              <div className="row">
                <div className="col-lg-12">
                  <div className="aq-pagination">
                    <nav>
                      <ul className="justify-content-center">
                        {pageNumbers.map((page) => (
                          <li key={page}>
                            {page === currentPage ? (
                              <span className="current">{page}</span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  scrollToTop();
                                  setCurrentPage(page);
                                }}
                              >
                                {page}
                              </button>
                            )}
                          </li>
                        ))}
                        {currentPage < totalPage && (
                          <li>
                            <button
                              type="button"
                              onClick={() => {
                                scrollToTop();
                                setCurrentPage(currentPage + 1);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="12"
                                viewBox="0 0 15 12"
                                fill="none"
                              >
                                <path
                                  d="M13.7498 5.97108H0.75M13.7498 5.97108L8.50674 0.75M13.7498 5.97108L8.50674 11.1923"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </li>
                        )}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ProductFilter
        categoryList={categoryList}
        categories={categories}
        selectedCategories={selectedCategories}
        filterProducts={setSortedProducts}
        onChange={handleCheckbox}
        onPriceChange={handlePriceChange}
        priceRange={categoryList?.product_amount}
        priceObj={priceRange}
        openFilter={openFilter}
        handleOpenFilter={handleOpenFilter}
      />
    </div>
  );
}

export default Product;
