export const PORT = process.env.PORT;
export const DB_URI = process.env.DB_URI;
export const MULTER = {
  FILE_SIZE: 50000000,
};
export const CLOUDINARY = {
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY,
  API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
export const FOLDER_NAME = {
  CATEGORY: "category",
  SUB_CATEGORY: "subCategory",
  INNER_CATEGORY: "innerCategory",
  ADD_ON_PRODUCT: "addOnProduct",
  BLOCK: "block",
  SLIDER: "slider",
};
export const SALT_ROUNDS = 12;
