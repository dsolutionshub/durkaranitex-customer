"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

import ProductCard from "../components/ProductCard";
import { loader } from "../components/loader/loaderManager";
import CustomBreadCrumb from "../components/CustomBreadCrumb";

import useCartPanelStore from "@/store/useCartPanelStore";
import {
  getWishlist,
  modifyCart,
  modifyWishlist,
} from "../api/services/authService";
import { LOGIN_ERROR_MSG, LOGIN_MSG, WISHLIST_MODEL } from "../utils/constants";
import { getErrorMessage } from "../utils/helperFn";

const Wishlist = () => {
  const router = useRouter();
  const { handleGetCartDetail } = useCartPanelStore();
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    loader(true);
    try {
      const data = await getWishlist();
      setWishlist(data?.WishLists || []);
    } catch (error) {
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  };

  const removeFromWishlist = async (id) => {
    loader(true);
    try {
      const data = await modifyWishlist({ product_id: id });
      fetchWishlist();
    } catch (error) {
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  };

  const addToCart = async (id) => {
    try {
      const data = await modifyCart({ product_id: id, quantity: 1 });
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

  const navigateToProductDetail = (product_id) => {
    router.push(`/product-detail?id=${product_id}`);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token || token === "undefined") {
      router.replace("/login");
      toast.error(LOGIN_MSG);
    }
  }, []);

  return (
    <>
      <CustomBreadCrumb model={WISHLIST_MODEL} />
      <div className="container mt-3">
        <h2 className="md:mb-4 text-center text-dark fs-3">My Wishlist</h2>

        <div className="row my-5 md:p-1 product-container-mobile">
          {wishlist?.length > 0 ? (
            wishlist?.map((item) => (
              <div
                className="col-md-4 col-lg-3 md:mb-4 product-list-card-mobile"
                key={item.id}
              >
                <ProductCard
                  title={item?.product?.title}
                  price={item?.product?.price}
                  oldPrice={item?.product?.product_price}
                  image={item?.product?.images[0]?.["image"]}
                  image1={item?.product?.images[1]?.["image"]}
                  isInWishlist={item?.product?.wishList}
                  type="delete"
                  btn1={() => removeFromWishlist(item?.product?.id)}
                  btn2={() => addToCart(item?.product?.id)}
                  discount={item?.product?.discount || 0}
                  onClick={() => navigateToProductDetail(item?.product_id)}
                />
              </div>
            ))
          ) : (
            <p className="mb-5 text-center text-dark fs-5">
              <Heart size={66} className="mx-auto text-gray-300 mb-3" />
              <span className="d-block fw-bold text-xl mb-2">
                Your wishlist is empty
              </span>
              Save your favorite sarees here!
              <br />
              <Link href="/shop" className="">
                <button className="bg-[var(--primary-main)] text-white py-2 px-3 rounded mt-3">
                  Explore Sarees
                </button>
              </Link>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
