const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: String,
  category: String,
  categorySlug: String,
  price: Number,
  originalPrice: Number,
  unit: String,
  image: String,
  description: String,
  inStock: { type: Boolean, default: true },
});
productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Product", productSchema);
