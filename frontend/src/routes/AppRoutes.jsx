//src/routes/AppRoutes.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import MenuPage from "../pages/MenuPage";
import Profile from "../pages/Profile";
import ForgotPassword from "../pages/forgotPassword";
import ResetPassword from "../pages/ResetPassword";
import RestaurantListing from "../pages/RestaurantListing";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import OrderHistory from "../pages/OrderHistory";
import AdminMenuPage from "../pages/AdminMenuPage.jsx";
import AdminDashboard from "../pages/AdminDashboard";
import AdminRoute from "./AdminRoute";
import OrderDetails from "../pages/OrderDetails";
import DeliveryDashboard from "../pages/DeliveryDashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/restaurants" element={<RestaurantListing />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
        <Route path="/menu/:restaurantId" element={<MenuPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success/:orderId" element={<OrderSuccess />} />
        <Route path="/delivery" element={<DeliveryDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/:restaurantId" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="/admin/menu/:restaurantId" element={
          <AdminRoute>
            <AdminMenuPage />
          </AdminRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
