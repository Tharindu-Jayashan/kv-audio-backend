import { addProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productController.js";
import express from "express"

const productRouter = express.Router();

productRouter.post("/", addProduct)

productRouter.get("/", getProducts)

productRouter.delete("/:key", deleteProduct)

productRouter.put("/:key", updateProduct)

export default productRouter     