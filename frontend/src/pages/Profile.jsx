//pages/profile.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#e8e2eb] p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-black">PROFILE</h1>

      <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-black">
          Welcome, User
        </h2>

        {/* Order History Button */}
        <button
          onClick={() => navigate("/order-history")}
          className="w-full py-3 bg-[#b99fab] text-black font-semibold rounded-lg hover:bg-[#a78c99] transition"
        >
          View Order History
        </button>
      </div>
    </div>
  );
}
