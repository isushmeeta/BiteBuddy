
import React, { useState } from "react";
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
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden flex flex-col border border-white/50">
      {/* Restaurant Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurant.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-800 shadow-md flex items-center">
          <span className="text-yellow-500 mr-1">⭐</span> {restaurant.rating || "N/A"}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Restaurant Name */}
        <h3 className="text-xl font-extrabold text-gray-800 mb-2 line-clamp-1" title={restaurant.name}>
          {restaurant.name}
        </h3>

        {/* Cuisine/Location (Optional - using dummy text for now if missing) */}
        <p className="text-gray-500 text-sm mb-4 line-clamp-1">
          {restaurant.cuisine || "Multi-cuisine"} • {restaurant.location || "City Center"}
        </p>

        {/* Buttons */}
        <div className="mt-auto space-y-3">
          <button
            onClick={() => navigate(`/menu/${restaurant._id}`)}
            className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl shadow-md hover:shadow-xl hover:opacity-90 transition-all text-sm tracking-wide"
          >
            VIEW MENU
          </button>

          <button
            onClick={handleViewLocation}
            disabled={loading}
            className="w-full py-2.5 bg-purple-50 text-purple-600 font-bold rounded-xl border border-purple-100 hover:bg-purple-100 hover:text-purple-700 transition-all text-sm"
          >
            {loading ? "Loading..." : "VIEW LOCATION"}
          </button>
        </div>

        {/* Google Map */}
        {showMap && location && (
          <div className="mt-4 rounded-xl overflow-hidden shadow-inner border border-gray-200">
            <RestaurantMap
              latitude={location.latitude}
              longitude={location.longitude}
              name={location.name}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;

