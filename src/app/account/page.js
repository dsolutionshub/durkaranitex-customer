"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { signOut, useSession } from "next-auth/react";

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
  const { handleLogout, isLoggedIn } = useAuthStore();
  const { setWishListCount, setCartCount } = useCartPanelStore();
  const { data: session, status } = useSession();
  const [selectedTab, setSelectedTab] = useState("account");
  const [profileInfo, setProfileInfo] = useState([]);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);


  const handleLoggedOut = async () => {
    try {
      const data = await logout();
      toast.success(data?.message);
    } catch {
      // ignore backend logout errors — proceed with client-side cleanup
    }
    handleLogout();
    setCartCount(0);
    setWishListCount(0);
    await signOut({ callbackUrl: "/login" });
  };

  const handleProfileInfo = async () => {
    loader(true);
    try {
      const { customer } = await getProfileInfo();
      setProfileInfo(customer || []);
    } catch (error) {
      const MSG = getErrorMessage(error);
      const status = error.response.status;
      if (status === 401) {
        return;
      }
      toast.error(MSG);
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
        return <></>;
    }
  };

  useEffect(() => {
    handleProfileInfo();
    const selectionTab = sessionStorage.getItem("tab");
    if (selectionTab) {
      setSelectedTab(selectionTab);
      renderContent(selectionTab);
    }
  }, []);

  // Re-fetch profile when SessionSync delivers the token late (Google sign-in async path).
  useEffect(() => {
    if (isLoggedIn === true && !profileInfo?.name) {
      handleProfileInfo();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (status === "loading") return;

    const token = localStorage.getItem("accessToken");
    const sessionToken = session?.user?.accessToken;

    if (sessionToken) {
      if (token !== sessionToken) localStorage.setItem("accessToken", sessionToken);
      setIsCheckingAuth(false);
      return;
    }

    if (token && token !== "undefined") {
      setIsCheckingAuth(false);
      return;
    }

    if (isLoggedIn === true) {
      setIsCheckingAuth(false);
      return;
    }

    // Authenticated via Google, token acquisition in progress (isLoggedIn is null, not false).
    // Don't redirect — SessionSync will set the token and isLoggedIn will become true.
    if (status === "authenticated" && isLoggedIn !== false) return;

    toast.error(LOGIN_MSG);
    router.replace("/login");
  }, [status, session, router, isLoggedIn]);

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
          <div className="md:w-1/4 w-full d-none d-md-block">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 account-tab h-full">
              <div className="flex flex-wrap md:flex-col gap-3">
                {tabs.map(({ key, label, Icon }) => {
                  const isActive = selectedTab === key;
                  return (
                    <div
                      key={key}
                      className={`group relative flex items-center gap-2 p-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25"
                          : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700"
                      }`}
                      onClick={() => {
                        setSelectedTab(key);
                        if (key === "logout") {
                          handleLoggedOut();
                        }
                      }}
                    >
                      <div
                        className={`p-1 rounded-lg transition-colors ${
                          isActive
                            ? "bg-white/20"
                            : "bg-gray-100 group-hover:bg-blue-100"
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            isActive
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

          <div className="md:w-1/4 w-full d-md-none">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 max-[640px]:p-3 h-full">
              <div className="flex flex-wrap md:flex-col gap-3 max-[640px]:gap-1.5">
                {tabs.map(({ key, label, Icon }) => {
                  const isActive = selectedTab === key;
                  return (
                    <div
                      key={key}
                      className={`group relative flex items-center gap-2 max-[640px]:gap-1 
              tab-item 
              rounded-xl max-[640px]:rounded-md 
              cursor-pointer transition-all duration-300 transform hover:scale-105 
              ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25"
                  : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700"
              }`}
                      onClick={() => {
                        setSelectedTab(key);
                        if (key === "logout") {
                          handleLoggedOut();
                        }
                      }}
                    >
                      <div
                        className={`p-1 max-[640px]:p-0.5 rounded-lg transition-colors ${
                          isActive
                            ? "bg-white/20"
                            : "bg-gray-100 group-hover:bg-blue-100"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 max-[640px]:w-4 max-[640px]:h-4 ${
                            isActive
                              ? "text-white"
                              : "text-gray-600 group-hover:text-blue-600"
                          }`}
                        />
                      </div>
                      <span className="font-medium text-sm">{label}</span>

                      {isActive && (
                        <div className="absolute right-[6px] max-[640px]:right-[4px]">
                          <div className="w-2 h-2 max-[640px]:w-1.5 max-[640px]:h-1.5 bg-white rounded-full animate-pulse"></div>
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
