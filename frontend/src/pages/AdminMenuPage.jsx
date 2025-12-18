
import React, { useEffect, useState } from "react";
import api from "../config/axiosConfig";
import { useParams } from "react-router-dom";

export default function AdminMenuPage() {
  const { restaurantId } = useParams();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({ name: "", price: "", description: "", image: "" });
  const [editingItemId, setEditingItemId] = useState(null);

  // Load menu
  const loadMenu = async () => {
    try {
      const res = await api.get(`/menu/${restaurantId}`);
      console.log("Menu loaded successfully:", res.data.menu);
      console.log("Menu items:", res.data.menu.items);
      setMenu(res.data.menu);
    } catch (err) {
      alert("Failed to load menu!");
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
      loadMenu();
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
  };

  // Delete item
  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      console.log("Attempting to delete item:", itemId, "from restaurant:", restaurantId);
      const response = await api.delete(`/menu/${restaurantId}/item/${itemId}`);
      console.log("Delete successful:", response.data);
      loadMenu();
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      alert("Failed to delete item: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <p>Loading menu...</p>;
  if (!menu) return <p>No menu found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Menu Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded shadow">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 m-1 w-full"
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="border p-2 m-1 w-full"
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 m-1 w-full"
        />
        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="border p-2 m-1 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 m-1 rounded"
        >
          {editingItemId ? "Update Item" : "Add Item"}
        </button>
      </form>

      {/* Menu Items */}
      {menu.items.map((item) => (
        <div key={item._id} className="border p-3 mb-2 rounded bg-white">
          <h2 className="font-semibold">{item.name}</h2>
          <p>{item.description}</p>
          <p className="font-bold">৳{item.price}</p>
          {item.image && <img src={item.image} alt={item.name} className="w-32 h-24 mt-2" />}
          <div className="mt-2 space-x-2">
            <button
              onClick={() => handleEdit(item)}
              className="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
