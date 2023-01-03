import mongoose from "mongoose";
import { AddOnCategoryDoc } from "./addOnCategory.interface";
import { AssetDoc } from "./asset.interface";
import ITimeStamp from "./timestamp.interface";

export interface IAddOnProduct {
  name: string;
  description: string;
  addOnCategory?: AddOnCategoryDoc["_id"][];
  assets?: AssetDoc["_id"][];
  bestSeller?: boolean;
  status?: boolean;
}

export interface AddOnProductDoc
  extends IAddOnProduct,
    ITimeStamp,
    mongoose.Document {}
