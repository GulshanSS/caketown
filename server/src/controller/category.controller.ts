import { Request, Response } from "express";
import { getAllCategory } from "../services/category.service";
import logger from "../utils/logger";

export const getAllCategoryHandler = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategory();
    return res.status(200).json(categories);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).json({ message: e.message });
  }
};
export const getCategoryByIdHandler = (req: Request, res: Response) => {};
export const createCategoryHandler = (req: Request, res: Response) => {};
export const updateCategoryHandler = (req: Request, res: Response) => {};
export const deleCategoryHandler = (req: Request, res: Response) => {};
