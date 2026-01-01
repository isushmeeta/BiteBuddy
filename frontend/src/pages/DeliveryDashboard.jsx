import React, { useEffect, useState } from "react";
import api from "../config/axiosConfig";
import Navbar from "../components/Navbar";
import { CheckCircle, Truck, Package } from "lucide-react";

export default function DeliveryDashboard() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            // Always fetch assigned orders
            const res = await api.get("/delivery/assigned");
            setOrders(res.data.orders);
        } catch (err) {
            console.error("Failed to fetch orders:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            await api.put(`/delivery/status/${orderId}`, { status: newStatus });
            fetchOrders();
        } catch (err) {
            console.error("Update status failed:", err);
            alert("Failed to update status");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col font-sans">
            <Navbar />

            <div className="flex-1 flex justify-center py-10 px-4 pt-32">
                <div className="w-full max-w-6xl bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-2xl border border-white/20 h-fit">

                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
                        <div className="flex items-center gap-3">
                            <span className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                                <Truck size={32} />
                            </span>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-wide">
                                    My Deliveries
                                </h1>
                                <p className="text-gray-500 font-medium">Manage your assigned orders</p>
                            </div>
                        </div>

                        <div className="bg-indigo-50 px-5 py-2 rounded-full text-indigo-700 font-bold border border-indigo-100 shadow-sm">
                            {orders.length} Active Assignments
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600 mx-auto mb-4"></div>
                            <p className="text-gray-500 font-bold">Loading orders...</p>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                            <Package size={48} className="mx-auto mb-4 text-gray-300" />
                            <p className="text-gray-500 text-xl font-medium">No orders assigned to you yet.</p>
                            <p className="text-gray-400 text-sm mt-2">Wait for an admin to assign you an order.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {orders.map(order => (
                                <div key={order._id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide text-white ${order.status === 'Delivered' ? 'bg-green-500' :
                                                    order.status === 'On the Way' ? 'bg-blue-500' :
                                                        order.status === 'Picked Up' ? 'bg-indigo-500' :
                                                            order.status === 'Assigned' ? 'bg-purple-500' :
                                                                'bg-yellow-500'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                                <h3 className="text-lg font-bold text-gray-800 mt-3 flex items-center gap-1">
                                                    #{order.orderId}
                                                </h3>
                                            </div>
                                            <p className="text-xl font-extrabold text-indigo-600">৳{order.totalPrice}</p>
                                        </div>

                                        <div className="space-y-3 mb-4 bg-gray-50 p-4 rounded-xl">
                                            <div className="flex items-start gap-3">
                                                <div className="mt-1 w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0"></div>
                                                <div>
                                                    <p className="text-xs text-gray-400 font-bold uppercase">Restaurant</p>
                                                    <p className="text-sm font-bold text-gray-800">{order.restaurantName}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="mt-1 w-2 h-2 rounded-full bg-pink-500 flex-shrink-0"></div>
                                                <div>
                                                    <p className="text-xs text-gray-400 font-bold uppercase">Deliver To</p>
                                                    <p className="text-sm font-bold text-gray-800">{order.address}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{order.phone}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <div className="flex flex-col gap-2">
                                            {/* Flow: Assigned -> Picked Up -> On the Way -> Delivered */}

                                            {order.status === "Assigned" && (
                                                <button
                                                    onClick={() => handleUpdateStatus(order._id, "Picked Up")}
                                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                                                >
                                                    <Package size={20} />
                                                    Picked Up Food
                                                </button>
                                            )}

                                            {order.status === "Picked Up" && (
                                                <button
                                                    onClick={() => handleUpdateStatus(order._id, "On the Way")}
                                                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                                                >
                                                    <Truck size={20} />
                                                    Left Restaurant
                                                </button>
                                            )}

                                            {order.status === "On the Way" && (
                                                <button
                                                    onClick={() => handleUpdateStatus(order._id, "Delivered")}
                                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                                                >
                                                    <CheckCircle size={20} />
                                                    Mark as Delivered
                                                </button>
                                            )}

                                            {order.status === "Delivered" && (
                                                <div className="w-full bg-green-50 text-green-700 font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 border border-green-200">
                                                    <CheckCircle size={18} />
                                                    Delivery Completed
                                                </div>
                                            )}

                                            {order.status === "Cancelled" && (
                                                <div className="w-full bg-red-50 text-red-700 font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 border border-red-200">
                                                    Order Cancelled
                                                </div>
                                            )}

                                            {/* Fallback */}
                                            {["Pending", "Preparing"].includes(order.status) && (
                                                <div className="text-center text-gray-500 font-medium py-2 text-sm italic">
                                                    Wait for Admin Assignment...
                                                </div>
                                            )}

                                            {/* Cancel / Delete Options */}
                                            <div className="flex items-center gap-2 mt-2">
                                                {!['Delivered', 'Cancelled'].includes(order.status) && (
                                                    <button
                                                        onClick={async () => {
                                                            if (window.confirm("Cancel this delivery?")) {
                                                                try { await api.put(`/orders/cancel/${order._id}`); fetchOrders(); }
                                                                catch (e) { alert("Failed"); }
                                                            }
                                                        }}
                                                        className="flex-1 border border-red-200 text-red-500 hover:bg-red-50 py-2 rounded-lg text-sm font-bold opacity-60 hover:opacity-100 transition-opacity"
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                                {['Delivered', 'Cancelled'].includes(order.status) && (
                                                    <button
                                                        onClick={async () => {
                                                            if (window.confirm("Remove this order from history?")) {
                                                                try { await api.delete(`/orders/delete/${order._id}`); fetchOrders(); }
                                                                catch (e) { alert("Failed"); }
                                                            }
                                                        }}
                                                        className="flex-1 border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-500 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-1 group"
                                                    >
                                                        <span className="group-hover:text-red-500">Delete</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
