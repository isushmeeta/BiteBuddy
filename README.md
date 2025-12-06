# BiteBuddy
A full-stack food delivery platform for users, restaurants, and delivery partners built with MERN/Django &amp; React.

### Tech Stack
## Frontend : React, JavaScript, TailwindCSS.
## Backend : Node.js, Express.js, MongoDB
## Authentication : JWT

# BiteBuddy Project Setup Guide

### Clone the Repository

First, clone the BiteBuddy repository to your local machine:

```bash
git clone https://github.com/isushmeeta/BiteBuddy.git
cd BiteBuddy
```

## 2️⃣ Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

### 2.1 Install Dependencies

```bash
npm install
```

### 2.2 Install Extra Dependencies (if needed)

```bash
npm install react-router-dom axios react-icons
```

### 2.3 TailwindCSS (if not already configured)

```bash
npx tailwindcss init -p
```

### 2.4 Create `.env` file

Inside `frontend/`, create `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

### 2.5 Start Frontend Server

```bash
npm run dev
```

**Access frontend:** [http://localhost:5173](http://localhost:5173)

---

## 3️⃣ Backend Setup

Navigate to the backend folder:

```bash
cd ../backend
```

### 3.1 Install Dependencies

```bash
npm install
```

### 3.2 Create `.env` file

```
PORT=5000
MONGO_URI=<your-mongodb-uri>
CLIENT_URL=http://localhost:5173
JWT_SECRET=<any-secret-key>
```

### 3.3 Start Backend Server

```bash
npm run dev
```

**Access backend:** [http://localhost:5000](http://localhost:5000)

---

## 4️⃣ Verify Setup

* Frontend should run on **[http://localhost:5173](http://localhost:5173)**
* Backend should run on **[http://localhost:5000](http://localhost:5000)**
* Test API endpoints or frontend pages to ensure they are working

---



## Install Dependencies(shortcuts)
```bash 
npm init -y

npm install react-router-dom axios framer-motion lucide-react react-icons          # frontend

npm install express mongoose cors cookie-parser bcryptjs jsonwebtoken              # backend

```
##  Check you server runs on 
```bash 
http://localhost:5000
```

### Folder Sturcture 
```bash
BiteBuddy/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       │   ├── images/
│       │   └── icons/
│       │
│       ├── components/
│       │   ├── common/
│       │   ├── layout/
│       │   └── cart/
│       │
│       ├── pages/
│       │   ├── Home/
│       │   ├── Menu/
│       │   ├── Cart/
│       │   ├── Login/
│       │   ├── Register/
│       │   ├── Profile/
│       │   └── Orders/
│       │
│       ├── routes/
│       │   └── AppRoutes.jsx
│       │
│       ├── api/
│       │   ├── auth.js
│       │   ├── cart.js
│       │   ├── orders.js
│       │   └── user.js
│       │
│       ├── context/
│       │   ├── AuthContext.jsx
│       │   ├── CartContext.jsx
│       │   └── UserContext.jsx
│       │
│       ├── hooks/
│       │   ├── useAuth.js
│       │   ├── useCart.js
│       │   └── useFetch.js
│       │
│       ├── utils/
│       │   ├── formatPrice.js
│       │   ├── validators.js
│       │   └── constants.js
│       │
│       ├── config/
│       │   └── axiosConfig.js
│       │
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   └── userController.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   └── FoodItem.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   │
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── response.js
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
```

