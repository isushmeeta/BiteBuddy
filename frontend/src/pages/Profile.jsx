import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../config/axiosConfig";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [isSaving, setIsSaving] = useState(false);

  // Hardcode temporarily OR get from logged-in user
  const restaurantId = "69196fbc97e5bd83bb17cb2e";

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        setUser(userData);
        setEditForm({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || ""
        });
      }
    } catch (error) {
      console.error("Failed to parse user data:", error);
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    if (!user?._id) return;
    setIsSaving(true);
    try {
      const res = await api.put(`/auth/update/${user._id}`, editForm);
      if (res.data.user) {
        const updatedUser = { ...user, ...res.data.user };
        // Update local state
        setUser(updatedUser);
        // Update localStorage
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setIsEditing(false);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#B197A4]">
      <Navbar />

      <div className="flex-1 p-6 flex flex-col justify-center max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-extrabold mb-6 text-white tracking-wide drop-shadow-md">
          MY PROFILE
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto">
          {/* User Info Card */}
          <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 relative flex flex-col justify-between">
            <div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="absolute top-4 right-4 text-purple-600 hover:text-purple-800 font-bold text-xs uppercase tracking-wider"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>

              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>

                {isEditing ? (
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleInputChange}
                      className="w-full p-2 text-sm border border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                      placeholder="Name"
                    />
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      className="w-full p-2 text-sm border border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                      placeholder="Email"
                    />
                    <button
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className="w-full py-1.5 bg-purple-600 text-white text-xs font-bold rounded-lg hover:bg-purple-700 transition"
                    >
                      {isSaving ? "Saving..." : "Save"}
                    </button>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {user?.name || "Guest"}
                    </h2>
                    <p className="text-gray-600 text-sm">{user?.email}</p>
                    <p className="text-gray-500 text-xs mt-1">{user?.phone}</p>
                  </div>
                )}
              </div>

              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-semibold flex items-center mb-4">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Active Member
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-2 bg-red-50 text-red-600 font-bold rounded-xl border border-red-100 hover:bg-red-500 hover:text-white transition-colors text-sm flex items-center justify-center"
            >
              <span className="mr-2">🚪</span> Log Out
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center">
              <span className="mr-2">🛍️</span> Activities
            </h3>
            <div className="space-y-3 flex-1">
              <button
                onClick={() => navigate("/cart")}
                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-purple-50 rounded-xl transition-colors group"
              >
                <span className="font-semibold text-gray-700 group-hover:text-purple-700 text-sm">View Cart</span>
                <span className="text-gray-400 group-hover:text-purple-500">→</span>
              </button>
              <button
                onClick={() => navigate("/restaurants")}
                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-purple-50 rounded-xl transition-colors group"
              >
                <span className="font-semibold text-gray-700 group-hover:text-purple-700 text-sm">Browse Restaurants</span>
                <span className="text-gray-400 group-hover:text-purple-500">→</span>
              </button>
              <button
                onClick={() => navigate("/order-history")}
                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-purple-50 rounded-xl transition-colors group"
              >
                <span className="font-semibold text-gray-700 group-hover:text-purple-700 text-sm">Order History</span>
                <span className="text-gray-400 group-hover:text-purple-500">→</span>
              </button>
            </div>
          </div>

          {/* Admin Zone */}
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl rounded-2xl p-6 text-white overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/20 rounded-full -mr-10 -mt-10 blur-xl"></div>

            <h3 className="text-lg font-bold mb-2 flex items-center text-purple-300 relative z-10">
              <span className="mr-2">🛡️</span> Admin Zone
            </h3>
            <p className="text-gray-400 text-xs mb-6 relative z-10 leading-relaxed">
              Manage your restaurant, update menus, and view incoming orders.
            </p>
            <button
              onClick={() => navigate(`/admin/${restaurantId}`)}
              className="w-full py-2.5 bg-purple-600/20 border border-purple-500/50 text-purple-300 font-bold rounded-xl hover:bg-purple-600 hover:text-white hover:border-transparent transition-all text-sm relative z-10"
            >
              Access Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
