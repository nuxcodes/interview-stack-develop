import { Router } from "express";
import db from "../prisma/db.js";

export const products = Router();

products.get("/products", (_, res) => {
  db.product
    .findMany()
    .then((products) =>
      res.status(200).json({ data: products, message: "" }).end()
    )
    .catch((e) => {
      res.status(500).json({ data: [], message: e.message || String(e) });
    });

  return;
});
