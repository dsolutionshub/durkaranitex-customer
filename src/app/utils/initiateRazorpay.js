export const initiateRazorpayPayment = ({ order }) => {
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: "Your Company Name",
    description: "Purchase",
    order_id: order.id,
    handler: function (response) {
      // ✅ On successful payment
      window.location.href = `/payment-status?status=success&payment_id=${response.razorpay_payment_id}`;
    },
    modal: {
      // ❌ If user closes/cancels payment
      ondismiss: function () {
        window.location.href = "/payment-status?status=failed";
      },
    },
    prefill: {
      name: "Customer Name",
      email: "customer@example.com",
      contact: "9999999999",
    },
    theme: { color: "#00C896" },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
