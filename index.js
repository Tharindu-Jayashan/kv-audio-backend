import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRouter from "./router/userRouter.js";
import productRouter from "./router/productRouter.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import reviewRouter from "./router/reviewRouter.js";
import inquiryRouter from "./router/inquiryRouter.js";

import cors from "cors";

dotenv.config();


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req,res,next)=>{

    let token = req.header
    ("Authorization");

    if (token!=null){
        token = token.replace("Bearer ","");
    

        jwt.verify(token, process.env.JWT_SECRET, 
        (err, decoded) => {

            if(!err){
                req.user = decoded  // The token we have decoded, store in req.user : we can check this in controller
            }
        })
    }

    next();
})

const mongoUrl = process.env.MONGO_URL

mongoose.connect(mongoUrl)

const connection =  mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
})

app.use("/api/users",userRouter)
app.use("/api/products",productRouter)
app.use("/api/reviews",reviewRouter)
app.use("/api/inquiries",inquiryRouter)

app.listen(3000, () => {
    console.log("Server is running on port: 3000");
})