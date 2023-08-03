import { app } from "../index.js";
import request from "supertest";

describe("GET /products", () => {
  test("should return a list of products with status 200", async () => {
    const response = await request(app).get("/products");
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    console.log(response.body.data);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
