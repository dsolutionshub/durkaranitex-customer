"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { useAuthStore } from "@/store/useAuthStore";
import CheckoutForm from "./components/CheckoutForm";
import OrderSummary from "./components/OrderSummary";
import { getErrorMessage } from "../utils/helperFn";
import { getCheckoutList } from "../api/services/authService";
import { loader } from "../components/loader/loaderManager";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const { syncAccessToken } = useAuthStore();
  const [checkoutData, setCheckoutData] = useState(null);

  const [editingAddress, setEditingAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleUpdateAddress = (updatedAddress) => {
    setAddresses((prev) =>
      prev.map((addr) =>
        addr.id === updatedAddress.id ? updatedAddress : addr
      )
    );
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    }
  };

  const handleSetDefault = (id) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleCheckoutList = async () => {
    loader(true);
    try {
      const data = await getCheckoutList();
      setCheckoutData(data || []);
    } catch (error) {
      getErrorMessage(error);
    } finally {
      loader(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      syncAccessToken(session);
    }
  }, [status, session, syncAccessToken]);

  useEffect(() => {
    handleCheckoutList();
  }, []);

  return (
    <div className="min-h-screen py-10 md:mx-3">
      <h2 className="text-2xl text-center pb-1 md:pb-4 text-black font-semibold checkout-text">
        Checkout
      </h2>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6 ">
        <CheckoutForm
          checkoutData={checkoutData}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSetDefault={handleSetDefault}
        />

        <OrderSummary checkoutData={checkoutData} />
      </div>
    </div>
  );
}
