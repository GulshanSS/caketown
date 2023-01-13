import mongoose from "mongoose";
import { ReviewDoc } from "../interfaces/review.interface";

const ReviewSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      default: true,
    },
    content: {
      type: String,
      default: true,
    },
    city: {
      type: String,
    },
    rating: {
      type: Number,
      default: 5,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const ReviewModel = mongoose.model<ReviewDoc>("review", ReviewSchema);

export default ReviewModel;
