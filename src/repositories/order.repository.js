import Order from "../models/order.model.js";

import { ORDER_STATUSES } from "../config/constants.js";

async function createOrder({
  products,
  price,
  customerName,
  customerEmail,
  deliveryAddress,
}) {
  try {
    const order = await new Order({
      status: ORDER_STATUSES.NEW,
      products,
      price,
      customerName,
      customerEmail,
      deliveryAddress,
    });
    const { id } = await order.save();

    return { id };
  } catch (error) {
    console.log(`Error in order.repository createOrder ${error.message}`);
    throw error;
  }
}

async function changeOrderStatus({ id, status }) {
  try {
    const order = await Order.findOne({ _id: id });

    order.status = status;
    await order.save();
  } catch (error) {
    console.log(`Error in order.repository changeOrderStatus ${error.message}`);
    throw error;
  }
}

export default {
  createOrder,
  changeOrderStatus,
};
