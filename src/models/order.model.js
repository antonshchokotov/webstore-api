import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  status: { type: String, required: true },
  products: { type: mongoose.Schema.Types.Mixed, required: true },
  price: { type: Number, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
});

const Order = new mongoose.model("Order", orderSchema);

export default Order;
