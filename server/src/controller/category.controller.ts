import { Request, Response } from "express";
import { ICategory } from "../interfaces/category.interface";
import {
  createCategory,
  getAllCategory,
  getCategoryById,
} from "../services/category.service";
import logger from "../config/logger.config";

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
    return res.status(409).json({ message: e.message });
  }
};

export const createCategoryHandler = async (req: Request, res: Response) => {
  try {
    const createCategoryInput: ICategory = req.body;
    const category = await createCategory(createCategoryInput);
    return res.status(201).json(category);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const updateCategoryHandler = (req: Request, res: Response) => {};
export const deleCategoryHandler = (req: Request, res: Response) => {};
