"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  User,
  ShoppingCart,
  Menu,
  X,
  ChevronRight,
  Home,
  Info,
  Mail,
  ShoppingBag,
} from "lucide-react";

import SidePanelCart from "./sidePanelCart/SidePanelCart";
import useCartPanelStore from "@/store/useCartPanelStore";
import { loginCheck } from "../api/services/authService";
import { getErrorMessage } from "../utils/helperFn";
import { useAuthStore } from "@/store/useAuthStore";

const navItems = [
  { name: "Home", href: "/", icon: <Home /> },
  { name: "Products", href: "/shop", icon: <ShoppingBag /> },
  { name: "About us", href: "/about", icon: <Info /> },
  { name: "Contact", href: "/contact", icon: <Mail /> },
];

export default function Navbar() {
  const router = useRouter();
  const { isCartOpen, handleGetCartDetail, cardDetails, wishlistDetails } =
    useCartPanelStore();

  const cartCount = useCartPanelStore((state) => state.cartCount);
  const wishListCount = useCartPanelStore((state) => state.wishListCount);
  const { isLoggedIn, setIsLoginAuth } = useAuthStore();

  const [menuOpen, setMenuOpen] = useState(false);

  const handlePanel = useCallback(() => {
    handleGetCartDetail();
  }, [isCartOpen, handleGetCartDetail]);

  const handleNavigateHome = () => {
    router.push("/");
  };

  const handlePushToPath = (path) => {
    router.push(path);
    if (!isLoggedIn) {
      sessionStorage.setItem("postLoginRedirect", "/wishlist");
    }
  };

  const loginChecking = async () => {
    try {
      await loginCheck();
    } catch (error) {
      getErrorMessage(error);
    }
  };

  useEffect(() => {
    // loginChecking();
    cardDetails();
    wishlistDetails();

    const token = sessionStorage.getItem("accessToken");
    if (token && token !== "undefined") {
      setIsLoginAuth(true);
    } else {
      setIsLoginAuth(false);
    }
  }, [cardDetails, wishlistDetails, setIsLoginAuth]);

  return (
    <nav
      className="bg-white shadow-md px-4 py-[1.2rem] md:py-[.7rem] relative z-50"
      style={{
        position: "sticky",
        top: "0rem",
      }}
    >
      {/* Mobile Navbar */}
      <div className="flex items-center justify-between lg:hidden relative">
        <div
          onClick={() => setMenuOpen(true)}
          className="text-2xl cursor-pointer text-gray-600"
        >
          <Menu className="text-gray-600" />
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Image
            src={"/images/home/logo.svg"}
            height={100}
            width={400}
            alt="logo"
            className="h-[9.7rem] w-[8rem] cursor-pointer"
            onClick={handleNavigateHome}
          />
        </div>

        <div className="relative cursor-pointer" onClick={handlePanel}>
          <ShoppingCart className="primary-color" />
          <span
            className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold
              h-[1.2rem] w-[1.2rem] flex items-center justify-center rounded-full"
          >
            {cartCount || 0}
          </span>
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden lg:flex items-center justify-between ">
        <Image
          src={"/images/home/logo.svg"}
          height={100}
          width={400}
          alt="logo"
          className="h-[3.5rem] w-[12rem] cursor-pointer"
          onClick={handleNavigateHome}
        />

        <ul className="flex gap-8 text-lg font-semibold text-gray-700 mb-0">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className=" transition-colors duration-200 nav-anchor-link"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6 text-2xl pr-5">
          <div
            className="relative cursor-pointer"
            onClick={() => handlePushToPath("/wishlist")}
          >
            <Heart className="primary-color" />
            <span
              className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold 
              h-[1.2rem] w-[1.2rem] flex items-center justify-center rounded-full"
            >
              {wishListCount || 0}
            </span>
          </div>

          <div className="relative cursor-pointer" onClick={handlePanel}>
            <ShoppingBag className="primary-color" />
            <span
              className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold
              h-[1.2rem] w-[1.2rem] flex items-center justify-center rounded-full"
            >
              {cartCount || 0}
            </span>
          </div>

          <User
            className="cursor-pointer primary-color"
            onClick={() => router.push("/account")}
          />
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className="text-lg font-bold text-bg-700 text-gray-500">
            Menu
          </span>
          <X
            className="text-2xl cursor-pointer text-bg-700 text-gray-500"
            onClick={() => setMenuOpen(false)}
          />
        </div>

        <ul className="flex flex-col px-4 pt-4 text-gray-700 text-lg">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex justify-between items-center py-2 hover:text-blue-500 primary-color"
              >
                <span className="flex items-center gap-2">
                  {item.icon} {item.name}
                </span>
                <ChevronRight className="text-xl" />
              </Link>
              <hr className="border-gray-300" />
            </li>
          ))}

          <li>
            <div
              onClick={() => {
                handlePushToPath("/wishlist")
                setMenuOpen(false)
              }}
              className="flex justify-between items-center py-2 hover:text-blue-500 primary-color"
            >
              <span className="flex items-center gap-2">
                <Heart /> Wishlist
              </span>
              <ChevronRight className="text-xl" />
            </div>
            <hr className="border-gray-300" />
          </li>

          <li>
            <Link
              href={isLoggedIn ? "/account" : "/login"}
              onClick={() => setMenuOpen(false)}
              className="flex justify-between items-center py-2 hover:text-blue-500 primary-color"
            >
              <span className="flex items-center gap-2">
                <User /> {isLoggedIn ? "Account" : "Login"}
              </span>
              <ChevronRight className="text-xl" />
            </Link>
            <hr className="border-gray-300" />
          </li>
        </ul>
      </div>
      <SidePanelCart />
    </nav>
  );
}
