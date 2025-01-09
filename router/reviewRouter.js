import express from "express";
import { addReview, deleteReview, getReviews, approveReview } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", addReview)

reviewRouter.get("/", getReviews)

reviewRouter.delete("/:email", deleteReview)

reviewRouter.put("/approve/:email", approveReview)

export default reviewRouter;