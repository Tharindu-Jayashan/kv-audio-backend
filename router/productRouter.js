import { addProduct, deleteProduct } from "../controllers/productController.js";
import express from "express"

const productRouter = express.Router();

productRouter.post("/", addProduct)

productRouter.delete("/:id", deleteProduct)

export default productRouter