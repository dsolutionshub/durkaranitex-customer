"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import useCartPanelStore from "@/store/useCartPanelStore";
import { modifyCart, modifyWishlist, getProductList } from "../../api/services/authService";
import { getErrorMessage } from "../../utils/helperFn";
import { LOGIN_ERROR_MSG } from "../../utils/constants";
import { TrendingProductCard } from "../FeaturedProducts";
import { useCategoryList } from "@/app/hooks/useCategoryList";

import "./featured-products.css";

const TabUnderline = () => (
  <span className="aq-product-tab-btn-shape">
    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="13" viewBox="0 0 52 13" fill="none">
      <path
        d="M1.00006 8.5323C11.6061 -5.92418 33.0001 3.561 51.0001 11.0246"
        stroke="#9C362D"
        strokeWidth="2"
        strokeMiterlimit="3.8637"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

function isPublished(item) {
  return item?.is_published === "1";
}

export default function TrendingProductsGrid() {
  const router = useRouter();
  const { data: categoryData } = useCategoryList();
  const categories = useMemo(
    () =>
      (categoryData?.categories || [])
        .filter((category) => category?.id && category?.name)
        .slice(0, 3),
    [categoryData]
  );
  const [activeTab, setActiveTab] = useState(null);
  const [products, setProducts] = useState([]);
  const [wishlistMap, setWishlistMap] = useState({});
  const { handleGetCartDetail, wishlistDetails } = useCartPanelStore();

  useEffect(() => {
    if (!activeTab && categories[0]?.id) {
      setActiveTab(categories[0].id);
    }
  }, [categories, activeTab]);

  useEffect(() => {
    if (!activeTab) return undefined;
    let active = true;

    getProductList(null, null, activeTab)
      .then((response) => {
        if (!active) return;
        const list = (response?.products || []).filter(isPublished).slice(0, 8);
        setProducts(list);
        setWishlistMap(
          list.reduce((acc, item) => {
            acc[item.id] = item.wishList;
            return acc;
          }, {})
        );
      })
      .catch((error) => {
        getErrorMessage(error);
      });

    return () => {
      active = false;
    };
  }, [activeTab]);

  const addToWishlist = async (id) => {
    try {
      const data = await modifyWishlist({ product_id: id });
      setWishlistMap((prev) => ({
        ...prev,
        [id]: data?.wishlist,
      }));
      wishlistDetails();
      toast.success(data?.message);
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        sessionStorage.setItem("postLoginRedirect", "/");
        router.push("/login");
        toast.error(LOGIN_ERROR_MSG);
        return;
      }
      toast.error(getErrorMessage(error));
    }
  };

  const addToCart = async (id) => {
    try {
      const data = await modifyCart({
        product_id: id,
        quantity: 1,
        type: "list",
      });
      toast.success(data?.message);
      handleGetCartDetail();
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        sessionStorage.setItem("postLoginRedirect", "/");
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
    }
  };

  if (!categories.length) {
    return null;
  }

  return (
    <div className="aq-product-area">
      <div className="container">
        <div className="aq-product-top">
          <div className="row align-items-end">
            <div className="col-12 col-md-auto">
              <div className="aq-product-title-box text-center text-md-start">
                <h4 className="aq-section-title">Featured Products</h4>
              </div>
            </div>
            <div className="col d-none d-xl-block">
              <div className="aq-product-top-bdr">
                <span />
              </div>
            </div>
            <div className="col-12 col-md-auto ms-md-auto">
              <div className="aq-product-tab-btn aq-product-tab-btn-2 text-center text-md-end">
                <ul className="nav d-inline-flex" role="tablist">
                  {categories.map((category) => (
                    <li className="nav-item" key={category.id} role="presentation">
                      <button
                        className={`nav-links${activeTab === category.id ? " active" : ""}`}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === category.id}
                        onClick={() => setActiveTab(category.id)}
                      >
                        {category.name}
                        <TabUnderline />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-2">
          {products.map((item) => (
            <div className="col" key={`${activeTab}-${item.id}`}>
              <TrendingProductCard
                item={item}
                isInWishlist={wishlistMap[item.id]}
                onAddToCart={addToCart}
                onAddToWishlist={addToWishlist}
                showColors
                contentClassName="text-center text-md-start"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
