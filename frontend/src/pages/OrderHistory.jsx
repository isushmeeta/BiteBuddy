// src/pages/OrderHistory.jsx
import React, { useEffect, useState } from "react";
import api from "../config/axiosConfig";
import OrderCard from "../components/OrderCard";
import Navbar from "../components/Navbar";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get logged-in user from localStorage
  const getLoggedInUserId = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?._id || user?.userId || null;
    } catch (error) {
      console.error("Failed to get user from localStorage:", error);
      return null;
    }
  };

  const userId = getLoggedInUserId();

  useEffect(() => {
    const fetchOrders = async () => {
      // Check if user is logged in
      if (!userId) {
        // Optional: redirect to login or just show empty state
        setLoading(false);
        return;
      }

      try {
        const res = await api.get(`/orders/${userId}`);
        setOrders(res.data?.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const handleReorder = async (order) => {
    try {
      await api.post(`/orders/reorder/${order._id}`);
      alert("Reorder placed successfully!");
    } catch (err) {
      console.error("Reorder failed:", err);
      // Fallback or detailed error handling could go here
      alert("Reorder failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#B197A4" }}>
        <p className="text-2xl font-bold text-white">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 pt-32 pb-20 px-4 md:px-10">
      <Navbar />

      <h1 className="text-left text-4xl md:text-5xl font-extrabold mb-12 text-white tracking-wide drop-shadow-lg pl-2">
        ORDER HISTORY
      </h1>

      <div className="max-w-7xl mx-auto">
        {orders.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm shadow-2xl p-12 rounded-3xl text-center border border-white/20">
            <svg className="w-24 h-24 mx-auto mb-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-600 text-xl font-medium">No orders yet. Start browsing restaurants!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {orders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onReorder={() => handleReorder(order)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
