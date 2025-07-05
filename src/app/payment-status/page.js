import { Suspense } from "react";
import PaymentStatusComponent from "./PaymentStatus/Page";
import Loader from "../components/loader/loader";

export default function PaymentStatus() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <PaymentStatusComponent />
      </Suspense>
    </div>
  );
}
