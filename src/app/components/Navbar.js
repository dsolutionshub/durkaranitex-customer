"use client";

import React from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { HiOutlineUser } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Product", href: "/shop" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <nav className="bg-white px-5 py-3 items-center justify-between home-nav">
      <div className="flex-shrink-0">
        <img src="/images/home/logo.svg" alt="logo" className="h-14" />
      </div>

      <ul className="flex gap-8 text-lg font-semibold uppercase text-gray-700">
        {navItems.map((item, index) => (
          <li key={index} className="pt-4">
            <Link
              href={item.href}
              className="cursor-pointer hover:text-blue-500 transition-colors duration-200"
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
          className="cursor-pointer text-3xl hover:text-green-600"
          onClick={() => router.push("/cart")}
        />
        <FaRegUser className="cursor-pointer hover:text-green-600" />
      </div>
    </nav>
  );
}
