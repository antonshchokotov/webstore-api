import express from "express";
import wrap from "express-async-wrapper";

import { ERROR_MESSAGES, REGEX } from "../config/constants.js";

import orderService from "../services/order.service.js";

const router = express.Router();

router.post(
  "/",
  wrap(async (req, res) => {
    const { products, customerName, customerEmail, deliveryAddress } = req.body;

    if (
      !products ||
      !Object.keys(products).length ||
      Object.values(products).some((val) => parseInt(val) !== val || val <= 0)
    ) {
      return res
        .status(400)
        .json({ error: ERROR_MESSAGES.INVALID_PRODUCTS_REQUESTED });
    }

    if (!customerName) {
      return res
        .status(400)
        .json({ error: ERROR_MESSAGES.CUSTOMER_NAME_REQUIRED });
    }

    if (!customerEmail) {
      return res
        .status(400)
        .json({ error: ERROR_MESSAGES.CUSTOMER_EMAIL_REQUIRED });
    }

    if (!REGEX.EMAIL.test(customerEmail)) {
      return res
        .status(400)
        .json({ error: ERROR_MESSAGES.INVALID_CUSTOMER_EMAIL });
    }

    if (!deliveryAddress) {
      return res
        .status(400)
        .json({ error: ERROR_MESSAGES.DELIVERY_ADDRESS_REQUIRED });
    }

    const result = await orderService.createOrder({
      products,
      customerName,
      customerEmail,
      deliveryAddress,
    });

    res.json(result);
  })
);

export default router;
