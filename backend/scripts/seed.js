require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product.js");
const Category = require("../models/Category.js");
const { categories, products } = require("../data.js");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/blinkit-lite";

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    await Category.deleteMany({});
    await Category.insertMany(categories);
    console.log(`Seeded ${categories.length} categories`);

    await Product.deleteMany({});
    const docs = await Product.insertMany(products);
    console.log(`Seeded ${docs.length} products`);

    console.log("Seed complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exit(1);
  }
}

seed();
