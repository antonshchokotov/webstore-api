import productRepository from "../repositories/product.repository.js";

async function getAvailableProducts() {
  try {
    const allProducts = await productRepository.getProducts();

    const availableProducts = allProducts.reduce((acc, product) => {
      const { id, manufacturer, name, quantity, reserved } = product;

      const availableCount = quantity - reserved;
      if (availableCount > 0) {
        acc.push({
          id,
          manufacturer,
          name,
          quantity: availableCount,
        });
      }

      return acc;
    }, []);

    return availableProducts;
  } catch (error) {
    console.log(
      `Error in product.service getAvailableProducts ${error.message}`
    );
    throw error;
  }
}

export default {
  getAvailableProducts,
};
