import cloudinary from "../config/cloudinary.config";
import AssetModel from "../models/asset.model";
import { defaultPreSets } from "../utils/cloudinary.utils";

export const uploadImage = async (
  filePath: string,
  section: string,
  fileName: string
) => {
  try {
    if (typeof filePath !== undefined) {
      const result = await cloudinary.uploader.upload(
        filePath,
        defaultPreSets(section, fileName)
      );
      const assetDetails = await AssetModel.create({
        name: fileName,
        image: {
          cloudinaryId: result.public_id,
          cloudinaryUrl: result.secure_url,
        },
        alt: fileName,
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
