import React from "react";
import Navbar from "./components/Navbar";
import RestaurantListing from "./pages/RestaurantListing";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <RestaurantListing />
      </main>
    </div>
  );
}

 export default App;

