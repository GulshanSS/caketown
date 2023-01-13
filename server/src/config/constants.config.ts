export const PORT = process.env.PORT as string;
export const DB_URI = process.env.DB_URI as string;
export const MULTER = {
  FILE_SIZE: 50000000 as number,
};
export const CLOUDINARY = {
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
  API_KEY: process.env.CLOUDINARY_API_KEY as string,
  API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
};
export const FOLDER_NAME = {
  CATEGORY: "category" as string,
  SUB_CATEGORY: "subCategory" as string,
  INNER_CATEGORY: "innerCategory" as string,
  ADD_ON_PRODUCT: "addOnProduct" as string,
  BLOCK: "block" as string,
  SLIDER: "slider" as string,
  PRODUCT: "product" as string,
};
export const SALT_ROUNDS = 12 as number;
export const KEY = {
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  PUBLIC_KEY: process.env.PUBLIC_KEY,
};
export const TOKEN = {
  ACCESS_TTL: "1m" as string,
  REFRESH_TTL: "1d" as string,
  JWT_ALGORITHM: process.env.JWT_ALGORITHM as any,
};
