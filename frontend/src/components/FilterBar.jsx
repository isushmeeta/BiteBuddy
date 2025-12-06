//components/FilterBar.jsx 
import React from "react";
import "./FilterBar.css";

const FilterBar = ({
  cuisine = "",
  rating = "",
  location = "",
  setCuisine = () => {},
  setRating = () => {},
  setLocation = () => {},
}) => {
  return (
    <div
      className="
        filter-bar
        flex items-center justify-between 
        rounded-xl mx-auto mt-10 mb-10 
        bg-[#D9D9D9]
        px-4
        gap-50
      "
      style={{ width: "500px", height: "50px", fontFamily: "Itim", fontSize: "28px" }}
    >
      {/* CUISINE */}
      <select
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
        className="bg-transparent outline-none text-black uppercase"
        style={{ fontFamily: "Itim", fontSize: "20px" }}
      >
        <option value="">CUISINE</option>
        <option value="Japanese">Japanese</option>
        <option value="Fast Food">Fast Food</option>
        <option value="Indian">Indian</option>
        <option value="Chinese">Chinese</option>
        <option value="Bangali">Bangali</option>
      </select>

      {/* RATINGS */}
      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="bg-transparent outline-none text-black uppercase"
        style={{ fontFamily: "Itim", fontSize: "20px" }}
      >
        <option value="">RATINGS</option>
        <option value="4">4.0+</option>
        <option value="4.2">4.2+</option>
        <option value="4.5">4.5+</option>
      </select>

      {/* LOCATIONS */}
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="bg-transparent outline-none text-black uppercase"
        style={{ fontFamily: "Itim", fontSize: "20px" }}
      >
        <option value="">LOCATIONS</option>
        <option value="Dhaka">Dhaka</option>
        <option value="Chittagong">Chittagong</option>
        <option value="Sylhet">Sylhet</option>
        <option value="Barisal">Barisal</option>
        <option value="Khulna">Khulna</option>
        <option value="Faridpur">Faridpur</option>
      </select>
    </div>
  );
};

export default FilterBar;
