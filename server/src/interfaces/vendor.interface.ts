import mongoose from "mongoose";
import ITimeStamp from "./timestamp.interface";

export interface IVendor {
  name: string;
  contact: {
    email: string;
    mobileNo: string;
    alternateNo?: string;
    whatsAppNo: string;
  };
  status?: boolean;
}

export interface VendorDoc extends IVendor, ITimeStamp, mongoose.Document {}
