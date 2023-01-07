import { Request, Response } from "express";
import { FOLDER_NAME } from "../config/constants.config";
import IFile from "../interfaces/file.interface";
import {
  CreateInnerCategoryInput,
  DeleteInnerCategoryInput,
  GetInnerCategoryInput,
  UpdateInnerCategoryInput,
} from "../schemas/innerCategory.schema";
import {
  createInnerCategory,
  deleteInnerCategory,
  getAllInnerCategories,
  getInnerCategoryById,
  updateInnerCategory,
} from "../services/innerCategory.service";
import { deleteAssets, uploadAssets } from "../utils/handleAssetPromises";

export const getAllInnerCategoriesHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const innerCategories = await getAllInnerCategories();
    if (innerCategories.length === 0) {
      return res
        .status(200)
        .json({ message: "There are no inner categories to display" });
    }
    return res
      .status(200)
      .json({ items: innerCategories.length, innerCategories });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const getInnerCategoryByIdHandler = async (
  req: Request<GetInnerCategoryInput["params"]>,
  res: Response
) => {
  try {
    const innerCategoryId = req.params.innerCategoryId;
    const innerCategory = await getInnerCategoryById(innerCategoryId);
    if (!innerCategory) {
      return res.status(404).json({ message: "Inner Category Not Found" });
    }
    return res.status(200).json(innerCategory);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const createInnerCategoryHandler = async (
  req: Request<{}, {}, CreateInnerCategoryInput["body"]>,
  res: Response
) => {
  try {
    const body = req.body;
    body.assets = await uploadAssets(
      req.files as IFile[],
      [] as string[],
      FOLDER_NAME.INNER_CATEGORY,
      body.name
    );
    const innerCategory = await createInnerCategory({ ...body });
    return res.status(201).json(innerCategory);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const updateInnerCategoryHandler = async (
  req: Request<
    UpdateInnerCategoryInput["params"],
    {},
    UpdateInnerCategoryInput["body"]
  >,
  res: Response
) => {
  try {
    const innerCategoryId = req.params.innerCategoryId;
    const oldInnerCategory = await getInnerCategoryById(innerCategoryId);
    if (!oldInnerCategory) {
      return res.status(404).json({ message: "Inner Category Not Found" });
    }
    const update = req.body;
    update.assets = await uploadAssets(
      req.files as IFile[],
      oldInnerCategory.assets as string[],
      FOLDER_NAME.INNER_CATEGORY,
      update.name
    );
    const updatedInnerCategory = await updateInnerCategory(innerCategoryId, {
      ...update,
    });
    return res.status(201).json(updatedInnerCategory);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const deleteInnerCategoryHandler = async (
  req: Request<DeleteInnerCategoryInput["params"]>,
  res: Response
) => {
  try {
    const innerCategoryId = req.params.innerCategoryId;
    const innerCategory = await getInnerCategoryById(innerCategoryId);
    if (!innerCategory) {
      return res.status(404).json({ message: "Inner Category Not Found" });
    }
    await deleteAssets(innerCategory.assets as string[]);
    await deleteInnerCategory(innerCategoryId);
    return res
      .status(200)
      .json({ message: `${innerCategory.name} inner category is deleted` });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};
