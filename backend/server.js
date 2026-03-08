require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/Product.js");
const Category = require("./models/Category.js");
const { categories, products } = require("./data.js");

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/blinkit-lite";

let useMongo = false;

app.use(cors());
app.use(express.json());

app.get("/api/categories", async (req, res) => {
  try {
    if (useMongo) {
      const data = await Category.find().lean();
      return res.json(data);
    }
  } catch (err) {
    console.error("Categories fetch error:", err.message);
  }
  res.json(categories);
});

app.get("/api/products", async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 12));
  const search = (req.query.search || "").trim().toLowerCase();
  const category = (req.query.category || "").trim();

  if (useMongo) {
    try {
      const filter = {};
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
        ];
      }
      if (category) filter.categorySlug = category;

      const [list, total] = await Promise.all([
        Product.find(filter)
          .skip((page - 1) * limit)
          .limit(limit)
          .lean(),
        Product.countDocuments(filter),
      ]);

      const totalPages = Math.ceil(total / limit) || 1;
      const items = list.map((p) => ({ ...p, id: p.id || p._id.toString() }));
      return res.json({
        products: items,
        pagination: { page, limit, total, totalPages },
      });
    } catch (err) {
      console.error("Products fetch error:", err.message);
    }
  }

  let list = [...products];
  if (search) {
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search)
    );
  }
  if (category) {
    list = list.filter((p) => p.categorySlug === category);
  }
  const total = list.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const start = (page - 1) * limit;
  const paginated = list.slice(start, start + limit);

  res.json({
    products: paginated,
    pagination: { page, limit, total, totalPages },
  });
});

app.get("/api/products/:id", async (req, res) => {
  if (useMongo) {
    try {
      const product = await Product.findOne({ id: req.params.id }).lean();
      if (product) {
        return res.json({ ...product, id: product.id || product._id.toString() });
      }
    } catch (err) {
      console.error("Product fetch error:", err.message);
    }
  }

  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Blinkit-lite API running at http://localhost:${port}`);
    if (!useMongo) {
      console.log("Using in-memory data (MongoDB not connected). Run: npm run seed && npm run dev");
    }
  });
  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      const fallback = port === 5000 ? 5001 : port + 1;
      console.warn(`Port ${port} in use. Trying ${fallback}...`);
      startServer(fallback);
    } else {
      throw err;
    }
  });
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    useMongo = true;
    console.log("Connected to MongoDB");
    startServer(PORT);
  })
  .catch((err) => {
    console.warn("MongoDB not available:", err.message);
    console.warn("Using in-memory data. Run 'npm run seed' when MongoDB is ready.");
    startServer(PORT);
  });
