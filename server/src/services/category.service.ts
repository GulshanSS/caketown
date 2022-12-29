import { UpdateQuery } from "mongoose";
import { CategoryDoc, ICategory } from "../interfaces/category.interface";
import CategoryModel from "../models/category.model";

export const getAllCategory = async () => {
  try {
    return await CategoryModel.find({});
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getCategoryById = async (categoryId: string) => {
  try {
    return await CategoryModel.findOne({ _id: categoryId });
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

export const updateCategory = async (
  categoryId: string,
  updateCategoryInput: UpdateQuery<CategoryDoc>
) => {
  try {
    return await CategoryModel.findOneAndUpdate(
      { _id: categoryId },
      updateCategoryInput,
      { new: true }
    );
  } catch (e: any) {
    throw new Error(e);
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    await CategoryModel.deleteOne({ _id: categoryId });
    return true;
  } catch (e: any) {
    throw new Error(e);
  }
};
