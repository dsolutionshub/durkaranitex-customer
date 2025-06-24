import { Suspense } from "react";
import PaymentStatusComponent from "./PaymentStatus/Page";

export default function PaymentStatus() {
  return (
    <div>
      <Suspense fallback={<div>Loading product details...</div>}>
      <PaymentStatusComponent/>
      </Suspense>
    </div>
  );
}
