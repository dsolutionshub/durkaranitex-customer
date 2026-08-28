"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

import BazaroProductCard from "@/app/shop/components/BazaroProductCard";
import { loader } from "../components/loader/loaderManager";
import { LoaderComponent } from "../components/loader/loader";

import useCartPanelStore from "@/store/useCartPanelStore";
import {
  getWishlist,
  modifyCart,
  modifyWishlist,
} from "../api/services/authService";
import { LOGIN_ERROR_MSG, LOGIN_MSG } from "../utils/constants";
import { getErrorMessage } from "../utils/helperFn";

import "@/app/components/home/featured-products.css";
import "./wishlist-page.css";

const Wishlist = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { handleGetCartDetail, setWishListCount } = useCartPanelStore();
  const [wishlist, setWishlist] = useState([]);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const fetchWishlist = async () => {
    loader(true);
    try {
      const data = await getWishlist();
      const items = data?.WishLists || [];
      setWishlist(items);
      setWishListCount(items.length);
    } catch (error) {
      getErrorMessage(error);
      setWishlist([]);
    } finally {
      loader(false);
      setIsPageLoading(false);
    }
  };

  const removeFromWishlist = async (id) => {
    loader(true);
    try {
      await modifyWishlist({ product_id: id });
      await fetchWishlist();
    } catch (error) {
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  };

  const addToCart = async (id) => {
    loader(true);
    try {
      await modifyCart({
        product_id: id,
        quantity: 1,
        type: "list",
      });
      toast.success("Added to cart");
      handleGetCartDetail();
    } catch (error) {
      const responseStatus = error?.response?.status;
      if (responseStatus === 401) {
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

  useEffect(() => {
    fetchWishlist();
  }, []);

  useEffect(() => {
    if (status === "loading") return;

    const token = localStorage.getItem("accessToken");
    const sessionToken = session?.user?.accessToken;
    if ((!token || token === "undefined") && !sessionToken) {
      toast.error(LOGIN_MSG);
      router.replace("/login");
    } else {
      setIsCheckingAuth(false);
    }
  }, [router, status, session]);

  if (isCheckingAuth || isPageLoading) {
    return <LoaderComponent />;
  }

  return (
    <div className="aq-wishlist-page">
      <div className="aq-breadcrumb-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-12">
              <div className="aq-breadcrumb-wrap text-center">
                <div className="pd-breadcrumb-list">
                  <span>
                    <Link href="/">home</Link>
                  </span>
                  <span>/</span>
                  <span>wishlist</span>
                </div>
                <div className="aq-breadcrumb-content">
                  <h1 className="aq-breadcrumb-title">Wishlist Page</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="aq-wishlist-area">
        <div className="container">
          {wishlist?.length > 0 ? (
            <>
              <div className="aq-product-area">
                <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-2">
                  {wishlist.map((item) => {
                    const product = item?.product || item;
                    const productId = product?.id || item?.product_id;
                    return (
                      <div className="col" key={item?.id || productId}>
                        <BazaroProductCard
                          item={product}
                          isInWishlist
                          onAddToCart={() => addToCart(productId)}
                          onAddToWishlist={() => removeFromWishlist(productId)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="aq-cart-bottom">
                <div className="aq-cart-update">
                  <Link href="/cart" className="aq-cart-update-btn">
                    Go To Cart
                  </Link>
                  <Link href="/shop" className="aq-cart-update-btn">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="aq-cart-empty">
              <h2 className="aq-cart-empty-title">Your wishlist is empty</h2>
              <p className="aq-cart-empty-text">
                Save sarees you love and find them here later.
              </p>
              <Link href="/shop" className="aq-btn-black">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Wishlist;
