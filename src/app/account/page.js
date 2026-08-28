"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { signOut, useSession } from "next-auth/react";

import OrderHistory from "./components/OrderHistory";
import AccountDetails from "./components/AccountDetails";
import AddressForm from "./components/Addresses";
import DashboardSidebar, { DASHBOARD_MENU } from "./components/DashboardSidebar";
import DashboardHome from "./components/DashboardHome";
import SecurityPanel from "./components/SecurityPanel";
import WishlistPanel from "./components/WishlistPanel";
import EmptyPanel from "./components/EmptyPanel";

import { getProfileInfo, logout, getOrderList } from "../api/services/authService";
import { getErrorMessage } from "../utils/helperFn";
import { loader } from "../components/loader/loaderManager";
import { useAuthStore } from "@/store/useAuthStore";
import { LOGIN_MSG } from "../utils/constants";
import useCartPanelStore from "@/store/useCartPanelStore";
import Loader from "../components/loader/loader";

import "./account-page.css";

const VALID_TABS = [
  "dashboard",
  "orders",
  "downloads",
  "invoices",
  "returns",
  "reviews",
  "wishlist",
  "offers",
  "profile",
  "security",
  "addresses",
];

const HIDDEN_TABS = DASHBOARD_MENU.filter((item) => item.hidden).map((item) => item.key);

const EMPTY_COPY = {
  downloads: {
    title: "Downloads",
    message: "You have no downloadable products yet.",
  },
  returns: {
    title: "Order Return Request",
    message: "You have not requested any returns.",
  },
  reviews: {
    title: "Product Reviews",
    message: "You have not written any reviews yet.",
  },
  offers: {
    title: "Special Offers",
    message: "There are no special offers on your account right now.",
  },
};

export default function AccountPage() {
  const router = useRouter();
  const { handleLogout, isLoggedIn } = useAuthStore();
  const { resetCart } = useCartPanelStore();
  const { data: session, status } = useSession();
  const [selectedTab, setSelectedTab] = useState("profile");
  const [profileInfo, setProfileInfo] = useState([]);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [orderCount, setOrderCount] = useState(0);

  const isGoogleSession = !!session?.user?.email;
  const displayProfile = isGoogleSession
    ? { name: session.user.name, email: session.user.email }
    : profileInfo;

  const handleLoggedOut = async () => {
    try {
      const data = await logout();
      toast.success(data?.message);
    } catch {
      // ignore backend logout errors — proceed with client-side cleanup
    }
    handleLogout();
    resetCart();
    await signOut({ callbackUrl: "/login" });
  };

  const handleProfileInfo = async () => {
    if (isGoogleSession) return;
    loader(true);
    try {
      const { customer } = await getProfileInfo();
      setProfileInfo(customer || []);
    } catch (error) {
      const MSG = getErrorMessage(error);
      const errorStatus = error?.response?.status;
      if (errorStatus === 401) {
        return;
      }
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  const handleSelect = (key) => {
    if (key === "logout") {
      handleLoggedOut();
      return;
    }
    if (HIDDEN_TABS.includes(key)) {
      return;
    }
    setSelectedTab(key);
    sessionStorage.setItem("tab", key);
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 991px)").matches) {
      window.requestAnimationFrame(() => {
        document.getElementById("aq-dashboard-main")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "dashboard":
        return (
          <DashboardHome
            profile={displayProfile}
            orderCount={orderCount}
            onNavigate={handleSelect}
          />
        );
      case "orders":
        return <OrderHistory profile={displayProfile} />;
      case "invoices":
        return <OrderHistory profile={displayProfile} variant="invoices" />;
      case "profile":
      case "account":
        return <AccountDetails data={displayProfile} />;
      case "addresses":
        return <AddressForm />;
      case "security":
        return (
          <SecurityPanel
            email={displayProfile?.email}
            onBack={() => handleSelect("dashboard")}
          />
        );
      case "wishlist":
        return <WishlistPanel />;
      case "downloads":
      case "returns":
      case "reviews":
      case "offers":
        return (
          <EmptyPanel
            title={EMPTY_COPY[selectedTab].title}
            message={EMPTY_COPY[selectedTab].message}
          />
        );
      default:
        return <AccountDetails data={displayProfile} />;
    }
  };

  useEffect(() => {
    handleProfileInfo();
    const selectionTab = sessionStorage.getItem("tab");
    const mappedTab = selectionTab === "account" ? "profile" : selectionTab;
    if (mappedTab && VALID_TABS.includes(mappedTab)) {
      setSelectedTab(HIDDEN_TABS.includes(mappedTab) ? "dashboard" : mappedTab);
    }
    getOrderList()
      .then((data) =>
        setOrderCount(
          data?.cartOrderCount || data?.cartOrderProducts?.length || 0
        )
      )
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (isLoggedIn === true && !isGoogleSession && !profileInfo?.name) {
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
    <div className="aq-dashboard-page" data-bg-color="#F9F9F9">
      <div className="aq-dashboard-ptb">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <DashboardSidebar
                profile={displayProfile}
                activeKey={selectedTab === "account" ? "profile" : selectedTab}
                onSelect={handleSelect}
              />
            </div>
            <div className="col-lg-9" id="aq-dashboard-main">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
