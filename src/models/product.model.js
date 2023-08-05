import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  manufacturer: { type: String, required: true },
  name: { type: String, required: true, index: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  reserved: { type: Number, default: 0 },
});

const Product = new mongoose.model("Product", productSchema);

export default Product;
