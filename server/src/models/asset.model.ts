import mongoose from "mongoose";
import IAsset from "../interfaces/asset.interface";
import ITimeStamp from "../interfaces/timestamp.interface";

export interface AssetDoc extends IAsset, ITimeStamp, mongoose.Document {}

const AssetSchema = new mongoose.Schema(
  {
    tiny: {
      cloudinaryId: String,
      cloudinaryUrl: String,
    },
    medium: {
      cloudinaryId: String,
      cloudinaryUrl: String,
    },
    large: {
      cloudinaryId: String,
      cloudinaryUrl: String,
    },
  },
  {
    timestamps: true,
  }
);

const AssetModel = mongoose.model<AssetDoc>("asset", AssetSchema);

export default AssetModel;
