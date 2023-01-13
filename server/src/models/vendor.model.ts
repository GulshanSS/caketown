import mongoose from "mongoose";
import { VendorDoc } from "../interfaces/vendor.interface";

const VendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      email: {
        type: String,
        required: true,
      },
      mobileNo: {
        type: String,
        required: true,
      },
      alternateNo: String,
      whatsAppNo: {
        type: String,
        required: true,
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

const VendorModel = mongoose.model<VendorDoc>("vendor", VendorSchema);

export default VendorModel;
