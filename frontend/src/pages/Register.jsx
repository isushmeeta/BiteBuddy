//src/pages/Register.jsx 

import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async () => {
    const navigate = useNavigate();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password, phone }
      );
      alert("Account created successfully 🎉");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#A98694]">
      <Navbar />

      <div className="flex justify-center py-10">
        <div className="w-[450px] p-8">
          <h2 className="text-center text-xl font-bold mb-6">
            Create Your Account
          </h2>

          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 rounded-md bg-blue-50 border border-gray-300"
          />

          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email adress"
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
            className="w-full p-3 mb-4 rounded-md bg-blue-50 border border-gray-300"
          />

          <label className="block mb-1 font-medium">Number</label>
          <input
            type="text"
            placeholder="Enter your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 mb-6 rounded-md bg-blue-50 border border-gray-300"
          />

          <button
            onClick={handleRegister}
            className="w-full bg-gray-700 text-white py-3 rounded-md hover:bg-gray-800"
          >
            Create Your Account
          </button>
        </div>
      </div>
    </div>
  );
}

