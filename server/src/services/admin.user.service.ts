import { UpdateQuery } from "mongoose";
import { AdminUserDoc, IAdminUser } from "../interfaces/admin.user.interface";
import AdminUserModel from "../models/admin.user.model";

export const getAllAdminUsers = async () => {
  try {
    return await AdminUserModel.find({});
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getAdminUserById = async (adminUserId: string) => {
  try {
    return await AdminUserModel.findOne({ _id: adminUserId });
  } catch (e: any) {
    throw new Error(e);
  }
};

export const createAdminUser = async (createAdminUserInput: IAdminUser) => {
  try {
    return await AdminUserModel.create(createAdminUserInput);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const updateAdminUser = async (
  updateAdminUserInput: UpdateQuery<AdminUserDoc>,
  adminUserId: string
) => {
  try {
    return await AdminUserModel.findOneAndUpdate(
      { _id: adminUserId },
      updateAdminUserInput,
      { new: true }
    );
  } catch (e: any) {
    throw new Error(e);
  }
};

export const deleteAdminUser = async (adminUserId: string) => {
  try {
    await AdminUserModel.deleteOne({ _id: adminUserId });
    return true;
  } catch (e: any) {
    throw new Error(e);
  }
};
