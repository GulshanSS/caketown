import mongoose from "mongoose";
import { AssetDoc } from "../interfaces/asset.interface";

const AssetSchema = new mongoose.Schema(
  {
    name: String,
    image: {
      cloudinaryId: String,
      cloudinaryUrl: String,
    },
    alt: String,
  },
  {
    timestamps: true,
  }
);

const AssetModel = mongoose.model<AssetDoc>("asset", AssetSchema);

export default AssetModel;
