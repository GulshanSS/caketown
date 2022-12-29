import { UpdateQuery } from "mongoose";
import { IInnerCategory } from "../interfaces/innerCategory.interface";
import { SubCategoryDoc } from "../interfaces/subCategory.interface";
import InnerCategoryModel from "../models/innerCategory.model";

export const getAllInnerCategory = async () => {
  try {
    return await InnerCategoryModel.find({});
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getInnerCategoryById = async (innerCategoryId: string) => {
  try {
    return await InnerCategoryModel.findOne({ _id: innerCategoryId });
  } catch (e: any) {
    throw new Error(e);
  }
};

export const createInnerCategory = async (
  createInnerCategoryInput: IInnerCategory
) => {
  try {
    return await InnerCategoryModel.create(createInnerCategoryInput);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const updateInnerCategory = async (
  innerCategoryId: string,
  updateInnerCategoryInput: UpdateQuery<SubCategoryDoc>
) => {
  try {
    return await InnerCategoryModel.findOneAndUpdate(
      { _id: innerCategoryId },
      updateInnerCategoryInput,
      { new: true }
    );
  } catch (e: any) {
    throw new Error(e);
  }
};

export const deleteInnerCategory = async (innerCategoryId: string) => {
  try {
    await InnerCategoryModel.deleteOne({ _id: innerCategoryId });
  } catch (e: any) {
    throw new Error(e);
  }
};
