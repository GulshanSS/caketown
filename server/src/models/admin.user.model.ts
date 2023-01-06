import mongoose from "mongoose";
import { IAdminUser } from "../interfaces/admin.user.interface";

const AdminUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: ["admin", "worker"],
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

const AdminUserModel = mongoose.model<IAdminUser>("adminUser", AdminUserSchema);

export default AdminUserModel;
