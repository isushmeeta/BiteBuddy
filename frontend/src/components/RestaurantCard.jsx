import React from "react";
import "./RestaurantCard.css";
import { useNavigate } from "react-router-dom";



const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <div className="restaurant-card">
      {/* Restaurant Image */}
      <img
        src={restaurant.image}  // use lowercase 'restaurant'
        alt={restaurant.name}
        className="restaurant-image"
      />

      {/* Restaurant Name */}
      <h3 className="restaurant-name">{restaurant.name}</h3>

      {/* Rating */}
      <p className="restaurant-rating">
        ⭐ {restaurant.rating}
      </p>

      {/* View Menu Button */}

      <button
      onClick={() => navigate(`/menu/${restaurant._id}`)}
      className="view-menu-btn">VIEW MENU</button>
    </div>
  );
};

export default RestaurantCard;

