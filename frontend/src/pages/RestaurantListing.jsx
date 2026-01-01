
//src/pages/RestaurantListing.jsx
import React, { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import FilterBar from "../components/FilterBar";
import Navbar from "../components/Navbar";   // ✅ IMPORT NAVBAR
import { Loader2 } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-full shadow-2xl">
          <Loader2 className="animate-spin text-indigo-600" size={48} />
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 pb-20 font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32">
        <h1 className="text-left text-5xl md:text-6xl font-extrabold mb-8 text-white drop-shadow-md tracking-tight">
          Restaurant Listing
        </h1>

        {/* Filter Bar container with glass effect if FilterBar itself doesn't have it */}
        <div className="mb-10">
          <FilterBar
            dataset={restaurants}
            cuisine={cuisine}
            setCuisine={setCuisine}
            rating={rating}
            setRating={setRating}
            location={location}
            setLocation={setLocation}
          />
        </div>

        {restaurants.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-20 text-center border border-white/20 shadow-xl">
            <p className="text-2xl font-bold text-gray-600">
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
              className={`px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 ${currentPage === 1
                ? "bg-white/20 text-white/50 cursor-not-allowed"
                : "bg-white text-indigo-600 hover:bg-indigo-50 hover:scale-105"
                }`}
            >
              ← Previous
            </button>

            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-xl border border-white/30 shadow-inner">
              <span className="text-white font-bold text-lg">
                Page {currentPage} of {totalPages}
              </span>
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className={`px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 ${currentPage === totalPages
                ? "bg-white/20 text-white/50 cursor-not-allowed"
                : "bg-white text-indigo-600 hover:bg-indigo-50 hover:scale-105"
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
