import mongoose from "mongoose";

export interface IAdminUser {
  username: string;
  password: string;
  role: string;
  status?: boolean;
}

export interface AdminUserDoc extends IAdminUser, mongoose.Document {}
