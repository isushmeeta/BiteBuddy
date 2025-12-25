// src/pages/OrderHistory.jsx
import React, { useEffect, useState } from "react";
import api from "../config/axiosConfig";
import OrderCard from "../components/OrderCard";
import "./OrderHistory.css";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = "USER001";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.api(`/orders/${userId}`);
        setOrders(Array.isArray(res.data) ? res.data : res.data.orders || []);
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
      alert("Reorder placed (method 1).");
      return;
    } catch (e1) {
      try {
        await api.post(`/orders/${order._id}/reorder`);
        alert("Reorder placed (method 2).");
        return;
      } catch (e2) {
        try {
          await api.post(`/orders/reorder`, {
            previousOrderId: order._id,
          });
          alert("Reorder placed (method 3).");
          return;
        } catch (e3) {
          console.error("Reorder failed:", e1, e2, e3);
          alert("Reorder failed. Check console.");
        }
      }
    }
  };

  return (
    <div
      className="order-history"
      style={{
        backgroundColor: "#B197A4",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-black">ORDER HISTORY</h1>

        {loading ? (
          <p className="loading-text">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="loading-text">No orders found.</p>
        ) : (
          <div className="order-list">
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
