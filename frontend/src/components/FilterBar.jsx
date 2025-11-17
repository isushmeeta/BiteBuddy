const Filters = ({ cuisine, rating, location, setCuisine, setRating, setLocation }) => {
  return (
    <div className="flex gap-4 mb-6">
      {/* Cuisine Filter */}
      <select
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
        className="border rounded-md px-4 py-2"
      >
        <option value="">CUISINE</option>
        <option value="Japanese">Japanese</option>
        <option value="Fast Food">Fast Food</option>
        <option value="Indian">Indian</option>
        <option value="Chinese">Chinese</option>
      </select>

      {/* Rating Filter */}
      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="border rounded-md px-4 py-2"
      >
        <option value="">RATINGS</option>
        <option value="4">4.0+</option>
        <option value="4.5">4.5+</option>
      </select>

      {/* Location Filter */}
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border rounded-md px-4 py-2"
      >
        <option value="">LOCATIONS</option>
        <option value="Dhaka">Dhaka</option>
        <option value="Chittagong">Chittagong</option>
        <option value="Sylhet">Sylhet</option>
      </select>
    </div>
  );
};

export default Filters;

