//frontend/src/pages/UserProfile.jsx
// frontend/src/pages/UserProfile.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// Minimal Button component
function Button({ children, onClick, variant = "primary", className = "" }) {
  let base = "px-4 py-2 rounded font-semibold ";
  if (variant === "destructive") base += "bg-red-500 text-white";
  else if (variant === "secondary") base += "bg-gray-300 text-black";
  else base += "bg-blue-500 text-white";

  return (
    <button className={`${base} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default function UserProfile() {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logout successful!", { duration: 2000, position: "top-right" });

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  // Delete account handler
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      // Here you would call your API to delete account
      alert("Account deleted!");
      // Optional: log user out after deletion
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded shadow space-y-4">
      <h1 className="text-xl font-bold text-center">User Profile</h1>

      <div className="flex justify-between">
        <Button variant="destructive" onClick={handleDeleteAccount}>
          Delete Account
        </Button>
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* Add Toaster to show toast notifications */}
      <Toaster position="top-right" />
    </div>
  );
}
