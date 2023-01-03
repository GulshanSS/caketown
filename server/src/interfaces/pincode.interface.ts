import mongoose from "mongoose";
import ITimeStamp from "./timestamp.interface";

export interface IPincode {
  pincode: number;
  cityName: string;
  deliveryOptions?: {
    express: {
      charge: number;
      cashOnDelivery: boolean;
      status: boolean;
    };
    nextDay: {
      charge: number;
      cashOnDelivery: boolean;
      status: boolean;
    };
    courierDay: {
      charge: number;
      cashOnDelivery: boolean;
      status: boolean;
    };
  };
  status?: boolean;
}

export interface PincodeDoc extends IPincode, ITimeStamp, mongoose.Document {}
