import { Request, Response } from "express";
import { FOLDER_NAME } from "../config/constants.config";
import IFile from "../interfaces/file.interface";
import {
  CreateSubCategoryInput,
  DeleteSubCategoryInput,
  GetSubCategoryInput,
  UpdateSubCategoryInput,
} from "../schemas/subCategory.schema";
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
} from "../services/subCategory.service";
import { deleteAssets, uploadAssets } from "../utils/handleAssetPromises";

export const getAllSubCategoriesHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const subCategories = await getAllSubCategories();
    if (subCategories.length === 0) {
      return res
        .status(200)
        .json({ message: "There are no sub categories to display" });
    }
    return res.status(200).json({
      items: subCategories.length,
      subCategories,
    });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const getSubCategoryByIdHandler = async (
  req: Request<GetSubCategoryInput["params"]>,
  res: Response
) => {
  try {
    const subCategoryId = req.params.subCategoryId;
    const subCategory = await getSubCategoryById(subCategoryId);
    if (!subCategory) {
      return res.status(404).json({ message: "Sub Category Not Found" });
    }
    return res.status(200).json(subCategory);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const createSubCategoryHandler = async (
  req: Request<{}, {}, CreateSubCategoryInput["body"]>,
  res: Response
) => {
  try {
    const body = req.body;
    body.assets = await uploadAssets(
      req.files as IFile[],
      [] as string[],
      FOLDER_NAME.SUB_CATEGORY,
      body.name
    );
    const subCategory = await createSubCategory({ ...body });
    return res.status(201).json(subCategory);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const updateSubCategoryHandler = async (
  req: Request<
    UpdateSubCategoryInput["params"],
    {},
    UpdateSubCategoryInput["body"]
  >,
  res: Response
) => {
  try {
    const subCategoryId = req.params.subCategoryId;
    const oldSubCategory = await getSubCategoryById(subCategoryId);
    if (!oldSubCategory) {
      return res.status(404).json({ message: "Sub Category Not Found" });
    }
    const update = req.body;
    update.assets = await uploadAssets(
      req.files as IFile[],
      oldSubCategory.assets as string[],
      FOLDER_NAME.SUB_CATEGORY,
      update.name
    );
    const updatedSubCategory = await updateSubCategory(subCategoryId, {
      ...update,
    });
    return res.status(201).json(updatedSubCategory);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const deleteSubCategoryHandler = async (
  req: Request<DeleteSubCategoryInput["params"]>,
  res: Response
) => {
  try {
    const subCategoryId = req.params.subCategoryId;
    const subCategory = await getSubCategoryById(subCategoryId);
    if (!subCategory) {
      return res.status(404).json({ message: "Sub Category Not Found" });
    }
    await deleteAssets(subCategory.assets as string[]);
    await deleteSubCategory(subCategoryId);
    return res
      .status(200)
      .json({ message: `${subCategory.name} sub category is deleted` });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};
