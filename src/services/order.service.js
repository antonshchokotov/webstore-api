import { ERROR_MESSAGES, ORDER_STATUSES } from "../config/constants.js";

import orderRepository from "../repositories/order.repository.js";
import productRepository from "../repositories/product.repository.js";

async function createOrder({
  products: productIdsToCountMap,
  customerName,
  customerEmail,
  deliveryAddress,
}) {
  try {
    const { reservedProducts, unavailableProductIds } =
      await productRepository.reserveProducts({
        productIdsToCountMap,
      });

    if (unavailableProductIds) {
      return {
        status: "Failed",
        error: ERROR_MESSAGES.PRODUCTS_UNAVAILABLE,
        unavailableProductIds,
      };
    }

    const totalPrice = reservedProducts.reduce(
      (acc, p) => acc + p.price * p.count,
      0
    );

    const orderData = {
      products: productIdsToCountMap,
      price: totalPrice,
      customerName,
      customerEmail,
      deliveryAddress,
    };

    const { id: orderId } = await orderRepository.createOrder(orderData);

    //? PAYMENT SYSTEM integration is not defined, assuming it will generate a link in return to provided id and price
    const paymentLink = `https://payment.system/webstore/${orderId}`;

    await orderRepository.changeOrderStatus({
      id: orderId,
      status: ORDER_STATUSES.PENDING,
    });

    return { status: "Success", orderId, ...orderData, paymentLink };
  } catch (error) {
    console.log(`Error in order.service createOrder ${error.message}`);
    throw error;
  }
}

export default {
  createOrder,
};
