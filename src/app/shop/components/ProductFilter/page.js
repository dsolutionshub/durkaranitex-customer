"use client";

import React, { useState } from "react";
import { Range } from "react-range";


const MIN = 50;
const MAX = 900;
const STEP = 100;

const ProductFilter = ({
  categories = [],
  selectedCategories = [],
  filterProducts,
  onChange,
  onPriceChange,
  priceRange = { min: 50, max: 900 },
}) => {
  const [values, setValues] = useState([priceRange.min, priceRange.max]);

  const handleChange = (values) => {
    setValues(values);
    onPriceChange({ min: values[0], max: values[1] });

    const filteredProducts = categories.filter(
      (item) => item.price >= values[0] && item.price <= values[1]
    );

    filterProducts(filteredProducts);
  };

  const handleCheckboxChange = (event, categoryName) => {
    if (event.target.checked) {
      console.log(event.target.checked);
      onChange([...selectedCategories, categoryName]);
    } else {
      onChange(selectedCategories?.filter((name) => name !== categoryName));
    }
  };

  return (
    <div className="col-md-3 order-1 mb-5 mb-md-0">
      <div className="border px-4 py-3 rounded mb-4">
        <h3 className="mb-3 h6 text-uppercase text-black d-block">
          Categories
        </h3>
        <ul
          className="list-none pl-0 mb-0 overflow-y-auto"
          style={{
            maxHeight: "15rem",
          }}
        >
          {categories?.map((category) => (
            <li
              key={category?.id}
              className="flex items-center justify-between mb-2"
            >
              <div className="flex items-center cursor-pointer gap-2">
                <input
                  id={category?.id}
                  type="checkbox"
                  checked={selectedCategories?.includes(category.name)}
                  onChange={(e) => handleCheckboxChange(e, category.name)}
                  className="form-checkbox h-4 w-4 cursor-pointer"
                  style={{
                    accentColor: "var(--bs-primary)",
                  }}
                />
                <label
                  htmlFor={category?.name}
                  className="text-md text-black mb-0 cursor-pointer"
                >
                  {category.name}
                </label>
              </div>
              <span className="text-md text-black">({category.count})</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border px-4 py-3 rounded mb-4">
        <h3 className="mb-3 h6 text-uppercase text-black d-block">
          Filter by Price
        </h3>
        <div className="max-w-xl mx-auto px-1">
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Rs. {values[0]}</span>
            <span>Rs. {values[1]}</span>
          </div>

          <Range
            values={values}
            step={STEP}
            min={MIN}
            max={MAX}
            onChange={handleChange}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: ".2rem",
                  width: "100%",
                  borderRadius: "4px",
                  background: "#000",
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => {
              const { key, ...rest } = props;
              return (
                <div
                  key={key}
                  {...rest}
                  style={{
                    ...rest.style,
                    height: "20px",
                    width: "20px",
                    borderRadius: "50%",
                    backgroundColor: "#000",
                    border: "2px solid white",
                    boxShadow: "0 0 3px rgba(0,0,0,0.3)",
                  }}
                />
              );
            }}
          />
        </div>
        <div className="mt-4 text-sm text-gray-700">
          Selected Price Range: Rs. {values[0]} – Rs. {values[1]}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
