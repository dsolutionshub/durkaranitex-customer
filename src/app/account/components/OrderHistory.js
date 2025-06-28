import Link from "next/link";
import { Package, Calendar, Eye } from "lucide-react";

export default function OrderHistory() {
  const orders = [
    { id: "ORD1001", date: "2025-06-10", items: 2, total: "₹2,500" },
    { id: "ORD1002", date: "2025-06-09", items: 1, total: "₹1,200" },
    { id: "ORD1003", date: "2025-06-08", items: 4, total: "₹4,050" },
    { id: "ORD1004", date: "2025-06-07", items: 3, total: "₹999" },
    { id: "ORD1005", date: "2025-06-06", items: 5, total: "₹3,800" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-green-900 dark:from-gray-200 dark:to-green-300 bg-clip-text text-transparent">
          Order History
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-300 bg-blue-200 dark:bg-blue-900/20 px-3 py-1 rounded-lg font-medium">
          {orders.length} Total Orders
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full mb-6">
            <Package className="w-12 h-12 text-gray-400 dark:text-gray-300" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Orders Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Start shopping to see your order history here!{" "}
            <Link
              href="/shop"
              className="text-green-600 underline font-medium hover:text-green-800"
            >
              Go to Shop
            </Link>
          </p>
        </div>
      ) : (
        <div
          className={`space-y-6 ${
            orders.length > 2 ? "max-h-[500px] overflow-y-auto pr-2" : ""
          }`}
        >
          {orders.map((order, index) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg shadow-blue-500/25">
                    <Package className="w-6 h-6 text-white" />
                  </div>

                  <div className="space-y-2">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {order.id}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {order.date}
                      </div>
                      <span className="text-sm">• {order.items} item(s)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 justify-between w-full md:w-auto">
                  <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {order.total}
                  </div>
                  <button className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg shadow-blue-500/25">
                    <Eye size={16} />
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
