
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import RestaurantCard from "../components/RestaurantCard";
// import FilterBar from "../components/FilterBar";

// const RestaurantListing = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [cuisine, setCuisine] = useState("");
//   const [rating, setRating] = useState("");
//   const [location, setLocation] = useState("");
//   const [loading, setLoading] = useState(false);

//   const fetchRestaurants = async () => {
//     setLoading(true);
//     try {
//       // Fetch all restaurants from backend
//       const res = await axios.get("http://localhost:5000/api/restaurants");
//       setRestaurants(res.data); // pre-populate all restaurants
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch all restaurants on page load
//   useEffect(() => {
//     fetchRestaurants();
//   }, []);

//   // Filter restaurants dynamically on frontend
//   const filteredRestaurants = restaurants.filter((r) => {
//     return (
//       (!cuisine || r.cuisine === cuisine) &&
//       (!rating || r.rating >= parseFloat(rating)) &&
//       (!location || r.location === location)
//     );
//   });

//   return (
//     <div className="min-h-screen p-10" style={{ backgroundColor: "#B197A4" }}>
//       <h1 className="text-center text-4xl font-extrabold mb-10 text-purple-900 tracking-wide">
//         BITE BUDDY
//       </h1>

//       <FilterBar
//         dataset={restaurants} // for dynamic dropdown options
//         cuisine={cuisine}
//         setCuisine={setCuisine}
//         rating={rating}
//         setRating={setRating}
//         location={location}
//         setLocation={setLocation}
//       />

//       {loading && <p className="text-center font-bold text-lg">Loading...</p>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
//         {filteredRestaurants.length === 0 && !loading ? (
//           <p className="col-span-full text-center font-bold text-lg">
//             No restaurants found.
//           </p>
//         ) : (
//           filteredRestaurants.map((rest) => (
//             <RestaurantCard key={rest._id} restaurant={rest} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default RestaurantListing;

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
    fetch("http://localhost:9169/api/restaurants")
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
