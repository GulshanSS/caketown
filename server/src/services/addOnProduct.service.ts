import { UpdateQuery } from "mongoose";
import {
  AddOnProductDoc,
  IAddOnProduct,
} from "../interfaces/addOnProduct.interface";
import AddOnProductModel from "../models/addOnProduct.model";

export const getAllAddOnProduct = async () => {
  try {
    return await AddOnProductModel.find({});
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getAddOnProductById = async (addOnProductId: string) => {
  try {
    return await AddOnProductModel.findOne({ _id: addOnProductId });
  } catch (e: any) {
    throw new Error(e);
  }
};

export const createAddOnProduct = async (
  createAddOnProductInput: IAddOnProduct
) => {
  try {
    return await AddOnProductModel.create(createAddOnProductInput);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const updateAddOnProduct = async (
  addOnProductId: string,
  updateAddOnProductInput: UpdateQuery<AddOnProductDoc>
) => {
  try {
    return await AddOnProductModel.findOneAndUpdate(
      { _id: addOnProductId },
      updateAddOnProductInput,
      { new: true }
    );
  } catch (e: any) {
    throw new Error(e);
  }
};

export const deleteAddOnProduct = async (addOnProductId: string) => {
  try {
    await AddOnProductModel.deleteOne({ _id: addOnProductId });
  } catch (e: any) {
    throw new Error(e);
  }
};
