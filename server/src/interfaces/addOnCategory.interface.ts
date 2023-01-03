import mongoose from "mongoose";
import ITimeStamp from "./timestamp.interface";

export interface IAddOnCategory {
  name: string;
  status?: boolean;
}

export interface AddOnCategoryDoc
  extends IAddOnCategory,
    ITimeStamp,
    mongoose.Document {}
