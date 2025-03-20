import express from "express";
import { registerUser, getAllUsers, loginUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", registerUser);

// userRouter.get("/", getAllUsers);

userRouter.post("/login", loginUser);

userRouter.get("/all", getAllUsers);

export default userRouter;
