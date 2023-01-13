import IFile from "../interfaces/file.interface";
import { deleteImage, uploadImage } from "../services/cloudinary.service";

export const uploadAssets = async (
  files: IFile[],
  assets: string[],
  folder: string,
  filename: string
) => {
  try {
    if (typeof files !== undefined && files?.length > 0) {
      let promises: Promise<any>[] = [];
      promises = files?.map(
        async (file: IFile) => await uploadImage(file, folder, filename)
      );
      assets = [...assets!, ...(await Promise.all(promises))];
    }
    return assets;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const deleteAssets = async (assets: string[]) => {
  try {
    if (typeof assets?.length !== undefined && assets?.length > 0) {
      let promises: Promise<boolean>[] = [];
      promises = assets?.map((assetId: string) => deleteImage(assetId));
      await Promise.all(promises);
    }
  } catch (e: any) {
    throw new Error(e);
  }
};
