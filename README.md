# Blinkit Lite – MERN Product Catalog & Cart

A drinks catalog app with categories, product details, cart, and order placement. Built with React (Vite), Node.js, Express, and MongoDB.

---

## Tech Stack

| Layer    | Tech                        |
|----------|-----------------------------|
| Frontend | React 18, Vite, TypeScript  |
| State    | React Context, TanStack Query |
| Styling  | Tailwind CSS, shadcn/ui     |
| Backend  | Node.js, Express            |
| Database | MongoDB (Mongoose)          |

---

## Project Structure

```
blinkit-lite/
├── quick-sip-catalog-main/   # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── context/          # CartContext
│   │   ├── lib/api.ts        # API client
│   │   └── pages/
│   └── package.json
├── backend/                  # Node.js + Express
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.js
│   ├── scripts/
│   │   └── seed.js
│   └── package.json
└── README.md
```

---

## Prerequisites

- Node.js 18+
- MongoDB (optional) – if not installed/running, the backend uses an **in-memory store** automatically

---

## How to Run Locally

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # optional
npm run dev            # Start server (http://localhost:5000)
```

**Note:** If MongoDB is not running, the backend automatically uses an in-memory store with sample data. For persistent data, install MongoDB and run `npm run seed` first.

### 2. Frontend

```bash
cd quick-sip-catalog-main
npm install
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api (default)
npm run dev     # Start app (http://localhost:8080)
```

### 3. Environment Variables

**Backend** (`.env` in `backend/`):
- `PORT` – Server port (default: 5000)
- `MONGODB_URI` – MongoDB connection string (default: `mongodb://localhost:27017/blinkit-lite`)

**Frontend** (`.env` in `quick-sip-catalog-main/`):
- `VITE_API_URL` – API base URL (default: `http://localhost:5000/api`)

---

## API Documentation

Base URL: `http://localhost:5000/api`

### Products

| Method | Endpoint             | Description                            |
|--------|----------------------|----------------------------------------|
| GET    | `/products`          | List products (pagination, search, filter) |
| GET    | `/products/:id`      | Get product by ID                      |
| POST   | `/products`          | Create product                         |
| PUT    | `/products/:id`      | Update product                         |
| DELETE | `/products/:id`      | Delete product                         |

**List products query params:**
- `page` (default: 1)
- `limit` (default: 12, max: 50)
- `search` – search by name/category
- `category` – filter by `categorySlug`

**Example:**  
`GET /products?page=1&limit=12&search=cola&category=soft-drinks`

### Categories

| Method | Endpoint      | Description        |
|--------|---------------|--------------------|
| GET    | `/categories` | List all categories |

### Orders

| Method | Endpoint       | Description           |
|--------|----------------|------------------------|
| POST   | `/orders`      | Create order (Place Order) |
| GET    | `/orders/:id`  | Get order by ID       |

**Create order body:**
```json
{
  "items": [{ "product": { ... }, "quantity": 2 }],
  "total": 150
}
```

---

## Seeding Data

```bash
cd backend
npm run seed
```

Seeds:
- 8 categories (Soft Drinks, Juices, Water & Soda, etc.)
- 36 products across categories

---

## What's Implemented

- ✅ Product catalog with categories
- ✅ Product details page (quantity selector, Add to Cart)
- ✅ Cart page (line items, update/remove, subtotal/total)
- ✅ Place Order → saves order in MongoDB, no payment
- ✅ Order confirmation from stored order
- ✅ Products API: CRUD, pagination, search, filter
- ✅ Cart persistence (localStorage)
- ✅ Responsive layout (mobile/desktop)

---

## Known Limitations

- No authentication (no user/admin)
- No payment integration
- No location/geo features
- Cart localStorage is device-specific

---

## Postman Collection

Import `backend/postman-collection.json` into Postman. Set `baseUrl` to `http://localhost:5000/api`.

---

## Next Steps

- Add user auth (login/signup)
- Integrate payment (Stripe/Razorpay)
- Admin panel for products/categories
- Email/SMS order confirmation
- Deploy frontend (Vercel/Netlify) and backend (Render/Railway)
