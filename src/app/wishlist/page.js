"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

import ProductCard from "../components/ProductCard";
import { loader } from "../components/loader/loaderManager";
import CustomBreadCrumb from "../components/CustomBreadCrumb";

import useCartPanelStore from "@/store/useCartPanelStore";
import { getWishlist, modifyWishlist } from "../api/services/authService";
import { WISHLIST_MODEL } from "../utils/constants";
import { getErrorMessage } from "../utils/helperFn";
import { useRouter } from "next/navigation";

const Wishlist = () => {
  const router = useRouter();
  const { handleGetCartDetail } = useCartPanelStore();
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    loader(true);
    try {
      const response = await getWishlist();
      if (response?.WishLists) {
        const transformed = response.WishLists.map((item) => ({
          id: item.id,
          title: item.product.title,
          price: item.product.product_price,
          oldPrice: item.product.price,
          image: item.product.images[0]?.image || null,
        }));
        setWishlist(transformed);
      }
    } catch (error) {
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  };

  const handleOpenCart = () => {
    handleGetCartDetail();
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

  useEffect(() => {
    fetchWishlist();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token || token === "undefined") {
      router.replace("/login");
    }
  }, []);

  return (
    <>
      <CustomBreadCrumb model={WISHLIST_MODEL} />
      <div className="container mt-3">
        <h2 className="mb-4 text-center text-dark fs-3">My Wishlist</h2>

        <div className="row mb-5 wishlist-card">
          {wishlist.length > 0 ? (
            wishlist.map((item) => (
              <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={item.id}>
                <ProductCard
                  title={item.title}
                  price={item.price}
                  oldPrice={item.oldPrice}
                  image={item.image}
                  type="wishlist"
                  btn1={() => removeFromWishlist(item.id)}
                  btn2={handleOpenCart}
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
