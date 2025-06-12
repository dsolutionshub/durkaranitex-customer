import Link from 'next/link';

export default function OrderHistory() {
  const orders = [
    { id: "ORD1001", date: "2025-06-10", method: "Credit Card", total: "₹2,500" },
    { id: "ORD1002", date: "2025-06-09", method: "UPI", total: "₹1,200" },
    { id: "ORD1003", date: "2025-06-08", method: "Net Banking", total: "₹4,050" },
    { id: "ORD1004", date: "2025-06-07", method: "Cash on Delivery", total: "₹999" },
    { id: "ORD1005", date: "2025-06-06", method: "Debit Card", total: "₹3,800" },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-xl overflow-hidden">
        <div className="py-4">
          <h3 className="text-2xl font-bold text-black">Order History</h3>
        </div>

        {orders.length === 0 ? (
          <div>
            <div className="bg-green-100 text-green-800 p-4 rounded flex space-x-2 items-start">
              <span className="text-xl">✔</span>
              <p className="m-0">
                <Link href="/shop" className="font-medium underline">
                  Make your first order.
                </Link>{' '}
                You haven't placed any orders yet.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">Order ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Payment Method</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Total Paid</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {orders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.method}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.total}</td>
                    <td className="px-6 py-4">
                      <button className="bg-green-800 text-white text-sm px-3 py-1 rounded">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
