//components/FilterBar.jsx 
import React from "react";
import "./FilterBar.css";

const FilterBar = ({
  cuisine = "",
  rating = "",
  location = "",
  setCuisine = () => { },
  setRating = () => { },
  setLocation = () => { },
}) => {
  return (
    <div
      className="
        flex flex-wrap items-center justify-center 
        rounded-2xl mx-auto mt-6 mb-10 
        bg-white/80 backdrop-blur-md border border-white/50
        px-6 py-4
        gap-6 md:gap-12
        shadow-xl
        max-w-max
      "
    >
      {/* CUISINE */}
      <div className="flex flex-col">
        <label className="text-[10px] font-bold text-purple-600 uppercase tracking-widest mb-1 ml-1 opacity-70">Cuisine</label>
        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="bg-transparent outline-none text-gray-800 font-bold appearance-none cursor-pointer pr-4 focus:text-purple-600 transition-colors"
          style={{ fontSize: "16px" }}
        >
          <option value="">All Cuisines</option>
          <option value="Japanese">Japanese</option>
          <option value="Fast Food">Fast Food</option>
          <option value="Indian">Indian</option>
          <option value="Chinese">Chinese</option>
          <option value="Bangali">Bangali</option>
        </select>
      </div>

      <div className="hidden md:block w-[1px] h-8 bg-gray-200"></div>

      {/* RATINGS */}
      <div className="flex flex-col">
        <label className="text-[10px] font-bold text-purple-600 uppercase tracking-widest mb-1 ml-1 opacity-70">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="bg-transparent outline-none text-gray-800 font-bold appearance-none cursor-pointer pr-4 focus:text-purple-600 transition-colors"
          style={{ fontSize: "16px" }}
        >
          <option value="">Any Rating</option>
          <option value="4">4.0+ ⭐</option>
          <option value="4.2">4.2+ ⭐</option>
          <option value="4.5">4.5+ ⭐</option>
        </select>
      </div>

      <div className="hidden md:block w-[1px] h-8 bg-gray-200"></div>

      {/* LOCATIONS */}
      <div className="flex flex-col">
        <label className="text-[10px] font-bold text-purple-600 uppercase tracking-widest mb-1 ml-1 opacity-70">Location</label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-transparent outline-none text-gray-800 font-bold appearance-none cursor-pointer pr-4 focus:text-purple-600 transition-colors"
          style={{ fontSize: "16px" }}
        >
          <option value="">All Locations</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chittagong">Chittagong</option>
          <option value="Sylhet">Sylhet</option>
          <option value="Barisal">Barisal</option>
          <option value="Khulna">Khulna</option>
          <option value="Faridpur">Faridpur</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
