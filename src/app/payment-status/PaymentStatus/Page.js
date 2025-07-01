"use client";
import { LoaderComponent } from "@/app/components/loader/loader";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import OrderSuccess from "../OrderSuccess/page";
import OrderFailure from "../OrderFailed/page";

export default function PaymentStatusComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const payment_id = searchParams.get("payment_id");

  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (status) {
      setIsSuccess(status === "success");
      setLoading(false);
    }
  }, [status, router]);

  if (loading) return <LoaderComponent />;

  return (
    <div>
      {isSuccess ? <OrderSuccess payment_id={payment_id} /> : <OrderFailure />}
    </div>
  );
}
