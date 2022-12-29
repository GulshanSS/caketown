import { Request, Response } from "express";
import IFile from "../interfaces/file.interface";
import {
  CreateSubCategoryInput,
  DeleteSubCategoryInput,
  UpdateSubCategoryInput,
} from "../schemas/subCategory.schema";
import { deleteImage, uploadImage } from "../services/cloudinary.service";
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategory,
  getSubCategoryById,
  updateSubCategory,
} from "../services/subCategory.service";

export const getAllSubCategoryHandler = async (req: Request, res: Response) => {
  try {
    const subCategories = await getAllSubCategory();
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
  req: Request,
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
    const files = req.files as IFile[];
    let assets = [] as string[];
    if (typeof files !== undefined && files?.length > 0) {
      let promises: Promise<any>[] = [];
      promises = files?.map((file: IFile) =>
        uploadImage(file.path, "subCategory", body.name)
      );
      assets = await Promise.all(promises);
      body.assets = assets;
    }
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
    const files = req.files as IFile[];
    const update = req.body;
    let assets = oldSubCategory?.assets as string[];
    if (typeof files !== undefined && files?.length > 0) {
      let promises: Promise<any>[] = [];
      promises = files?.map((file: IFile) =>
        uploadImage(file.path, "subCategory", update.name)
      );
      const newUploadedAssets = await Promise.all(promises);
      assets =
        typeof assets !== undefined
          ? [...assets!, ...newUploadedAssets]
          : newUploadedAssets;
    }
    const updatedSubCategory = await updateSubCategory(subCategoryId, {
      ...update,
      assets,
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
    const assets = subCategory.assets || [];
    if (typeof assets?.length !== undefined && assets?.length > 0) {
      let promises: Promise<boolean>[] = [];
      promises = assets?.map((assetId: string) => deleteImage(assetId));
      await Promise.all(promises);
    }
    await deleteSubCategory(subCategoryId);
    return res
      .status(200)
      .json({ message: `${subCategory.name} sub category is deleted` });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};
