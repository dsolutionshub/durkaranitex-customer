"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

import ProductCard from "../components/ProductCard";
import { loader } from "../components/loader/loaderManager";
import CustomBreadCrumb from "../components/CustomBreadCrumb";
import Loader from "../components/loader/loader";

import useCartPanelStore from "@/store/useCartPanelStore";
import {
  getWishlist,
  modifyCart,
  modifyWishlist,
} from "../api/services/authService";
import { LOGIN_ERROR_MSG, LOGIN_MSG, WISHLIST_MODEL } from "../utils/constants";
import { getErrorMessage } from "../utils/helperFn";

const Wishlist = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { handleGetCartDetail } = useCartPanelStore();
  const [wishlist, setWishlist] = useState([]);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const fetchWishlist = async () => {
    loader(true);
    try {
      const data = await getWishlist();
      setWishlist(data?.WishLists || []);
    } catch (error) {
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  };

  const removeFromWishlist = async (id) => {
    loader(true);
    try {
      const data = await modifyWishlist({ product_id: id });
      fetchWishlist();
    } catch (error) {
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  };

  const addToCart = async (id) => {
    try {
      const data = await modifyCart({
        product_id: id,
        quantity: 1,
        type: "list",
      });
      toast.success("Added to cart");
      handleGetCartDetail();
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        sessionStorage.setItem("postLoginRedirect", "/shop");
        router.push("/login");
        toast.error(LOGIN_ERROR_MSG);
        return;
      }
      const MSG = getErrorMessage(error);
      if (MSG.startsWith("Only")) {
        toast.error(`Max quantity reached. ${MSG}`);
      } else {
        toast.error(MSG);
      }
    } finally {
      loader(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  useEffect(() => {
    if (status === "loading") return;

    const token = localStorage.getItem("accessToken");
    const sessionToken = session?.user?.accessToken;
    if ((!token || token === "undefined") && !sessionToken) {
      toast.error(LOGIN_MSG);
      router.replace("/login");
    } else {
      setIsCheckingAuth(false);
    }
  }, [router, status, session]);

  if (isCheckingAuth) {
    return (
      <div className="h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <CustomBreadCrumb model={WISHLIST_MODEL} />
      <div className="container mt-3">
        <h2 className="md:mb-4 text-center text-dark fs-3">My Wishlist</h2>

        <div className="row my-5 md:p-1 product-container-mobile">
          {wishlist?.length > 0 ? (
            wishlist?.map((item) => (
              <div
                className="col-md-4 col-lg-3 md:mb-4 product-list-card-mobile"
                key={item.id}
              >
                <ProductCard
                  id={item?.product_id}
                  title={item?.product?.title}
                  price={item?.product?.price}
                  oldPrice={item?.product?.product_price}
                  image={item?.product?.images[0]?.["image"]}
                  image1={item?.product?.images[1]?.["image"]}
                  isInWishlist={item?.product?.wishList}
                  type="delete"
                  btn1={() => removeFromWishlist(item?.product?.id)}
                  btn2={() => addToCart(item?.product?.id)}
                  discount={item?.product?.discount || 0}
                  quantity={item?.product?.quantity}
                />
              </div>
            ))
          ) : (
            <p className="mb-5 text-center text-dark fs-5">
              <Heart size={66} className="mx-auto text-gray-300 mb-3" />
              <span className="d-block fw-bold text-xl mb-2">
                Your wishlist is empty
              </span>
              Save your favorite sarees here!
              <br />
              <Link href="/shop" className="">
                <button className="bg-[var(--primary-main)] text-white py-2 px-3 rounded mt-3">
                  Explore Sarees
                </button>
              </Link>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
