import { UpdateQuery } from "mongoose";
import { IProduct, ProductDoc } from "../interfaces/product.interface";
import ProductModel from "../models/product.model";
import {
  createResource,
  deleteResource,
  getAllResources,
  getResourceById,
  updateResource,
} from "../utils/service.factory";

export const getAllProducts = () => getAllResources(ProductModel);

export const getProductById = (productId: string) =>
  getResourceById(ProductModel, productId);

export const createProduct = (createProductInput: IProduct) =>
  createResource(ProductModel, createProductInput);

export const updateProduct = (
  updateProductInput: UpdateQuery<ProductDoc>,
  productId: string
) => updateResource(ProductModel, updateProductInput, productId);

export const deleteProduct = (productId: string) =>
  deleteResource(ProductModel, productId);
