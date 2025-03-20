import express from "express";
import { registerUser, getAllUsers, loginUser, blockOrUnblockUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", registerUser);

// userRouter.get("/", getAllUsers);

userRouter.post("/login", loginUser);

userRouter.get("/all", getAllUsers);

userRouter.put("/block/:email",blockOrUnblockUser);

export default userRouter;
