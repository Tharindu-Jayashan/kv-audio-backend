import { addProduct, deleteProduct, getProducts } from "../controllers/productController.js";
import express from "express"

const productRouter = express.Router();

productRouter.post("/", addProduct)

productRouter.get("/", getProducts)

productRouter.delete("/:id", deleteProduct)

export default productRouter     