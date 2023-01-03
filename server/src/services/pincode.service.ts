import { UpdateQuery } from "mongoose";
import { IPincode, PincodeDoc } from "../interfaces/pincode.interface";
import PincodeModel from "../models/pincode.model";

export const getAllPincodes = async () => {
  try {
    return await PincodeModel.find({});
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getPincodeById = async (pincodeId: string) => {
  try {
    return await PincodeModel.findOne({ _id: pincodeId });
  } catch (e: any) {
    throw new Error(e);
  }
};

export const createPincode = async (createPincodeInput: IPincode) => {
  try {
    return await PincodeModel.create(createPincodeInput);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const updatePincode = async (
  updatePincodeInput: UpdateQuery<PincodeDoc>,
  pincodeId: string
) => {
  try {
    return await PincodeModel.findOneAndUpdate(
      { _id: pincodeId },
      updatePincodeInput,
      { new: true }
    );
  } catch (e: any) {
    throw new Error(e);
  }
};

export const deletePincode = async (pincodeId: string) => {
  try {
    await PincodeModel.deleteOne({ _id: pincodeId });
    return true;
  } catch (e: any) {
    throw new Error(e);
  }
};
