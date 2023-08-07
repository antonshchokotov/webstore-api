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
    const { reservedProducts, unavailableProducts } =
      await productRepository.reserveProducts({
        productIdsToCountMap,
      });

    if (unavailableProducts) {
      const unavailableProductIdsToCountMap = unavailableProducts.reduce(
        (acc, product) => {
          acc[product.id] = product.count;
          return acc;
        },
        {}
      );
      return {
        status: "Failed",
        error: ERROR_MESSAGES.PRODUCTS_UNAVAILABLE,
        unavailableProducts: unavailableProductIdsToCountMap,
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
    orderData.paymentLink = `https://payment.system/webstore/${orderId}`;

    await orderRepository.changeOrderStatus({
      id: orderId,
      status: ORDER_STATUSES.PENDING,
    });

    return { status: "Success", orderId, ...orderData };
  } catch (error) {
    console.log(`Error in order.service createOrder ${error.message}`);
    throw error;
  }
}

export default {
  createOrder,
};
