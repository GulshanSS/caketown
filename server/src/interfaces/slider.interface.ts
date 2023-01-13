import mongoose from "mongoose";
import { AssetDoc } from "./asset.interface";
import { CategoryDoc } from "./category.interface";
import { InnerCategoryDoc } from "./innerCategory.interface";
import { SubCategoryDoc } from "./subCategory.interface";

export interface ISlider {
  name: string;
  assets?: AssetDoc["_id"][];
  category?: CategoryDoc["_id"];
  subCategory?: SubCategoryDoc["_id"];
  innerCategory?: InnerCategoryDoc["_id"];
  status?: boolean;
}

export interface SliderDoc extends ISlider, mongoose.Document {}
