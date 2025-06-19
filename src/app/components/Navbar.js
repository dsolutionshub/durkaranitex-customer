"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import SidePanelCart from "./sidePanelCart/SidePanelCart";
import useCartPanelStore from "@/store/useCartPanelStore";

import {
  FaRegAddressCard,
  FaRegEnvelope,
  FaRegHeart,
  FaRegUser,
} from "react-icons/fa";
import {
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineChevronRight,
  HiOutlineHome,
} from "react-icons/hi";
import { IoBagOutline, IoCartOutline } from "react-icons/io5";

const navItems = [
  { name: "Home", href: "/", icon: <HiOutlineHome /> },
  { name: "Products", href: "/shop", icon: <IoBagOutline /> },
  { name: "About us", href: "/about", icon: <FaRegAddressCard /> },
  { name: "Contact", href: "/contact", icon: <FaRegEnvelope /> },
];

export default function Navbar() {
  const router = useRouter();
  const { isCartOpen, handleGetCartDetail } = useCartPanelStore();

  const [menuOpen, setMenuOpen] = useState(false);

  const handlePanel = useCallback(() => {
    handleGetCartDetail();
  }, [isCartOpen]);

  const handleNavigateHome = () => {
    router.push("/");
  };

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
          className="text-2xl cursor-pointer"
        >
          <HiOutlineMenu />
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Image
            src={"/images/home/logo.svg"}
            height={100}
            width={400}
            alt="logo"
            className="h-[2.7rem] w-[8rem] cursor-pointer"
            onClick={handleNavigateHome}
          />
        </div>

        <IoCartOutline
          className="text-2xl cursor-pointer primary-color"
          onClick={handlePanel}
        />
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
          <FaRegHeart
            className="cursor-pointer primary-color"
            onClick={() => router.push("/wishlist")}
          />
          <IoCartOutline
            className="cursor-pointer primary-color"
            onClick={handlePanel}
          />
          <FaRegUser className="cursor-pointer primary-color" />
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className="text-lg font-bold">Menu</span>
          <HiOutlineX
            className="text-2xl cursor-pointer"
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
                <HiOutlineChevronRight className="text-xl" />
              </Link>
              <hr className="border-gray-300" />
            </li>
          ))}

          <li>
            <Link
              href="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="flex justify-between items-center py-2 hover:text-blue-500 primary-color"
            >
              <span className="flex items-center gap-2">
                <FaRegHeart /> Wishlist
              </span>
              <HiOutlineChevronRight className="text-xl" />
            </Link>
            <hr className="border-gray-300" />
          </li>

          <li>
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="flex justify-between items-center py-2 hover:text-blue-500 primary-color"
            >
              <span className="flex items-center gap-2">
                <FaRegUser /> Login
              </span>
              <HiOutlineChevronRight className="text-xl" />
            </Link>
            <hr className="border-gray-300" />
          </li>
        </ul>
      </div>
      <SidePanelCart />
    </nav>
  );
}
