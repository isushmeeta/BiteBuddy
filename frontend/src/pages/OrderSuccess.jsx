import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { CheckCircle, Home, FileText } from "lucide-react";

export default function OrderSuccess() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col font-sans">
      <Navbar />

      <div className="flex flex-1 justify-center items-center py-20 px-4 pt-40">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl text-center max-w-lg w-full border border-white/20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle size={64} className="text-green-600" />
            </div>
          </motion.div>

          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-500 mb-8">Thank you for ordering with BiteBuddy.</p>

          <div className="bg-indigo-50 p-4 rounded-xl mb-8 flex flex-col items-center">
            <p className="text-sm text-indigo-600 font-bold uppercase tracking-wider mb-1">Order ID</p>
            <p className="text-2xl font-mono font-bold text-gray-800 tracking-widest">{orderId}</p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate("/restaurants")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all flex items-center justify-center gap-2"
            >
              <Home size={20} />
              Continue Order
            </button>

            <button
              onClick={() => navigate(`/orders/${orderId}`)}
              className="w-full bg-white text-gray-700 border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <FileText size={20} />
              View Order Details
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
