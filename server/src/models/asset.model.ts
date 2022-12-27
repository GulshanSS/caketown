import mongoose from "mongoose";
import IAsset from "../interfaces/asset.interface";
import ITimeStamp from "../interfaces/timestamp.interface";

export interface AssetDoc extends IAsset, ITimeStamp, mongoose.Document {}

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
