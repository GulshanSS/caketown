import { Request, Response } from "express";
import {
  CreateAddOnCategoryInput,
  DeleteAddOnCategoryInput,
  GetAddOnCategoryInput,
  UpdateAddOnCategoryInput,
} from "../schemas/addOnCategory.schema";
import {
  createAddOnCategory,
  deleteAddOnCategory,
  getAddOnCategoryById,
  getAllAddOnCategories,
  updateAddOnCategory,
} from "../services/addOnCategory.service";

export const getAllAddOnCategoriesHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const addOnCategories = await getAllAddOnCategories();
    if (addOnCategories.length === 0) {
      return res
        .status(200)
        .json({ message: "There are no AddOn Categories to display" });
    }
    return res
      .status(200)
      .json({ items: addOnCategories.length, addOnCategories });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const getAddOnCategoryByIdHandler = async (
  req: Request<GetAddOnCategoryInput["params"]>,
  res: Response
) => {
  try {
    const addOnCategoryId = req.params.addOnCategoryId;
    const addOnCategory = await getAddOnCategoryById(addOnCategoryId);
    if (!addOnCategory) {
      return res.status(404).json({ message: "AddOn Category Not Found" });
    }
    return res.status(200).json(addOnCategory);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const createAddOnCategoryHandler = async (
  req: Request<{}, {}, CreateAddOnCategoryInput["body"]>,
  res: Response
) => {
  try {
    const body = req.body;
    const addOnCategory = await createAddOnCategory({ ...body });
    return res.status(201).json(addOnCategory);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const updateAddOnCategoryHandler = async (
  req: Request<
    UpdateAddOnCategoryInput["params"],
    {},
    UpdateAddOnCategoryInput["body"]
  >,
  res: Response
) => {
  try {
    const addOnCategoryId = req.params.addOnCategoryId;
    const oldAddOnCategory = await getAddOnCategoryById(addOnCategoryId);
    if (!oldAddOnCategory) {
      return res.status(404).json({ message: "AddOn Category Not Found" });
    }
    const update = req.body;
    const updatedAddOnCategory = await updateAddOnCategory(addOnCategoryId, {
      ...update,
    });
    return res.status(201).json(updatedAddOnCategory);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const deleteAddOnCategoryHandler = async (
  req: Request<DeleteAddOnCategoryInput["params"]>,
  res: Response
) => {
  try {
    const addOnCategoryId = req.params.addOnCategoryId;
    const addOnCategory = await getAddOnCategoryById(addOnCategoryId);
    if (!addOnCategory) {
      return res.status(404).json({ message: "AddOn Category Not Found" });
    }
    await deleteAddOnCategory(addOnCategoryId);
    return res
      .status(200)
      .json({ message: `${addOnCategory.name} addOn category is deleted` });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};
