"use client";

import { useEffect, useState } from "react";
import useCartStore from "@/store/useCartStore";
import { getWishlist, modifyWishlist} from "../api/services/authService";
import Link from "next/link";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
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
      console.error("Failed to fetch wishlist:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

const removeFromWishlist = async (id) => {
  try {
    const data = await modifyWishlist({ product_id: id });
    fetchWishlist(); 
  } catch (error) {
    console.error("Failed to remove item from wishlist:", error);
  }
};


  return (
    <div className="container mt-4">
      <h2 className="mb-5 text-center text-dark fs-3">My Wishlist</h2>

      <div className="row mb-5">
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
                btn2={() => console.log("Add to cart clicked")} // or your cart logic
              />
            </div>
          ))
        ) : (
          <p className="mb-5 text-center text-dark fs-5">
            No products were added to the wishlist.{" "}
            <Link href="/shop" className="text-primary fw-bold">
              Back to shopping
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
