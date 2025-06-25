"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Search,
  ShoppingBag,
  ArrowLeft,
  Package,
  Heart,
} from "lucide-react";

const links = [
  {
    href: "/shop",
    label: "All Sarees",
    icon: Package,
    description: "Discover elegant collection",
  },
  {
    href: "/cart",
    label: "Your Cart",
    icon: ShoppingBag,
    description: "Your selected items",
  },
  {
    href: "/wishlist",
    label: "Wishlist",
    icon: Heart,
    description: "Saved for later",
  },
];

export default function NotFound() {
  const router = useRouter();

  const Button = ({ href, icon: Icon, label, className }) => (
    <Link href={href} className="text-decoration-none w-full md:w-auto">
      <div
        className={`flex items-center justify-center px-4 py-2 rounded ${className}`}
      >
        <Icon className="w-4 h-4 mr-2" />
        {label}
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4  mt-10">
      <div className="max-w-4xl text-center">
        {/* 404 Illustration */}
        <div className="relative inline-block mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-gray-100">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-6 rounded-full border border-green-200 bg-green-50">
              <Search className="w-16 h-16 text-green-600" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-black mt-3 md:mt-0">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
            The page you&apos;re looking for seems to have wandered off like a
            beautiful saree in the wind. Don&apos;t worry, we&apos;ll help you
            find your way back to our stunning collection!
          </p>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {[400, 500, 600].map((tone, i) => (
            <div
              key={tone}
              className={`w-3 h-3 bg-green-${tone} rounded-full animate-pulse`}
              style={{ animationDelay: `${i * 75}ms` }}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
          <Button
            href="/"
            icon={Home}
            label="Go to Homepage"
            className="bg-green-600 hover:bg-green-700 text-white"
          />
          <Button
            href="/products"
            icon={Search}
            label="Browse Sarees"
            className="border border-green-600 text-green-600 hover:bg-green-50"
          />
          <button
            onClick={() => router.back()}
            className="w-full md:w-auto flex items-center justify-center px-4 py-2 rounded text-green-600 hover:bg-green-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>

        {/* Popular Pages */}
        <div className="pt-8 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-black mb-2">Popular Pages</h3>
          <p className="text-gray-600 mb-8">
            Quick access to our most visited sections
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {links.map(({ href, label, icon: Icon, description }, i) => (
              <Link
                key={href}
                href={href}
                className="text-decoration-none group p-4 min-w-[120px] flex flex-col items-center cursor-pointer rounded-lg hover:bg-green-50 transition-all"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full group-hover:bg-green-200 mb-3">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-sm font-medium text-gray-800 group-hover:text-green-700 mb-1">
                  {label}
                </h4>
                <p className="text-xs text-gray-500 text-center">
                  {description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-12 text-sm text-gray-500">
          Lost? Let Dhurgarani Tex guide you back to elegance and style.
        </p>
      </div>
    </div>
  );
}
