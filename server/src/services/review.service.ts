import { UpdateQuery } from "mongoose";
import { IReview, ReviewDoc } from "../interfaces/review.interface";
import ReviewModel from "../models/review.model";
import {
  createResource,
  deleteResource,
  getAllResources,
  getResourceById,
  updateResource,
} from "../utils/service.factory";

export const getAllReviews = () => getAllResources(ReviewModel);

export const getReviewById = (reviewId: string) =>
  getResourceById(ReviewModel, reviewId);

export const createReview = (createReviewInput: IReview) =>
  createResource(ReviewModel, createReviewInput);

export const updateReview = (
  updateReviewInput: UpdateQuery<ReviewDoc>,
  reviewId: string
) => updateResource(ReviewModel, updateReviewInput, reviewId);

export const deleteReview = (reviewId: string) =>
  deleteResource(ReviewModel, reviewId);
