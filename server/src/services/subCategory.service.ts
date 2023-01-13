import { UpdateQuery } from "mongoose";
import {
  ISubCategory,
  SubCategoryDoc,
} from "../interfaces/subCategory.interface";
import SubCategoryModel from "../models/subCategory.model";
import {
  createResource,
  deleteResource,
  getAllResources,
  getResourceById,
  updateResource,
} from "../utils/service.factory";

export const getAllSubCategories = () => getAllResources(SubCategoryModel);

export const getSubCategoryById = (subCategoryId: string) =>
  getResourceById(SubCategoryModel, subCategoryId);

export const createSubCategory = (createSubCategoryInput: ISubCategory) =>
  createResource(SubCategoryModel, createSubCategoryInput);

export const updateSubCategory = (
  subCategoryId: string,
  updateSubCategoryInput: UpdateQuery<SubCategoryDoc>
) => updateResource(SubCategoryModel, updateSubCategoryInput, subCategoryId);

export const deleteSubCategory = (subCategoryId: string) =>
  deleteResource(SubCategoryModel, subCategoryId);
