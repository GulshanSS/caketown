import mongoose from "mongoose";
import { PincodeDoc } from "../interfaces/pincode.interface";

const PincodeSchema = new mongoose.Schema(
  {
    pincode: {
      type: Number,
      required: true,
    },
    cityName: {
      type: String,
      required: true,
    },
    deliveryOptions: {
      express: {
        charge: {
          type: Number,
          default: 0,
        },
        cashOnDelivery: {
          type: Boolean,
          default: true,
        },
        status: {
          type: Boolean,
          default: true,
        },
      },
      nextDay: {
        charge: {
          type: Number,
          default: 0,
        },
        cashOnDelivery: {
          type: Boolean,
          default: true,
        },
        status: {
          type: Boolean,
          default: true,
        },
      },
      courierDay: {
        charge: {
          type: Number,
          default: 0,
        },
        cashOnDelivery: {
          type: Boolean,
          default: true,
        },
        status: {
          type: Boolean,
          default: true,
        },
      },
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

const PincodeModel = mongoose.model<PincodeDoc>("pincode", PincodeSchema);

export default PincodeModel;
