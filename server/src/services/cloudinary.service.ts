import cloudinary from "../config/cloudinary.config";
import logger from "../config/logger.config";
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
