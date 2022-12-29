import { Request, Response } from "express";
import IFile from "../interfaces/file.interface";
import {
  CreateInnerCategoryInput,
  DeleteInnerCategoryInput,
  GetInnerCategoryInput,
  UpdateInnerCategoryInput,
} from "../schemas/innerCategory.schema";
import { deleteImage, uploadImage } from "../services/cloudinary.service";
import {
  createInnerCategory,
  deleteInnerCategory,
  getAllInnerCategory,
  getInnerCategoryById,
  updateInnerCategory,
} from "../services/innerCategory.service";

export const getAllInnerCategoryHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const innerCategories = await getAllInnerCategory();
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
    const files = req.files as IFile[];
    let assets = [] as string[];
    if (typeof files !== undefined && files.length > 0) {
      let promises: Promise<any>[] = [];
      promises = files?.map((file: IFile) =>
        uploadImage(file.path, "innerCategory", body.name)
      );
      assets = await Promise.all(promises);
      body.assets = assets;
    }
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
    const files = req.files as IFile[];
    let assets = oldInnerCategory?.assets as string[];
    if (typeof files !== undefined && files?.length > 0) {
      let promises = files?.map((file: IFile) =>
        uploadImage(file.path, "innerCategory", update.name)
      );
      const newUploadedAssets = await Promise.all(promises);
      assets =
        typeof assets !== undefined
          ? [...assets!, ...newUploadedAssets]
          : newUploadedAssets;
    }
    const updatedInnerCategory = await updateInnerCategory(innerCategoryId, {
      ...update,
      assets,
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
    const assets = innerCategory.assets || [];
    if (typeof assets.length !== undefined && assets.length > 0) {
      let promises: Promise<boolean>[] = [];
      promises = assets.map((assetId: string) => deleteImage(assetId));
      await Promise.all(promises);
    }
    await deleteInnerCategory(innerCategoryId);
    return res
      .status(200)
      .json({ message: `${innerCategory.name} inner category is deleted` });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};
