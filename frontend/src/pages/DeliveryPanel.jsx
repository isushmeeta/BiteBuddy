
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function DeliveryPanel() {
  const deliveryPartnerId = "PUT_DELIVERY_PARTNER_ID_HERE";
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/delivery/assigned/${deliveryPartnerId}`
    );
    setOrders(res.data);
  };

  const updateStatus = async (orderId, status) => {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/delivery/update-status/${orderId}`,
      { status }
    );
    fetchOrders();
  };

  return (
    <div className="min-h-screen bg-[#A98694]">
      <Navbar />

      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Delivery Panel</h1>

        {orders.length === 0 ? (
          <p className="text-xl">No active deliveries.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-[#E3E1E1] p-6 rounded-xl shadow-md mb-5"
            >
              <h2 className="text-xl font-bold mb-2">
                Order ID: {order._id.slice(-6)}
              </h2>

              <p className="mb-1 font-semibold">
                Address: {order.address}
              </p>

              <p className="mb-2">
                Status:{" "}
                <span className="font-bold text-blue-700">
                  {order.status}
                </span>
              </p>

              {/* Items */}
              <ul className="mb-4">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} × {item.qty}
                  </li>
                ))}
              </ul>

              {/* Status Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => updateStatus(order._id, "Picked Up")}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                >
                  Picked Up
                </button>

                <button
                  onClick={() => updateStatus(order._id, "On the Way")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  On the Way
                </button>

                <button
                  onClick={() => updateStatus(order._id, "Delivered")}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Delivered
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
