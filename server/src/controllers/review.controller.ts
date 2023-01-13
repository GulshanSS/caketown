import { Request, Response } from "express";
import {
  CreateReviewInput,
  DeleteReviewInput,
  GetReviewInput,
  UpdateReviewInput,
} from "../schemas/review.schema";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview,
} from "../services/review.service";

export const getAllReviewsHandler = async (req: Request, res: Response) => {
  try {
    const reviews = await getAllReviews();
    if (reviews.length === 0) {
      return res.status(200).json("There are no reviews available to display");
    }
    return res.status(200).json({ items: reviews.length, reviews });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const getReviewByIdHandler = async (
  req: Request<GetReviewInput["params"]>,
  res: Response
) => {
  try {
    const reviewId = req.params.reviewId;
    const review = await getReviewById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    return res.status(200).json(review);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const createReviewHandler = async (
  req: Request<{}, {}, CreateReviewInput["body"]>,
  res: Response
) => {
  try {
    const body = req.body;
    const review = await createReview({ ...body });
    return res.status(201).json(review);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const updateReviewHandler = async (
  req: Request<UpdateReviewInput["params"], {}, UpdateReviewInput["body"]>,
  res: Response
) => {
  try {
    const reviewId = req.params.reviewId;
    const review = await getReviewById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    const update = req.body;
    const updatedReview = await updateReview({ ...update }, reviewId);
    return res.status(201).json(updatedReview);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const deleteReviewHandler = async (
  req: Request<DeleteReviewInput["params"]>,
  res: Response
) => {
  try {
    const reviewId = req.params.reviewId;
    const review = await getReviewById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    await deleteReview(reviewId);
    return res
      .status(200)
      .json({ message: `${review.username}'s review got deleted` });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};
