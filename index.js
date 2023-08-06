import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";

const { DB_URL, DB_NAME, PORT } = process.env;
import { ERROR_MESSAGES } from "./src/config/constants.js";

import productController from "./src/controllers/product.controller.js";
import orderController from "./src/controllers/order.controller.js";

try {
  await mongoose.connect(`${DB_URL}/${DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`Connected to ${DB_NAME} DB`);
  startServer();
} catch (error) {
  console.log(error);
}

function startServer() {
  const app = express();

  app.use(bodyParser.json(), (error, req, res, next) => {
    if (error) {
      return res
        .status(400)
        .json({ error: ERROR_MESSAGES.INVALID_REQUEST_JSON });
    }
    next();
  });

  app.use("/products/", productController);
  app.use("/orders/", orderController);

  app.get("/", (req, res) => res.status(200).json({ status: "ok" }));
  app.all("*", (req, res) => res.sendStatus(404));

  app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).json({ error: ERROR_MESSAGES.SOMETHING_WENT_WRONG });
  });

  app.listen(PORT, () => {
    console.log(`Server is listening to the port ${PORT}`);
  });
}
