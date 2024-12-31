import { addProduct } from "../controllers/productController.js";
import express from "express"

const productRouter = express.Router();

productRouter.post("/", addProduct)

export default productRouter