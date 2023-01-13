import { Request, Response } from "express";
import { FOLDER_NAME } from "../config/constants.config";
import IFile from "../interfaces/file.interface";
import {
  CreateProductInput,
  DeleteProductInput,
  GetProductInput,
  UpadateProductInput,
} from "../schemas/product.schema";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../services/product.service";
import { deleteAssets, uploadAssets } from "../utils/handleAssetPromises";

export const getAllProductsHandler = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    if (products.length === 0) {
      return res
        .status(200)
        .json({ message: "There are no products to display" });
    }
    return res.status(200).json({ items: products.length, products });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const getProductByIdHandler = async (
  req: Request<GetProductInput["params"]>,
  res: Response
) => {
  try {
    const productId = req.params.productId;
    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const createProductHandler = async (
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) => {
  try {
    const body = req.body;
    body.assets = await uploadAssets(
      req.files as IFile[],
      [] as string[],
      FOLDER_NAME.PRODUCT,
      body.name
    );
    const product = await createProduct({ ...body });
    return res.status(201).json(product);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const updateProductHandler = async (
  req: Request<UpadateProductInput["params"], {}, UpadateProductInput["body"]>,
  res: Response
) => {
  try {
    const productId = req.params.productId;
    const oldProduct = await getProductById(productId);
    if (!oldProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    const update = req.body;
    update.assets = await uploadAssets(
      req.files as IFile[],
      oldProduct.assets as string[],
      FOLDER_NAME.PRODUCT,
      update.name
    );
    const updatedProduct = await updateProduct({ ...update }, productId);
    return res.status(201).json(updatedProduct);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const deleteProductHandler = async (
  req: Request<DeleteProductInput["params"]>,
  res: Response
) => {
  try {
    const productId = req.params.productId;
    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await deleteAssets(product.assets as string[]);
    await deleteProduct(productId);
    return res
      .status(200)
      .json({ message: `${product.name} product is deleted` });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};
