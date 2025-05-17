"use client";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import Link from "next/link";
import useCartStore from "@/store/useCartStore";
import { FaTrash } from "react-icons/fa";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    { id: 1, name: "Silk Saree", price: "2,500", oldPrice: '4000', image: "/images/15.jpeg" },
    { id: 2, name: "Men's Kurta", price: "1,800", oldPrice: '3000', image: "/images/16.jpeg" },
    { id: 3, name: "Designer Blouse", price: "1,200", oldPrice: '3000', image: "/images/17.jpeg" },
  ]);

  const data = useCartStore((state)=>state.wishItems)
  const removeFromWishlist = useCartStore((state)=>state.removeFromWishlist)
  
  // const removeFromWishlist = (id) => {
  //   setWishlist(wishlist.filter((item) => item.id !== id));
  // };

  return (
    <div className="container mt-4">
      <h2 className="mb-5 text-center text-dark fs-3">My Wishlist</h2>

      <div className="row mb-5">
        {data.length > 0 ? (
          data.map((item) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={item.id}>
              <div className="block-4 text-center border position-relative">
                <figure className="block-4-image position-relative">
                  <a href="/product-detail">
                    <Image
                      src={item.imgSrc}
                      alt={item.title}
                      width={400}
                      height={400}
                      className="img-fluid rounded"
                    />
                  </a>

                  <span
                    className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 rounded"
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

                <div className="block-4-text p-1">
                  <h5 className="mb-1">
                    <a
                      href="/product-detail"
                      className="text-dark"
                      style={{ fontSize: "1rem" }}
                    >
                      {item.title}
                    </a>
                  </h5>
                  <p className="mb-1">
                    <span className="text-primary fw-bold">
                      Rs. {item.price}
                    </span>{" "}
                    <span className="text-muted text-decoration-line-through">
                      Rs. {item.oldPrice}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="mb-5 text-center text-dark fs-5">  No products were added to the wishlist page.{" "}
            <Link href="/shop" className="text-primary fw-bold">Back to shopping</Link></p>
        )}
      </div>

    </div>
  );
};

export default Wishlist;
