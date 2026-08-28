"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import ImageCarousel from "../ProductDetailCarousel/page";
import ProductAccordion from "../ProductAccordion/page";
import SimilarProduct from "../SimilarProduct/page";
import ProductTabs from "../ProductTabs";
import ShareProductBox from "../ShareProductBox/page";

import { getProductDetails } from "../../../api/services/authService";
import { getErrorMessage } from "@/app/utils/helperFn";
import { loader } from "@/app/components/loader/loaderManager";
import { useAuthStore } from "@/store/useAuthStore";
import { toastCom } from "@/app/components/toast/ToastManager";

import "../../product-details.css";
import "@/app/components/home/featured-products.css";

const ProductDetails = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const { isLoggedIn } = useAuthStore();

  const [productInfo, setProductInfo] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [queryString, setQueryString] = useState("");
  const [loading, setLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [modal, setModal] = useState(null);
  const [zoomSrc, setZoomSrc] = useState("");
  const [askQuestion, setAskQuestion] = useState("");

  const product = productInfo?.product;
  const publishedRelated = (productInfo?.relatedProducts || []).filter(
    (item) => item?.is_published === "1"
  );

  const closeModal = useCallback(() => {
    setModal(null);
    setZoomSrc("");
    setAskQuestion("");
  }, []);

  const handleGetProductDetails = useCallback(async () => {
    if (!id) {
      return;
    }
    loader(true);
    setLoading(true);
    try {
      const data = await getProductDetails(id);
      setProductInfo(data || null);
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    setQuantity(1);
    setSelectedIndex(0);
    handleGetProductDetails();
  }, [id, handleGetProductDetails]);

  useEffect(() => {
    const storedQuery = sessionStorage.getItem("shopQueryParams");
    const qs = storedQuery ? `?${storedQuery}` : "";
    setQueryString(qs);
    setShareUrl(window.location.href);
  }, [id]);

  useEffect(() => {
    const open = Boolean(modal);
    document.body.classList.toggle("aq-pd-modal-open", open);
    if (!open) {
      return undefined;
    }
    const onKey = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("aq-pd-modal-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [modal, closeModal]);

  const increaseCount = async (currentQuantity) => {
    if (!isLoggedIn) {
      toast.error("Please login to change quantity.");
      sessionStorage.setItem(
        "postLoginRedirect",
        `/product-detail?id=${id || product?.id || ""}`
      );
      router.push("/login");
      return;
    }

    if (currentQuantity === parseInt(product?.quantity, 10)) {
      toastCom(
        "You've reached the maximum quantity allowed.",
        true,
        "error",
        2000
      );
      return;
    }
    setQuantity((prev) => prev + 1);
  };

  const decreaseCount = async () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const submitQuestion = (event) => {
    event.preventDefault();
    toast.success(
      "Thank you. Questions will appear here once this feature is enabled."
    );
    closeModal();
  };

  return (
    <div className="aq-pd-page">
      <div className="pd-breadcrumb-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              <div className="pd-breadcrumb-content">
                <div className="pd-breadcrumb-list">
                  <span>
                    <Link href="/">home</Link>
                  </span>
                  <span>/</span>
                  <span>
                    <Link href={`/shop${queryString || ""}`}>shop</Link>
                  </span>
                  <span>/</span>
                  <span>{product?.title || "product"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="aq-product-details-thumbnails-style">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <ImageCarousel
                images={product?.images || []}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                loading={loading}
                onZoom={(src) => {
                  setZoomSrc(src);
                  setModal("zoom");
                }}
              />
            </div>
            <div className="col-lg-6">
              <ProductAccordion
                sections={product}
                quantity={quantity}
                handleGetProductDetails={handleGetProductDetails}
                decreaseCount={decreaseCount}
                increaseCount={increaseCount}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                onOpenDelivery={() => setModal("delivery")}
                onOpenShare={() => setModal("share")}
              />
            </div>
          </div>
        </div>
      </div>

      <ProductTabs
        product={product}
        onAskQuestion={() => setModal("ask")}
      />

      {publishedRelated.length > 0 && (
        <SimilarProduct
          data={publishedRelated}
          handleGetProductDetails={handleGetProductDetails}
          productId={id || product?.id}
        />
      )}

      {modal === "zoom" && zoomSrc ? (
        <div className="aq-pd-modal-overlay" onClick={closeModal} role="presentation">
          <div
            className="aq-pd-modal zoom"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="aq-pd-modal-close" onClick={closeModal} aria-label="Close">
              ×
            </button>
            <img src={zoomSrc} alt={product?.title || "Product"} />
          </div>
        </div>
      ) : null}

      {modal === "delivery" ? (
        <div className="aq-pd-modal-overlay" onClick={closeModal} role="presentation">
          <div
            className="aq-pd-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="aq-delivery-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="aq-pd-modal-close" onClick={closeModal} aria-label="Close">
              ×
            </button>
            <div className="product-details-policy">
              <h4 className="product-details-policy-title" id="aq-delivery-title">
                Shipping policy
              </h4>
              <p>
                We&apos;re committed to delivering your sarees safely and
                efficiently across India.
              </p>
              <ul className="product-details-policy-list mb-30">
                <li>Orders processed within 1–2 business days</li>
                <li>Typical delivery in 5–7 days</li>
                <li>Cash on Delivery where marked available on the product</li>
                <li>Replacement within 1 day of delivery for damaged products</li>
              </ul>
              <h4 className="product-details-policy-title">Returns policy</h4>
              <p>
                We offer replacements only — no refunds. Request a replacement
                within 1 day of delivery if the saree arrives damaged and is in
                original condition with tags attached.
              </p>
              <ul className="product-details-policy-list mb-30">
                <li>Replacement window: 1 day from delivery</li>
                <li>No monetary refunds</li>
                <li>Photos may be requested for damaged items</li>
              </ul>
              <h4 className="product-details-policy-title">Help</h4>
              <p>Give us a shout if you have any other questions or concerns.</p>
              <ul className="product-details-policy-info mb-0">
                <li>
                  <a href="tel:7904749251">+91 7904749251</a>
                </li>
                <li>
                  <a href="mailto:kavyacreation1471@gmail.com">
                    kavyacreation1471@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : null}

      <ShareProductBox
        open={modal === "share"}
        onClose={closeModal}
        url={shareUrl}
        title={product?.title}
      />

      {modal === "ask" ? (
        <div className="aq-pd-modal-overlay" onClick={closeModal} role="presentation">
          <div
            className="aq-pd-modal share"
            role="dialog"
            aria-modal="true"
            aria-labelledby="aq-ask-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="aq-pd-modal-close" onClick={closeModal} aria-label="Close">
              ×
            </button>
            <div className="aq-login-wrapper">
              <div className="aq-login-top mb-30">
                <h3 className="aq-login-title" id="aq-ask-title">
                  Ask Question
                </h3>
              </div>
              <form onSubmit={submitQuestion}>
                <div className="aq-login-input-box mb-20">
                  <label className="aq-form-label" htmlFor="pd-ask-q">
                    Your Question <span>*</span>
                  </label>
                  <textarea
                    id="pd-ask-q"
                    className="aq-form-control"
                    placeholder="Your Question"
                    required
                    value={askQuestion}
                    onChange={(event) => setAskQuestion(event.target.value)}
                  />
                </div>
                <button type="submit" className="aq-login-btn w-100 mb-10">
                  Submit
                </button>
                <button
                  type="button"
                  className="aq-login-btn btn-transparent w-100"
                  onClick={closeModal}
                >
                  Back
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
