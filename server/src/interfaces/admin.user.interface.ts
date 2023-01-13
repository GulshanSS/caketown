import mongoose from "mongoose";

export interface IAdminUser {
  username: string;
  password: string;
  roles: string[];
  status?: boolean;
}

export interface AdminUserDoc extends IAdminUser, mongoose.Document {}
