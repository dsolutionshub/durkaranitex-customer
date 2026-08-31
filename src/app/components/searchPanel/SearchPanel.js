"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { getProductList } from "@/app/api/services/authService";

const FALLBACK_IMAGE = "/images/home/KCLogo.png";

function formatPrice(value) {
  const amount = Number(value);
  if (Number.isNaN(amount)) {
    return value || "0";
  }
  return amount.toLocaleString("en-IN");
}

function formatStock(quantity) {
  const qty = Number(quantity);
  if (Number.isNaN(qty) || qty <= 0) {
    return { label: "Out of Stock", outOfStock: true };
  }
  const display = Number.isInteger(qty) ? qty : qty % 1 === 0 ? Math.trunc(qty) : qty;
  return { label: `${display} in Stock`, outOfStock: false };
}

function getProductImage(item) {
  return item?.images?.[0]?.image || item?.image || FALLBACK_IMAGE;
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M12.75 0.75L0.75 12.75M0.75 0.75L12.75 12.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchSubmitIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M13.6792 12.6197C13.3863 12.3268 12.9114 12.3268 12.6185 12.6197C12.3256 12.9126 12.3256 13.3875 12.6185 13.6804L13.1489 13.15L13.6792 12.6197ZM13.1489 13.15L12.6185 13.6804L16.2185 17.2803L16.7489 16.75L17.2792 16.2197L13.6792 12.6197L13.1489 13.15ZM15.1499 7.94997H15.8999C15.8999 3.55932 12.3406 0 7.94997 0V0.75V1.5C11.5122 1.5 14.3999 4.38775 14.3999 7.94997H15.1499ZM7.94997 0.75V0C3.55932 0 0 3.55932 0 7.94997H0.75H1.5C1.5 4.38775 4.38775 1.5 7.94997 1.5V0.75ZM0.75 7.94997H0C0 12.3406 3.55932 15.8999 7.94997 15.8999V15.1499V14.3999C4.38775 14.3999 1.5 11.5122 1.5 7.94997H0.75ZM7.94997 15.1499V15.8999C12.3406 15.8999 15.8999 12.3406 15.8999 7.94997H15.1499H14.3999C14.3999 11.5122 11.5122 14.3999 7.94997 14.3999V15.1499Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function SearchPanel({ open, onClose }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const requestIdRef = useRef(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 450);

    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    const query = searchQuery.trim();

    if (!query) {
      requestIdRef.current += 1;
      setResults([]);
      setLoading(false);
      setHasSearched(false);
      return undefined;
    }

    if (!open) {
      return undefined;
    }

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setLoading(true);

    const timer = window.setTimeout(async () => {
      try {
        const response = await getProductList(1, null, null, null, null, query);
        if (requestId !== requestIdRef.current) {
          return;
        }
        setResults(response?.products || response?.data?.products || []);
        setHasSearched(true);
      } catch {
        if (requestId !== requestIdRef.current) {
          return;
        }
        setResults([]);
        setHasSearched(true);
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    }, 350);

    return () => window.clearTimeout(timer);
  }, [searchQuery, open]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    onClose();
    if (query) {
      router.push(`/shop?search=${encodeURIComponent(query)}`);
    } else {
      router.push("/shop");
    }
  };

  const query = searchQuery.trim();

  return (
    <div className={`aq-search-wrap aq-search-area${open ? " opened" : ""}`}>
      <button
        type="button"
        className="aq-search-close"
        aria-label="Close search"
        onClick={onClose}
      >
        <CloseIcon />
      </button>
      <div className="aq-search-inner-wrap">
        <h4 className="aq-search-panel-title">Search</h4>
        <form className="aq-search-input p-relative mb-30" onSubmit={handleSearchSubmit}>
          <input
            ref={inputRef}
            type="text"
            placeholder="What are you looking for?"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <button type="submit" className="aq-search-input-btn">
            <SearchSubmitIcon />
          </button>
        </form>

        {query ? (
          <div className="aq-search-results">
            {loading && results.length === 0 ? (
              <p className="aq-search-status">Searching...</p>
            ) : null}
            {!loading && hasSearched && results.length === 0 ? (
              <p className="aq-search-status">No products found</p>
            ) : null}
            {results.length > 0 ? (
              <ul className="aq-search-result-list">
                {results.map((item) => {
                  const stock = formatStock(item?.quantity);
                  const showOldPrice =
                    item?.product_price && Number(item.product_price) > Number(item.price);

                  return (
                    <li key={item?.id}>
                      <Link
                        href={`/product-detail?id=${item?.id}`}
                        className="aq-search-result-card"
                        onClick={onClose}
                      >
                        <span className="aq-search-result-thumb">
                          <Image
                            src={getProductImage(item)}
                            alt={item?.title || "Product"}
                            width={72}
                            height={72}
                          />
                        </span>
                        <span className="aq-search-result-body">
                          <span className="aq-search-result-name">{item?.title}</span>
                          <span className="aq-search-result-meta">
                            <span className="aq-search-result-price">
                              Rs. {formatPrice(item?.price)}
                              {showOldPrice ? (
                                <del>Rs. {formatPrice(item.product_price)}</del>
                              ) : null}
                            </span>
                            <span
                              className={`aq-search-result-stock${
                                stock.outOfStock ? " is-oos" : ""
                              }`}
                            >
                              {stock.label}
                            </span>
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : null}
            {hasSearched && results.length > 0 ? (
              <Link
                href={`/shop?search=${encodeURIComponent(query)}`}
                className="aq-search-view-all"
                onClick={onClose}
              >
                View all results
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
