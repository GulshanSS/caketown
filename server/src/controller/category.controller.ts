import { Request, Response } from "express";
import {
  createCategory,
  getAllCategory,
  getCategoryById,
} from "../services/category.service";
import logger from "../config/logger.config";
import { CreateCategoryInput } from "../validation/category.schema";
import { uploadImage } from "../services/cloudinary.service";
import IFile from "../interfaces/file.interface";

export const getAllCategoryHandler = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategory();
    return res.status(200).json(categories);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).json({ message: e.message });
  }
};

export const getCategoryByIdHandler = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await getCategoryById(categoryId);
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
    let promises: Promise<any>[] = [];
    let assets: string[] = [];
    if (typeof files !== undefined && files?.length !== 0) {
      promises = files?.map((file: IFile) =>
        uploadImage(file.path, "category", body.name)
      );
    }
    assets = await Promise.all(promises);
    //const category = await createCategory({ ...body });
    return res.status(201).json(assets);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).json({ message: e.message });
  }
};

export const updateCategoryHandler = (req: Request, res: Response) => {};
export const deleCategoryHandler = (req: Request, res: Response) => {};
