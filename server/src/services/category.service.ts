import CategoryModel from "../models/category.model";

export const getAllCategory = async () => {
  try {
    await CategoryModel.find({});
  } catch (e: any) {
    throw new Error(e);
  }
};
