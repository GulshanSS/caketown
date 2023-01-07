import { UpdateQuery } from "mongoose";
import { AdminUserDoc, IAdminUser } from "../interfaces/admin.user.interface";
import AdminUserModel from "../models/admin.user.model";
import {
  createResource,
  deleteResource,
  getAllResources,
  getResource,
  getResourceById,
  updateResource,
} from "../utils/service.factory";

export const getAllAdminUsers = () => getAllResources(AdminUserModel);

export const getAdminUserById = (adminUserId: string) =>
  getResourceById(AdminUserModel, adminUserId);

export const getAdminUser = (filter: any) =>
  getResource(AdminUserModel, filter);

export const createAdminUser = (createAdminUserInput: IAdminUser) =>
  createResource(AdminUserModel, createAdminUserInput);

export const updateAdminUser = (
  updateAdminUserInput: UpdateQuery<AdminUserDoc>,
  adminUserId: string
) => updateResource(AdminUserModel, updateAdminUserInput, adminUserId);

export const deleteAdminUser = (adminUserId: string) =>
  deleteResource(AdminUserModel, adminUserId);
