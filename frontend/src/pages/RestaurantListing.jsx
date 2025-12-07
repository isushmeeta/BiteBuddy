//src/pages/RestaurantListing.jsx
import React, { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import FilterBar from "../components/FilterBar";
import "./RestaurantList.css";

const RestaurantListing = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [cuisine, setCuisine] = useState("");
  const [rating, setRating] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data))
      .finally(() => setLoading(false));
  }, []);

  const filteredRestaurants = restaurants.filter((r) => {
    return (
      (!cuisine || r.cuisine === cuisine) &&
      (!rating || r.rating >= parseFloat(rating)) &&
      (!location || r.location === location)
    );
  });

  if (loading) return <p className="text-center font-bold text-lg">Loading...</p>;

  return (
    <div className="min-h-screen p-10" style={{ backgroundColor: "#B197A4" }}>
      <h1 className="text-left text-5xl md:text-6xl font-extrabold mb-8 text-gradient bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent tracking-wide pl-6 md:pl-20">
        RESTAURANT LISTING
      </h1>

      <FilterBar
        dataset={restaurants}
        cuisine={cuisine}
        setCuisine={setCuisine}
        rating={rating}
        setRating={setRating}
        location={location}
        setLocation={setLocation}
      />

      <div className="restaurant-list">
        {filteredRestaurants.length === 0 ? (
          <p className="col-span-full text-center font-bold text-lg">
            No restaurants found.
          </p>
        ) : (
          filteredRestaurants.map((rest) => (
            <RestaurantCard key={rest._id} restaurant={rest} />
          ))
        )}
      </div>
    </div>
  );
};

export default RestaurantListing;
