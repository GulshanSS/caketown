import express from "express";
import uploader from "../config/multer.config";
const SubCategoryRouter = express.Router();

import {
  createSubCategoryHandler,
  deleteSubCategoryHandler,
  getAllSubCategoryHandler,
  getSubCategoryByIdHandler,
  updateSubCategoryHandler,
} from "../controllers/subCategory.controller";
import validateResource from "../middlewares/validateResource";
import {
  createSubCategorySchema,
  deleteSubCategorySchema,
  getSubCategorySchema,
  updateSubCategorySchema,
} from "../schemas/subCategory.schema";

SubCategoryRouter.get("/", getAllSubCategoryHandler);

SubCategoryRouter.get(
  "/:subCategoryId",
  validateResource(getSubCategorySchema),
  getSubCategoryByIdHandler
);

SubCategoryRouter.post(
  "/create",
  [uploader.array("files"), validateResource(createSubCategorySchema)],
  createSubCategoryHandler
);

SubCategoryRouter.put(
  "/:subCategoryId/update",
  [uploader.array("files"), validateResource(updateSubCategorySchema)],
  updateSubCategoryHandler
);

SubCategoryRouter.delete(
  "/:subCategoryId/delete",
  validateResource(deleteSubCategorySchema),
  deleteSubCategoryHandler
);

export default SubCategoryRouter;
