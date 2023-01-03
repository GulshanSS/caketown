import { UpdateQuery } from "mongoose";
import {
  AddOnCategoryDoc,
  IAddOnCategory,
} from "../interfaces/addOnCategory.interface";
import AddOnCategoryModel from "../models/addOnCategory.model";

export const getAllAddOnCategory = async () => {
  try {
    return await AddOnCategoryModel.find({});
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getAddOnCategoryById = async (addOnCategoryId: string) => {
  try {
    return await AddOnCategoryModel.findOne({ _id: addOnCategoryId });
  } catch (e: any) {
    throw new Error(e);
  }
};

export const createAddOnCategory = async (
  createAddOnCategoryInput: IAddOnCategory
) => {
  try {
    return await AddOnCategoryModel.create(createAddOnCategoryInput);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const updateAddOnCategory = async (
  addOnCategoryId: string,
  updateAddOnCategoryInput: UpdateQuery<AddOnCategoryDoc>
) => {
  try {
    return await AddOnCategoryModel.findOneAndUpdate(
      {
        _id: addOnCategoryId,
      },
      updateAddOnCategoryInput,
      { new: true }
    );
  } catch (e: any) {
    throw new Error(e);
  }
};

export const deleteAddOnCategory = async (addOnCategoryId: string) => {
  try {
    await AddOnCategoryModel.deleteOne({ _id: addOnCategoryId });
    return true;
  } catch (e: any) {
    throw new Error(e);
  }
};
