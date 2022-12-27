import cloudinary from "../config/cloudinary.config";
import AssetModel from "../models/asset.model";
import {
  tinyPreSets,
  mediumPreSets,
  largePreSets,
} from "../utils/cloudinary.utils";

export const uploadImage = async (
  filePath: string,
  section: string,
  fileName: string
) => {
  try {
    if (typeof filePath !== undefined) {
      const tinyRes = await cloudinary.uploader.upload(
        filePath,
        tinyPreSets(section, fileName)
      );
      const mediumRes = await cloudinary.uploader.upload(
        filePath,
        mediumPreSets(section, fileName)
      );
      const largeRes = await cloudinary.uploader.upload(
        filePath,
        largePreSets(section, fileName)
      );
      const assetDetails = await AssetModel.create({
        tiny: {
          cloudinaryId: tinyRes.public_id,
          cloudinaryUrl: tinyRes.secure_url,
        },
        medium: {
          cloudinaryId: mediumRes.public_id,
          cloudinaryUrl: mediumRes.secure_url,
        },
        large: {
          cloudinaryId: largeRes.public_id,
          cloudinaryUrl: largeRes.secure_url,
        },
      });

      return assetDetails;
    }
  } catch (e: any) {
    throw new Error(e);
  }
};
