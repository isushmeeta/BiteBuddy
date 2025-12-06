//src//pages//forgotPassword.jsx
import Navbar from "../components/Navbar";
import axios from "axios";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      alert("Password reset link sent to your email!");
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to send reset link");
    }
  };

  return (
    <div className="min-h-screen bg-[#A98694]">
      <Navbar />

      <div className="flex justify-center py-10">
        <div className="bg-[#E3E1E1] w-[450px] p-8 rounded-2xl shadow-xl">

          <h2 className="text-center text-xl font-bold mb-6">
            Forgot Password
          </h2>

          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-6 rounded-md bg-blue-50 border border-gray-300"
          />

          <button
            onClick={handleReset}
            className="w-full bg-gray-700 text-white py-3 rounded-md hover:bg-gray-800"
          >
            Send Reset Link
          </button>

          <p className="text-center text-sm mt-4">
            <a href="/login" className="text-blue-600">
              Go back to Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
