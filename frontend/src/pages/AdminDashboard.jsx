

// export default function AdminDashboard() {
//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Admin Dashboard</h1>
//       <p>This page loaded successfully.</p>
//     </div>
//   );
// }
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-black">Admin Dashboard</h1>

      <div className="bg-white shadow-md p-6 rounded-lg max-w-lg">
        <h2 className="text-xl font-semibold text-black mb-4">
          Restaurant ID: {restaurantId}
        </h2>

        <div className="space-y-4">

          {/* Manage Menu */}
          <button
            onClick={() => navigate(`/admin/menu/${restaurantId}`)}
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Manage Menu
          </button>

          {/* View Orders */}
          <button
            onClick={() => navigate(`/order-history`)}
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
          >
            View Orders
          </button>

          {/* Go to Profile */}
          <button
            onClick={() => navigate("/profile")}
            className="w-full py-3 bg-gray-400 text-black font-semibold rounded-lg hover:bg-gray-500 transition"
          >
            Back to Profile
          </button>

        </div>
      </div>
    </div>
  );
}
