import express from "express";
import {
  createReviewHandler,
  deleteReviewHandler,
  getAllReviewsHandler,
  getReviewByIdHandler,
  updateReviewHandler,
} from "../controllers/review.controller";
import validateResource from "../middlewares/validateResource";
import {
  createReviewSchema,
  deleteReviewSchema,
  getReviewSchema,
  updateReviewSchema,
} from "../schemas/review.schema";

const ReviewRouter = express.Router();

ReviewRouter.get("/", getAllReviewsHandler);

ReviewRouter.get(
  "/:reviewId",
  validateResource(getReviewSchema),
  getReviewByIdHandler
);

ReviewRouter.post(
  "/create",
  validateResource(createReviewSchema),
  createReviewHandler
);

ReviewRouter.put(
  "/:reviewId/update",
  validateResource(updateReviewSchema),
  updateReviewHandler
);

ReviewRouter.delete(
  "/:reviewId/delete",
  validateResource(deleteReviewSchema),
  deleteReviewHandler
);

export default ReviewRouter;
