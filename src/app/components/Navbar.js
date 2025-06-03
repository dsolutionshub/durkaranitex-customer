"use client";

import React, { useState } from "react";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import {
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineChevronRight,
} from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Product", href: "/shop" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <nav className="bg-white shadow-md px-4 py-3 relative z-50">
      {/* Mobile Navbar */}
      <div className="flex items-center justify-between lg:hidden relative">
        {/* Hamburger Icon */}
        <div
          onClick={() => setMenuOpen(true)}
          className="text-2xl cursor-pointer"
        >
          <HiOutlineMenu />
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img src="/images/home/logo.svg" alt="logo" className="h-10" />
        </div>

        {/* Cart Icon */}
        <IoCartOutline
          className="text-2xl cursor-pointer hover:text-green-600"
          onClick={() => router.push("/cart")}
        />
      </div>

      {/* Desktop Navbar */}
      <div className="hidden lg:flex items-center justify-between">
        <img src="/images/home/logo.svg" alt="logo" className="h-14" />

        <ul className="flex gap-8 text-lg font-semibold uppercase text-gray-700">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="hover:text-blue-500 transition-colors duration-200"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6 text-2xl">
          <FaRegHeart
            className="cursor-pointer hover:text-green-600"
            onClick={() => router.push("/wishlist")}
          />
          <IoCartOutline
            className="cursor-pointer hover:text-green-600"
            onClick={() => router.push("/cart")}
          />
          <FaRegUser className="cursor-pointer hover:text-green-600" />
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Side Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className="text-lg font-bold">Menu</span>
          <HiOutlineX
            className="text-2xl cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        </div>

        {/* Menu Items */}
        <ul className="flex flex-col px-4 pt-4 text-gray-700 text-lg">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex justify-between items-center py-1 hover:text-blue-500"
              >
                {item.name}
                <HiOutlineChevronRight className="text-xl" />
              </Link>
              <hr className="border-gray-300" />
            </li>
          ))}

          {/* Wishlist */}
          <li>
            <Link
              href="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="flex justify-between items-center py-2 hover:text-blue-500"
            >
              <span className="flex items-center gap-2">
                <FaRegHeart /> Wishlist
              </span>
              <HiOutlineChevronRight className="text-xl" />
            </Link>
            <hr className="border-gray-300" />
          </li>

          {/* Login */}
          <li>
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="flex justify-between items-center py-2 hover:text-blue-500"
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
    </nav>
  );
}
