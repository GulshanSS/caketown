import mongoose from "mongoose";
import { AddOnProductDoc } from "../interfaces/addOnProduct.interface";

const AddOnProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    addOnCategory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "addOnCategory",
      },
    ],
    assets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "asset",
      },
    ],
    bestSeller: {
      type: Boolean,
      default: false,
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

const AddOnProductModel = mongoose.model<AddOnProductDoc>(
  "addOnProduct",
  AddOnProductSchema
);

export default AddOnProductModel;
