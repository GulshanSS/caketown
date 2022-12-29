import mongoose, { mongo } from "mongoose";
import { InnerCategoryDoc } from "../interfaces/innerCategory.interface";

const InnerCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategory",
    },
    assets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "asset",
      },
    ],
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

const InnerCategoryModel = mongoose.model<InnerCategoryDoc>(
  "innerCategory",
  InnerCategorySchema
);

export default InnerCategoryModel;
