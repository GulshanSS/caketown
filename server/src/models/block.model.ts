import mongoose from "mongoose";
import { BlockDoc } from "../interfaces/block.interface";

const BlockSchema = new mongoose.Schema(
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

const BlockModel = mongoose.model<BlockDoc>("block", BlockSchema);

export default BlockModel;
