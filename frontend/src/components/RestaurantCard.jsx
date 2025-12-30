
import React, { useState } from "react";
import "./RestaurantCard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RestaurantMap from "./RestaurantMap";

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

const handleViewLocation = async () => {
  // If map is already open → close it
  if (showMap) {
    setShowMap(false);
    return;
  }

  try {
    setLoading(true);

    // Fetch only if location not already loaded
    if (!location) {
      const res = await axios.get(
        `http://localhost:5000/api/restaurants/${restaurant._id}/location`
      );
      setLocation(res.data);
    }

    setShowMap(true);
  } catch (error) {
    console.error("Failed to load location", error);
    alert("Unable to load restaurant location");
  } finally {
    setLoading(false);
  }
};

  return (
    
    <div className="restaurant-card">
      {/* Restaurant Image */}
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="restaurant-image"
      />

      {/* Restaurant Name */}
      <h3 className="restaurant-name">{restaurant.name}</h3>

      {/* Rating */}
      <p className="restaurant-rating">⭐ {restaurant.rating}</p>

      {/* Buttons */}
      <div className="restaurant-buttons">
        <button
          onClick={() => navigate(`/menu/${restaurant._id}`)}
          className="view-menu-btn"
        >
          VIEW MENU
        </button>

        <button
          onClick={handleViewLocation}
          className="view-location-btn"
        >
          {loading ? "Loading..." : "VIEW LOCATION"}
        </button>
      </div>

      {/* Google Map */}
      {showMap && location && (
        <div className="map-container">
          <RestaurantMap
            latitude={location.latitude}
            longitude={location.longitude}
            name={location.name}
          />
        </div>
      )}
    </div>
  );
};

export default RestaurantCard;

