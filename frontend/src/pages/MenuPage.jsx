import React, { useEffect, useState } from "react";
import api from "../config/axiosConfig";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MenuPage() {
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  const addToCart = async (item) => {
    console.log("Attempting to add item:", item); // Debug log
    try {
      await api.post(
        "/cart/add",
        {
          name: item.name,
          price: item.price,
          image: item.image,
          qty: 1,
        },
        { withCredentials: true }
      );

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
        // alert("Failed to load menu!");
        console.error("Failed to load menu:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, [restaurantId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24" style={{ backgroundColor: "#B197A4" }}>
        <p className="text-2xl font-bold text-white">Loading menu...</p>
      </div>
    );
  }

  if (!menu) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24" style={{ backgroundColor: "#B197A4" }}>
        <p className="text-2xl font-bold text-white">Menu not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 pt-28" style={{ backgroundColor: "#B197A4" }}>
      <Navbar />

      <h1 className="text-left text-5xl md:text-6xl font-extrabold mb-12 text-gradient bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent tracking-wide pl-6 md:pl-20">
        MENU
      </h1>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-purple-200 pb-4">
            Items Available
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menu.items.map((item, i) => (
              <div
                key={i}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                {/* Image Placeholder or Actual Image */}
                <div className="h-48 overflow-hidden bg-gray-200 relative">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="text-4xl">🍽️</span>
                    </div>
                  )}
                  <div className="absolute top-0 right-0 bg-purple-600 text-white font-bold px-3 py-1 rounded-bl-lg">
                    ৳{item.price}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">{item.description}</p>

                  <button
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-200 flex items-center justify-center"
                    onClick={() => addToCart(item)}
                  >
                    <span className="mr-2">🛒</span> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
