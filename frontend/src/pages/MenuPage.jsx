import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function MenuPage() {
  const { restaurantId } = useParams();
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9169/api/menu/${restaurantId}`
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
        </div>
      ))}
    </div>
  );
}
