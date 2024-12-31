import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRouter from "./router/userRouter.js";
import productRouter from "./router/productRouter.js";
import jwt from "jsonwebtoken"


const app = express();
app.use(bodyParser.json());



const mongoUrl = "mongodb+srv://user:user123@cluster0.hglbk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl)

const connection =  mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
})

app.use("/api/users",userRouter)
app.use("/api/products",productRouter)

app.listen(3000, () => {
    console.log("Server is running on port: 3000");
})