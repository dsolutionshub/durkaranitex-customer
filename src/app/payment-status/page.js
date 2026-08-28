import { Suspense } from "react";
import PaymentStatusComponent from "./PaymentStatus/Page";
import { LoaderComponent } from "../components/loader/loader";

export default function PaymentStatus() {
  return (
    <div>
      <Suspense fallback={<LoaderComponent />}>
        <PaymentStatusComponent />
      </Suspense>
    </div>
  );
}
