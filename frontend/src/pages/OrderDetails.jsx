import React, { useEffect, useState } from "react";
import api from "../config/axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Loader2, ShoppingCart } from "lucide-react";

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const res = await api.get(`/orders/order/${orderId}`);
        console.log("ORDER LOADED:", res.data);
        setOrder(res.data);
      } catch (err) {
        console.error("ORDER LOAD ERROR:", err);
        alert("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  const handleReorder = async () => {
    try {
      setConfirming(true);
      // Use the new reorder-to-cart endpoint
      await api.post(`/cart/reorder/${order.orderId}`);
      // Navigate to cart
      navigate("/cart");
    } catch (err) {
      console.error("Reorder failed:", err);
      alert("Failed to reorder. Please try again.");
    } finally {
      setConfirming(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#B197A4" }}>
        <p className="text-2xl font-bold text-white">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#B197A4" }}>
        <p className="text-2xl font-bold text-white">Order not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 pt-32 pb-20 px-4 md:px-10">
      <Navbar />

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-left text-4xl md:text-5xl font-extrabold text-white tracking-wide drop-shadow-lg">
            Order #{order.orderId}
          </h1>
          <button
            onClick={() => navigate("/restaurants")}
            className="px-6 py-3 bg-white/90 backdrop-blur-sm text-indigo-700 font-bold rounded-xl shadow-lg hover:shadow-2xl hover:bg-white transform hover:scale-105 transition-all duration-300"
          >
            ← Back to Restaurants
          </button>
        </div>

        <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden border border-white/20">
          {/* Order Info Section */}
          <div className="p-8 border-b-2 border-indigo-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
              <div className={`px-4 py-2 rounded-full text-sm font-semibold text-white ${order.status === 'Delivered' ? 'bg-green-500' :
                order.status === 'Cancelled' ? 'bg-red-500' :
                  'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}>
                {order.status || "Pending"}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center bg-indigo-50 p-4 rounded-xl">
                <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-indigo-500 font-bold uppercase tracking-wider">Order ID</p>
                  <p className="font-mono font-bold text-gray-800 text-lg">{order.orderId}</p>
                </div>
              </div>

              <div className="flex items-center bg-purple-50 p-4 rounded-xl">
                <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-purple-500 font-bold uppercase tracking-wider">Order Date</p>
                  <p className="font-bold text-gray-800">{new Date(order.orderDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Items Ordered</h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-200 border border-transparent hover:border-indigo-100">
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 text-lg">{item.item}</p>
                    <p className="text-sm text-gray-500">Qty: <span className="font-bold text-indigo-600">{item.qty}</span></p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-indigo-600 text-lg">৳{item.price}</p>
                    <p className="text-xs text-gray-400">৳{(item.price / item.qty).toFixed(2)} each</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Section */}
            <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-600">Total Amount</span>
                <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">৳{order.totalPrice}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex gap-4">
              <button
                onClick={handleReorder}
                disabled={confirming}
                className={`w-full py-4 font-bold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 ${confirming
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                  }`}
              >
                {confirming ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Processing Reorder...
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Order Again
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
