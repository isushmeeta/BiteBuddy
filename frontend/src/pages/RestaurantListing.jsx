import React, { useEffect, useState } from "react";
import axios from "axios";
import RestaurantCard from "../components/RestaurantCard";
import Filters from "../components/Filters";

const RestaurantListing = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [cuisine, setCuisine] = useState("");
  const [rating, setRating] = useState("");
  const [location, setLocation] = useState("");

  const fetchRestaurants = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/restaurants", {
        params: { cuisine, rating, location },
      });
      setRestaurants(res.data);
    } catch (err) {
      console.log("API Error:", err);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [cuisine, rating, location]);

  return (
    <div className="p-10 bg-purple-200 min-h-screen">
      <h1 className="text-center text-3xl font-bold mb-10">BITE BUDDY</h1>

      <Filters
        cuisine={cuisine}
        rating={rating}
        location={location}
        setCuisine={setCuisine}
        setRating={setRating}
        setLocation={setLocation}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {restaurants.map((rest) => (
          <RestaurantCard key={rest._id} restaurant={rest} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantListing;
