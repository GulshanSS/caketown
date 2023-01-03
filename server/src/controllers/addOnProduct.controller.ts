import { Request, Response } from "express";
import { FOLDER_NAME } from "../config/constants.config";
import IFile from "../interfaces/file.interface";
import {
  CreateAddOnProductInput,
  DeleteAddOnProductInput,
  GetAddOnProductInput,
  UpdateAddOnProductInput,
} from "../schemas/addOnProduct.schema";
import {
  createAddOnProduct,
  deleteAddOnProduct,
  getAddOnProductById,
  getAllAddOnProduct,
  updateAddOnProduct,
} from "../services/addOnProduct.service";
import { deleteAssets, uploadAssets } from "../utils/handleAssetPromises";

export const getAllAddOnProductHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const addOnProducts = await getAllAddOnProduct();
    if (addOnProducts.length === 0) {
      return res
        .status(200)
        .json({ message: "There are no AddOn Products to display" });
    }
    return res.status(200).json({ items: addOnProducts.length, addOnProducts });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const getAddOnProductHandler = async (
  req: Request<GetAddOnProductInput["params"]>,
  res: Response
) => {
  try {
    const addOnProductId = req.params.addOnProductId;
    const addOnProduct = await getAddOnProductById(addOnProductId);
    if (!addOnProduct) {
      return res.status(404).json({ message: "AddOn Product Not Found" });
    }
    return res.status(200).json(addOnProduct);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const createAddOnProductHandler = async (
  req: Request<{}, {}, CreateAddOnProductInput["body"]>,
  res: Response
) => {
  try {
    const body = req.body;
    body.assets = await uploadAssets(
      req.files as IFile[],
      [] as string[],
      FOLDER_NAME.ADD_ON_PRODUCT,
      body.name
    );
    const addOnProduct = await createAddOnProduct({ ...body });
    return res.status(201).json(addOnProduct);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const updateAddOnProductHandler = async (
  req: Request<
    UpdateAddOnProductInput["params"],
    {},
    UpdateAddOnProductInput["body"]
  >,
  res: Response
) => {
  try {
    const addOnProductId = req.params.addOnProductId;
    const oldAddOnProduct = await getAddOnProductById(addOnProductId);
    if (!oldAddOnProduct) {
      return res.status(404).json({ message: "AddOn Product Not Found" });
    }
    const update = req.body;
    update.assets = await uploadAssets(
      req.files as IFile[],
      update.assets as string[],
      FOLDER_NAME.ADD_ON_PRODUCT,
      update.name
    );
    const updatedAddOnProduct = await updateAddOnProduct(addOnProductId, {
      ...update,
    });
    return res.status(201).json(updatedAddOnProduct);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const deleteAddOnProductHandler = async (
  req: Request<DeleteAddOnProductInput["params"]>,
  res: Response
) => {
  try {
    const addOnProductId = req.params.addOnProductId;
    const addOnProduct = await getAddOnProductById(addOnProductId);
    if (!addOnProduct) {
      return res.status(404).json("AddOn Product Not Found");
    }
    await deleteAssets(addOnProduct.assets as string[]);
    await deleteAddOnProduct(addOnProductId);
    return res
      .status(200)
      .json({ message: `${addOnProduct.name} addOn product is deleted` });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};
