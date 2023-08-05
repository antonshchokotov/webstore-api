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

export default {
  getProducts,
};
