"use client";

import { useEffect, useState } from "react";
import { User, Package, MapPin, LogOut } from "lucide-react";
import OrderHistory from "./components/OrderHistory";
import AccountDetails from "./components/AccountDetails";
import AddressForm from "./components/Addresses";
import { getProfileInfo } from "../api/services/authService";
import { getErrorMessage } from "../utils/helperFn";
import { loader } from "../components/loader/loaderManager";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const tabs = [
  { key: "account", label: "Account", Icon: User },
  { key: "orders", label: "Order History", Icon: Package },
  { key: "addresses", label: "Addresses", Icon: MapPin },
  { key: "logout", label: "Log Out", Icon: LogOut },
];

const LogOutComponent = ({ handleLogout, router }) => {
  return (
    <button
      className="dark-color"
      onClick={() => {
        handleLogout();
        router.push("/");
      }}
    >
      Logout
    </button>
  );
};

export default function AccountPage() {
  const router = useRouter();
  const { handleLogout } = useAuthStore();
  const [selectedTab, setSelectedTab] = useState("account");
  const [profileInfo, setProfileInfo] = useState([]);

  const profile_info = async () => {
    loader(true);
    try {
      const { customer } = await getProfileInfo();
      setProfileInfo(customer || []);
    } catch (error) {
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  };

  useEffect(() => {
    profile_info();
  }, []);

  const renderContent = (selectedTab) => {
    switch (selectedTab) {
      case "account":
        return <AccountDetails data={profileInfo} />;
      case "orders":
        return <OrderHistory />;
      case "addresses":
        return <AddressForm />;
      default:
        return <LogOutComponent handleLogout={handleLogout} router={router} />;
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token || token === "undefined") {
      router.replace("/login");
    }
  }, []);

  return (
    <div className="px-4 py-10 min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-black text-center">
          My Account
        </h1>
        <p className="text-gray-700 text-center">
          Hello <span className="font-semibold">{profileInfo?.name} 👋</span>
        </p>

        {/* Tabs and Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar/Menu */}
          {/* <div className="grid grid-cols-2 md:flex md:flex-col gap-3 md:w-1/4 w-full">
            <div
              className={`flex flex-col items-center justify-center p-3 rounded-md cursor-pointer ${
                selectedTab === "account"
                  ? "text-[var(--primary-main)] font-semibold"
                  : "text-gray-600 hover:text-[var(--primary-main)]"
              }`}
              style={{
                border:
                  selectedTab === "account"
                    ? "1px solid var(--primary-main)"
                    : "1px solid var(-dark-color)",
              }}
              onClick={() => setSelectedTab("account")}
            >
              <User className="w-5 h-5" />
              <span className="text-sm mt-1">Account</span>
            </div>

            <div
              className={`flex flex-col items-center justify-center p-3 rounded-md cursor-pointer ${
                selectedTab === "orders"
                  ? "text-[var(--primary-main)] font-semibold"
                  : "text-gray-600 hover:text-[var(--primary-main)]"
              }`}
              style={{
                border:
                  selectedTab === "orders"
                    ? "1px solid var(--primary-main)"
                    : "1px solid var(-dark-color)",
              }}
              onClick={() => setSelectedTab("orders")}
            >
              <Package className="w-5 h-5" />
              <span className="text-sm mt-1">Order History</span>
            </div>

            <div
              className={`flex flex-col items-center justify-center p-3 rounded-md cursor-pointer ${
                selectedTab === "addresses"
                  ? "text-text-[var(--primary-main)] font-semibold"
                  : "text-gray-600 hover:text-text-[var(--primary-main)]"
              }`}
              style={{
                border:
                  selectedTab === "addresses"
                    ? "1px solid var(--primary-main)"
                    : "1px solid var(-dark-color)",
              }}
              onClick={() => setSelectedTab("addresses")}
            >
              <MapPin className="w-5 h-5" />
              <span className="text-sm mt-1">Addresses</span>
            </div>

            <a
              // href="/logout"
              className="flex flex-col items-center justify-center p-3 border rounded-md text-gray-600 hover:text-black"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm mt-1">Log Out</span>
            </a>
          </div> */}

          <div className="grid grid-cols-2 md:flex md:flex-col gap-3 md:w-1/4 w-full">
            {tabs.map(({ key, label, Icon }) => {
              const isSelected = selectedTab === key;
              return (
                <div
                  key={key}
                  className={`flex flex-col items-center justify-center font-semibold p-3 rounded-md cursor-pointer ${
                    isSelected
                      ? "text-[var(--primary-main)]"
                      : "text-[var(--dark-color)] hover:text-[var(--primary-main)]"
                  }`}
                  style={{
                    border: `1px solid ${
                      isSelected ? "var(--primary-main)" : "lightgray"
                    }`,
                  }}
                  onClick={() => setSelectedTab(key)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm mt-1">{label}</span>
                </div>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="md:w-3/4 w-full">{renderContent(selectedTab)}</div>
        </div>
      </div>
    </div>
  );
}
