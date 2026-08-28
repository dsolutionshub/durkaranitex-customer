"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";

import { useCategoryList } from "@/app/hooks/useCategoryList";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "./category-coverflow.css";

const SLIDE_COPIES = 6;
const START_COPY = 2;

function categoryImage(category) {
  return (
    category?.image ||
    category?.thumbnail ||
    category?.banner ||
    category?.cover ||
    ""
  );
}

function keepInSafeRange(swiper, count) {
  if (!swiper || swiper.destroyed || !count) {
    return;
  }

  const copy = Math.floor(swiper.activeIndex / count);
  if (copy > 0 && copy < SLIDE_COPIES - 1) {
    return;
  }

  const offset = ((swiper.activeIndex % count) + count) % count;
  swiper.slideTo(count * START_COPY + offset, 0, false);
}

export default function CategoryCoverflow() {
  const { data: categoryData } = useCategoryList();
  const [ready, setReady] = useState(false);
  const countRef = useRef(0);

  const categories = useMemo(
    () =>
      (categoryData?.categories || []).filter(
        (category) => category?.id && category?.name
      ),
    [categoryData]
  );

  const slides = useMemo(() => {
    if (!categories.length) {
      return [];
    }

    return Array.from(
      { length: categories.length * SLIDE_COPIES },
      (_, index) => categories[index % categories.length]
    );
  }, [categories]);

  countRef.current = categories.length;

  useEffect(() => {
    setReady(true);
  }, []);

  if (!slides.length) {
    return null;
  }

  return (
    <div className="aqf-category-2-area">
      <div className="aqf-category-2-slider">
        {ready ? (
          <Swiper
            key={categories.length}
            className="aqf-category-2-active"
            modules={[EffectCoverflow, Autoplay]}
            effect="coverflow"
            grabCursor
            centeredSlides
            loop={false}
            initialSlide={categories.length * START_COPY}
            slidesPerView={3}
            speed={900}
            watchOverflow={false}
            watchSlidesProgress
            autoplay={{
              enabled: true,
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 150,
              modifier: 2,
              slideShadows: false,
            }}
            breakpoints={{
              0: { slidesPerView: 1.15 },
              576: { slidesPerView: 2.15 },
              768: { slidesPerView: 2.35 },
              1200: { slidesPerView: 3.15 },
              1400: { slidesPerView: 3.15 },
            }}
            onTransitionEnd={(swiper) => {
              keepInSafeRange(swiper, countRef.current);
            }}
            onTouchEnd={(swiper) => {
              keepInSafeRange(swiper, countRef.current);
            }}
          >
            {slides.map((category, index) => {
              const image = categoryImage(category);
              const href = `/shop?id=${category.id}`;

              return (
                <SwiperSlide key={`${category.id}-${index}`}>
                  <div className="aqf-category-2-item aqf-category-2-overlay p-relative">
                    <div className="aqf-category-2-thumb">
                      {image ? (
                        <img src={image} alt={category.name} draggable="false" />
                      ) : (
                        <span className="aqf-category-2-fallback">
                          {(category.name || "C").charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="aqf-category-2-content">
                      <h4 className="aq-section-title">
                        <Link href={href}>{category.name}</Link>
                      </h4>
                      <Link className="aq-btn-black blur-bg" href={href}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : null}
      </div>
    </div>
  );
}
