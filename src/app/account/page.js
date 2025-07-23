"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { User, Package, MapPin, LogOut } from "lucide-react";

import OrderHistory from "./components/OrderHistory";
import AccountDetails from "./components/AccountDetails";
import AddressForm from "./components/Addresses";

import { getProfileInfo, logout } from "../api/services/authService";
import { getErrorMessage } from "../utils/helperFn";
import { loader } from "../components/loader/loaderManager";
import { useAuthStore } from "@/store/useAuthStore";
import { LOGGED_OUT_MSG, LOGIN_MSG } from "../utils/constants";
import useCartPanelStore from "@/store/useCartPanelStore";
import Loader from "../components/loader/loader";

const tabs = [
  { key: "account", label: "Account", Icon: User },
  { key: "orders", label: "Order History", Icon: Package },
  { key: "addresses", label: "Addresses", Icon: MapPin },
  { key: "logout", label: "Log Out", Icon: LogOut },
];

const LogOutComponent = ({ handleLoggedOut }) => {
  return (
    <button
      className="dark-color bg-red-700 rounded text-white hover:bg-red-600 px-3 py-1"
      onClick={handleLoggedOut}
    >
      Logout
    </button>
  );
};

export default function AccountPage() {
  const router = useRouter();
  const { handleLogout } = useAuthStore();
  const { setWishListCount, setCartCount } = useCartPanelStore();
  const [selectedTab, setSelectedTab] = useState("account");
  const [profileInfo, setProfileInfo] = useState([]);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const handleLoggedOut = async () => {
    const data = await logout();
    handleLogout();
    setCartCount(0);
    setWishListCount(0);
    router.push("/");
    toast.success(data?.message);
  };

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

  const renderContent = (selectedTab) => {
    switch (selectedTab) {
      case "account":
        return <AccountDetails data={profileInfo} />;
      case "orders":
        return <OrderHistory />;
      case "addresses":
        return <AddressForm />;
      default:
        return 
    }
  };

  useEffect(() => {
    profile_info();
    const selectionTab = sessionStorage.getItem("tab");
    if (selectionTab) {
      setSelectedTab(selectionTab)
      renderContent(selectionTab)
    }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    if (!token || token === "undefined") {
      toast.error(LOGIN_MSG);
      router.replace("/login");
    } else {
      setIsCheckingAuth(false);
    }
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="px-4 py-10 min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <div>
          <p className="text-2xl text-gray-700 text-center -translate-x-[-10px]">
            Hello{" "}
            <span className="text-3xl font-semibold">
              {profileInfo?.name} 👋
            </span>
          </p>
          <h1 className="text-3xl font-bold text-black text-center">
            Great to see you again!
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Side Menu */}
          <div className="md:w-1/4 w-full">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 h-full">
              <div className="flex flex-wrap md:flex-col gap-3">
                {tabs.map(({ key, label, Icon }) => {
                  const isActive = selectedTab === key;
                  return (
                    <div
                      key={key}
                      className={`group relative flex items-center gap-2 p-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${isActive
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25"
                          : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700"
                        }`}
                      onClick={() => {
                        setSelectedTab(key)
                        if (key === 'logout') {
                          handleLoggedOut()
                        }
                      }}
                    >
                      <div
                        className={`p-1 rounded-lg transition-colors ${isActive
                            ? "bg-white/20"
                            : "bg-gray-100 group-hover:bg-blue-100"
                          }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${isActive
                              ? "text-white"
                              : "text-gray-600 group-hover:text-blue-600"
                            }`}
                        />
                      </div>
                      <span className="font-medium text-sm">{label}</span>

                      {isActive && (
                        <div className="absolute right-[6px]">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4 w-full">{renderContent(selectedTab)}</div>
        </div>
      </div>
    </div>
  );
}
