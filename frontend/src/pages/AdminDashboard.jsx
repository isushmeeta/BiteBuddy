import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../config/axiosConfig";
import { Package, Truck, User, Menu, ExternalLink, ChevronDown, ShoppingBag } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AdminDashboard() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resRest, resOrders, resPartners] = await Promise.all([
          api.get("/restaurants"),
          api.get("/orders/all"),
          api.get("/auth/partners")
        ]);
        setRestaurants(resRest.data.restaurants);
        setOrders(resOrders.data.orders);
        setPartners(resPartners.data.partners);


      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAssign = async (orderId, partnerId) => {
    if (!partnerId) return toast.error("Please select a partner");
    try {
      await api.put(`/orders/assign/${orderId}`, { deliveryPartnerId: partnerId });
      toast.success("Order assigned successfully!");
      // Refresh orders
      const res = await api.get("/orders/all");
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Assign failed:", err);
      toast.error("Failed to assign order");
    }
  };

  const handleRestaurantChange = (e) => {
    const newId = e.target.value;
    if (newId) {
      navigate(`/admin/${newId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 p-4 md:p-8 pt-24 mt-16 md:mt-20 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-white drop-shadow-lg tracking-tight">Admin Dashboard</h1>
            <p className="text-indigo-100 mt-1 font-medium">Manage your restaurant, menu, and orders.</p>
          </div>

          {/* Restaurant Selector */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ShoppingBag className="h-5 w-5 text-indigo-500" />
            </div>
            <select
              value={restaurantId || ""}
              onChange={handleRestaurantChange}
              className="appearance-none bg-white/95 backdrop-blur-sm border-2 border-transparent text-gray-700 py-3 pl-10 pr-10 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-indigo-400 font-bold cursor-pointer min-w-[280px] shadow-xl transition-all hover:bg-white"
            >
              <option value="" disabled>Select Restaurant to Manage</option>
              {restaurants.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-indigo-500">
              <ChevronDown size={20} />
            </div>
          </div>
        </div>

        {/* Info Grid (Visible if Restaurant Selected or General Stats) */}
        {!restaurantId && (
          <div className="bg-white/20 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-white mb-8 shadow-lg">
            <p className="flex items-center gap-2 font-semibold">
              <span className="bg-white/20 p-1 rounded-full"><ChevronDown size={16} /></span>
              Please select a restaurant from the dropdown above to manage its menu or view its dashboard statistics.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column: Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-2xl border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><Menu size={20} /></span>
                Quick Actions
              </h3>

              <div className="space-y-4">
                <button
                  onClick={() => restaurantId ? navigate(`/admin/menu/${restaurantId}`) : toast.error("Please select a restaurant first!")}
                  className={`w-full group relative overflow-hidden py-4 px-6 ${restaurantId ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400 cursor-not-allowed'} font-bold rounded-xl transition-all duration-300 flex items-center justify-between`}
                >
                  <span>Manage Menu</span>
                  {restaurantId && <ExternalLink size={18} className="opacity-70 group-hover:translate-x-1 transition-transform" />}
                </button>

                <button
                  onClick={() => navigate("/profile")}
                  className="w-full group relative overflow-hidden py-4 px-6 bg-white border-2 border-indigo-50 text-indigo-600 hover:bg-indigo-50 font-bold rounded-xl transition-all duration-300 flex items-center justify-between"
                >
                  <span>My Profile</span>
                  <User size={18} className="opacity-70" />
                </button>

                <button
                  onClick={() => navigate("/restaurants")}
                  className="w-full group relative overflow-hidden py-4 px-6 bg-white border-2 border-gray-100 text-gray-600 hover:bg-gray-50 font-bold rounded-xl transition-all duration-300 flex items-center justify-between"
                >
                  <span>View Live Site</span>
                  <ExternalLink size={18} className="opacity-70" />
                </button>
              </div>
            </div>

            {/* KPI Card */}
            <div className="bg-gradient-to-br from-pink-500 to-orange-400 p-6 rounded-3xl shadow-2xl text-white">
              <h3 className="text-lg font-bold opacity-90 mb-1">Total Orders</h3>
              <div className="text-5xl font-extrabold mb-2">{orders.length}</div>
              <div className="flex items-center gap-2 text-sm font-medium bg-white/20 w-fit px-3 py-1 rounded-full">
                <Package size={14} />
                All time
              </div>
            </div>
          </div>

          {/* Right Column: Orders Table */}
          <div className="lg:col-span-2">
            <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-2xl border border-white/20 h-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  Recent Orders
                </h2>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Last {orders.length} orders
                </span>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <Package size={48} className="mx-auto mb-2 opacity-20" />
                  No orders placed yet.
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {orders.map(order => (
                    <div key={order._id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 group">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-gray-800">#{order.orderId}</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                              order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>{new Date(order.createdAt).toLocaleTimeString()}</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">৳{order.totalPrice}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                        <div className="flex gap-2">
                          <span className="font-semibold text-gray-800 min-w-[70px]">To:</span>
                          {order.address}
                        </div>
                        <div className="flex gap-2">
                          <span className="font-semibold text-gray-800 min-w-[70px]">Items:</span>
                          <span className="truncate">{order.items.map(i => `${i.qty}x ${i.item}`).join(", ")}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                            <Truck size={18} />
                          </div>
                          <select
                            className="bg-white border border-gray-200 text-gray-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium w-full sm:w-[200px]"
                            onChange={(e) => handleAssign(order._id, e.target.value)}
                            defaultValue=""
                            value={order.deliveryPartnerId || ""}
                          >
                            <option value="" disabled className="text-gray-400">Assign Partner</option>
                            {partners.map(p => (
                              <option key={p._id} value={p._id}>{p.name}</option>
                            ))}
                          </select>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Cancel Button - Only for active orders */}
                          {!['Delivered', 'Cancelled'].includes(order.status) && (
                            <button
                              onClick={() => {
                                toast((t) => (
                                  <div className="flex flex-col gap-3">
                                    <p className="font-bold text-gray-800">Cancel this order?</p>
                                    <div className="flex justify-end gap-2">
                                      <button onClick={() => toast.dismiss(t.id)} className="px-3 py-1 text-xs font-bold text-gray-400 hover:bg-gray-100 rounded-lg">No</button>
                                      <button
                                        onClick={async () => {
                                          toast.dismiss(t.id);
                                          try {
                                            await api.put(`/orders/cancel/${order._id}`);
                                            toast.success("Order cancelled");
                                            const res = await api.get("/orders/all");
                                            setOrders(res.data.orders);
                                          } catch (e) { toast.error("Failed to cancel"); }
                                        }}
                                        className="px-3 py-1 text-xs font-bold bg-red-500 text-white rounded-lg"
                                      >Yes, Cancel</button>
                                    </div>
                                  </div>
                                ), { duration: 5000, position: 'top-center' });
                              }}
                              className="text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg font-bold text-sm transition-colors border border-red-100"
                            >
                              Cancel
                            </button>
                          )}

                          {/* Delete Button - Only for Delivered/Cancelled */}
                          {['Delivered', 'Cancelled'].includes(order.status) && (
                            <button
                              onClick={() => {
                                toast((t) => (
                                  <div className="flex flex-col gap-3">
                                    <p className="font-bold text-gray-800">Delete order permanently?</p>
                                    <div className="flex justify-end gap-2">
                                      <button onClick={() => toast.dismiss(t.id)} className="px-3 py-1 text-xs font-bold text-gray-400 hover:bg-gray-100 rounded-lg">No</button>
                                      <button
                                        onClick={async () => {
                                          toast.dismiss(t.id);
                                          try {
                                            await api.delete(`/orders/delete/${order._id}`);
                                            toast.success("Order deleted");
                                            const res = await api.get("/orders/all");
                                            setOrders(res.data.orders);
                                          } catch (e) { toast.error("Failed to delete"); }
                                        }}
                                        className="px-3 py-1 text-xs font-bold bg-red-600 text-white rounded-lg"
                                      >Yes, Delete</button>
                                    </div>
                                  </div>
                                ), { duration: 5000, position: 'top-center' });
                              }}
                              className="text-gray-400 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
                              title="Delete Order"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                            </button>
                          )}

                          <button
                            onClick={() => navigate(`/orders/${order.orderId}`)}
                            className="text-indigo-600 hover:text-white hover:bg-indigo-600 font-bold text-sm px-4 py-2 rounded-lg transition-all duration-200"
                          >
                            View Full Order
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
