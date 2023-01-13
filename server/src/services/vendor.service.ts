import { UpdateQuery } from "mongoose";
import { IVendor, VendorDoc } from "../interfaces/vendor.interface";
import VendorModel from "../models/vendor.model";
import {
  createResource,
  deleteResource,
  getAllResources,
  getResourceById,
  updateResource,
} from "../utils/service.factory";

export const getAllVendors = () => getAllResources(VendorModel);

export const getVendorById = (vendorId: string) =>
  getResourceById(VendorModel, vendorId);

export const createVendor = (createVendorInput: IVendor) =>
  createResource(VendorModel, createVendorInput);

export const updateVendor = (
  updateVendorInput: UpdateQuery<VendorDoc>,
  vendorId: string
) => updateResource(VendorModel, updateVendorInput, vendorId);

export const deleteVendor = (vendorId: string) =>
  deleteResource(VendorModel, vendorId);
