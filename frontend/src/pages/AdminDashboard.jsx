
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../config/axiosConfig";

export default function AdminDashboard() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await api.get("/restaurants");
        setRestaurants(res.data.restaurants);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const handleRestaurantChange = (e) => {
    const newId = e.target.value;
    if (newId) {
      navigate(`/admin/${newId}`);
    }
  };

  const currentRestaurant = restaurants.find(r => r._id === restaurantId);

  return (
    <div className="min-h-screen p-10" style={{ backgroundColor: "#B197A4" }}>
      <Navbar />

      <h1 className="text-left text-5xl md:text-6xl font-extrabold mb-12 text-gradient bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent tracking-wide pl-6 md:pl-20">
        ADMIN DASHBOARD
      </h1>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm shadow-2xl p-8 rounded-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b-2 border-purple-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
              Restaurant Management
            </h2>

            {/* Restaurant Selector */}
            <div className="relative">
              <select
                value={restaurantId || ""}
                onChange={handleRestaurantChange}
                className="appearance-none bg-purple-50 border border-purple-200 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-purple-500 font-semibold cursor-pointer min-w-[200px]"
              >
                <option value="" disabled>Select Restaurant</option>
                {restaurants.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Manage Menu */}
            <button
              onClick={() => navigate(`/admin/menu/${restaurantId}`)}
              className="group relative overflow-hidden py-6 px-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              <div className="relative flex flex-col items-center">
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-lg">Manage Menu</span>
              </div>
            </button>

            {/* View Orders */}
            <button
              onClick={() => navigate(`/order-history`)}
              className="group relative overflow-hidden py-6 px-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              <div className="relative flex flex-col items-center">
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span className="text-lg">View Orders</span>
              </div>
            </button>

            {/* Analytics/Stats Card */}
            <button
              onClick={() => navigate("/profile")}
              className="group relative overflow-hidden py-6 px-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              <div className="relative flex flex-col items-center">
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-lg">My Profile</span>
              </div>
            </button>

            {/* Back to Restaurants */}
            <button
              onClick={() => navigate("/restaurants")}
              className="group relative overflow-hidden py-6 px-8 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              <div className="relative flex flex-col items-center">
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-lg">Browse Restaurants</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

