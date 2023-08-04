import express from "express";
import dotenv from "dotenv";
import { products } from "./routes/products.js";

export const app = express();
app.use(express.json());
dotenv.config();
const port = 5002;

app.use("/api/products", products);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log("Now listening on port " + port);
  });
}
