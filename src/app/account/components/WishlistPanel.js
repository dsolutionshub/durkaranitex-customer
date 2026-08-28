"use client";

import { useEffect, useState } from "react";
import useCartPanelStore from "@/store/useCartPanelStore";
import BazaroProductCard from "@/app/shop/components/BazaroProductCard";
import { modifyCart, modifyWishlist } from "@/app/api/services/authService";
import { loader } from "@/app/components/loader/loaderManager";
import { getErrorMessage } from "@/app/utils/helperFn";
import toast from "react-hot-toast";
import TabLoader from "./TabLoader";

import "@/app/components/home/featured-products.css";

export default function WishlistPanel() {
  const { wishListData, wishlistDetails, cardDetails } = useCartPanelStore();
  const items = Array.isArray(wishListData) ? wishListData : [];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    Promise.resolve(wishlistDetails()).finally(() => {
      if (active) setIsLoading(false);
    });
    return () => {
      active = false;
    };
  }, [wishlistDetails]);

  const onAddToCart = async (productId) => {
    loader(true);
    try {
      await modifyCart({ product_id: productId, quantity: 1, type: "list" });
      cardDetails();
      toast.success("Added to cart");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      loader(false);
    }
  };

  const onAddToWishlist = async (productId) => {
    loader(true);
    try {
      await modifyWishlist({ product_id: productId });
      wishlistDetails();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      loader(false);
    }
  };

  return (
    <div className="aq-dashboard-wrapper aq-dash-pt-30">
      <h3 className="aq-dashboard-title">My Wishlist</h3>
      <div className="aq-dashboard-content-layout aq-dash-mb-40">
        <div className="aq-dashboard-box aq-dash-mb-20">
          <div className="aq-dashboard-wishlist-wrap">
            {isLoading ? (
              <TabLoader />
            ) : items.length === 0 ? (
              <div className="aq-dashboard-empty">
                <h4>Your wishlist is empty</h4>
                <p>Save items you love and find them here later.</p>
              </div>
            ) : (
              <div className="row row-cols-xl-3 row-cols-md-2 row-cols-2">
                {items.map((item) => {
                  const product = item?.product || item;
                  const productId = product?.id || item?.product_id;
                  return (
                    <div className="col" key={item?.id || productId}>
                      <BazaroProductCard
                        item={product}
                        isInWishlist
                        onAddToCart={() => onAddToCart(productId)}
                        onAddToWishlist={() => onAddToWishlist(productId)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
