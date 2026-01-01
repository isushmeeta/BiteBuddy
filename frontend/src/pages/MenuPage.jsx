
import React, { useEffect, useState } from "react";
import api from "../config/axiosConfig";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ShoppingCart, ArrowLeft, Loader2 } from "lucide-react";

export default function MenuPage() {
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  const addToCart = async (item) => {
    if (!localStorage.getItem("token")) {
      toast.error("Please login to order! 🔒");
      setTimeout(() => navigate("/login"), 1000);
      return;
    }

    try {
      await api.post("/cart/add", {
        name: item.name,
        price: item.price,
        image: item.image,
        qty: 1,
      }, { withCredentials: true });

      toast.success(`${item.name} added to cart! 🛒`);
    } catch (err) {
      console.log(err);
      const errorMsg = err.response?.data?.msg || "Failed to add item. Please login again.";
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const res = await api.get(`/menu/${restaurantId}`);
        setMenu(res.data.menu);
      } catch (err) {
        console.error("Failed to load menu:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, [restaurantId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-full shadow-2xl">
          <Loader2 className="animate-spin text-indigo-600" size={48} />
        </div>
      </div>
    );
  }

  if (!menu) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Menu Unavailable</h2>
          <p className="text-gray-600 mb-6">We couldn't find the menu for this restaurant.</p>
          <button
            onClick={() => navigate("/restaurants")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition"
          >
            Back to Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 pb-20 font-sans">
      <Navbar />

      <div className="pt-32 px-6 max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/restaurants")}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-6 font-bold transition-colors"
        >
          <ArrowLeft size={20} /> Back to Restaurants
        </button>

        <h1 className="text-5xl md:text-6xl font-extrabold mb-12 text-white drop-shadow-md tracking-tight">
          Menu
        </h1>

        <div className="max-w-7xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-indigo-100 pb-4 flex items-center gap-3">
              <span className="bg-indigo-100 p-2 rounded-lg text-indigo-600 text-2xl">🍽️</span>
              Items Available
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {menu.items.map((item, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col h-full"
                >
                  {/* Image Placeholder or Actual Image */}
                  <div className="h-56 overflow-hidden bg-gray-100 relative">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ShoppingBag size={48} className="opacity-20" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-indigo-700 font-extrabold px-4 py-1.5 rounded-full shadow-lg">
                      ৳{item.price}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-2">{item.description}</p>

                    <div className="mt-auto">
                      <button
                        className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transform active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                        onClick={() => addToCart(item)}
                      >
                        <ShoppingCart size={18} /> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
