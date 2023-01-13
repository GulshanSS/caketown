import mongoose from "mongoose";
import ITimeStamp from "./timestamp.interface";

export interface IAsset {
  name: string;
  image: {
    cloudinaryId: string;
    cloudinaryUrl: string;
  };
  alt: string;
}

export interface AssetDoc extends IAsset, ITimeStamp, mongoose.Document {}
