"use client";

import { useEffect, useRef, useState } from "react";

export default function ShopSortSelect({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const current = options.find((option) => option.value === value) || options[0];

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`aqf-bundle-select aq-select aq-shop-nice-select${open ? " open" : ""}`}
    >
      <button
        type="button"
        className="aq-shop-sort-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        <span className="aq-shop-sort-current">{current?.label}</span>
      </button>
      <ul className="aq-shop-sort-list" role="listbox">
        {options.map((option) => (
          <li
            key={option.value}
            role="option"
            aria-selected={option.value === value}
            className={`aq-shop-sort-option${
              option.value === value ? " selected" : ""
            }`}
            onClick={() => {
              onChange(option.value);
              setOpen(false);
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
