// src/pages/OrderHistory.jsx
import React, { useEffect, useState } from "react";
import api from "../config/axiosConfig";
import OrderCard from "../components/OrderCard";
<<<<<<< HEAD
=======
import Navbar from "../components/Navbar";
>>>>>>> sadia

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

<<<<<<< HEAD
  const userId = "USER001"; // replace with real user later
=======
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
>>>>>>> sadia

  useEffect(() => {
    const fetchOrders = async () => {
      // Check if user is logged in
      if (!userId) {
        alert("Please log in to view your order history");
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
<<<<<<< HEAD
      await api.post(`/orders/reorder/${order._id}`);
      alert("Reorder placed successfully");
    } catch (err) {
      console.error("Reorder failed:", err);
      alert("Reorder failed");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#B197A4",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">ORDER HISTORY</h1>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="grid gap-4">
=======
      await axios.post(`http://localhost:5000/api/orders/reorder/${order._id}`);
      alert("Reorder placed successfully!");
      return;
    } catch (e1) {
      try {
        await axios.post(`http://localhost:5000/api/orders/${order._id}/reorder`);
        alert("Reorder placed successfully!");
        return;
      } catch (e2) {
        try {
          await axios.post(`http://localhost:5000/api/orders/reorder`, {
            previousOrderId: order._id,
          });
          alert("Reorder placed successfully!");
          return;
        } catch (e3) {
          console.error("Reorder failed:", e1, e2, e3);
          alert("Reorder failed. Please try again.");
        }
      }
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
    <div className="min-h-screen p-10" style={{ backgroundColor: "#B197A4" }}>
      <Navbar />

      <h1 className="text-left text-5xl md:text-6xl font-extrabold mb-12 text-gradient bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent tracking-wide pl-6 md:pl-20">
        ORDER HISTORY
      </h1>

      <div className="max-w-6xl mx-auto">
        {orders.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm shadow-2xl p-12 rounded-2xl text-center">
            <svg className="w-24 h-24 mx-auto mb-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-500 text-xl">No orders yet. Start browsing restaurants!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
>>>>>>> sadia
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
