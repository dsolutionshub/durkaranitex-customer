"use client";

import React, { useEffect, useState, useRef } from "react";
import { Sidebar } from "primereact/sidebar";
import { Range } from "react-range";
import { IoClose } from "react-icons/io5";

const STEP = 100;

function FilterComponent({
  categories,
  selectedCategories,
  handleChange,
  handleCheckboxChange,
  values,
  MIN,
  MAX,
}) {
  return (
    <>
      <div className="border px-4 py-3 rounded mb-4">
        <h3 className="mb-3 h6 text-uppercase text-black d-block">
          Categories
        </h3>
        <ul
          className="list-none pl-0 mb-0 overflow-y-auto scrollbar-hide-on-idle"
          style={{ maxHeight: "32rem", paddingLeft: "0px" }}
        >
          {categories?.map((category) => (
            <li
              key={category?.id}
              className="flex items-start justify-between gap-2 mb-2"
            >
              <div className="flex items-start cursor-pointer gap-2">
                <input
                  id={category?.id}
                  type="checkbox"
                  value={category?.id}
                  checked={selectedCategories?.includes(category?.id)}
                  onChange={(e) =>
                    handleCheckboxChange(e.target.checked, category?.id)
                  }
                  className="form-checkbox h-4 w-4 cursor-pointer"
                  style={{
                    accentColor: "var(--bs-primary)",
                    marginTop: ".4rem",
                  }}
                />
                <label
                  htmlFor={category?.id}
                  className="text-md text-black mb-0 cursor-pointer"
                  title={category.name}
                >
                  {category.name}
                </label>
              </div>
              <span className="text-md text-black">
                ({category?.productCount})
              </span>
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
            renderTrack={({ props, children }) => {
              const percentage1 = ((values[0] - MIN) / (MAX - MIN)) * 100;
              const percentage2 = ((values[1] - MIN) / (MAX - MIN)) * 100;

              return (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: ".2rem",
                    width: "100%",
                    borderRadius: "4px",
                    background: `linear-gradient(to right, 
  gray 0%, 
  gray ${percentage1}%, 
  black ${percentage1}%, 
  black ${percentage2}%, 
  gray ${percentage2}%, 
  gray 100%)`,
                  }}
                >
                  {children}
                </div>
              );
            }}
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
          Price:{" "}
          <span className="fw-bold">
            Rs. {values[0]} – Rs. {values[1]}
          </span>
        </div>
      </div>
    </>
  );
}

const ProductFilter = ({
  categoryList,
  categories = [],
  selectedCategories = [],
  filterProducts,
  onChange,
  onPriceChange,
  priceRange = { min: 50, max: 900 },
  openFilter,
  handleOpenFilter,
}) => {
  const [values, setValues] = useState([priceRange.min, priceRange.max]);

  const debounceRef = useRef(null);

  const handleChange = (newValues) => {
    setValues(newValues);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      onPriceChange({ min: newValues[0], max: newValues[1] });

      const filteredProducts = categories.filter(
        (item) => item.price >= newValues[0] && item.price <= newValues[1]
      );
      filterProducts(filteredProducts);
    }, 500);
  };

  const handleCheckboxChange = (isChecked, categoryID) => {
    if (isChecked) {
      onChange([...selectedCategories, categoryID]);
    } else {
      onChange(selectedCategories?.filter((id) => id !== categoryID));
    }
  };

  useEffect(() => {
    setValues([
      parseFloat(categoryList?.product_amount?.min) || 0,
      parseFloat(categoryList?.product_amount?.max) || 1000,
    ]);
  }, [categoryList]);

  return (
    <>
      <div className="col-md-3 order-1 mb-5 mb-md-0 hidden xl:block">
        <FilterComponent
          categoryList={categoryList}
          categories={categories}
          selectedCategories={selectedCategories}
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange}
          values={values}
          MIN={parseFloat(categoryList?.product_amount?.min)}
          MAX={parseFloat(categoryList?.product_amount?.max)}
        />
      </div>

      <Sidebar
        visible={openFilter}
        position="left"
        onHide={handleOpenFilter}
        showCloseIcon={false}
        className="cart-sidebar xl:hidden h-full"
      >
        <div className="bg-white h-full w-full max-w-md right-0 product-filter-scroll">
          <div className="pt-4 flex items-center justify-between mb-3">
            <h4 className="dark-color">Filter</h4>
            <IoClose
              onClick={handleOpenFilter}
              className="dark-color cursor-pointer"
            />
          </div>
          <FilterComponent
            categoryList={categoryList}
            categories={categories}
            selectedCategories={selectedCategories}
            handleChange={handleChange}
            handleCheckboxChange={handleCheckboxChange}
            values={values}
            MIN={parseFloat(categoryList?.product_amount?.min)}
            MAX={parseFloat(categoryList?.product_amount?.max)}
          />
        </div>
      </Sidebar>
    </>
  );
};

export default ProductFilter;
