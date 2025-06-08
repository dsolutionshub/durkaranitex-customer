"use client";

import { useState } from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";

import useCartStore from "@/store/useCartStore";
import { ProductInfo } from "../components/ProductCard";

import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";

const Wishlist = () => {
  const router = useRouter();
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      title: "Silk Saree",
      price: "2,500",
      oldPrice: "4000",
      imgSrc: "/images/15.jpeg",
    },
    {
      id: 2,
      title: "Cotton Saree",
      price: "1,800",
      oldPrice: "3000",
      imgSrc: "/images/16.jpeg",
    },
    {
      id: 3,
      title: "Designer Saree",
      price: "1,200",
      oldPrice: "3000",
      imgSrc: "/images/17.jpeg",
    },
  ]);

  const data = useCartStore((state) => state.wishItems);
  const removeFromWishlist = useCartStore((state) => state.removeFromWishlist);

  // const removeFromWishlist = (id) => {
  //   setWishlist(wishlist.filter((item) => item.id !== id));
  // };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center text-dark fs-3">My Wishlist</h2>

      <div className="row mb-5 wishlist-card">
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={item.id}>
              <div className="block-4   position-relative">
                <figure className="block-4-image position-relative mb-0">
                  <a href="/product-detail">
                    <Image
                      src={item.imgSrc}
                      alt={item.title}
                      width={400}
                      height={400}
                      className="img-fluid rounded-xl"
                    />
                  </a>

                  <span
                    className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 rounded d-none"
                    style={{ zIndex: 2, margin: "8px" }}
                  >
                    Sale
                  </span>

                  <div
                    className="position-absolute bottom-0 start-50 translate-middle-x d-flex justify-content-center mb-2"
                    style={{ width: "100%" }}
                  >
                    <button
                      className="btn btn-light border rounded-circle mx-1 d-flex align-items-center justify-content-center"
                      style={{ width: "2.5rem", height: "2.5rem" }}
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <FaTrash color="red" />
                    </button>
                    <button
                      className="btn btn-light border rounded-circle mx-1 d-flex align-items-center justify-content-center"
                      style={{ width: "2.5rem", height: "2.5rem" }}
                    >
                      🛒
                    </button>
                  </div>
                </figure>

                <ProductInfo
                  title={item?.title}
                  price={item?.price}
                  oldPrice={item?.oldPrice}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="mb-5 text-center text-dark fs-5 ">
            No products were added to the wishlist page. <br />
            <button
              className="px-6 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition mt-3"
              onClick={() => router.push("/shop")}
            >
              Back to shopping
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
