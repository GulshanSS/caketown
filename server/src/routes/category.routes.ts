import express from "express";
import uploader from "../config/multer.config";
const CategoryRouter = express.Router();

import {
  createCategoryHandler,
  deleteCategoryHandler,
  getAllCategoryHandler,
  getCategoryByIdHandler,
  updateCategoryHandler,
} from "../controllers/category.controller";
import {
  createCategorySchema,
  deleteCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from "../schemas/category.schema";
import validateResource from "../middlewares/validateResource";

CategoryRouter.get("/", getAllCategoryHandler);

CategoryRouter.get(
  "/:categoryId",
  validateResource(getCategorySchema),
  getCategoryByIdHandler
);

CategoryRouter.post(
  "/create",
  [uploader.array("files"), validateResource(createCategorySchema)],
  createCategoryHandler
);

CategoryRouter.put(
  "/:categoryId/update",
  [uploader.array("files"), validateResource(updateCategorySchema)],
  updateCategoryHandler
);

CategoryRouter.delete(
  "/:categoryId/delete",
  validateResource(deleteCategorySchema),
  deleteCategoryHandler
);

export default CategoryRouter;
