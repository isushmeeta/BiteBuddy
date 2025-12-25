//src/pages/Checkout.jsx/
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import api from "../config/axiosConfig";
import { motion } from "framer-motion";

export default function Checkout() {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [error, setError] = useState("");
  const placeOrder = async () => {
  const phoneRegex = /^01[0-9]{9}$/;

  if (!phoneRegex.test(phone)) {
    setError("Please enter a valid 11-digit phone number");
    return;
  }

  setError("");

  try {
    const res = await api.post(
      "/order",
      {
        address,
        phone,
        paymentMethod,
      },
      { withCredentials: true }
    );

    navigate(`/order-success/${res.data.orderId}`);
  } catch (err) {
    setError("Order failed. Please try again.");
  }
};



  return (
    <div className="min-h-screen bg-[#A98694]">
      <Navbar />

      <div className="flex justify-center py-10">
        <div className="w-[800px] bg-[#E3E1E1] rounded-xl p-10 shadow-lg">

          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          {/* Order Info */}
          <div className="bg-[#49424F] text-white p-6 rounded-xl mb-6">
            <p className="text-lg mb-2">Delivery Address</p>

            <input
              type="text"
              placeholder="Enter your address"
              className="w-full p-3 rounded-lg text-black mb-4"
              value={address}
              onChange ={(e)=> setAddress(e.target.value)}
            />

            <input
              type="text"
              placeholder="Phone number"
              className="w-full p-3 rounded-lg text-black"
              value={phone}
              onChange={(e)=> setPhone(e.target.value)}

            />
            {error && <p className="text-red-300 mt-2">{error}</p>}

          </div>

          {/* Payment */}
          <div className="bg-[#49424F] text-white p-6 rounded-xl mb-8">
            <p className="text-lg mb-4">Payment Method </p>

            <select className="w-full p-3 rounded-lg text-black"
                value={paymentMethod}
                onChange={(e)=>setPaymentMethod(e.target.value)}
            >
                <option>Cash on Delivery</option>
                <option>Card Payment</option>
                <option>Mobile Banking</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/cart")}
              className="w-1/2 bg-gray-400 text-black py-4 rounded-3xl text-xl font-bold hover:bg-gray-500 transition"
            >
              Back to Cart
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={placeOrder}
              className="w-1/2 bg-[#49424F] text-white py-4 rounded-3xl text-xl font-bold hover:bg-gray-800 transition"
            >
              Place Order
            </motion.button>
          </div>

        </div>
      </div>
    </div>
  );
}
