// import React from "react";
// import Navbar from "./components/Navbar";
// import RestaurantListing from "./pages/RestaurantListing";

// function App() {
//   return (
//     <div className="app-container">
//       <Navbar />
//       <main>
//         <RestaurantListing />
//       </main>
//     </div>
//   );
// }

//  export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import RestaurantListing from "./pages/RestaurantListing";
import Profile from "./pages/Profile"; // <-- create this page
import OrderHistory from "./pages/OrderHistory";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<RestaurantListing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order-history" element={<OrderHistory />} />

        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
