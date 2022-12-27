import mongoose from "mongoose";
import ICategory from "../interfaces/asset.interface";
import ITimeStamp from "../interfaces/timestamp.interface";

export interface CategoryDoc extends ICategory, ITimeStamp, mongoose.Document {}

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    assetDetails: {
      displayAssetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "asset",
      },
      assets: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "asset",
        },
      ],
    },
    showInHome: {
      type: Boolean,
      default: true,
    },
    showInSearch: {
      type: Boolean,
      default: true,
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

const CategoryModel = mongoose.model<CategoryDoc>("category", CategorySchema);

export default CategoryModel;
