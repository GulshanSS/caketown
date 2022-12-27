import { ICategory } from "../interfaces/category.interface";
import CategoryModel from "../models/category.model";
import logger from "../utils/logger";

export const getAllCategory = async () => {
  try {
    return await CategoryModel.find({});
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getCategoryById = async (categoryId: string) => {
  try {
    return await CategoryModel.findById(categoryId);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const createCategory = async (createCategoryInput: ICategory) => {
  try {
    return await CategoryModel.create(createCategoryInput);
  } catch (e: any) {
    throw new Error(e);
  }
};
