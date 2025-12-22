// //src/pages/RestaurantListing.jsx
// import React, { useEffect, useState } from "react";
// import RestaurantCard from "../components/RestaurantCard";
// import FilterBar from "../components/FilterBar";
// import "./RestaurantList.css";

// const RestaurantListing = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [cuisine, setCuisine] = useState("");
//   const [rating, setRating] = useState("");
//   const [location, setLocation] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/restaurants")
//       .then((res) => res.json())
//       .then((data) => setRestaurants(data))
//       .finally(() => setLoading(false));
//   }, []);

//   const filteredRestaurants = restaurants.filter((r) => {
//     return (
//       (!cuisine || r.cuisine === cuisine) &&
//       (!rating || r.rating >= parseFloat(rating)) &&
//       (!location || r.location === location)
//     );
//   });

//   if (loading) return <p className="text-center font-bold text-lg">Loading...</p>;

//   return (
//     <div className="min-h-screen p-10" style={{ backgroundColor: "#B197A4" }}>
//       <h1 className="text-left text-5xl md:text-6xl font-extrabold mb-8 text-gradient bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent tracking-wide pl-6 md:pl-20">
//         RESTAURANT LISTING
//       </h1>

//       <FilterBar
//         dataset={restaurants}
//         cuisine={cuisine}
//         setCuisine={setCuisine}
//         rating={rating}
//         setRating={setRating}
//         location={location}
//         setLocation={setLocation}
//       />

//       <div className="restaurant-list">
//         {filteredRestaurants.length === 0 ? (
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
//src/pages/RestaurantListing.jsx
import React, { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import FilterBar from "../components/FilterBar";
import Navbar from "../components/Navbar";   // ✅ IMPORT NAVBAR
import "./RestaurantList.css";

const RestaurantListing = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [cuisine, setCuisine] = useState("");
  const [rating, setRating] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          page: currentPage,
          limit: itemsPerPage,
          ...(cuisine && { cuisine }),
          ...(rating && { rating }),
          ...(location && { location }),
        }).toString();

        const res = await fetch(`http://localhost:5000/api/restaurants?${queryParams}`);
        const data = await res.json();

        setRestaurants(data.restaurants || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [cuisine, rating, location, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [cuisine, rating, location]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading)
    return <p className="text-center font-bold text-lg">Loading...</p>;

  return (
    <div className="min-h-screen p-10" style={{ backgroundColor: "#B197A4" }}>
      <Navbar /> {/* ✅ NAVBAR SHOWS ON THIS PAGE */}

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
        {restaurants.length === 0 ? (
          <p className="col-span-full text-center font-bold text-lg">
            No restaurants found.
          </p>
        ) : (
          restaurants.map((rest, index) => (
            <RestaurantCard key={rest._id || index} restaurant={rest} />
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 space-x-4">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 rounded font-bold ${currentPage === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-200"
              }`}
          >
            Previous
          </button>

          <span className="text-white font-bold text-lg">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-4 py-2 rounded font-bold ${currentPage === totalPages
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-200"
              }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantListing;
