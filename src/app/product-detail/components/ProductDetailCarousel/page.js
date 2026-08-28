"use client";

import Image from "next/image";

export default function ImageCarousel({
  images = [],
  selectedIndex,
  setSelectedIndex,
  loading,
  onZoom,
}) {
  const list = (images || []).filter((img) => img?.image);
  const current = list[selectedIndex] || list[0];

  const go = (direction) => {
    if (!list.length) {
      return;
    }
    const next = (selectedIndex + direction + list.length) % list.length;
    setSelectedIndex(next);
  };

  if (loading) {
    return (
      <div className="product-slider-for-img" aria-hidden>
        <span className="d-none">loading</span>
      </div>
    );
  }

  return (
    <div className="product-details-slider-wrap aq-sticky-on">
      <div className="row">
        {list.length > 1 ? (
          <div className="col-xl-2">
            <div className="product-slider-nav slider-nav">
              {list.map((img, index) => (
                <button
                  type="button"
                  key={img?.id || img?.image || index}
                  className={`product-slider-nav-img${
                    index === selectedIndex ? " is-current" : ""
                  }`}
                  onClick={() => setSelectedIndex(index)}
                >
                  <Image
                    src={img.image}
                    alt=""
                    width={85}
                    height={135}
                  />
                </button>
              ))}
            </div>
          </div>
        ) : null}
        <div className={list.length > 1 ? "col-xl-10" : "col-xl-12"}>
          <div className="product-slider-main-wrap p-relative">
            <div className="product-slider-main slider-for p-relative">
              <div className="product-slider-for-img">
                {current?.image ? (
                  <a
                    className="popup-image"
                    href={current.image}
                    onClick={(event) => {
                      event.preventDefault();
                      onZoom?.(current.image);
                    }}
                  >
                    <Image
                      src={current.image}
                      alt="Product"
                      width={580}
                      height={780}
                    />
                  </a>
                ) : (
                  <div className="d-flex h-100 w-100 align-items-center justify-content-center">
                    No Image
                  </div>
                )}
              </div>
            </div>
            {list.length > 1 && (
              <div className="product-slider-arrow">
                <button type="button" onClick={() => go(-1)} aria-label="Previous">
                  <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
                    <path d="M5.75 10.75L0.75 5.75L5.75 0.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button type="button" className="slick-next" onClick={() => go(1)} aria-label="Next">
                  <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
                    <path d="M0.75 10.75L5.75 5.75L0.75 0.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
