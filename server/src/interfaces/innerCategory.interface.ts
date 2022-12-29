import mongoose from "mongoose";
import { AssetDoc } from "./asset.interface";
import { CategoryDoc } from "./category.interface";
import { SubCategoryDoc } from "./subCategory.interface";
import ITimeStamp from "./timestamp.interface";

export interface IInnerCategory {
  name: string;
  category?: CategoryDoc["_id"];
  subCategory?: SubCategoryDoc["_id"];
  assets?: AssetDoc["_id"][];
  showInHome?: boolean;
  showInSearch?: boolean;
  status?: boolean;
}

export interface InnerCategoryDoc
  extends IInnerCategory,
    ITimeStamp,
    mongoose.Document {}
