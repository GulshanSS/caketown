import mongoose from "mongoose";
import { SliderDoc } from "../interfaces/slider.interface";

const SliderSchema = new mongoose.Schema(
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
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategory",
    },
    innerCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "innerCategory",
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

const SliderModel = mongoose.model<SliderDoc>("slider", SliderSchema);

export default SliderModel;
