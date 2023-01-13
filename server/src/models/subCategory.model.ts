import mongoose from "mongoose";
import { SubCategoryDoc } from "../interfaces/subCategory.interface";

const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    assets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "asset",
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
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

const SubCategoryModel = mongoose.model<SubCategoryDoc>(
  "subCategory",
  SubCategorySchema
);

export default SubCategoryModel;
