import { Model, UpdateQuery } from "mongoose";

export const getAllResources = async (model: Model<any>) => {
  try {
    return await model.find({});
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getResourceById = async (model: Model<any>, id: string) => {
  try {
    return await model.findOne({ _id: id });
  } catch (e: any) {
    throw new Error(e);
  }
};

export const createResource = async (model: Model<any>, data: any) => {
  try {
    return await model.create(data);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const updateResource = async (
  model: Model<any>,
  data: UpdateQuery<any>,
  id: string
) => {
  try {
    return await model.findOneAndUpdate({ _id: id }, data, { new: true });
  } catch (e: any) {
    throw new Error(e);
  }
};

export const deleteResource = async (model: Model<any>, id: string) => {
  try {
    await model.deleteOne({ _id: id });
    return true;
  } catch (e: any) {
    throw new Error(e);
  }
};
