import { Request, Response } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../services/category.service";
import {
  CreateCategoryInput,
  DeleteCategoryInput,
  GetCategoryInput,
  UpdateCategoryInput,
} from "../schemas/category.schema";
import IFile from "../interfaces/file.interface";
import { deleteAssets, uploadAssets } from "../utils/handleAssetPromises";
import { FOLDER_NAME } from "../config/constants.config";

export const getAllCategoriesHandler = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategories();
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
    return res.status(409).json({ message: e.message });
  }
};

export const createCategoryHandler = async (
  req: Request<{}, {}, CreateCategoryInput["body"]>,
  res: Response
) => {
  try {
    const body = req.body;
    body.assets = await uploadAssets(
      req.files as IFile[],
      [] as string[],
      FOLDER_NAME.CATEGORY,
      body.name
    );
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
    const update = req.body;
    update.assets = await uploadAssets(
      req.files as IFile[],
      oldCategory.assets as string[],
      FOLDER_NAME.CATEGORY,
      update.name
    );
    const updatedCategory = await updateCategory(categoryId, {
      ...update,
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
    await deleteAssets(category.assets as string[]);
    await deleteCategory(categoryId);
    return res
      .status(200)
      .json({ message: `${category.name} category is deleted` });
  } catch (e: any) {
    return res.status(409).json(e.message);
  }
};
