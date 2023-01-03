import mongoose from "mongoose";
import { AddOnCategoryDoc } from "../interfaces/addOnCategory.interface";

const AddOnCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

const AddOnCategoryModel = mongoose.model<AddOnCategoryDoc>(
  "addOnCategory",
  AddOnCategorySchema
);

export default AddOnCategoryModel;
