import mongoose from "mongoose";
import { AssetDoc } from "./asset.interface";
import { CategoryDoc } from "./category.interface";
import { InnerCategoryDoc } from "./innerCategory.interface";
import { SubCategoryDoc } from "./subCategory.interface";
import ITimeStamp from "./timestamp.interface";

export interface IBlock {
  name: string;
  category?: CategoryDoc["_id"];
  subCategory?: SubCategoryDoc["_id"];
  innerCategory?: InnerCategoryDoc["_id"];
  assets?: AssetDoc["_id"][];
  status?: boolean;
}

export interface BlockDoc extends IBlock, ITimeStamp, mongoose.Document {}
