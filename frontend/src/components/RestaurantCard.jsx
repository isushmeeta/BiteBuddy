import React from "react";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-64">
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="w-full h-40 object-cover rounded-md"
      />

      <h2 className="text-center font-bold mt-3 text-lg">
        {restaurant.name}
      </h2>

      <button className="mt-3 w-full bg-black text-white py-2 rounded-md">
        VIEW MENU
      </button>
    </div>
  );
};

export default RestaurantCard;
