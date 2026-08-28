"use client";

import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import SidePanelCart from "./sidePanelCart/SidePanelCart";
import SearchPanel from "./searchPanel/SearchPanel";
import WishlistModal from "./wishlistModal/WishlistModal";
import AuthModal from "./auth/AuthModal";
import QuickViewModal from "./quick-view/QuickViewModal";
import useCartPanelStore from "@/store/useCartPanelStore";
import { loginCheck } from "../api/services/authService";
import { getErrorMessage } from "../utils/helperFn";
import { useAuthStore } from "@/store/useAuthStore";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "./navbar/bazaro-header.css";

const navItems = [
  { name: "Home", href: "/", icon: "home" },
  { name: "Products", href: "/shop", icon: "shop" },
  { name: "About us", href: "/about", icon: "about" },
  { name: "Contact", href: "/contact", icon: "contact" },
];

const STORE_EMAIL = "kavyacreation1471@gmail.com";
const STORE_PHONE = "+91 7904749251";
const STORE_PHONE_HREF = "tel:7904749251";
const STORE_ADDRESS =
  "6/329-4, Ashok Nagar, Near Sanjeeviraya Perumal kovil, Perumagoundampatty, Elampilai, Salem, Tamil Nadu 637502";
const STORE_MAPS =
  "https://www.google.com/maps/dir//Kavya+Creation,+Perumagoundampatti,+Elampillai,+Tamil+Nadu+637502";
const WHATSAPP_HREF =
  "https://api.whatsapp.com/send?phone=917904749251&text=Hi%2C%20I'm%20interested%20in%20your%20products";

const HEADER_QUOTES = [
  "Quality you can feel in every thread",
  "Handpicked silks, crafted to last",
  "Authentic weaves. Honest quality. Every piece.",
  "Premium sarees, made with care",
];

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M18.7504 18.7499L14.4004 14.3999M16.75 8.75C16.75 13.1683 13.1683 16.75 8.75 16.75C4.33172 16.75 0.75 13.1683 0.75 8.75C0.75 4.33172 4.33172 0.75 8.75 0.75C13.1683 0.75 16.75 4.33172 16.75 8.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AccountIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 17 20" fill="none">
    <path
      d="M16.212 18.75C16.212 15.267 12.747 12.45 8.481 12.45C4.215 12.45 0.75 15.267 0.75 18.75M12.9805 5.25C12.9805 7.73528 10.9657 9.75 8.48047 9.75C5.99519 9.75 3.98047 7.73528 3.98047 5.25C3.98047 2.76472 5.99519 0.75 8.48047 0.75C10.9657 0.75 12.9805 2.76472 12.9805 5.25Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WishlistIcon = ({ width = 21, height = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 21 20" fill="none">
    <path
      d="M6.50726 4.80303C5.44195 5.14334 4.68503 6.09974 4.59044 7.22502M10.4856 18.6038C12.6562 17.2679 14.6755 15.6957 16.5073 13.9152C17.7951 12.633 18.7756 11.0698 19.3735 9.3454C20.4494 6.00032 19.1927 2.17084 15.6755 1.03753C13.827 0.442448 11.8081 0.782566 10.2505 1.95149C8.69225 0.783989 6.67412 0.443991 4.82552 1.03753C1.30833 2.17084 0.0425004 6.00032 1.11845 9.3454C1.71636 11.0698 2.69679 12.633 3.98465 13.9152C5.81647 15.6957 7.83575 17.2679 10.0064 18.6038L10.2414 18.75L10.4856 18.6038Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
    <path
      d="M5.48681 5.07041C5.48681 2.68433 7.4211 0.750039 9.80717 0.750039C10.9562 0.74517 12.0598 1.1982 12.874 2.00895C13.6882 2.81971 14.1459 3.92139 14.1458 5.07041M6.84107 9.57384H6.88684M12.6721 9.57388H12.7179M5.62368 19.972H13.9715C17.0379 19.972 19.3903 18.8645 18.7221 14.4068L17.944 8.3656C17.5321 6.14134 16.1134 5.29008 14.8685 5.29008H4.69004C3.42688 5.29008 2.0905 6.20542 1.61453 8.3656L0.836493 14.4068C0.268988 18.361 2.55732 19.972 5.62368 19.972Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const OffcanvasCloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M10.75 0.75L0.75 10.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M0.75 0.75L10.75 10.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HomeTabIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
    <path
      d="M14.6336 6.77452L8.38359 0.374602C8.1492 0.13474 7.83138 0 7.5 0C7.16862 0 6.8508 0.13474 6.61641 0.374602L0.366414 6.77452C0.249777 6.89307 0.157319 7.03418 0.0944167 7.18964C0.0315145 7.34511 -0.000577075 7.51183 7.85428e-06 7.68011V15.36C7.85428e-06 15.5297 0.0658559 15.6925 0.183066 15.8126C0.300276 15.9326 0.459247 16 0.625007 16H5.625C5.79076 16 5.94973 15.9326 6.06694 15.8126C6.18415 15.6925 6.25 15.5297 6.25 15.36V10.8801H8.75V15.36C8.75 15.5297 8.81585 15.6925 8.93306 15.8126C9.05027 15.9326 9.20924 16 9.375 16H14.375C14.5408 16 14.6997 15.9326 14.8169 15.8126C14.9341 15.6925 15 15.5297 15 15.36V7.68011C15.0006 7.51183 14.9685 7.34511 14.9056 7.18964C14.8427 7.03418 14.7502 6.89307 14.6336 6.77452ZM13.75 14.72H10V10.2401C10 10.0703 9.93415 9.90755 9.81694 9.78753C9.69973 9.66751 9.54076 9.60008 9.375 9.60008H5.625C5.45924 9.60008 5.30027 9.66751 5.18306 9.78753C5.06585 9.90755 5 10.0703 5 10.2401V14.72H1.25001V7.68011L7.5 1.28019L13.75 7.68011V14.72Z"
      fill="#343330"
    />
  </svg>
);

const AccountTabIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
    <path
      d="M15.9093 14.0873C14.7389 12.1146 12.9352 10.7001 10.8303 10.0295C11.8715 9.42526 12.6804 8.50449 13.1329 7.40862C13.5854 6.31276 13.6563 5.10239 13.3349 3.9634C13.0135 2.82441 12.3174 1.81978 11.3537 1.10378C10.3899 0.387776 9.2117 0 8 0C6.7883 0 5.6101 0.387776 4.64633 1.10378C3.68257 1.81978 2.98653 2.82441 2.6651 3.9634C2.34368 5.10239 2.41464 6.31276 2.8671 7.40862C3.31955 8.50449 4.12848 9.42526 5.16965 10.0295C3.06476 10.6993 1.26112 12.1138 0.0907097 14.0873C0.0477887 14.1555 0.0193195 14.2314 0.00698187 14.3106C-0.00535579 14.3897 -0.00131202 14.4704 0.0188746 14.548C0.0390612 14.6256 0.0749818 14.6984 0.124517 14.7623C0.174052 14.8261 0.236198 14.8796 0.307289 14.9196C0.37838 14.9597 0.456975 14.9854 0.538437 14.9954C0.6199 15.0053 0.702579 14.9992 0.781598 14.9775C0.860616 14.9558 0.934373 14.9189 0.998516 14.8689C1.06266 14.819 1.11589 14.757 1.15507 14.6866C2.6029 12.2472 5.16197 10.7907 8 10.7907C10.838 10.7907 13.3971 12.2472 14.8449 14.6866C14.8841 14.757 14.9373 14.819 15.0015 14.8689C15.0656 14.9189 15.1394 14.9558 15.2184 14.9775C15.2974 14.9992 15.3801 15.0053 15.4616 14.9954C15.543 14.9854 15.6216 14.9597 15.6927 14.9196C15.7638 14.8796 15.8259 14.8261 15.8755 14.7623C15.925 14.6984 15.9609 14.6256 15.9811 14.548C16.0013 14.4704 16.0054 14.3897 15.993 14.3106C15.9807 14.2314 15.9522 14.1555 15.9093 14.0873ZM3.69646 5.39639C3.69646 4.56657 3.94886 3.7554 4.42174 3.06543C4.89462 2.37547 5.56674 1.83771 6.35311 1.52015C7.13948 1.2026 8.00478 1.11951 8.83958 1.2814C9.67438 1.44329 10.4412 1.84288 11.0431 2.42965C11.6449 3.01641 12.0548 3.764 12.2208 4.57786C12.3869 5.39173 12.3017 6.23533 11.976 7.00197C11.6502 7.76862 11.0986 8.42388 10.3909 8.8849C9.6832 9.34592 8.85116 9.59199 8 9.59199C6.85901 9.5908 5.76509 9.14838 4.95829 8.36181C4.15148 7.57524 3.69768 6.50876 3.69646 5.39639Z"
      fill="#343330"
    />
  </svg>
);

const ShopTabIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
    <path
      d="M16 5C16.0003 4.94189 15.9925 4.88403 15.9769 4.82812L14.8731 0.90625C14.7989 0.646027 14.6438 0.417159 14.431 0.253823C14.2182 0.0904875 13.959 0.00144761 13.6923 0H2.30769C2.04095 0.00144761 1.78182 0.0904875 1.56901 0.253823C1.3562 0.417159 1.20112 0.646027 1.12692 0.90625L0.0238466 4.82812C0.00795568 4.88399 -7.25706e-05 4.94185 4.94245e-07 5V6.25C4.94245e-07 6.73514 0.111216 7.21362 0.32484 7.64754C0.538463 8.08147 0.848627 8.45892 1.23077 8.75V14.375C1.23077 14.5408 1.2956 14.6997 1.41101 14.8169C1.52642 14.9342 1.68294 15 1.84615 15H14.1538C14.317 15 14.4736 14.9342 14.589 14.8169C14.7044 14.6997 14.7692 14.5408 14.7692 14.375V8.75C15.1514 8.45892 15.4615 8.08147 15.6751 7.64754C15.8888 7.21362 16 6.73514 16 6.25V5ZM2.30769 1.25H13.6923L14.5708 4.375H1.43154L2.30769 1.25ZM6.15384 5.625H9.84615V6.25C9.84615 6.74728 9.65164 7.22419 9.30542 7.57583C8.9592 7.92746 8.48963 8.125 8 8.125C7.51037 8.125 7.04079 7.92746 6.69457 7.57583C6.34835 7.22419 6.15384 6.74728 6.15384 6.25V5.625ZM4.92307 5.625V6.25C4.92296 6.57243 4.84099 6.88938 4.68507 7.17023C4.52915 7.45109 4.30455 7.68637 4.03297 7.85334C3.76139 8.02031 3.452 8.11333 3.13469 8.12342C2.81738 8.13351 2.50287 8.06033 2.22154 7.91094C2.17873 7.87709 2.13164 7.84924 2.08154 7.82812C1.82083 7.65861 1.60627 7.42524 1.4576 7.14947C1.30894 6.8737 1.23093 6.5644 1.23077 6.25V5.625H4.92307ZM13.5385 13.75H2.46154V9.3125C2.66412 9.35398 2.87026 9.37491 3.07692 9.375C3.5546 9.375 4.02572 9.26205 4.45296 9.04508C4.88021 8.82812 5.25185 8.51311 5.53846 8.125C5.82506 8.51311 6.19671 8.82812 6.62395 9.04508C7.0512 9.26205 7.52232 9.375 8 9.375C8.47767 9.375 8.94879 9.26205 9.37604 9.04508C9.80328 8.82812 10.1749 8.51311 10.4615 8.125C10.7481 8.51311 11.1198 8.82812 11.547 9.04508C11.9743 9.26205 12.4454 9.375 12.9231 9.375C13.1297 9.37491 13.3359 9.35398 13.5385 9.3125V13.75ZM13.9177 7.82812C13.8682 7.84928 13.8217 7.87686 13.7792 7.91016C13.4979 8.0597 13.1834 8.13304 12.866 8.12307C12.5487 8.11311 12.2392 8.0202 11.9675 7.85329C11.6959 7.68639 11.4712 7.45115 11.3152 7.1703C11.1591 6.88944 11.0771 6.57247 11.0769 6.25V5.625H14.7692V6.25C14.769 6.56447 14.6909 6.87382 14.542 7.1496C14.3932 7.42537 14.1785 7.6587 13.9177 7.82812Z"
      fill="#343330"
    />
  </svg>
);

const WishlistTabIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" fill="none">
    <path
      d="M13.0179 0C11.3585 0 9.90563 0.693914 9 1.86685C8.09437 0.693914 6.64152 0 4.98214 0C3.66125 0.00144779 2.39489 0.512355 1.46088 1.42064C0.52687 2.32892 0.00148881 3.56039 0 4.84489C0 10.3149 8.34027 14.7425 8.69545 14.9254C8.78906 14.9744 8.8937 15 9 15C9.1063 15 9.21094 14.9744 9.30455 14.9254C9.65973 14.7425 18 10.3149 18 4.84489C17.9985 3.56039 17.4731 2.32892 16.5391 1.42064C15.6051 0.512355 14.3387 0.00144779 13.0179 0ZM9 13.6595C7.53268 12.828 1.28571 9.04041 1.28571 4.84489C1.28699 3.89193 1.67684 2.97835 2.36978 2.3045C3.06272 1.63065 4.00218 1.25154 4.98214 1.25029C6.54509 1.25029 7.85732 2.05986 8.40536 3.36017C8.45379 3.47483 8.53618 3.57289 8.64206 3.64191C8.74794 3.71093 8.87253 3.74778 9 3.74778C9.12747 3.74778 9.25206 3.71093 9.35794 3.64191C9.46382 3.57289 9.54621 3.47483 9.59464 3.36017C10.1427 2.05752 11.4549 1.25029 13.0179 1.25029C13.9978 1.25154 14.9373 1.63065 15.6302 2.3045C16.3232 2.97835 16.713 3.89193 16.7143 4.84489C16.7143 9.03416 10.4657 12.8272 9 13.6595Z"
      fill="#343330"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path
      d="M13.2265 11.0762L13.5429 10.5084L13.5429 10.5084L13.2265 11.0762ZM13.4494 12.2401L13.9532 12.6508L13.4494 12.2401ZM9.09661 10.8331L9.52341 11.3234L9.52341 11.3234L9.09661 10.8331ZM12.2082 10.5086L11.8918 11.0764L11.8918 11.0764L12.2082 10.5086ZM10.0292 13.5879L9.90069 14.2251L10.0292 13.5879ZM3.22451 1.07425L2.65676 1.39072L2.65676 1.39072L3.22451 1.07425ZM2.06061 0.851351L1.64995 0.347504L1.64995 0.347504L2.06061 0.851351ZM3.4676 5.2041L3.95784 5.6309L3.95784 5.6309L3.4676 5.2041ZM3.79208 2.09248L3.22433 2.40895L3.22433 2.40895L3.79208 2.09248ZM0.712807 4.27148L1.34997 4.14295L0.712807 4.27148ZM8.70438 3.19261C8.37396 3.05229 7.99234 3.20641 7.85203 3.53683C7.71171 3.86726 7.86583 4.24887 8.19625 4.38919L8.45032 3.7909L8.70438 3.19261ZM9.91135 6.10426C10.0517 6.43469 10.4333 6.5888 10.7637 6.44848C11.0941 6.30816 11.2482 5.92655 11.1079 5.59612L10.5096 5.85019L9.91135 6.10426ZM9.05566 0.0256773C8.71074 -0.0738564 8.35045 0.125061 8.25092 0.469972C8.15138 0.814882 8.3503 1.17518 8.69521 1.27471L8.87543 0.650193L9.05566 0.0256773ZM13.0258 5.6051C13.1254 5.95 13.4857 6.14891 13.8306 6.04936C14.1755 5.94981 14.3744 5.58951 14.2748 5.2446L13.6503 5.42485L13.0258 5.6051ZM0.712807 4.27148L0.0756413 4.40001C0.26851 5.35612 0.590283 6.29951 1.24211 7.4361L1.80597 7.11273L2.36982 6.78936C1.78922 5.77697 1.51592 4.96559 1.34997 4.14295L0.712807 4.27148ZM1.80597 7.11273L2.29621 7.53953L3.95784 5.6309L3.4676 5.2041L2.97735 4.7773L1.31572 6.68592L1.80597 7.11273ZM3.79208 2.09248L4.35984 1.77601L3.79227 0.757782L3.22451 1.07425L2.65676 1.39072L3.22433 2.40895L3.79208 2.09248ZM10.0292 13.5879L10.1578 12.9507C9.33511 12.7848 8.52373 12.5115 7.51135 11.9309L7.18798 12.4947L6.86461 13.0586C8.0012 13.7104 8.94459 14.0322 9.90069 14.2251L10.0292 13.5879ZM7.18798 12.4947L7.61478 12.985L9.52341 11.3234L9.09661 10.8331L8.66981 10.3429L6.76118 12.0045L7.18798 12.4947ZM12.2082 10.5086L11.8918 11.0764L12.91 11.6439L13.2265 11.0762L13.5429 10.5084L12.5247 9.94087L12.2082 10.5086ZM1.80597 7.11273L1.24211 7.4361C2.54675 9.71097 4.5871 11.7524 6.86461 13.0586L7.18798 12.4947L7.51135 11.9309C5.43412 10.7396 3.55973 8.86418 2.36982 6.78936L1.80597 7.11273ZM9.09661 10.8331L9.52341 11.3234C9.88294 11.0104 10.1127 10.8116 10.3035 10.6798C10.4807 10.5575 10.5708 10.5318 10.6372 10.5249L10.5698 9.87844L10.5024 9.23194C10.1409 9.26964 9.84293 9.41801 9.56472 9.61014C9.30005 9.79293 9.00717 10.0492 8.66981 10.3429L9.09661 10.8331ZM12.2082 10.5086L12.5247 9.94087C12.134 9.72309 11.7945 9.53279 11.4979 9.40855C11.186 9.27795 10.8638 9.19425 10.5024 9.23194L10.5698 9.87844L10.6372 10.5249C10.7036 10.518 10.7971 10.5245 10.9957 10.6077C11.2095 10.6972 11.4754 10.8443 11.8918 11.0764L12.2082 10.5086ZM3.4676 5.2041L3.95784 5.6309C4.25154 5.29354 4.50778 5.00066 4.69057 4.73599C4.8827 4.45778 5.03107 4.15982 5.06876 3.79835L4.42227 3.73093L3.77578 3.66351C3.76886 3.72986 3.74324 3.82004 3.62087 3.99724C3.48915 4.18797 3.29035 4.41776 2.97735 4.7773L3.4676 5.2041ZM3.79208 2.09248L3.22433 2.40895C3.45642 2.82533 3.60352 3.09119 3.69306 3.305C3.77624 3.50363 3.7827 3.59716 3.77578 3.66351L4.42227 3.73093L5.06876 3.79835C5.10646 3.43687 5.02276 3.11471 4.89216 2.80285C4.76791 2.50616 4.57762 2.16671 4.35984 1.77601L3.79208 2.09248ZM13.4494 12.2401L12.9455 11.8294C12.2449 12.6891 11.1892 13.1588 10.1578 12.9507L10.0292 13.5879L9.90069 14.2251C11.5 14.5477 13.0141 13.803 13.9532 12.6508L13.4494 12.2401ZM2.06061 0.851351L1.64995 0.347504C0.497747 1.2866 -0.246969 2.80074 0.0756413 4.40001L0.712807 4.27148L1.34997 4.14295C1.1419 3.11149 1.61163 2.05584 2.47127 1.3552L2.06061 0.851351ZM13.2265 11.0762L12.91 11.6439C12.9555 11.6693 12.979 11.693 12.9898 11.7067C12.9952 11.7136 12.9979 11.7184 12.9991 11.721C13.0002 11.7234 13.0004 11.7245 13.0004 11.7246C13.0005 11.7246 13.0005 11.7247 13.0005 11.7249C13.0005 11.7251 13.0005 11.7256 13.0005 11.7265C13.0004 11.728 13.0001 11.7321 12.9981 11.7392C12.9943 11.7531 12.9822 11.7844 12.9455 11.8294L13.4494 12.2401L13.9532 12.6508C14.2296 12.3116 14.3619 11.8889 14.2735 11.4614C14.1862 11.0391 13.9037 10.7095 13.5429 10.5084L13.2265 11.0762ZM3.22451 1.07425L3.79227 0.757782C3.59116 0.396992 3.2616 0.114469 2.83928 0.0271813C2.41183 -0.0611658 1.98906 0.0711191 1.64995 0.347504L2.06061 0.851351L2.47127 1.3552C2.51626 1.31852 2.54762 1.30644 2.56146 1.30257C2.5686 1.30058 2.57274 1.30027 2.57425 1.30021C2.5751 1.30018 2.57558 1.30021 2.57577 1.30022C2.57596 1.30024 2.57606 1.30025 2.57615 1.30027C2.57616 1.30028 2.57727 1.30048 2.57974 1.30165C2.58227 1.30284 2.58715 1.3055 2.59403 1.31092C2.60772 1.32172 2.63141 1.34524 2.65676 1.39072L3.22451 1.07425ZM8.45032 3.7909L8.19625 4.38919C8.96637 4.71622 9.58432 5.33416 9.91135 6.10426L10.5096 5.85019L11.1079 5.59612C10.6493 4.51602 9.78449 3.65128 8.70438 3.19261L8.45032 3.7909ZM8.87543 0.650193L8.69521 1.27471C10.7798 1.87628 12.4242 3.52057 13.0258 5.6051L13.6503 5.42485L14.2748 5.2446C13.5493 2.7309 11.5694 0.751095 9.05566 0.0256773L8.87543 0.650193Z"
      fill="currentColor"
    />
  </svg>
);

const MenuHomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M2.25 7.2L9 1.75L15.75 7.2V15.25C15.75 15.664 15.414 16 15 16H3C2.586 16 2.25 15.664 2.25 15.25V7.2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M7 16V10.5H11V16" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const MenuShopIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M4 5.25H14L15.25 16H2.75L4 5.25Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M6.5 5.25V4.25C6.5 2.869 7.619 1.75 9 1.75C10.381 1.75 11.5 2.869 11.5 4.25V5.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const MenuAboutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7.25" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 8.25V12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="9" cy="6" r="0.9" fill="currentColor" />
  </svg>
);

const MenuContactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="2.25" y="4" width="13.5" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 5L9 10L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 14.5C8 14.5 3.25 10.1 3.25 6.75C3.25 4.127 5.377 2 8 2C10.623 2 12.75 4.127 12.75 6.75C12.75 10.1 8 14.5 8 14.5Z"
      stroke="currentColor"
      strokeWidth="1.4"
    />
    <circle cx="8" cy="6.75" r="1.75" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1.75" y="3.5" width="12.5" height="9" rx="1.4" stroke="currentColor" strokeWidth="1.4" />
    <path d="M2.5 4.5L8 8.75L13.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

function MenuItemIcon({ type }) {
  if (type === "home") return <MenuHomeIcon />;
  if (type === "shop") return <MenuShopIcon />;
  if (type === "about") return <MenuAboutIcon />;
  return <MenuContactIcon />;
}

const CartTabIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 14" fill="none">
    <path
      d="M15.6923 0H1.30769C0.960871 0 0.628254 0.13409 0.383014 0.372773C0.137774 0.611456 0 0.935179 0 1.27273V12.7273C0 13.0648 0.137774 13.3885 0.383014 13.6272C0.628254 13.8659 0.960871 14 1.30769 14H15.6923C16.0391 14 16.3717 13.8659 16.617 13.6272C16.8622 13.3885 17 13.0648 17 12.7273V1.27273C17 0.935179 16.8622 0.611456 16.617 0.372773C16.3717 0.13409 16.0391 0 15.6923 0ZM15.6923 12.7273H1.30769V1.27273H15.6923V12.7273ZM12.4231 3.81818C12.4231 4.83083 12.0098 5.802 11.274 6.51804C10.5383 7.23409 9.54046 7.63636 8.5 7.63636C7.45954 7.63636 6.46169 7.23409 5.72597 6.51804C4.99025 5.802 4.57692 4.83083 4.57692 3.81818C4.57692 3.64941 4.64581 3.48755 4.76843 3.3682C4.89105 3.24886 5.05736 3.18182 5.23077 3.18182C5.40418 3.18182 5.57049 3.24886 5.69311 3.3682C5.81573 3.48755 5.88462 3.64941 5.88462 3.81818C5.88462 4.49328 6.16016 5.14072 6.65064 5.61809C7.14112 6.09546 7.80636 6.36364 8.5 6.36364C9.19364 6.36364 9.85888 6.09546 10.3494 5.61809C10.8398 5.14072 11.1154 4.49328 11.1154 3.81818C11.1154 3.64941 11.1843 3.48755 11.3069 3.3682C11.4295 3.24886 11.5958 3.18182 11.7692 3.18182C11.9426 3.18182 12.109 3.24886 12.2316 3.3682C12.3542 3.48755 12.4231 3.64941 12.4231 3.81818Z"
      fill="#343330"
    />
  </svg>
);

function BrandLogo({ width = 250, className = "" }) {
  return (
    <Image
      src="/images/home/KCLogo.png"
      alt="Kavya Creation"
      width={width}
      height={70}
      className={className}
      style={{ height: "auto" }}
      priority
    />
  );
}

export default function Navbar() {
  const router = useRouter();
  const path = usePathname();
  const { handleGetCartDetail, cardDetails, wishlistDetails, setCartOpen } =
    useCartPanelStore();

  const cartCount = useCartPanelStore((state) => state.cartCount);
  const wishListCount = useCartPanelStore((state) => state.wishListCount);
  const { isLoggedIn, setIsLoginAuth } = useAuthStore();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [authView, setAuthView] = useState(null);
  const [hasHydrated, setHasHydrated] = useState(false);
  const loggedIn = hasHydrated && Boolean(isLoggedIn);

  const openAuthModal = useCallback(
    (view = "login") => {
      if (path === "/login" || path === "/register") {
        router.push(view === "register" ? "/register" : "/login");
        return;
      }
      setMenuOpen(false);
      setSearchOpen(false);
      setWishlistOpen(false);
      setCartOpen(false);
      setAuthView(view);
    },
    [path, router, setCartOpen]
  );

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setAuthView(null);
    }
  }, [isLoggedIn]);

  const handlePanel = useCallback(() => {
    if (path === "/cart") {
      return;
    }

    handleGetCartDetail();
  }, [handleGetCartDetail, path]);

  const handleNavigateHome = () => {
    router.push("/");
  };

  const handlePushToPath = (nextPath) => {
    router.push(nextPath);
    if (!isLoggedIn) {
      sessionStorage.setItem("postLoginRedirect", "/wishlist");
    }
  };

  const handleWishlistPanel = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setCartOpen(false);
    setWishlistOpen(true);

    const token =
      typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    const hasToken = token && token !== "undefined";

    if (!isLoggedIn && !hasToken) {
      sessionStorage.setItem("postLoginRedirect", "/wishlist");
      router.push("/wishlist");
      setWishlistOpen(false);
      return;
    }

    wishlistDetails();
  }, [isLoggedIn, router, setCartOpen, wishlistDetails]);

  const loginChecking = async () => {
    try {
      await loginCheck();
    } catch (error) {
      getErrorMessage(error);
    }
  };

  const closeOverlays = () => {
    setMenuOpen(false);
    setSearchOpen(false);
    setWishlistOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token && token !== "undefined") {
      setIsLoginAuth(true);
      cardDetails();
      wishlistDetails();
    }
    // Don't call setIsLoginAuth(false) here — that breaks Google sign-in where
    // the token arrives async via SessionSync after this effect runs.
    // Logout flow in useAuthStore handles setting isLoggedIn to false.
  }, [cardDetails, wishlistDetails, setIsLoginAuth]);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setWishlistOpen(false);
  }, [path]);

  useEffect(() => {
    if (menuOpen || searchOpen || wishlistOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen, wishlistOpen]);

  return (
    <>
      <SearchPanel open={searchOpen} onClose={closeOverlays} />

      <div
        className={`aq-offcanvas-wrap${menuOpen ? " opened" : ""}`}
      >
        <div className="aq-offcanvas-top d-flex align-items-center justify-content-between">
          <div className="aq-offcanvas-logo">
            <Link href="/" onClick={closeOverlays}>
              <BrandLogo width={200} />
            </Link>
          </div>
          <div className="aq-offcanvas-close" onClick={() => setMenuOpen(false)}>
            <span>
              <OffcanvasCloseIcon />
            </span>
          </div>
        </div>
        <div className="aq-offcanvas-menu-wrap">
          <div className="aq-offcanvas-menu">
            <nav>
              <ul>
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} onClick={closeOverlays}>
                      <span className="aq-offcanvas-menu-icon">
                        <MenuItemIcon type={item.icon} />
                      </span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="aq-offcanvas-contact">
              <h4 className="aq-offcanvas-contact-title">Contact us</h4>
              <a
                className="aq-offcanvas-contact-item"
                href={STORE_MAPS}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="aq-offcanvas-contact-icon">
                  <PinIcon />
                </span>
                <span>{STORE_ADDRESS}</span>
              </a>
              <a className="aq-offcanvas-contact-item" href={`mailto:${STORE_EMAIL}`}>
                <span className="aq-offcanvas-contact-icon">
                  <MailIcon />
                </span>
                <span>{STORE_EMAIL}</span>
              </a>
              <a className="aq-offcanvas-contact-item" href={STORE_PHONE_HREF}>
                <span className="aq-offcanvas-contact-icon">
                  <PhoneIcon />
                </span>
                <span>{STORE_PHONE}</span>
              </a>
              <a
                className="aq-offcanvas-whatsapp"
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="aq-offcanvas-bottom">
          <div className="aq-offcanvas-btn-wrap d-flex justify-content-between align-items-center">
            {loggedIn ? (
              <Link
                className="aq-offcanvas-btn"
                href="/account"
                onClick={closeOverlays}
              >
                Account
              </Link>
            ) : (
              <button
                type="button"
                className="aq-offcanvas-btn"
                onClick={() => openAuthModal("login")}
              >
                Login
              </button>
            )}
            <Link
              className="aq-offcanvas-btn btn-black-bg"
              href="/wishlist"
              onClick={() => {
                if (!isLoggedIn) {
                  sessionStorage.setItem("postLoginRedirect", "/wishlist");
                }
                closeOverlays();
              }}
            >
              Wishlist
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`body-overlay${
          menuOpen || searchOpen || wishlistOpen ? " opened" : ""
        }`}
        onClick={closeOverlays}
      />

      <header className="aq-site-header">
        <div className="aq-header-top-area aq-header-top-style-2">
          <div className="container container-1890">
            <div className="row align-items-center">
              <div className="col-xl-4 col-md-3 d-none d-md-inline-block">
                <div className="aq-header-info d-flex align-items-center">
                  <a
                    className="aq-header-info-item d-none d-xl-flex align-items-center"
                    href={`mailto:${STORE_EMAIL}`}
                  >
                    <i>
                      <MailIcon />
                    </i>
                    <span>{STORE_EMAIL}</span>
                  </a>
                  <div className="aq-header-info-item d-flex align-items-center">
                    <i>
                      <PhoneIcon />
                    </i>
                    <a className="aq-line-anim" href={STORE_PHONE_HREF}>
                      {STORE_PHONE}
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6">
                <div className="aq-header-discount">
                  <Swiper
                    className="aq-header-discount-active"
                    modules={[Autoplay]}
                    slidesPerView={1}
                    loop
                    speed={1000}
                    allowTouchMove={false}
                    autoplay={{
                      delay: 3500,
                      disableOnInteraction: false,
                    }}
                  >
                    {HEADER_QUOTES.map((quote) => (
                      <SwiperSlide key={quote}>
                        <div className="aq-header-discount-item text-center">
                          <p>{quote}</p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
              <div className="col-xl-4 col-md-3 d-none d-md-inline-block" />
            </div>
          </div>
        </div>
        <div className="aq-header-area p-relative aq-header-bottom-bdr">
          <div className="container container-1890">
            <div className="row align-items-center flex-nowrap aq-header-main-row">
              <div className="col-auto d-xl-none">
                <div className="aq-header-bar-wrap">
                  <button
                    type="button"
                    className="aq-header-bar aq-offcanvas-toggle"
                    onClick={() => {
                      setSearchOpen(false);
                      setWishlistOpen(false);
                      setMenuOpen(true);
                    }}
                    aria-label="Open menu"
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </div>
              </div>
              <div className="col-xl-3 col aq-header-logo-col">
                <div className="aq-header-logo text-center text-xl-start">
                  <Link href="/" onClick={handleNavigateHome}>
                    <BrandLogo width={250} />
                  </Link>
                </div>
              </div>
              <div className="col-xl-6 d-none d-xl-block">
                <div className="aq-header-menu menu-height-62 aq-header-dropdown menu-black text-center">
                  <nav className="aq-mobile-menu-active">
                    <ul>
                      {navItems.map((item) => (
                        <li key={item.name}>
                          <Link href={item.href}>{item.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-xl-3 col-auto">
                <div className="aq-header-right-options text-end">
                  <ul>
                    <li className="aq-header-top-search">
                      <button
                        type="button"
                        className="aq-search-toggle"
                        onClick={() => {
                          setMenuOpen(false);
                          setWishlistOpen(false);
                          setSearchOpen(true);
                        }}
                        aria-label="Search"
                      >
                        <i>
                          <SearchIcon />
                        </i>
                      </button>
                    </li>
                    <li className="aq-header-top-account d-none d-md-inline-block">
                      {loggedIn ? (
                        <Link href="/account" aria-label="Account">
                          <i>
                            <AccountIcon />
                          </i>
                        </Link>
                      ) : (
                        <button
                          type="button"
                          aria-label="Login"
                          onClick={() => openAuthModal("login")}
                        >
                          <i>
                            <AccountIcon />
                          </i>
                        </button>
                      )}
                    </li>
                    <li className="aq-header-top-wishlist d-none d-md-inline-block">
                      <button
                        type="button"
                        className="aq-wishlist-btn"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleWishlistPanel();
                        }}
                        aria-label="Wishlist"
                      >
                        <span className="count-box">{wishListCount || 0}</span>
                        <i>
                          <WishlistIcon />
                        </i>
                      </button>
                    </li>
                    <li className="aq-header-top-cart aq-cart-btn d-none d-md-inline-block">
                      <button type="button" onClick={handlePanel} aria-label="Cart">
                        <span className="count-box">{cartCount || 0}</span>
                        <i>
                          <CartIcon />
                        </i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="aq-bottom-menu">
        <div className="container">
          <div className="row row-cols-5">
            <div className="col">
              <Link href="/">
                <div className="aq-bottom-menu-item">
                  <i>
                    <HomeTabIcon />
                  </i>
                  <span>Home</span>
                </div>
              </Link>
            </div>
            <div className="col">
              {loggedIn ? (
                <Link href="/account">
                  <div className="aq-bottom-menu-item">
                    <i>
                      <AccountTabIcon />
                    </i>
                    <span>Account</span>
                  </div>
                </Link>
              ) : (
                <button type="button" onClick={() => openAuthModal("login")}>
                  <div className="aq-bottom-menu-item">
                    <i>
                      <AccountTabIcon />
                    </i>
                    <span>Account</span>
                  </div>
                </button>
              )}
            </div>
            <div className="col">
              <Link href="/shop">
                <div className="aq-bottom-menu-item">
                  <i>
                    <ShopTabIcon />
                  </i>
                  <span>Shop</span>
                </div>
              </Link>
            </div>
            <div className="col">
              <div className="aq-bottom-menu-item">
                <button
                  type="button"
                  className="p-relative"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleWishlistPanel();
                  }}
                  aria-label="Wishlist"
                >
                  <span className="count-box">{wishListCount || 0}</span>
                  <i>
                    <WishlistTabIcon />
                  </i>
                </button>
                <span>Wishlist</span>
              </div>
            </div>
            <div className="col">
              <div className="aq-bottom-menu-item aq-cart-btn">
                <button
                  type="button"
                  className="p-relative"
                  onClick={handlePanel}
                  aria-label="Cart"
                >
                  <span className="count-box">{cartCount || 0}</span>
                  <i>
                    <CartTabIcon />
                  </i>
                </button>
                <span>Cart</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SidePanelCart />
      <WishlistModal
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
      />
      <AuthModal
        view={authView}
        onClose={() => setAuthView(null)}
        onChangeView={setAuthView}
      />
      <QuickViewModal />
    </>
  );
}
