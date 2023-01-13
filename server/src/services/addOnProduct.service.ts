import { UpdateQuery } from "mongoose";
import {
  AddOnProductDoc,
  IAddOnProduct,
} from "../interfaces/addOnProduct.interface";
import AddOnProductModel from "../models/addOnProduct.model";
import {
  createResource,
  deleteResource,
  getAllResources,
  getResourceById,
  updateResource,
} from "../utils/service.factory";

export const getAllAddOnProducts = () => getAllResources(AddOnProductModel);

export const getAddOnProductById = (addOnProductId: string) =>
  getResourceById(AddOnProductModel, addOnProductId);

export const createAddOnProduct = (createAddOnProductInput: IAddOnProduct) =>
  createResource(AddOnProductModel, createAddOnProductInput);

export const updateAddOnProduct = (
  addOnProductId: string,
  updateAddOnProductInput: UpdateQuery<AddOnProductDoc>
) => updateResource(AddOnProductModel, updateAddOnProductInput, addOnProductId);

export const deleteAddOnProduct = (addOnProductId: string) =>
  deleteResource(AddOnProductModel, addOnProductId);
