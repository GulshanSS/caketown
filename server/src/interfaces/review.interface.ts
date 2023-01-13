import mongoose from "mongoose";
import ITimeStamp from "./timestamp.interface";

export interface IReview {
  username: string;
  content?: string;
  city?: string;
  rating?: number;
  status?: boolean;
}

export interface ReviewDoc extends IReview, ITimeStamp, mongoose.Document {}
