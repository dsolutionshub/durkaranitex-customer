"use client";
import React from "react";

const sortOptions = [
  "Sort by All",
  "Name A to Z",
  "Name Z to A",
  "Price low to high",
  "Price high to low",
];

const SortProduct = ({ selected, onChange }) => {
  return (
    <div className="w-30">
      <select
        id="sort"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full px-2 py-2 text-sm font-medium text-gray-800 
               border border-green-700 rounded-md shadow-md 
               bg-white hover:border-green-800 focus:outline-none 
               focus:ring-2 focus:ring-green-600 focus:border-green-700 
               transition duration-150 ease-in-out"
      >
        {sortOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortProduct;
