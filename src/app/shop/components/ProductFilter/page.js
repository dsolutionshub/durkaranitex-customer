"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Range } from "react-range";

const STEP = 100;

function formatPrice(value) {
  const amount = Number(value);
  if (Number.isNaN(amount)) {
    return value || "0";
  }
  return amount.toLocaleString("en-IN");
}

const ProductFilter = ({
  categoryList,
  categories = [],
  selectedCategories = [],
  filterProducts,
  onChange,
  onPriceChange,
  openFilter,
  handleOpenFilter,
  priceObj,
}) => {
  const minValue = parseFloat(categoryList?.product_amount?.min) || 0;
  const maxValue = parseFloat(categoryList?.product_amount?.max) || 1000;
  const [mounted, setMounted] = useState(false);
  const [values, setValues] = useState([minValue, maxValue]);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const debounceRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }
    document.body.style.overflow = openFilter ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openFilter]);

  useEffect(() => {
    if (priceObj && Object.keys(priceObj).length > 0) {
      setValues([priceObj.min || minValue, priceObj.max || maxValue]);
    } else {
      setValues([minValue, maxValue]);
    }
  }, [categoryList, priceObj, minValue, maxValue]);

  useEffect(() => {
    setShowPriceFilter(parseInt(minValue, 10) === parseInt(maxValue, 10));
  }, [minValue, maxValue, openFilter]);

  const handleChange = (newValues) => {
    setValues(newValues);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      onPriceChange({ min: newValues[0], max: newValues[1] });
      const filteredProducts = categories.filter(
        (item) => item.price >= newValues[0] && item.price <= newValues[1]
      );
      filterProducts(filteredProducts);
    }, 500);
  };

  const handleCategoryClick = (categoryID) => {
    if (selectedCategories?.includes(categoryID)) {
      onChange(selectedCategories.filter((id) => id !== categoryID));
      return;
    }
    onChange([...(selectedCategories || []), categoryID]);
  };

  if (!mounted) {
    return null;
  }

  const categoryCount = (category) =>
    category?.productCount || category?.product_count || 0;

  const rangeSpan = maxValue - minValue || 1;
  const percentage1 = ((values[0] - minValue) / rangeSpan) * 100;
  const percentage2 = ((values[1] - minValue) / rangeSpan) * 100;

  return createPortal(
    <>
      <div
        className={`aq-shop-body-overlay${openFilter ? " opened" : ""}`}
        onClick={handleOpenFilter}
        aria-hidden={!openFilter}
      />
      <aside
        className={`aq-shop-filter aq-sidebar-bg aq-filter-active d-flex flex-column justify-content-between${
          openFilter ? " opened" : ""
        }`}
        aria-hidden={!openFilter}
      >
        <button type="button" className="aq-sidebar-close" onClick={handleOpenFilter}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M13 1L1 13M1 1L13 13"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="aq-product-sidebar-offcanvas">
          <h4 className="aq-product-sidebar-offcanvas-title">Filters</h4>
          <div className="aq-product-sidebar-wrap">
            <div className="aq-product-sidebar-widget mb-25">
              <div
                className={`aq-product-sidebar-widget-top${categoryOpen ? "" : " collapsed"}`}
                onClick={() => setCategoryOpen((open) => !open)}
              >
                <h3 className="aq-product-sidebar-widget-title">Products Category</h3>
                <span className="aq-product-sidebar-item-close">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                    <path
                      d="M0.75 0.75L5.75 5.75L10.75 0.75"
                      stroke="#141414"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              {categoryOpen && (
                <div className="aq-product-sidebar-widget-content">
                  <div className="aq-product-sidebar-widget-categories">
                    <ul>
                      <li>
                        <button
                          type="button"
                          className={!selectedCategories?.length ? "active" : undefined}
                          onClick={() => onChange([])}
                        >
                          All ({categories?.reduce((sum, cat) => sum + categoryCount(cat), 0) || 0})
                        </button>
                      </li>
                      {categories?.map((category) => (
                        <li key={category?.id}>
                          <button
                            type="button"
                            className={
                              selectedCategories?.includes(category?.id) ? "active" : undefined
                            }
                            onClick={() => handleCategoryClick(category?.id)}
                          >
                            {category?.name} ({categoryCount(category)})
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="aq-product-sidebar-widget mb-25">
              <div
                className={`aq-product-sidebar-widget-top${priceOpen ? "" : " collapsed"}`}
                onClick={() => setPriceOpen((open) => !open)}
              >
                <h3 className="aq-product-sidebar-widget-title no-border">Price</h3>
                <span className="aq-product-sidebar-item-close">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                    <path
                      d="M0.75 0.75L5.75 5.75L10.75 0.75"
                      stroke="#141414"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              {priceOpen && (
                <div className="aq-product-sidebar-widget-content">
                  <div className="aq-product-sidebar-widget-filter pt-10">
                    {showPriceFilter ? (
                      <p>All products have the same price.</p>
                    ) : (
                      <Range
                        values={values}
                        step={STEP}
                        min={minValue}
                        max={maxValue}
                        onChange={handleChange}
                        renderTrack={({ props, children }) => {
                          const { key, ...rest } = props;
                          return (
                            <div
                              key={key}
                              {...rest}
                              className="aq-shop-range"
                              style={{
                                ...rest.style,
                                background: `linear-gradient(to right, #ededed 0%, #ededed ${percentage1}%, #141414 ${percentage1}%, #141414 ${percentage2}%, #ededed ${percentage2}%, #ededed 100%)`,
                              }}
                            >
                              {children}
                            </div>
                          );
                        }}
                        renderThumb={({ props }) => {
                          const { key, ...rest } = props;
                          return <div key={key} {...rest} className="aq-shop-range-thumb" />;
                        }}
                      />
                    )}
                    <div className="aq-product-sidebar-widget-filter-info d-flex align-items-center justify-content-between">
                      <span className="input-range">
                        Rs. {formatPrice(values[0])} — Rs. {formatPrice(values[1])}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>,
    document.body
  );
};

export default ProductFilter;
