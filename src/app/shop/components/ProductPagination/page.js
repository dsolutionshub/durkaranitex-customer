"use client";

import React from "react";

const ProductPagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center mt-10">
      <ul className="inline-flex items-center space-x-2">
        <li>
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-3 py-2 text-md font-medium transition-all duration-200 ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-green-900 hover:bg-green-100"
            }`}
          >
            &lt;
          </button>
        </li>

        {pageNumbers?.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              style={{
                borderRadius: "2rem",
                padding: ".5rem 1.2rem",
              }}
              className={`text-sm rounder-xl font-medium transition-all duration-200 ${
                page === currentPage
                  ? "bg-green-900 text-white shadow-md"
                  : "text-green-900 hover:bg-green-100"
              }`}
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
              padding: ".5rem 1.2rem",
            }}
            className={`text-lg rounder-lg font-medium transition-all duration-200 ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-green-900 hover:bg-green-100"
            }`}
          >
            &gt;
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProductPagination;
