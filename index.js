import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";

const { DB_URL, DB_NAME, PORT } = process.env;

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
  app.use(bodyParser.json());

  app.get("/", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.listen(PORT, () => {
    console.log(`Server is listening to the port ${PORT}`);
  });
}
