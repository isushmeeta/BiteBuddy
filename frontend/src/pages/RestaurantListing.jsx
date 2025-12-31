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

const RestaurantListing = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [cuisine, setCuisine] = useState("");
  const [rating, setRating] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8; // Adjust to 8 for cleaner 4-col rows

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

        const res = await fetch(`${import.meta.env.VITE_API_URL}/restaurants?${queryParams}`);
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#B197A4]">
        <p className="text-3xl font-extrabold text-white animate-pulse">Loading Deliciousness...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#B197A4] pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-left text-5xl md:text-6xl font-extrabold mt-10 mb-8 text-gradient bg-gradient-to-r from-purple-800 via-pink-600 to-yellow-500 bg-clip-text text-transparent tracking-tight">
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

        {restaurants.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-20 text-center border border-white/20">
            <p className="text-2xl font-bold text-white/80">
              No restaurants match your filters. Try something else! 🍕
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-start">
            {restaurants.map((rest, index) => (
              <RestaurantCard key={rest._id || index} restaurant={rest} />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-16 space-x-6">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className={`px-8 py-3 rounded-2xl font-bold shadow-xl transition-all duration-300 ${currentPage === 1
                ? "bg-white/10 text-white/30 cursor-not-allowed"
                : "bg-white text-purple-700 hover:bg-purple-600 hover:text-white transform hover:scale-105"
                }`}
            >
              ← Previous
            </button>

            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/30 shadow-inner">
              <span className="text-white font-bold text-lg">
                Page {currentPage} of {totalPages}
              </span>
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className={`px-8 py-3 rounded-2xl font-bold shadow-xl transition-all duration-300 ${currentPage === totalPages
                ? "bg-white/10 text-white/30 cursor-not-allowed"
                : "bg-white text-purple-700 hover:bg-purple-600 hover:text-white transform hover:scale-105"
                }`}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantListing;
