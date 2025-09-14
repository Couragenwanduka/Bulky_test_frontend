#  E-Commerce Frontend

A **React + TypeScript + Vite** frontend for the E-Commerce API.  
This project provides the user interface for browsing products, managing a cart, wishlists, authentication, and admin dashboards.

---

## Features
- 🔑 **Authentication** (Login / Register with JWT)
- 🛒 **Product Management** (view all products, single product details)
- ❤️ **Wishlist** (add/remove products)
- 🛍️ **Cart** (add, update, remove items)
- 👨‍💻 **Admin Dashboard**:
  - View all products  
  - Edit / delete products  
  - Manage users (promote to admin)  
- 📱 Responsive UI built with **TailwindCSS**

---

##  Tech Stack
- **React** (with TypeScript)
- **Vite** (fast build + HMR)
- **React Router** (client-side routing)
- **Axios** (API requests)
- **TailwindCSS** (styling)
- **React Query / Zustand (optional)** for state management
- **Cloudinary / Multer** (image uploads via API)

---

##  Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Couragenwanduka/Bulky_test_frontend.git
cd Bulky_test_frontend
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Environment variables
Create a `.env` file in the root folder and configure:

```env
VITE_API_URL=http://localhost:6000/api
```

👉 Point this to your backend API.

### 4️⃣ Start the development server
```bash
npm run dev
```

Project will run at `http://localhost:5173/`

---

##  Project Structure
```
src/
 ├── api/         # Axios API hooks
 ├── components/  # Reusable UI components
 ├── pages/       # App pages (Products, Cart, Wishlist, Admin, etc.)
 ├── hooks/       # Custom React hooks
 ├── context/     # Global context (Auth, Cart, etc.)
 ├── App.tsx      # Main app routes
 └── main.tsx     # Entry point
```

---

##  Available Scripts
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

---

##  API Backend
This frontend connects to the **E-Commerce API**.  
Find the backend repo here: [E-Commerce API](https://github.com/your-backend-repo)

