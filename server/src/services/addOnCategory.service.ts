import { UpdateQuery } from "mongoose";
import {
  AddOnCategoryDoc,
  IAddOnCategory,
} from "../interfaces/addOnCategory.interface";
import AddOnCategoryModel from "../models/addOnCategory.model";
import {
  createResource,
  deleteResource,
  getAllResources,
  getResourceById,
  updateResource,
} from "../utils/service.factory";

export const getAllAddOnCategories = () => getAllResources(AddOnCategoryModel);

export const getAddOnCategoryById = (addOnCategoryId: string) =>
  getResourceById(AddOnCategoryModel, addOnCategoryId);

export const createAddOnCategory = (createAddOnCategoryInput: IAddOnCategory) =>
  createResource(AddOnCategoryModel, createAddOnCategoryInput);

export const updateAddOnCategory = (
  addOnCategoryId: string,
  updateAddOnCategoryInput: UpdateQuery<AddOnCategoryDoc>
) =>
  updateResource(AddOnCategoryModel, updateAddOnCategoryInput, addOnCategoryId);

export const deleteAddOnCategory = (addOnCategoryId: string) =>
  deleteResource(AddOnCategoryModel, addOnCategoryId);
