import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PaymentStatus() {
  const router = useRouter();
  const { status, payment_id } = router.query;

  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (status) {
      setIsSuccess(status === "success");
      setLoading(false);
    }
  }, [status]);

  if (loading)
    return <div className="p-8 text-center">Checking payment status...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded p-8 max-w-md w-full text-center">
        {isSuccess ? (
          <>
            <h2 className="text-green-600 text-2xl font-semibold mb-4">
              Payment Successful!
            </h2>
            <p className="text-gray-700 mb-4">
              Your payment was successful. Thank you!
            </p>
            {payment_id && (
              <p className="text-sm text-gray-500">
                Payment ID: <strong>{payment_id}</strong>
              </p>
            )}
          </>
        ) : (
          <>
            <h2 className="text-red-600 text-2xl font-semibold mb-4">
              Payment Failed
            </h2>
            <p className="text-gray-700">
              Your payment could not be processed.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
