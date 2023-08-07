import mongoose from "mongoose";
import Product from "../models/product.model.js";

async function getProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    console.log(`Error in product.repository getProducts ${error.message}`);
    throw error;
  }
}

async function reserveProducts({ productIdsToCountMap }) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const unavailableProducts = [];
    const reservedProducts = [];

    await Promise.all(
      Object.entries(productIdsToCountMap).map(async ([productId, count]) => {
        if (!mongoose.isValidObjectId(productId)) {
          unavailableProducts.push({ id: productId, count });
          return;
        }
        const product = await Product.findOne({ _id: productId }, null, {
          session,
        });

        if (!product) {
          unavailableProducts.push({ id: productId, count });
          return;
        }

        const availableProductsCount = product.quantity - product.reserved;
        if (availableProductsCount < count) {
          unavailableProducts.push({
            id: productId,
            count: count - availableProductsCount,
          });
          return;
        }

        product.reserved = product.reserved + count;
        await product.save();

        const { id, manufacturer, name, price } = product;
        reservedProducts.push({ id, manufacturer, name, price, count });
      })
    );

    if (Object.keys(unavailableProducts).length) {
      await session.abortTransaction();
      return { unavailableProducts };
    }

    await session.commitTransaction();

    return { reservedProducts };
  } catch (error) {
    await session.abortTransaction();

    console.log(`Error in product.repository reserveProducts ${error.message}`);
    throw error;
  } finally {
    session.endSession();
  }
}

export default {
  getProducts,
  reserveProducts,
};
