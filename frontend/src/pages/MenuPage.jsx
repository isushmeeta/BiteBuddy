//src/pages/MenuPage.jsx
import React, { useEffect, useState } from "react";
import api from "../config/axiosConfig";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function MenuPage() {
  const navigate = useNavigate(); 
  const { restaurantId } = useParams();
  const [menu, setMenu] = useState(null);
  
  const addToCart = async (item) => {
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

    navigate("/cart");
  } catch (err) {
    console.log(err);
    alert("Failed to add item");
  }
};


  useEffect(() => {
    const loadMenu = async () => {
      try {
        const res = await api.get(
          `/menu/${restaurantId}`
        );
        setMenu(res.data.menu);
      } catch (err) {
        alert("Failed to load menu!");
      }
    };

    loadMenu();
  }, [restaurantId]);

  if (!menu) return <p>Loading menu...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>

      {menu.items.map((item, i) => (
        <div key={i} className="border p-3 mb-2 rounded">
          <h2 className="font-semibold">{item.name}</h2>
          <p>{item.description}</p>
          <p className="font-bold">৳{item.price}</p>
          <button 
            className="mt-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
            onClick={() => addToCart(item)} >
              Add to Cart
            </button>
        </div>
      ))}
    </div>
  );
};
