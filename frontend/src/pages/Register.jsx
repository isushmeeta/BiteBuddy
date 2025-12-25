//src/pages/Register.jsx 

import Navbar from "../components/Navbar";
import api from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateEmail,validatePassword , validatePhone } from "../utils/validation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const emailError =validateEmail(email);
    if (emailError) return alert(emailError);

    const passError = validatePassword(password);
    if (passError) return alert(passError);
    
    const phoneError = validatePhone(phone);
    if (phoneError) return alert (phoneError);
    try {
      const res = await api.post(
        "/auth/register",
        { name, email, password, phone }
      );
      alert("Account created successfully 🎉");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#A98694] flex flex-col">
      <Navbar />

      <div className="flex flex-1 justify-center items-center px-4">
        <div className="bg-[#E3E1E1] w-[450px] p-8 rounded-2xl shadow-xl">
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

