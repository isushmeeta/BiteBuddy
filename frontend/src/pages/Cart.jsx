import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import api from "../config/axiosConfig";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingCart, Plus, Minus, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Fetch cart
  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/cart", {
          withCredentials: true,
        });
        setCart(res.data.items);
      } catch (err) {
        console.log(err);
      }
    };
    load();
  }, []);

  // Update qty
  const updateQty = async (id, qty) => {
    if (qty < 1) return;

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/cart/update/${id}`,
        { qty },
        { withCredentials: true }
      );
      setCart(res.data.items);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/cart/delete/${id}`,
        { withCredentials: true }
      );
      setCart(res.data.items);
    } catch (err) {
      console.log(err);
    }
  };

  const deliveryCharge = 50;
  const subTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const total = subTotal + deliveryCharge;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col font-sans">
      <Navbar />

      <div className="flex flex-1 justify-center py-10 px-4 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
              <ShoppingCart size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
            <span className="bg-indigo-100 text-indigo-800 text-sm font-bold px-3 py-1 rounded-full">
              {cart.length} items
            </span>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl font-medium">Your cart is empty.</p>
              <button
                onClick={() => navigate("/restaurants")}
                className="mt-4 text-indigo-600 hover:underline font-bold"
              >
                Go to Restaurants
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items List */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
                    >
                      {/* Food info */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                        <p className="text-indigo-600 font-bold">৳{item.price}</p>
                      </div>

                      {/* Qty Controls */}
                      <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                        <button
                          onClick={() => updateQty(item._id, item.qty - 1)}
                          className="p-2 hover:bg-white rounded-md shadow-sm transition-all text-gray-600 hover:text-indigo-600"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-bold w-4 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item._id, item.qty + 1)}
                          className="p-2 hover:bg-white rounded-md shadow-sm transition-all text-gray-600 hover:text-indigo-600"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => deleteItem(item._id)}
                        className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 sticky top-24">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium">৳{subTotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Charge</span>
                      <span className="font-medium">৳{deliveryCharge}</span>
                    </div>
                    <div className="h-px bg-gray-200 my-2"></div>
                    <div className="flex justify-between text-lg font-bold text-gray-800">
                      <span>Total</span>
                      <span>৳{total}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
