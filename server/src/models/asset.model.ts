import mongoose from "mongoose";
import IAsset from "../interfaces/asset.interface";
import ITimeStamp from "../interfaces/timestamp.interface";

export interface AssetDoc extends IAsset, ITimeStamp, mongoose.Document {}

const AssetSchema = new mongoose.Schema(
  {
    thumbnail: {
      cloudinaryId: String,
      cloudinaryUrl: String,
    },
    midReso: {
      cloudinaryId: String,
      cloudinaryUrl: String,
    },
    maxReso: {
      cloudinaryId: String,
      cloudinaryUrl: String,
    },
  },
  {
    timestamps: true,
  }
);

const AssetModel = mongoose.model<AssetDoc>("asset", AssetSchema);
