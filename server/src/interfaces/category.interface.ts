import mongoose from "mongoose";
import { AssetDoc } from "./asset.interface";
import ITimeStamp from "./timestamp.interface";

export interface ICategory {
  name: string;
  assets?: AssetDoc["_id"][];
  showInHome?: boolean;
  showInSearch?: boolean;
  status?: boolean;
}

export interface CategoryDoc extends ICategory, ITimeStamp, mongoose.Document {}
