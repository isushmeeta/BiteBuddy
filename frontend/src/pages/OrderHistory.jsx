// src/pages/OrderHistory.jsx
import React, { useEffect, useState } from "react";
import api from "../config/axiosConfig";
import OrderCard from "../components/OrderCard";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = "USER001"; // replace with real user later

  useEffect(() => {
    const fetchOrders = async () => {
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
  }, []);

  const handleReorder = async (order) => {
    try {
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
