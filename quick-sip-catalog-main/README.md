# Blinkmart – MERN Product Catalog & Cart

Blinkmart is a full-stack MERN application that displays a drinks catalog where users can browse products, add items to a cart, and place an order.

## Tech Stack

Frontend:

* React
* Vite
* TypeScript
* Tailwind CSS
* shadcn/ui

Backend:

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

## Project Structure

```
blinkit-lite
│
├── backend
│   ├── src
│   ├── models
│   ├── routes
│   └── index.js
│
└── quick-sip-catalog-main
    ├── src
    ├── public
    └── index.html
```

## Installation

### 1. Clone the repository

```
git clone <your-repository-url>
cd blinkit-lite
```

### 2. Install backend dependencies

```
cd backend
npm install
```

Create a `.env` file inside backend:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Run backend:

```
npm run dev
```

### 3. Install frontend dependencies

```
cd ../quick-sip-catalog-main
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:8080
```

Backend runs at:

```
http://localhost:5000
```

## Features

* Product catalog
* Category filtering
* Product details page
* Add to cart
* Cart management
* Order placement
* MongoDB database integration

## Future Improvements

* User authentication
* Payment gateway integration
* Admin dashboard
* Deployment to cloud

## Author

Sonu Pal
B.Tech – Information Technology
