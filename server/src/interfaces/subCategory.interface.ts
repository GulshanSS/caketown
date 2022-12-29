import mongoose from "mongoose";
import { AssetDoc } from "./asset.interface";
import { CategoryDoc } from "./category.interface";
import ITimeStamp from "./timestamp.interface";

export interface ISubCategory {
  name: string;
  assets?: AssetDoc["_id"][];
  category?: CategoryDoc["_id"];
  showInHome?: boolean;
  showInSearch?: boolean;
  status?: boolean;
}

export interface SubCategoryDoc
  extends ISubCategory,
    ITimeStamp,
    mongoose.Document {}
