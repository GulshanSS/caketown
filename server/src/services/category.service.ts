import { UpdateQuery } from "mongoose";
import { CategoryDoc, ICategory } from "../interfaces/category.interface";
import CategoryModel from "../models/category.model";
import {
  createResource,
  deleteResource,
  getAllResources,
  getResourceById,
  updateResource,
} from "../utils/service.factory";

export const getAllCategory = () => getAllResources(CategoryModel);

export const getCategoryById = (categoryId: string) =>
  getResourceById(CategoryModel, categoryId);

export const createCategory = (createCategoryInput: ICategory) =>
  createResource(CategoryModel, createCategoryInput);

export const updateCategory = (
  categoryId: string,
  updateCategoryInput: UpdateQuery<CategoryDoc>
) => updateResource(CategoryModel, updateCategoryInput, categoryId);

export const deleteCategory = (categoryId: string) =>
  deleteResource(CategoryModel, categoryId);
