import { UpdateQuery } from "mongoose";
import {
  ISubCategory,
  SubCategoryDoc,
} from "../interfaces/subCategory.interface";
import SubCategoryModel from "../models/subCategory.model";

export const getAllSubCategory = async () => {
  try {
    return await SubCategoryModel.find({});
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getSubCategoryById = async (subCategoryId: string) => {
  try {
    return await SubCategoryModel.findOne({ _id: subCategoryId });
  } catch (e: any) {
    throw new Error(e);
  }
};

export const createSubCategory = async (
  createSubCategoryInput: ISubCategory
) => {
  try {
    return await SubCategoryModel.create(createSubCategoryInput);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const updateSubCategory = async (
  subCategoryId: string,
  updateSubCategoryInput: UpdateQuery<SubCategoryDoc>
) => {
  try {
    return await SubCategoryModel.findOneAndUpdate(
      { _id: subCategoryId },
      updateSubCategoryInput,
      { new: true }
    );
  } catch (e: any) {
    throw new Error(e);
  }
};

export const deleteSubCategory = async (subCategoryId: string) => {
  try {
    await SubCategoryModel.deleteOne({ _id: subCategoryId });
    return true;
  } catch (e: any) {
    throw new Error(e);
  }
};
