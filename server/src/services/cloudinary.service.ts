import cloudinary from "../config/cloudinary.config";
import IFile from "../interfaces/file.interface";
import AssetModel from "../models/asset.model";
import { defaultPreSets } from "../utils/cloudinary.utils";

export const uploadImage = async (
  file: IFile,
  folder: string,
  filename: string
) => {
  try {
    if (typeof file.path !== undefined) {
      const { public_id, url } = await cloudinary.uploader.upload(
        file.path,
        defaultPreSets(folder, filename)
      );
      const assetDetails = await AssetModel.create({
        name: filename,
        image: {
          cloudinaryId: public_id,
          cloudinaryUrl: url,
        },
        alt: filename,
      });
      return assetDetails._id;
    }
  } catch (e: any) {
    throw new Error(e);
  }
};

export const deleteImage = async (assetId: string) => {
  try {
    const asset = await AssetModel.findOne({ _id: assetId });
    if (!asset) {
      return false;
    }
    await cloudinary.uploader.destroy(asset.image.cloudinaryId);
    await AssetModel.deleteOne({ _id: assetId });
    return true;
  } catch (e: any) {
    throw new Error(e);
  }
};
