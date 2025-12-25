//src//pages/Cart.jsx 
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import api from "../config/axiosConfig";
import { motion, AnimatePresence } from "framer-motion"; 
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function Cart() {
  const [cart, setCart] = useState([]);

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
        `http://localhost:5000/api/cart/update/${id}`,
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
        `http://localhost:5000/api/cart/delete/${id}`,
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
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#A98694]">
      <Navbar />

      <div className="flex justify-center py-10">
        <div className="w-[800px] bg-[#E3E1E1] rounded-xl p-10 shadow-lg">

          {/* Header */}
          <h1 className="text-3xl font-bold mb-6">My Cart</h1>

          {/* Cart Items */}
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.25 }}
                className="bg-[#49424F] text-white p-4 rounded-xl flex items-center justify-between mb-4"
              >
                {/* Food info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <p className="text-sm">Price: {item.price} taka</p>
                  </div>
                </div>

                {/* Qty + delete */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateQty(item._id, item.qty - 1)}
                    className="bg-[#E3E1E1] text-black px-3 py-1 rounded-lg"
                  >
                    -
                  </button>

                  <span className="text-xl">{item.qty}</span>

                  <button
                    onClick={() => updateQty(item._id, item.qty + 1)}
                    className="bg-[#E3E1E1] text-black px-3 py-1 rounded-lg"
                  >
                    +
                  </button>

                  {/* Trash delete icon */}
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="text-red-400 hover:text-red-600 transition"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Total Section */}
          <div className="bg-[#49424F] text-white p-6 rounded-xl mt-8">
            <div className="flex justify-between text-lg mb-2">
              <span>Delivery Charge</span>
              <span>{deliveryCharge}</span>
            </div>

            <div className="flex justify-between text-lg mb-2">
              <span>Subtotal</span>
              <span>{subTotal}</span>
            </div>

            <hr className="my-2 border-gray-600" />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>Taka: {total}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/checkout")}
            className="w-full mt-10 bg-[#49424F] text-white py-4 rounded-3xl text-2xl font-bold hover:bg-gray-800 transition"
          >

            Checkout
          </motion.button>

        </div>
      </div>
    </div>
  );
}
