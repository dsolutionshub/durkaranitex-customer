"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import useCartPanelStore from "@/store/useCartPanelStore";
import { getWishlist, modifyWishlist } from "../api/services/authService";
import ProductCard from "../components/ProductCard";
import { loader } from "../components/loader/loaderManager";
import { getErrorMessage } from "../utils/helperFn";

const Wishlist = () => {
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

  useEffect(() => {
    fetchWishlist();
  }, []);

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

  return (
    <div className="container mt-4">
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
          <p className="mb-5 text-center text-dark fs-5 ">
            No products were added to the wishlist page. <br />
            <Link href="/shop" className="">
              <button className="px-6 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition mt-3">
                Back to shopping
              </button>
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
