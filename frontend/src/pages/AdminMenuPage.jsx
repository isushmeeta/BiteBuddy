
import React, { useEffect, useState } from "react";
import api from "../config/axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AdminMenuPage() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [restaurantName, setRestaurantName] = useState("");

  const [form, setForm] = useState({ name: "", price: "", description: "", image: "" });
  const [editingItemId, setEditingItemId] = useState(null);

  const loadMenu = async () => {
    try {
      const res = await api.get(`/menu/${restaurantId}`);
      setMenu(res.data.menu);

      // Fetch restaurant details for name
      const resRest = await api.get(`/restaurants/${restaurantId}/location`);
      setRestaurantName(resRest.data.name);

    } catch (err) {
      alert("Failed to load data!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();
  }, [restaurantId]);

  // Handle input change
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Add or Update item
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!form.name || !form.price || !form.description) {
      return alert("Please fill all fields!");
    }

    // Validate restaurantId and editingItemId
    if (!restaurantId) {
      return alert("Restaurant ID not found!");
    }

    if (editingItemId && !editingItemId.trim()) {
      return alert("Item ID not found!");
    }

    // Convert price to number
    const payload = { ...form, price: Number(form.price) };

    try {
      if (editingItemId) {
        console.log("Updating item:", editingItemId, "RestaurantId:", restaurantId, "Payload:", payload);
        const url = `/menu/${restaurantId}/item/${editingItemId}`;
        console.log("PUT URL:", url);
        const response = await api.put(url, payload);
        console.log("Update successful:", response.data);
        setEditingItemId(null);
      } else {
        console.log("Adding new item. RestaurantId:", restaurantId, "Payload:", payload);
        const url = `/menu/${restaurantId}/item`;
        console.log("POST URL:", url);
        const response = await api.post(url, payload);
        console.log("Add successful:", response.data);
      }

      setForm({ name: "", price: "", description: "", image: "" });
      await loadMenu();
    } catch (err) {
      console.error("Error saving item:", err.response?.data || err.message);
      console.error("Full error:", err);
      alert("Error saving item: " + (err.response?.data?.message || err.message));
    }
  };

  // Edit item
  const handleEdit = (item) => {
    console.log("Editing item:", item);
    console.log("Item ID:", item._id);
    setEditingItemId(item._id);
    setForm({ name: item.name, price: item.price, description: item.description, image: item.image });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete item
  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      console.log("Attempting to delete item:", itemId, "from restaurant:", restaurantId);
      const response = await api.delete(`/menu/${restaurantId}/item/${itemId}`);
      console.log("Delete successful:", response.data);
      await loadMenu();
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      alert("Failed to delete item: " + (err.response?.data?.message || err.message));
    }
  };

  const handleCancel = () => {
    setEditingItemId(null);
    setForm({ name: "", price: "", description: "", image: "" });
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#B197A4" }}>
        <p className="text-2xl font-bold text-white">Loading menu...</p>
      </div>
    );

  if (!menu)
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#B197A4" }}>
        <p className="text-2xl font-bold text-white">No menu found</p>
      </div>
    );

  return (
    <div className="min-h-screen p-10" style={{ backgroundColor: "#B197A4" }}>
      <Navbar />

      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col">
          <h1 className="text-left text-5xl md:text-6xl font-extrabold text-gradient bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent tracking-wide pl-6 md:pl-20">
            MENU MANAGEMENT
          </h1>
          {restaurantName && (
            <div className="pl-6 md:pl-20 mt-3">
              <span className="inline-block px-5 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-lg font-bold shadow-sm tracking-wide">
                for {restaurantName}
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => navigate(`/admin/${restaurantId}`)}
          className="mr-6 md:mr-20 px-6 py-3 bg-white/90 backdrop-blur-sm text-gray-800 font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="bg-white/90 backdrop-blur-sm shadow-2xl p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-purple-200">
            {editingItemId ? "Edit Menu Item" : "Add New Menu Item"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Item Name *</label>
              <input
                name="name"
                placeholder="e.g., Chicken Burger"
                value={form.name}
                onChange={handleChange}
                className="w-full border-2 border-purple-200 focus:border-purple-500 rounded-lg p-3 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Price (৳) *</label>
              <input
                name="price"
                placeholder="e.g., 250"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="w-full border-2 border-purple-200 focus:border-purple-500 rounded-lg p-3 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Description *</label>
              <textarea
                name="description"
                placeholder="Describe your item..."
                value={form.description}
                onChange={handleChange}
                rows="3"
                className="w-full border-2 border-purple-200 focus:border-purple-500 rounded-lg p-3 outline-none transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Image URL (optional)</label>
              <input
                name="image"
                placeholder="https://example.com/image.jpg"
                value={form.image}
                onChange={handleChange}
                className="w-full border-2 border-purple-200 focus:border-purple-500 rounded-lg p-3 outline-none transition-colors"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                {editingItemId ? "Update Item" : "Add Item"}
              </button>
              {editingItemId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gray-400 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:bg-gray-500 transition-all duration-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6 pl-6">
          Current Menu Items ({menu.items.length})
        </h2>

        {menu.items.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm shadow-2xl p-12 rounded-2xl text-center">
            <p className="text-gray-500 text-lg">No menu items yet. Add your first item above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menu.items.map((item) => (
              <div key={item._id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                  <p className="text-2xl font-bold text-purple-600 mb-4">৳{item.price}</p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="flex-1 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
