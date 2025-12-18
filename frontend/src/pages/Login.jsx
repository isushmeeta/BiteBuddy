//src/pages/Login.jsx 

import Navbar from "../components/Navbar";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      alert("Login Successful 🎉");
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/restaurants");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#A98694] flex flex-col">
      <Navbar />

      <div className="flex flex-1 justify-center items-center px-4">
        <div className="bg-[#E3E1E1] w-[450px] p-8 rounded-2xl shadow-xl">
          <h2 className="text-center text-xl font-bold mb-6">
            Login to Your Account
          </h2>

          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 rounded-md bg-blue-50 border border-gray-300"
          />

          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 rounded-md bg-blue-50 border border-gray-300"
          />

          <button
            className="w-full bg-gray-700 text-white py-3 rounded-md mb-4 hover:bg-gray-800"
            onClick={handleLogin}
          >
            Login
          </button>

          <p className="text-center text-sm mb-2">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 cursor-pointer">
              Register
            </Link>
          </p>

          <p className="text-center text-sm text-gray-700 cursor-pointer">
            <Link to="/forgot-password" className="text-blue-600 cursor-pointer">
              Forgot Password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

