import { UpdateQuery } from "mongoose";
import { IInnerCategory } from "../interfaces/innerCategory.interface";
import { SubCategoryDoc } from "../interfaces/subCategory.interface";
import InnerCategoryModel from "../models/innerCategory.model";
import {
  createResource,
  deleteResource,
  getAllResources,
  getResourceById,
  updateResource,
} from "../utils/service.factory";

export const getAllInnerCategories = () => getAllResources(InnerCategoryModel);

export const getInnerCategoryById = (innerCategoryId: string) =>
  getResourceById(InnerCategoryModel, innerCategoryId);

export const createInnerCategory = (createInnerCategoryInput: IInnerCategory) =>
  createResource(InnerCategoryModel, createInnerCategoryInput);

export const updateInnerCategory = (
  innerCategoryId: string,
  updateInnerCategoryInput: UpdateQuery<SubCategoryDoc>
) =>
  updateResource(InnerCategoryModel, updateInnerCategoryInput, innerCategoryId);

export const deleteInnerCategory = (innerCategoryId: string) =>
  deleteResource(InnerCategoryModel, innerCategoryId);
