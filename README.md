
# 🍔 BiteBuddy - Food Delivery Platform

**BiteBuddy** is a modern, full-stack food delivery application built with the **MERN Stack** (MongoDB, Express, React, Node.js). It connects users with local restaurants and delivery partners, offering a seamless ordering experience with real-time updates.

---

## ✨ Features

### 👤 User
*   **Authentication**: Secure Login & Registration (JWT-based).
*   **Listing**: Browse restaurants with advanced filters (Cuisine, Rating, Location).
*   **Menu**: View dynamic menus with engaging UI.
*   **Cart**: Add/remove items with a specialized cart management system.
*   **Checkout**:
    *   **Payment Simulation**: Integrated "Pay Online" simulation for Bkash, Nagad, and Rocket with validation.
    *   **Validation**: Strict input checks for phone numbers and PINs.
*   **Order History**: Track past orders and status.

### 👨‍🍳 Admin
*   **Dashboard**: Overview of all platform activities.
*   **Order Management**: View, Cancel, or Delete orders.
*   **Restaurant Management**: (Future feature) Manage listings and menus.

### 🚚 Delivery Partner
*   **Dashboard**: View assigned deliveries ("My Deliveries").
*   **Status Updates**: Update order status (Picked Up, Delivered).
*   **History**: View completed deliveries.

---

## 🛠️ Tech Stack

### Frontend
*   **Framework**: React (Vite)
*   **Styling**: TailwindCSS, Vanilla CSS (Glassmorphism design)
*   **Icons**: Lucide React, React Icons
*   **State/Routing**: React Router DOM, Context API
*   **HTTP Client**: Axios

### Backend
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: MongoDB (Mongoose ODM)
*   **Auth**: JSON Web Token (JWT), BcryptJS
  
---

## 🚀 Getting Started

Follow these steps to run BiteBuddy locally.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/isushmeeta/BiteBuddy.git
cd BiteBuddy
```

### 2️⃣ Backend Setup
Navigate to the backend directory and install dependencies.
```bash
cd backend
npm install
```

**Configure Environment Variables:**
Create a `.env` file in the `backend/` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
```

**Start the Server:**
```bash
npm run dev
# Server runs on http://localhost:5000
```

### 3️⃣ Frontend Setup
Navigate to the frontend directory and install dependencies.
```bash
cd ../frontend
npm install
```

**Configure Environment Variables:**
Create a `.env` file in the `frontend/` folder:
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key #(Optional)
```

**Start the Client:**
```bash
npm run dev
# App runs on http://localhost:5173
```

---

## 📁 Project Structure

```bash
BiteBuddy/
│
├── frontend/          # React + Vite Application
│   ├── src/
│       ├── components/ # Reusable UI components
│       ├── pages/      # Full page views (Dashboard, Menu, Login)
│       ├── context/    # Global State (Auth, Cart)
│       ├── hooks/      # Custom Hooks
│       └── ...
│
└── backend/           # Node.js + Express API
    ├── controllers/   # Business logic
    ├── models/        # Mongoose Schemas (User, Order, etc.)
    ├── routes/        # API Endpoints
    └── ...
```

---

## ☁️ Deployment

*   **Frontend**: Recommended on [Vercel](https://vercel.com).
*   **Backend**: Recommended on [Render](https://render.com).
*   **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
*    **Link**: https://bitebuddy-nine.vercel.app/



---

## 🤝 Contributing

Contributions are welcome!
1.  Fork the repo.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes.
4.  Push to the branch.
5.  Open a Pull Request.

---

## 📄 License
This project is licensed under the MIT License.
