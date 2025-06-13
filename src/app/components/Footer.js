import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const categoryList = [
  { label: "Semi Soft Silk Sarees", path: "/shop" },
  { label: "Premium Soft Silk Sarees", path: "/shop" },
  { label: "Poonthamil Saree", path: "/shop" },
  { label: "Banarasi Tissue Silk Sarees", path: "/shop" },
  { label: "Wedding Collection Silk Saree", path: "/shop" },
  { label: "Kanjivaram Wedding Semi Silk Sarees", path: "/shop" },
  { label: "Silk Cotton Sarees", path: "/shop" },
  { label: "Printed Cotton Sarees", path: "/shop" },
  { label: "Printed Silk Cotton Saree", path: "/shop" },
  { label: "Celebrity Inspired Tissue Silk Sarees", path: "/shop" },
];

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Contacts", path: "/contact" },
  { label: "Wishlist", path: "/wishlist" },
  { label: "Checkout", path: "/checkout" },
  { label: "My Cart", path: "/cart" },
];

const userPolicies = [
  { label: "Terms & Conditions", path: "/terms" },
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Replacement Policy", path: "/returns" },
  { label: "Shipping Policy", path: "/shipping" },
];

const socialLinks = [
  { path: "#", icon: FaFacebookF },
  { path: "#", icon: FaInstagram },
  { path: "#", icon: FaLinkedinIn },
  { path: "#", icon: FaYoutube },
];

function FooterSection({ title, listItems }) {
  return (
    <div className="w-full text-left">
      <h4 className="text-xl font-semibold text-black mb-6 text-left">
        {title}
      </h4>
      <ul
        className="space-y-2 text-left"
        style={{
          paddingLeft: "0px",
        }}
      >
        {listItems?.map((item) => (
          <li key={item.label}>
            <Link
              href={item.path}
              className="text-black-600 hover:text-green-600 transition-colors duration-300 font-medium group inline-block"
            >
              {item.label}
              <span className="block h-[2px] bg-green-600 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-5">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="space-y-3 text-left">
            <div className="flex items-center">
              <Image
                height={200}
                width={200}
                src="/images/home/logo.svg"
                alt="logo"
                style={{
                  width: "13rem",
                  marginLeft: "-1rem",
                }}
              />
            </div>
            <div className="text-gray-600 leading-relaxed">
              <p className="font-medium text-gray-800">
                Your trusted destination for authentic and beautiful sarees. We
                bring you the finest collection of traditional and contemporary
                Indian wear.
              </p>
            </div>
            <div className="space-y-0">
              <div className="flex items-start space-x-0 \">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>

                <div className="text-gray-600 leading-relaxed ml-3">
                  <p className="font-medium text-gray-800">
                    6/380, Ashok Nagar, Perumagoundampatti, Salem, Tamil Nadu
                    637502,
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-0">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-medium text-gray-800 ml-3">
                  9489607841
                </span>
              </div>
            </div>
          </div>

          <FooterSection title={"Top Categories"} listItems={categoryList} />

          <FooterSection title={"Quick Links"} listItems={quickLinks} />

          <div>
            <FooterSection title={"User Policy"} listItems={userPolicies} />
            <div className="mt-4">
              <h5 className="text-xl font-bold text-black mb-6 text-left">
                Stay Connected
              </h5>
              <div className="flex space-x-3">
                {socialLinks.map(({ path, icon: Icon }) => (
                  <Link
                    key={path}
                    href={path}
                    className="w-11 h-11 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center hover:from-green-600 hover:to-green-500 group transition-all duration-300 hover:scale-110 shadow-md"
                  >
                    <Icon className="w-5 h-5 text-green-600 group-hover:text-white" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-8 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Dhurgarani Tex. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
