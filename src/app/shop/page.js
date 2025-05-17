"use client";

import Image from "next/image";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

import CustomPagination from "./pagination";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import useCartStore from "@/store/useCartStore";
import ProductCard from "../components/ProductCard";
import collections from "./productList.json";

const categories = [
  { name: "Semi-silk Combo", count: 2220 },
  { name: "Kubera Pattu Sarees", count: 2550 },
  { name: "Celebrity Collections", count: 2124 },
  { name: "Wedding Collections", count: 2124 },
  { name: "Silk Cotton Saree", count: 2124 },
  { name: "Tissue Silk", count: 2124 },
];

function Shop() {
  const itemsPerPage = 8;
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [isClient, setIsClient] = useState(false);

  const totalPages = Math.ceil(collections.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = collections.slice(startIndex, endIndex);

  const handlePageChange = (action) => {
    if (action === "prev") {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    } else if (action === "next") {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    } else {
      setCurrentPage(action);
    }
  };

  const addToCart = useCartStore((state) => state.addToCart);
  const wishToCart = useCartStore((state) => state.addToWishlist);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCollections = collections.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient && window.jQuery) {
      const $ = window.jQuery;

      $("#slider-range").slider({
        range: true,
        min: 0,
        max: 1000,
        values: [priceRange.min, priceRange.max],
        slide: (event, ui) => {
          setPriceRange({ min: ui.values[0], max: ui.values[1] });
          $("#amount").val(`Rs. ${ui.values[0]} - Rs. ${ui.values[1]}`);
        },
      });

      // Set the initial slider value display
      $("#amount").val(`Rs. ${priceRange.min} - Rs. ${priceRange.max}`);
    }
  }, [isClient, priceRange]);

  return (
    <>
      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0">
              <Link href="/">Home</Link> <span className="mx-2 mb-0">/</span>{" "}
              <strong className="text-black">Shop</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section" style={{ padding: "1rem" }}>
        <div className="container-fluid">
          <div className="row mb-5">
            <div className="col-md-9 order-2">
              <div className="row">
                <div className="col-md-12 mb-5">
                  <div className="d-flex justify-content-between align-items-center">
                    <h2 className="text-black h5">Shop All</h2>
                    <div className="input-group w-50">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <span className="input-group-text">
                        <FaSearch />
                      </span>
                    </div>
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm dropdown-toggle"
                        id="dropdownMenuReference"
                        data-toggle="dropdown"
                      >
                        Reference
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuReference"
                      >
                        <a className="dropdown-item" href="#">
                          Relevance
                        </a>
                        <a className="dropdown-item" href="#">
                          Name, A to Z
                        </a>
                        <a className="dropdown-item" href="#">
                          Name, Z to A
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">
                          Price, low to high
                        </a>
                        <a className="dropdown-item" href="#">
                          Price, high to low
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-5">
                {filteredCollections.map((item) => (
                  //   <div className="block-4 text-center border position-relative">
                  //     <figure className="block-4-image position-relative">
                  //       <a href="/product-detail">
                  //         <Image
                  //           src={item.imgSrc}
                  //           alt={item.title}
                  //           width={400}
                  //           height={400}
                  //           className="img-fluid rounded"
                  //         />
                  //       </a>

                  //       <span
                  //         className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 rounded"
                  //         style={{ zIndex: 2, margin: "8px" }}
                  //       >
                  //         Sale
                  //       </span>

                  //       <div
                  //         className="position-absolute bottom-0 start-50 translate-middle-x d-flex justify-content-center mb-2"
                  //         style={{ width: "100%" }}
                  //       >
                  //         <button
                  //           className="btn btn-light border rounded-circle mx-1 d-flex align-items-center justify-content-center"
                  //           style={{ width: "2.5rem", height: "2.5rem" }} onClick={() => wishToCart(item)}
                  //         >
                  //           ❤️
                  //         </button>
                  //         <button
                  //           className="btn btn-light border rounded-circle mx-1 d-flex align-items-center justify-content-center"
                  //           style={{ width: "2.5rem", height: "2.5rem" }} onClick={() => addToCart(item)}
                  //         >
                  //           🛒
                  //         </button>
                  //       </div>
                  //     </figure>

                  //     <div className="block-4-text p-1">
                  //       <h5 className="mb-1">
                  //         <a
                  //           href="/product-detail"
                  //           className="text-dark"
                  //           style={{ fontSize: "1rem" }}
                  //         >
                  //           {item.title}
                  //         </a>
                  //       </h5>
                  //       <p className="mb-1">
                  //         <span className="text-primary fw-bold">
                  //           Rs. {item.price}
                  //         </span>{" "}
                  //         <span className="text-muted text-decoration-line-through">
                  //           Rs. {item.oldPrice}
                  //         </span>
                  //       </p>
                  //     </div>
                  //   </div>
                  // </div>
                  <div
                    className="col-sm-6 col-md-4 col-lg-3 mb-4"
                    key={item.id}
                  >
                    <ProductCard
                      key={item.id}
                      title={item.title}
                      price={item.price}
                      oldPrice={item.oldPrice}
                      image={item.imgSrc}
                    />
                  </div>
                ))}
              </div>

              <div className="row">
                <div className="col-md-12 text-center">
                  <div className="site-block-27">
                    <ul>
                      <li>
                        <a href="#">&lt;</a>
                      </li>
                      <li className="active">
                        <span>1</span>
                      </li>
                      <li>
                        <a href="#">2</a>
                      </li>
                      <li>
                        <a href="#">3</a>
                      </li>
                      <li>
                        <a href="#">4</a>
                      </li>
                      <li>
                        <a href="#">5</a>
                      </li>
                      <li>
                        <a href="#">&gt;</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3 order-1 mb-5 mb-md-0">
              <div className="border p-4 rounded mb-4">
                <h3 className="mb-3 h6 text-uppercase text-black d-block">
                  Categories
                </h3>
                <ul className="list-unstyled mb-0">
                  {categories.map((category, index) => (
                    <li className="mb-1" key={index}>
                      <a href="#" className="d-flex">
                        <span>{category.name}</span>
                        <span className="text-black ml-auto">
                          ({category.count})
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border p-4 rounded mb-4">
                <div className="mb-4">
                  <h3 className="mb-3 h6 text-uppercase text-black d-block">
                    Filter by Price
                  </h3>
                  <div id="slider-range" className="border-primary"></div>
                  <input
                    type="text"
                    name="text"
                    id="amount"
                    className="form-control border-0 pl-0 bg-white"
                    disabled=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
