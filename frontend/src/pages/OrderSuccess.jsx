//src/pages/OrderSuccess.jsx 
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function OrderSuccess() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#A98694]">
      <Navbar />

      <div className="flex justify-center py-20">
        <div className="bg-[#E3E1E1] p-12 rounded-xl shadow-lg text-center w-[600px]">

          <h1 className="text-4xl font-bold mb-4">🎉 Order Placed!</h1>
          <p className="text-lg mb-6">
            Your order ID: <b>{orderId}</b>
          </p>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="bg-[#49424F] text-white px-8 py-4 rounded-3xl text-xl font-bold"
          >
            Go to Home
          </motion.button>

        </div>
      </div>
    </div>
  );
}
