//pages/OrderDetails.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function OrderDetails() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/orders/order/${orderId}`
        );
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
      const res = await axios.post(
        `http://localhost:9169/api/orders/reorder/${order._id}`
      );
      console.log("Reorder created:", res.data.order);
      alert("Order confirmed!");
    } catch (err) {
      console.error("Reorder failed:", err);
      alert("Failed to reorder");
    } finally {
      setConfirming(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!order) return <p className="p-6">Order not found</p>;

  return (
    <div className="min-h-screen p-6"
         style={{ backgroundColor: "#B197A4" }}>
      <div
        className="max-w-xl mx-auto p-6 rounded"
        style={{ backgroundColor: "#d3d3d3" }}   // ← Updated background color
      >
        <h1 className="text-2xl font-bold mb-2">{order.restaurantName}</h1>

        <p><strong>Order ID:</strong> {order.orderId}</p>
        <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
        <p><strong>Status:</strong> {order.status}</p>

        <h2 className="font-semibold mt-4">Items:</h2>
        <ul>
          {order.items.map((item, index) => (
            <li key={index} className="flex justify-between py-2 border-b">
              <span>{item.item} = {item.qty} x </span>
              <span>${item.price}</span>
            </li>
          ))}
        </ul>

        <p className="font-bold text-lg mt-4">Total: ${order.totalPrice}</p>

        <button
          onClick={handleReorder}
          disabled={confirming}
          className={`mt-4 px-6 py-2 rounded-md border-2 border-black text-white ${
            confirming ? "bg-gray-500" : "bg-[#B197A4]"
          }`}
        >
          {confirming ? "Confirming..." : "REORDER"}
        </button>
      </div>
    </div>
  );
}
