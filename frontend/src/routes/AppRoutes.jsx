//src/routes/AppRoutes.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import MenuPage from "../pages/MenuPage";
import Profile from "../pages/Profile";
import ForgotPassword from "../pages/forgotPassword";
import RestaurantListing from "../pages/RestaurantListing";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/restaurants" element={<RestaurantListing />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/menu/:restaurantId" element={<MenuPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success/:orderId" element={<OrderSuccess />} />

      </Routes>
    </BrowserRouter>
  );
}
