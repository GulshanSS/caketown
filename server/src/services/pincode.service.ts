import { UpdateQuery } from "mongoose";
import { IPincode, PincodeDoc } from "../interfaces/pincode.interface";
import PincodeModel from "../models/pincode.model";
import {
  createResource,
  deleteResource,
  getAllResources,
  getResourceById,
  updateResource,
} from "../utils/service.factory";

export const getAllPincodes = () => getAllResources(PincodeModel);

export const getPincodeById = (pincodeId: string) =>
  getResourceById(PincodeModel, pincodeId);

export const createPincode = (createPincodeInput: IPincode) =>
  createResource(PincodeModel, createPincodeInput);

export const updatePincode = (
  updatePincodeInput: UpdateQuery<PincodeDoc>,
  pincodeId: string
) => updateResource(PincodeModel, updatePincodeInput, pincodeId);

export const deletePincode = (pincodeId: string) =>
  deleteResource(PincodeModel, pincodeId);
