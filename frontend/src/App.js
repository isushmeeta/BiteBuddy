

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import RestaurantListing from "./pages/RestaurantListing";
import Profile from "./pages/Profile"; // <-- create this page
import OrderHistory from "./pages/OrderHistory";
import OrderDetails from "./pages/OrderDetails";
import MenuPage from "./pages/MenuPage";



function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<RestaurantListing />} />
          <Route path="/menu/:restaurantId" element={<MenuPage />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />

        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
