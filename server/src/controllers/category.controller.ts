import { Request, Response } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "../services/category.service";
import logger from "../config/logger.config";
import {
  CreateCategoryInput,
  DeleteCategoryInput,
  GetCategoryInput,
  UpdateCategoryInput,
} from "../schemas/category.schema";
import { deleteImage, uploadImage } from "../services/cloudinary.service";
import IFile from "../interfaces/file.interface";

export const getAllCategoryHandler = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategory();
    if (categories.length === 0) {
      return res
        .status(200)
        .json({ message: "There are no categories to display" });
    }
    return res.status(200).json({ items: categories.length, categories });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const getCategoryByIdHandler = async (
  req: Request<GetCategoryInput["params"]>,
  res: Response
) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await getCategoryById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category Not Found" });
    }
    return res.status(200).json(category);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).json({ message: e.message });
  }
};

export const createCategoryHandler = async (
  req: Request<{}, {}, CreateCategoryInput["body"]>,
  res: Response
) => {
  try {
    const body = req.body;
    const files = req.files as IFile[];
    let assets = [] as string[];
    if (typeof files !== undefined && files?.length > 0) {
      let promises: Promise<any>[] = [];
      promises = files?.map((file: IFile) =>
        uploadImage(file.path, "category", body.name)
      );
      assets = await Promise.all(promises);
      body.assets = assets;
    }
    const category = await createCategory({ ...body });
    return res.status(201).json(category);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const updateCategoryHandler = async (
  req: Request<UpdateCategoryInput["params"], {}, UpdateCategoryInput["body"]>,
  res: Response
) => {
  try {
    const categoryId = req.params.categoryId;
    const oldCategory = await getCategoryById(categoryId);
    if (!oldCategory) {
      return res.status(404).json({ message: "Category Not found" });
    }
    const files = req.files as IFile[];
    const update = req.body;
    let assets = oldCategory?.assets as string[];
    if (typeof files !== undefined && files?.length > 0) {
      let promises: Promise<any>[] = [];
      promises = files?.map((file: IFile) =>
        uploadImage(file.path, "category", update.name)
      );
      const newUploadedAssets = await Promise.all(promises);
      assets =
        typeof assets !== undefined
          ? [...assets!, ...newUploadedAssets]
          : newUploadedAssets;
    }
    const updatedCategory = await updateCategory(categoryId, {
      ...update,
      assets,
    });
    return res.status(201).json(updatedCategory);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const deleteCategoryHandler = async (
  req: Request<DeleteCategoryInput["params"]>,
  res: Response
) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await getCategoryById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const assets = category.assets || [];
    if (typeof assets?.length !== undefined && assets?.length > 0) {
      let promises: Promise<boolean>[] = [];
      promises = assets?.map((assetId: string) => deleteImage(assetId));
      await Promise.all(promises);
    }
    await deleteCategory(categoryId);
    return res
      .status(200)
      .json({ message: `${category.name} category is deleted` });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};
