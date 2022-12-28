import express, { Request, Response } from "express";
import uploader from "../config/multer.config";
const CategoryRouter = express.Router();

import {
  createCategoryHandler,
  getAllCategoryHandler,
  getCategoryByIdHandler,
} from "../controllers/category.controller";
import { createCategorySchema } from "../schemas/category.schema";
import validateResource from "../middlewares/validateResource";

CategoryRouter.get("/", getAllCategoryHandler);

CategoryRouter.get("/:categoryId", getCategoryByIdHandler);

CategoryRouter.post(
  "/create",
  [uploader.array("files"), validateResource(createCategorySchema)],
  createCategoryHandler
);

export default CategoryRouter;
