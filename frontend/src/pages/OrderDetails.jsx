//pages/OrderDetails.jsx
import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import api from "../config/axiosConfig";
import { useParams } from "react-router-dom";
=======
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
>>>>>>> sadia

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      try {
<<<<<<< HEAD
        const res = await api.get(
          `/orders/order/${orderId}`
=======
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders/order/${orderId}`
>>>>>>> sadia
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
        `${import.meta.env.VITE_API_URL}/orders/reorder/${order._id}`
      );
      console.log("Reorder created:", res.data.order);
      alert("Order placed successfully!");
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
    <div className="min-h-screen p-10" style={{ backgroundColor: "#B197A4" }}>
      <Navbar />

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-left text-5xl md:text-6xl font-extrabold text-gradient bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent tracking-wide pl-6 md:pl-20">
          {order.restaurantName}
        </h1>
        <button
          onClick={() => navigate("/order-history")}
          className="mr-6 md:mr-20 px-6 py-3 bg-white/90 backdrop-blur-sm text-gray-800 font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          ← Back to Orders
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
          {/* Order Info Section */}
          <div className="p-8 border-b-2 border-purple-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {order.status || "Delivered"}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-semibold text-gray-800">{order.orderId}</p>
                </div>
              </div>

              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-semibold text-gray-800">{new Date(order.orderDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Items</h2>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{item.item}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.qty}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">৳{item.price}</p>
                    <p className="text-xs text-gray-500">৳{(item.price / item.qty).toFixed(2)} each</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Section */}
            <div className="mt-6 pt-6 border-t-2 border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-800">Total Amount</span>
                <span className="text-3xl font-bold text-purple-600">৳{order.totalPrice}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleReorder}
                disabled={confirming}
                className={`flex-1 py-4 font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${confirming
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  }`}
              >
                {confirming ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  "🔄 REORDER"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
