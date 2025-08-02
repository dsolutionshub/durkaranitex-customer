"use client";

import React, { useEffect, useState } from "react";

const ProductPagination = ({ totalPages, currentPage, onPageChange }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const maxPagesToShow = isMobile ? 3 : 5;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handleJumpBack = () => {
    onPageChange(Math.max(1, currentPage - 3));
  };

  const handleJumpForward = () => {
    onPageChange(Math.min(totalPages, currentPage + 3));
  };

  const getVisiblePages = () => {
    let start = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let end = start + maxPagesToShow - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxPagesToShow + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center mt-10">
      <ul className="inline-flex items-center space-x-1 sm:space-x-2">
        <li>
          <button
            onClick={handleJumpBack}
            disabled={currentPage <= 3}
            style={{
              borderRadius: "2rem",
            }}
            className={`pagination-btn py-2 text-md font-medium transition-all duration-200 ${
              currentPage <= 3
                ? "text-gray-400 cursor-not-allowed"
                : "text-green-900 hover:bg-green-100"
            }`}
          >
            &laquo;
          </button>
        </li>

        <li>
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            style={{
              borderRadius: "2rem",
            }}
            className={`px-3 py-2 text-md font-medium transition-all duration-200 ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-green-900 hover:bg-green-100"
            }`}
          >
            &lt;
          </button>
        </li>

        {visiblePages.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`text-sm font-medium transition-all duration-200 ${
                page === currentPage
                  ? "bg-green-900 text-white shadow-md"
                  : "text-green-900 hover:bg-green-100"
              }`}
              style={{
                borderRadius: "2rem",
                padding: ".5rem 1.2rem",
              }}
            >
              {page}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            style={{
              borderRadius: "2rem",
            }}
            className={`px-3 py-2 text-md font-medium transition-all duration-200 ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-green-900 hover:bg-green-100"
            }`}
          >
            &gt;
          </button>
        </li>

        <li>
          <button
            onClick={handleJumpForward}
            disabled={currentPage >= totalPages - 2}
            style={{
              borderRadius: "2rem",
            }}
            className={`pagination-btn py-2 text-md rounded-full font-medium transition-all duration-200 ${
              currentPage >= totalPages - 2
                ? "text-gray-400 cursor-not-allowed"
                : "text-green-900 hover:bg-green-100"
            }`}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProductPagination;
