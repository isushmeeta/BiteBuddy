//src/pages/Checkout.jsx/
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import api from "../config/axiosConfig";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CreditCard, Loader2, MapPin, Phone, Truck, Wallet, Banknote } from "lucide-react";
import { toast } from "react-hot-toast";

// Import Logos
import bkashLogo from "../assets/bkash.svg";
import nagadLogo from "../assets/nagad.svg";
import rocketLogo from "../assets/rocket.svg";

export default function Checkout() {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  // Pay Online State
  const [onlineProvider, setOnlineProvider] = useState(""); // 'Bkash', 'Nagad', 'Rocket'

  // Card Payment State
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    const phoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;

    if (!address.trim()) {
      toast.error("Address is required");
      return;
    }

    if (!phoneRegex.test(phone)) {
      toast.error("Valid phone number is required");
      return;
    }

    // Payment Validation
    if (paymentMethod === "Pay Online" && !onlineProvider) {
      toast.error("Please select a mobile wallet (Bkash, Nagad, or Rocket)");
      return;
    }

    if (paymentMethod === "Card Payment") {
      const { number, expiry, cvc, name } = cardDetails;
      if (!number || !expiry || !cvc || !name) {
        toast.error("Please fill in all card details");
        return;
      }
    }

    setError("");
    setLoading(true);

    try {
      const paymentData = {
        method: paymentMethod,
        provider: paymentMethod === "Pay Online" ? onlineProvider : null,
        cardInfo: paymentMethod === "Card Payment" ? { ...cardDetails, number: "****" + cardDetails.number.slice(-4) } : null
      };

      const res = await api.post(
        "/orders",
        {
          address,
          phone,
          paymentMethod: paymentMethod, // You might want to send the detailed object or just the string depending on backend
          paymentDetails: paymentData // Sending extra details if backend accepts it, otherwise just keeping 'paymentMethod' simple
        },
        { withCredentials: true }
      );

      toast.success("Order placed successfully! 🎉");
      navigate(`/order-success/${res.data.orderId}`);
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.msg || err.response?.data?.message || err.response?.data?.error || "Order failed. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col font-sans">
      <Navbar />

      <div className="flex flex-1 justify-center items-center py-10 px-4 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
              <Truck size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Details */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-700 mb-4">Delivery Info</h3>

              {/* Delivery Address */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin size={18} /> Address
                </label>
                <input
                  type="text"
                  placeholder="Enter your full address"
                  className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Phone size={18} /> Phone Number
                </label>
                <input
                  type="text"
                  placeholder="e.g., 017..."
                  className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Right Column: Payment */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-700 mb-4">Payment Method</h3>

              {/* Payment Options Selection */}
              <div className="space-y-3">
                {[
                  { id: "Cash on Delivery", icon: Banknote, label: "Cash on Delivery" },
                  { id: "Pay Online", icon: Wallet, label: "Pay Online" },
                  { id: "Card Payment", icon: CreditCard, label: "Card Payment" },
                ].map((option) => (
                  <div
                    key={option.id}
                    onClick={() => setPaymentMethod(option.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer flex items-center gap-3 transition-all ${paymentMethod === option.id
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-gray-100 bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    <option.icon size={24} />
                    <span className="font-bold">{option.label}</span>
                  </div>
                ))}
              </div>

              {/* Dynamic Payment Content */}
              <div className="min-h-[200px]">
                <AnimatePresence mode="wait">
                  {paymentMethod === "Pay Online" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      <p className="text-sm font-semibold text-gray-500 mb-2">Select Wallet:</p>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { name: "Bkash", img: bkashLogo },
                          { name: "Nagad", img: nagadLogo },
                          { name: "Rocket", img: rocketLogo }
                        ].map((wallet) => (
                          <div
                            key={wallet.name}
                            onClick={() => setOnlineProvider(wallet.name)}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all aspect-square ${onlineProvider === wallet.name
                              ? "border-indigo-600 bg-indigo-50 scale-105 shadow-md"
                              : "border-gray-100 bg-white hover:bg-gray-50"
                              }`}
                          >
                            <img src={wallet.img} alt={wallet.name} className="w-12 h-12 object-contain mb-2" />
                            <span className={`text-xs font-bold ${onlineProvider === wallet.name ? 'text-indigo-700' : 'text-gray-600'}`}>
                              {wallet.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {paymentMethod === "Card Payment" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200"
                    >
                      <input name="number" placeholder="Card Number" value={cardDetails.number} onChange={handleCardChange} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                      <div className="flex gap-4">
                        <input name="expiry" placeholder="MM/YY" value={cardDetails.expiry} onChange={handleCardChange} className="w-1/2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                        <input name="cvc" placeholder="CVC" value={cardDetails.cvc} onChange={handleCardChange} className="w-1/2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                      </div>
                      <input name="name" placeholder="Cardholder Name" value={cardDetails.name} onChange={handleCardChange} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </motion.div>
                  )}

                  {paymentMethod === "Cash on Delivery" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-200 text-sm font-medium flex items-center gap-2"
                    >
                      <Banknote size={16} /> Pay cash when you receive your order.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium mt-6">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => navigate("/cart")}
              className="flex-1 py-4 rounded-xl text-gray-600 font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Back to Cart
            </button>

            <button
              onClick={placeOrder}
              disabled={loading}
              className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
