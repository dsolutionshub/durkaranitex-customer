export const initiateRazorpayPayment = ({ order }) => {
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency || "INR",
    name: "Dhurgarani Tex",
    description: "Order Payment",
    order_id: order.order_id,
    handler: function (response) {
      window.location.href = `/payment-status?status=success&payment_id=${response.razorpay_payment_id}`;
    },
    modal: {
      ondismiss: function () {
        window.location.href = "/payment-status?status=failed";
      },
    },
    prefill: {
      name: order.customer_name || "Customer",
      email: order.customer_email || "example@email.com",
      contact: order.customer_phone || "9999999999",
    },
    theme: { color: "#00C896" },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
