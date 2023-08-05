import express from "express";
import wrap from "express-async-wrapper";

import productService from "../services/product.service.js";

const router = express.Router();

router.get(
  "/",
  wrap(async (req, res) => {
    const products = await productService.getAvailableProducts();

    res.json(products);
  })
);

export default router;
