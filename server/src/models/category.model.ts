import mongoose from "mongoose";
import { CategoryDoc } from "../interfaces/category.interface";

const CategorySchema = new mongoose.Schema(
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
