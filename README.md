# Blinkit Lite – Drinks Catalog & Cart

A fast and responsive drinks catalog application built with the MERN stack (MongoDB, Express, React, Node.js). Users can browse categories, view product details, add items to their cart, and place orders.

---

## Tech Stack

### Frontend
- **React 18** with **Vite** for fast, optimized builds
- **TypeScript** for type safety
- **Tailwind CSS** and **shadcn/ui** for styling and accessible components
- **React Context** and **TanStack Query** for state and data fetching

### Backend
- **Node.js** and **Express.js** for the REST API
- **MongoDB** (with Mongoose) for database operations (falls back to an in-memory store if MongoDB is not running)

---

## Getting Started

### Prerequisites
- Node.js 18 or higher
- (Optional) MongoDB installed and running locally

### Running the Application Locally

1. **Backend Server Setup**
```bash
cd backend
npm install
# Create a .env file (optional, see Environment Variables below)
npm run dev
```

2. **Frontend App Setup**
```bash
cd quick-sip-catalog-main
npm install
# Create a .env file (optional, see Environment Variables below)
npm run dev
```

3. Open your browser and navigate to `http://localhost:8080`.

---

## Environment Variables

To configure the application, create `.env` files in both the frontend and backend directories.

### Backend (`backend/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blinkit-lite
```
*(If no connection is provided or MongoDB fails, the backend will auto-fallback to an in-memory data store)*

### Frontend (`quick-sip-catalog-main/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Seeding Initial Data

To load the demo catalog containing 8 categories and 36 products:

```bash
cd backend
npm run seed
```
*Note: Run this only once to populate your database with sample drinks and items.*

---

## What’s Implemented

- ✅ **Product Catalog**: View drinks categorized by type.
- ✅ **Product Details**: Quantity selector and Add to Cart functionality.
- ✅ **Shopping Cart**: View line items, update quantities, remove items, and see the total cost.
- ✅ **Order Placement**: Place an order (saves to database).
- ✅ **Products API**: Full CRUD, search, pagination, and category filtering.
- ✅ **Cart Persistence**: Cart items persist using browser `localStorage`.
- ✅ **Responsive UI**: Fully optimized for mobile and desktop screens.

---

## Known Limitations

- **Authentication**: No user accounts, login, or admin features exist yet.
- **Payments**: No real payment gateway integration (orders bypass payment).
- **Location/Geo**: No map or location features for a delivery app simulation.
- **Cart Storage**: Cart persistence is tied purely to the specific browser device.

---

👨‍💻 Author
<div align="center"> <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=28&pause=1000&color=22C55E&center=true&vCenter=true&width=600&lines=Hi%2C+I'm+Sonu+Pal;Full+Stack+Developer;Data+Analytics+Enthusiast;Building+Blinkit+Lite+🚀" /> <br>
🚀 Sonu Pal

B.Tech IT | Full Stack Developer | Data Analytics Enthusiast

Passionate about building fast, scalable applications and turning ideas into real-world solutions.
Creator of Blinkit Lite – MERN Drinks Catalog & Cart Application.

</div>

🌐 Connect With Me
<p align="center"> <a href="https://github.com/"> <img src="https://img.shields.io/badge/GitHub-000?style=for-the-badge&logo=github&logoColor=white"/> </a> <a href="https://linkedin.com/"> <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/> </a> <a href="mailto:your-email@gmail.com"> <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white"/> </a> </p>
