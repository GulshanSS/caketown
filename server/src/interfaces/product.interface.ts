import mongoose from "mongoose";
import { AssetDoc } from "./asset.interface";
import { CategoryDoc } from "./category.interface";
import { InnerCategoryDoc } from "./innerCategory.interface";
import { PincodeDoc } from "./pincode.interface";
import { ReviewDoc } from "./review.interface";
import { SubCategoryDoc } from "./subCategory.interface";
import ITimeStamp from "./timestamp.interface";

export interface IProduct {
  name: string;
  category?: CategoryDoc["_id"];
  subCategory?: SubCategoryDoc["_id"];
  innerCategory?: InnerCategoryDoc["_id"];
  message?: {
    onCake: boolean;
    onCard: boolean;
  };
  productMake?: {
    name: string;
    price: number;
  }[];
  flavours?: {
    name: string;
    price: number;
  }[];
  sizesAvailable: {
    size: number;
    price: {
      actual: number;
      selling: number;
    };
  }[];
  photoCake?: boolean;
  assets?: AssetDoc["_id"][];
  bestSeller?: boolean;
  deliveryOptions: {
    pincodes: PincodeDoc["_id"][];
  };
  note?: string;
  description?: string;
  reviews?: ReviewDoc["_id"][];
  rating?: number;
  status?: boolean;
}

export interface ProductDoc extends IProduct, ITimeStamp, mongoose.Document {}
